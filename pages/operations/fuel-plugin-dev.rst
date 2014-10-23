.. _plugin-dev:

HowTo: Create a plugin
======================

(eli: Irina, I have a question about location of this doc, I looked at the
content or Operations Guide, and the document describes some hacks or
workarounds. Can we create a separate Guide? Like *Plugin Developer Guide*,
because Plugin Developer is different role, it's not Operator and it's not
a User. Also it's a such kind of feature which we want everybody to know about,
so it would have better effect if we place this info somwhere in top level)

Fuel 6.0 supports a pluggable architecture that allows new functionality to be added to
:ref:`Neutron<neutron-term>` and :ref:`Cinder<cinder-term>` bin a self-contained archive.

Preparing your environment
--------------------------

To prepare your environment for plugin development, follow these steps:

1.  If you have Ubuntu 12.04.2 LTS, perform:

::

        sudo apt-get install createrepo rpm dpkg-dev

If you have Centos 6.5, perform:

::

       yum install createrepo rpm dpkg-devel

2. Install Fuel plugin builder. To do that, follow these steps:

* Install pip

::

        easy_install pip


* Install fuel-plugin-builder

::

        pip install fuel-plugin-builder


Creating your plugin
--------------------

To create your Fuel plugin, follow these steps:

1. Generate the plugin structure

::

        fpb --create fuel_plugin_name

2. Your plugin must have the following structure

::

        fuel_plugin_name/
        ├── deployment_scripts
        │   └── deploy.sh
        ├── environment_config.yaml
        ├── metadata.yaml
        ├── pre_build_hook
        ├── repositories
        │   ├── centos
        │   └── ubuntu
        └── tasks.yaml


* `metadata.yaml` - set name, version, compatibility for your plugin

* `deployment_scripts` - directory where you can add your bash script or Puppet manifests

* `environment_config.yaml` - set plugin-specific parameters, which user can configure on UI Settings tab

* `repositories` - add Ubuntu or CentOS packages which are required for your plugin

* `tasks.yaml` - used to specify when, where and how to run your scripts

3. Build your plugin:

::

       fpb --build fuel_plugin_name/

After your plugin is built, you can see it in your plugin's directory;
for example, `fuel_plugin_name/fuel_plugin_name-0.1.0.fp` can be used.

Now you can install your plugin :ref:`neutron-cinder-plugin`.

Detailed description of plugin structure
----------------------------------------

tasks.yaml
++++++++++

By default, Fuel plugin builder generates two tasks:

- The first one runs a *deploy.sh* bash script that is located in *deployment_scripts* directory;
  this task is applied only on nodes with Controller role.

- The second task creates '/tmp/plugin.all' file that contains 'all' text;
  this task is applied to all nodes with a specific role.

Each task has a 'stage' parameter which tells when to run a particular task;
'stage' can have two values: 'post_deployment' and 'pre_deployment'.

- *post_deployment* - run task when deployment of entire environment
  is completed.

- *pre_deployment* - run task when deployment is started before
  OpenStack node roles are deployed.

Also, for each task you can specify execution 'timeout' in seconds, so
the deployment will fail if timeout expires:

.. code-block:: yaml

    # This tasks will be applied on controller nodes,
    # here you can also specify several roles, for example
    # ['cinder', 'compute'] will be applied only on
    # cinder and compute nodes
    - role: ['controller']
      stage: post_deployment
      type: shell
      parameters:
        cmd: ./deploy.sh
        timeout: 42
    # Task is applied for all roles
    - role: '*'
      stage: pre_deployment
      type: shell
      parameters:
        cmd: echo all > /tmp/plugin.all
        timeout: 42

There is also another type of tasks called `puppet`.
This task allows you to apply your own puppet manifests on OpenStack nodes.
To do that, add your `site.pp` file in
`deployment_scripts/puppet/manifests/` directory. Then put all required modules
in `deployment_scripts/puppet/modules` directory.

- *puppet_manifest* - specify directory path
  for you manifest relative to **deployment_scripts**.

- *puppet_modules* - specify directory path
  for you modules relative to **deployment_scripts**.

.. code-block:: yaml

    # Deployment will be applied on controllers only
    - role: ['controller']
      stage: post_deployment
      type: puppet
      parameters:
        puppet_manifest: puppet/manifests/site.pp
        puppet_modules: puppet/modules
        timeout: 360

environment_config.yaml
+++++++++++++++++++++++

In this file you can describe additional attributes for the environment.
This attributes will be shown on Fuel web UI on **Settings** tab; when
user deploys the environment, this attributes will be passed to Orchestrator, so that
you will be able to take this data from `/etc/astute.yaml` file on
OpenStack node and use them in your bash or puppet scripts.

By default, your config ( = environment_config.yaml file) adds text field on UI:

.. code-block:: yaml

    attributes:
      fuel_plugin_name_text:
        value: 'Set default value'
        label: 'Text field'
        description: 'Description for text field'
        weight: 25
        type: "text"

For more information on Fuel web UI elements for a plugin, see :ref:`fuel-plugin-dev-ui`.

metadata.yaml
+++++++++++++

Metadata yaml contains the description of your plugin:

.. code-block:: yaml

    # Plugin name
    name: fuel_plugin_name
    # Human-readable name for your plugin, it will be shown on UI
    # as a name of plugin group
    title: Title for fuel_plugin_name plugin
    # Plugin version
    version: 1.0.0
    # Description
    description: Enable to use plugin X
    # Required fuel version
    fuel_version: ['6.0']

    # The plugin is compatible with releases in the list
    releases:
      - os: ubuntu
        version: 2014.2-6.0
        mode: ['ha', 'multinode']
        deployment_scripts_path: deployment_scripts/
        repository_path: repositories/ubuntu
      - os: centos
        version: 2014.2-6.0
        mode: ['ha', 'multinode']
        deployment_scripts_path: deployment_scripts/
        repository_path: repositories/centos

    # Version of plugin package
    package_version: '1.0.0'

* *name* - internal name for you plugin, can consist of
  lowercase letters, and '-', '_' symbols.

* *title* - human-readable name for the plugin, this name
  will be shown on UI.

* *description* - description for your plugin.

* *version* - plugin version; for more information on this
  issue, see `Semantic Versioning 2.0.0 <http://semver.org/>`_.

* *fuel_version* - a list of plugin-compatible (
  irina: did I understand the idea correct here? we should know if plugin is compatible?
  eli: yes, you are correct, a plugin developer should test, if his plugin
  is compatible with newer version of fuel, if it's he can add new version
  of fuel in the list)
  versions of Fuel.

* *package_version* - version of plugin format; do not change it until
  (irina: what do you mean here? I shouldn't try to change it until
  it's time to migrate plugin to a newer format? please, explain this
  eli: some day we can release a new version of plugin, it can have different
  format, e.g. new fields, new files, new directories, and if user want to
  use newer format, he should change his plugin, and change this field,
  to the version of plugin format which he mgirated to)
  you are trying to migrate your plugin to newer format

* *releases* - a list of OpenStack releases compatible with the plugin.

  * *os* - a name of OpenStack release, for example **ubuntu** or **centos**.

  * *version* - version of OpenStack release.

  * *mode* - a list of modes compatible with the plugin;
    'ha' - used if plugin supports High Availability, 'multinode' -
    if it does not.

  * *deployment_scripts_path* - a path in your plugin directory
    where all deployment scripts for the release are placed.

  * *repository_path* - a path in your plugin directory
    where all packages for the release are placed.

Implementation details
----------------------

Installation procedure
++++++++++++++++++++++

Fuel plugin installation consists of the following steps:

1. User uploads **fuel_plugin_name-1.0.0.fp** file on the Fuel Master node;
   this file represents a 'tar.gz' archive.

2. When plugin is installed, user runs
   *fuel plugins --install fuel_plugin_name-1.0.0.fp* command

3. Fuel client copies the contents of **fuel_plugin_name-1.0.0.fp** file to
   **/var/www/nailgun/plugins/fuel_plugin_name-1.0.0** directory.

4. Then Fuel client registers the plugin via REST API Service (Nailgun):
   it sends a POST request with the contents
   of **metadata.yaml** file to **/api/v1/plugins** url.

Configuration
+++++++++++++

Configuration procedure consists of the following steps:

1. While a new environment is created, Nailgun tries to find plugins which
   are compatible with the environment.

2. Then Nailgun merges the contents of
   **environment_config.yaml** files with the basic attributes of the environment
   and generates groups and checkboxes on Fuel web UI for the plugins.

3. When user enables a plugin, Fuel web UI sends the data to Nailgun; Nailgun then
   parses the request and creates relations between **Plugin** and **Cluster**
   models.

Deployment
++++++++++

Deployment of an environment with enabled plugins consists of the following steps:

1. After environment is created and configured, user starts a deployment.

2. During the deployment procedure, Nailgun gets the list of enable
   plugins and parses **task.yaml** files for them.

3. These files are based on the tasks, generated by Nailgun for Orchestrator
   from default *tasks.yaml* file:

.. code-block:: yaml

    - role: ['controller']
      stage: post_deployment
      type: shell
      parameters:
        cmd: ./deploy.sh
        timeout: 42
    - role: '*'
      stage: pre_deployment
      type: shell
      parameters:
        cmd: echo all > /tmp/plugin.all
        timeout: 42

Here is an example of tasks generated for Orchestrator when a two-node
environment is deployed; node has a Controller role with UID 7 and Compute role with UID 8.

.. code-block:: json

    {
        "pre_deployment": [
            {
                "uids": ["8", "7"],
                "parameters": {
                    "path": "/etc/apt/sources.list.d/fuel_plugin_name-1.0.0.list",
                    "data": "deb http://10.20.0.2:8080/plugins/fuel_plugin_name-1.0.0/repositories/ubuntu /"
                },
                "priority": 100,
                "fail_on_error": true,
                "type": "upload_file",
                "diagnostic_name": "fuel_plugin_name-1.0.0"
            },
            {
                "uids": ["8", "7"],
                "parameters": {
                    "src": "rsync://10.20.0.2:/plugins/fuel_plugin_name-1.0.0/deployment_scripts/",
                    "dst": "/etc/fuel/plugins/fuel_plugin_name-1.0.0/"
                },
                "priority": 200,
                "fail_on_error": true,
                "type": "sync",
                "diagnostic_name": "fuel_plugin_name-1.0.0"
            },
            {
                "uids": ["8", "7"],
                "parameters": {
                    "cmd": "echo all > /tmp/plugin.all",
                    "cwd": "/etc/fuel/plugins/fuel_plugin_name-1.0.0/",
                    "timeout": 42
                },
                "priority": 300,
                "fail_on_error": true,
                "type": "shell",
                "diagnostic_name": "fuel_plugin_name-1.0.0"
            }
        ],
        "post_deployment": [
            {
                "uids": ["7"],
                "parameters": {
                    "cmd": "./deploy.sh",
                    "cwd": "/etc/fuel/plugins/fuel_plugin_name-1.0.0/",
                    "timeout": 42
                },
                "priority": 100,
                "fail_on_error": true,
                "type": "shell",
                "diagnostic_name": "fuel_plugin_name-1.0.0"
            }
        ],
        "deployment_info": "<Here is regular deployment info>"
    }

* *pre_deployment* - has three tasks; two of them are generated automatically by Nailgun
   while the third one is initiated by user and taken from from **tasks.yaml** file, converted to
   Orchestrator format.

  - the first task adds a new repository for the node; repository's path
    is built according to the following template:
    **http://{{master_ip}}:8080/plugins/{{plugin_name}}-{{plugin_version}}/{{repository_path}}**,
    where *master_ip* is an IP address of the Fuel Master node; *plugin_name*
    is a plugin name; *plugin_version* is the plugin version,
    *repository_path* is a path for a specific release in
    **metadata.yaml** file.

  - the second tasks copies plugin deployment scripts on the target nodes.
    Rsync is used to copy the files. Path to these files is pretty similar to repository
    path. The only difference is that the deployment scripts path is taken from
    **deployment_scripts_path** that is placed into **metadata.yaml** file.

* *post_deployment* - this section has only one task which is taken from
  *tasks.yaml* file; **uids** field  contains a list of nodes on which user should run
  a particular task. In this example, *tasks.yaml* file has **"role: ['controller']"** and
  this role is assigned to controller with UID 7.

* *deployment_info* - the section contains configuration information
   required for deployment and not related to plugins.

Debugging your plugin
---------------------

During the plugin development, we recommend installing Fuel Master in
virtual machines :ref:`virtualbox`.

UI debugging
++++++++++++

UI elements are described in **environment_config.yaml** file.

To check how your built plugin looks on Fuel web UI, install and create environment:

.. code-block:: bash

    # Enter plugin directory
    cd fuel_plugin_name

    # Change environment_config.yaml file

    # Build a plugin
    fpb --build .

    # Install plugin, use "--force" parameter to replace
    # the plugin if you have it installed
    fuel plugins --install fuel_plugin_name-1.0.0.fp --force

    # Create new environment
    fuel env --create --release 1 --name test

    # Check that UI correctly shows elements from environment_config.yaml file


Deployment debugging
++++++++++++++++++++

To show how it works, we create a simple plugin with an error in
deployment script.

1. Create a plugin:

.. code-block:: bash

    fpb --create fuel_plugin_name

2. Add an error in the default deployment script
   *fuel_plugin_name/deployment_scripts/deploy.sh*:

.. code-block:: bash

    #!/bin/bash

    # It's a script which deploys your plugin
    echo fuel_plugin_name > /tmp/fuel_plugin_name

    # Non-zero exit code means, that a script executed with error
    exit 1

.. note::

   If you don't want to run plugin build, but you want to check that
   plugin format is correct, you can use '--check' parameter for fpb
   *fpb --check fuel_plugin_name*

3. Build and install the plugin:

.. code-block:: bash

    fpb --build fuel_plugin_name/
    fuel plugins --install fuel_plugin_name/fuel_plugin_name-1.0.0.fp

4. Use Fuel web UI or CLI to create environment:

.. code-block:: bash

   fuel env create --name test --rel 1 --mode multinode --network-mode nova

5. Enable the plugin on Fuel web UI **Settings** tab and then add several nodes.
   The first node has *Controller* role, the second node has *Cinder*
   and *Computes* roles.

.. code-block:: bash

   fuel node set --node 1 --env 1 --role controller
   fuel node set --node 2 --env 1 --role compute,cinder

6. Check that Nailgun generates correct configuration
   data that a user can set on Fuel web UI:

.. code-block:: bash

    fuel deployment default --env 1
    cat deployment_1/controller_1.yaml
    ...
    fuel_plugin_name:
        fuel_plugin_name_text: Set default value
    ...

Now can see that the file for target node contains plugin data.

.. note::

    The command mentioned above is useful when you do not know how
    your configuration data
    from Fuel UI **Settings** tab will look like in */etc/astute.yaml* file on
    target nodes.

6. Perform provisioning without deployment for two nodes:

.. code-block:: bash

    fuel --env 1 node --provision --node 1,2

To reduce the time required for testing, wait until nodes are provisioned.

(eli: I'm not sure if it's a correct sentence, we should make snapshot
to reduce time of testing, and we should do it after nodes are provisioned.
The current sentece looks like: if you want the time of testing to be reduced,
wait until nodes are provisioned)

Note that tf you use virtual machines, make snapshots of your target nodes.

7. Now you can run deployment:

.. code-block:: bash

    fuel --env 1 node --deploy --node 1,2


8. The deployment fails with the following message:

::

    Deployment has failed. Method deploy. Failed to deploy plugin fuel_plugin_name-1.0.0.

9. You can see an error in **/var/log/docker-logs/astute/astute.log** Orchestrator logs:

::

    [394] Shell command failed. Check debug output for details
    [394] 13edd324-6a11-4342-bc04-66c659e75e35: cmd: ./deploy.sh
    cwd: /etc/fuel/plugins/fuel_plugin_name-1.0.0/
    stdout:
    stderr:
    exit code: 1

10. It fails due to the changes in **deploy.sh** script that you made in
    step 2. Let's assume that we do not know what happened and try to debug the problem:

.. code-block:: bash

    # Go to the first node
    ssh node-1

11. All plugin deployment scripts are copied to the separate directory on the
    target node; in this case it is **/etc/fuel/plugins/fuel_plugin_name-1.0.0/**:

.. code-block:: bash

    cd /etc/fuel/plugins/fuel_plugin_name-1.0.0/
    # The directory contains our deploy.sh script, lets run it
    ./deploy.sh
    # And check exit code
    echo $? # Returns 1

12. Now we can see that deployment failed because of (= non-zero) exit code error.

13. To fix the problem and check that the proposed solution works, edit the
    **/var/www/nailgun/plugins/fuel_plugin_name-1.0.0/deployment_scripts/deploy.sh** script
    on the Fuel Master node.
    Note that there is no need to rebuild and reinstall a plugin:

.. code-block:: bash

    #!/bin/bash

    # It's a script which deploys your plugin
    echo fuel_plugin_name > /tmp/fuel_plugin_name

    # Now our deployment script returns 0 instead of 1
    exit 0

14. If you run the deployment again, it goes successfully:

.. code-block:: bash

    fuel --env 1 node --deploy --node 1,2

.. warning::

    During the testing of your deployment scripts, make sure that
    your scripts work correctly when they are applied several times.
    Run environment deployment at least twice and check that
    your plugin works correctly. The reason for this step

    (eli: I'm not sure about word 'step' in this context, because
    it's more not about step, but about some testing strategy)
    is the following:

    Fuel can run deployment of your plugin several times in case
    the first deployment try failed. Also, your deployment scripts can be
    executed during OpenStack patching.

15. To make sure that plugin works without errors, revert snapshots
    which you made in step 6, and run deployment again:

.. code-block:: bash

    fuel --env 1 node --deploy --node 1,2

In the same way with no plugin reinstallation, you can edit
**/var/www/nailgun/plugins/fuel_plugin_name-1.0.0/tasks.yaml** file.
Note that in this case you should at least run **fpb --check /var/www/nailgun/plugins/fuel_plugin_name-1.0.0/**
command to make sure that your tasks have a valid format.
