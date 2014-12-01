.. _020-fuel-plugin-dev:

How To: Create a plug-in
========================

Fuel 6.0 supports Pluggable Architecture.
This new feature allows extending Fuel in a more flexible manner:
after Fuel upgrade there is no need to apply patches manually and
support them.


Preparing your environment
--------------------------

To prepare your environment for plug-in development, follow these steps:

#.  Install the standard Linux development tools.
    If you have Ubuntu 12.04.2 LTS, run:

    ::

        sudo apt-get install createrepo rpm dpkg-dev

    If you have Centos 6.5, run:

    ::

       yum install createrepo rpm dpkg-devel

#. Install the Fuel Plug-in Builder (*fuel-plugin-builder*). To do that, follow these steps:

   * Install pip

   ::

        easy_install pip


   * Install Fuel Plug-in Builder:

   ::

        pip install fuel-plugin-builder


Creating your plug-in
---------------------

To create your Fuel plug-in, follow these steps:

#. Generate the plug-in structure

   ::

        fpb --create <fuel_plugin_name>

#. Your plug-in must have the following format:

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


  * **tasks.yaml** - specify when, where and how to run your scripts.

  * **metadata.yaml** - set name, version, compatibility for your plug-in.

  * **environment_config.yaml** - set plug-in-specific parameters, which user can configure on the **Settings** tab of the Fuel web UI.

  * **deployment_scripts** - directory where you can add your bash script or puppet manifests.

  * **repositories** - add Ubuntu or CentOS packages which are required for your plug-in.

#. Build your plug-in:

   ::

       fpb --build <fuel_plugin_name>/

   After your plug-in is built, you can see it in your plug-in's directory;
   for example, `<fuel_plugin_name>/<fuel_plugin_name>-0.1.0.fp` can be used.

For instructions on installing your plug-in, see :ref:`040-install-plugin`.


Plug-in structure in details
----------------------------

tasks.yaml
++++++++++

By default, Fuel Plug-in Builder generates two tasks:

- The first one runs a *deploy.sh* bash script that is located in *deployment_scripts* directory;
  this task is applied only on nodes with Controller role.

- The second task creates '/tmp/plugin.all' file that contains 'all' text;
  this task is applied to all nodes in the environment.

Each task has a 'stage' parameter which tells when to run a particular task;
'stage' can have either 'post_deployment' or 'pre_deployment' value.

- *post_deployment* - run task when deployment of entire environment
  is completed.

- *pre_deployment* - run task when deployment is started before
  OpenStack node roles are deployed.

For each task, you must also specify execution 'timeout' in seconds, otherwise,
the deployment will fail if timeout expires.

Fuel supports two types of plug-ins, `shell` and `puppet`: the first one runs
the specified shell command, the second applies Puppet manifests.

Example of `shell` tasks:

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

Task with *puppet* allows you
to apply your own Puppet manifests on OpenStack nodes.
For more information, see :ref:`Puppet in Fuel <puppet-fuel>` section.

To do that, add your *site.pp* file in
*deployment_scripts/puppet/manifests/*
directory. Then put all required modules
in *deployment_scripts/puppet/modules* directory.

- *puppet_manifest* - specify directory path
  for your manifest relative to **deployment_scripts**.

- *puppet_modules* - specify directory path
  for your modules relative to **deployment_scripts**.

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

This file describes additional attributes that will appear on the **Settings** tab of the Fuel web UI
When the environment is deployed,
these attributes are passed to the task executor so that the data is available in the */etc/astute.yaml*
file on each target node and can be accessed from your bash or puppet scripts.

By default, your configuration file (**environment_config.yaml**) adds text field on Fuel web UI:

.. code-block:: yaml

    attributes:
      fuel_plugin_name_text:
        value: 'Set default value'
        label: 'Text field'
        description: 'Description for text field'
        weight: 25
        type: "text"

For more information on Fuel web UI elements for a plug-in, see :ref:`fuel-plugin-dev-ui`.

metadata.yaml
+++++++++++++

This file contains the description of your plug-in:

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

* *name* - internal name for your plug-in, can consist of
  lowercase letters, '-' and '_' symbols.

* *title* - human-readable name for the plug-in that will appera
  on the Fuel web UI.

* *description* - description for your plug-in.

* *version* - plug-in version; for more information on this
  issue, see `Semantic Versioning 2.0.0 <http://semver.org/>`_.

* *fuel_version* - a list of plug-in-compatible
  versions of Fuel.

* *package_version* - version of plug-in format; do not change it until
  you are trying to migrate your plug-in to a newer format. Fuel uses
  this version to choose the way a plug-in should be installed.

* *releases* - a list of OpenStack releases compatible with the plug-in.
   Release can look like *2014.2-6.0*.

  * *os* - a name of supported Linux distribution, for example *ubuntu* or *centos*.

  * *version* - version of OpenStack release.

  * *mode* - a list plug-in-compatible modes;
    'ha' - used if plug-in supports High Availability, 'multinode' -
    if it does not.

  * *deployment_scripts_path* - a path in your plug-in directory
    where all deployment scripts for the release are located
    relative to the top of the plug-in directory.

  * *repository_path* - a path in your plug-in directory
    where all packages for the release are located
    relative to the top of the plug-in directory.

Implementation details
----------------------

Installation procedure
++++++++++++++++++++++

Installation procedure consists of the following steps:

#. User uploads **<fuel_plugin_name>-1.0.0.fp** file on the Fuel Master node;
   this file represents a tar.gz archive.

#. When plug-in is uploaded, user runs the following command:

   ::


      fuel plugins --install <fuel_plugin_name>-1.0.0.fp


#. Fuel client copies the contents of**<fuel_plugin_name>-1.0.0.fp** file to the
   **/var/www/nailgun/plugins/<fuel_plugin_name>-1.0.0** directory.

#. Fuel client registers the plug-in using REST API Service (Nailgun);
   it sends a POST request with the contents
   of **metadata.yaml** file to **/api/v1/plugins** url.

Configuration
+++++++++++++

Configuration procedure consists of the following steps:

#. When a new environment is created, Nailgun tries to find plug-ins which
   are compatible with the environment.

#. Nailgun merges the contents of the
   **environment_config.yaml** files with the basic attributes of the environment
   and generates a separate group and the checkbox on the Fuel web UI for each plug-in.

#. The plug-in is disabled until the user enables it.
   Then Fuel web UI sends the data to Nailgun;
   Nailgun parses the request and creates relations between **Plugin** and **Cluster**
   models.

   .. note::

            User cannot disable or reconfigure plug-in after environment is deployed.

Deployment
++++++++++

After environment is created and configured, user starts a deployment.
Meanwhile, Nailgun gets the list of enabled plug-ins from the database.
For each plug-in from the list, Nailgun parses **tasks.yaml** file:


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

Here is an example of tasks generated for task executor when a two-node
environment is deployed; node has a Controller role with UID 7 and Compute role with UID 8.

.. code-block:: json

    {
        "pre_deployment": [
            {
                "uids": ["8", "7"],
                "parameters": {
                    "path": "/etc/apt/sources.list.d/<fuel_plugin_name>-1.0.0.list",
                    "data": "deb http://10.20.0.2:8080/plugins/
                    <fuel_plugin_name>-1.0.0/repositories/ubuntu /"
                },
                "priority": 100,
                "fail_on_error": true,
                "type": "upload_file",
                "diagnostic_name": "<fuel_plugin_name>-1.0.0"
            },
            {
                "uids": ["8", "7"],
                "parameters": {
                    "src": "rsync://10.20.0.2:/plugins/<fuel_plugin_name>-1.0.0/deployment_scripts/",
                    "dst": "/etc/fuel/plugins/<fuel_plugin_name>-1.0.0/"
                },
                "priority": 200,
                "fail_on_error": true,
                "type": "sync",
                "diagnostic_name": "<fuel_plugin_name>-1.0.0"
            },
            {
                "uids": ["8", "7"],
                "parameters": {
                    "cmd": "echo all > /tmp/plugin.all",
                    "cwd": "/etc/fuel/plugins/<fuel_plugin_name>-1.0.0/",
                    "timeout": 42
                },
                "priority": 300,
                "fail_on_error": true,
                "type": "shell",
                "diagnostic_name": "<fuel_plugin_name>-1.0.0"
            }
        ],
        "post_deployment": [
            {
                "uids": ["7"],
                "parameters": {
                    "cmd": "./deploy.sh",
                    "cwd": "/etc/fuel/plugins/<fuel_plugin_name>-1.0.0/",
                    "timeout": 42
                },
                "priority": 100,
                "fail_on_error": true,
                "type": "shell",
                "diagnostic_name": "<fuel_plugin_name>-1.0.0"
            }
        ],
        "deployment_info": "<Here is regular deployment info>"
    }

* *pre_deployment* - has three tasks; two of them are generated automatically by Nailgun
   while the third one is initiated by user and taken from from **tasks.yaml** file, converted to
   task executor format.

  - the first task adds a new repository for the node; repository's path
    is built according to the following template:
    **http://{{master_ip}}:8080/plugins/{{plugin_name}}-{{plugin_version}}/{{repository_path}}**,
    where *master_ip* is an IP address of the Fuel Master node; *plugin_name*
    is a plug-in name; *plugin_version* is the plug-in version,
    *repository_path* is a path for a specific release in
    **metadata.yaml** file.

  - the second tasks copies plug-in deployment scripts on the target nodes.
    Rsync is used to copy the files. Path to these files is pretty similar to the repository
    path. The only difference is that the deployment scripts path is taken from
    **deployment_scripts_path** that is placed into **metadata.yaml** file.

* *post_deployment* - has only one task which is taken from
  *tasks.yaml* file; **uids** field contains a list of nodes on which user should run
  a particular task. In this example, *tasks.yaml* file has **"role: ['controller']"** and
  this role is assigned to controller with UID 7.

* *deployment_info* - this section contains configuration information
   required for deployment and not related to plug-ins.

Debugging your plug-in
----------------------

You can use :ref:`virtualbox` for much (perhaps all) of your testing and debugging.

UI debugging
++++++++++++

UI elements are described in **environment_config.yaml** file.

To check how your built plug-in looks on the Fuel web UI, install and create an environment:

.. code-block:: bash

    # Enter plugin directory
    cd <fuel_plugin_name>

    # Change environment_config.yaml file

    # Build a plugin
    fpb --build .

    # Install plugin, use "--force" parameter to replace
    # the plugin if you have it installed
    fuel plugins --install <fuel_plugin_name>-1.0.0.fp --force

    # Create new environment
    fuel env --create --release 1 --name test

    # Check that UI correctly shows elements from environment_config.yaml file


Deployment debugging
++++++++++++++++++++

To show how it works, let's create a simple plug-in with an error in
deployment script.

#. Create a plug-in:

   .. code-block:: bash

       fpb --create <fuel_plugin_name>

#. Add an error in the default deployment script
   (**<fuel_plugin_name>/deployment_scripts/deploy.sh**):

   .. code-block:: bash

       #!/bin/bash

       # It's a script which deploys your plugin
       echo fuel_plugin_name > /tmp/fuel_plugin_name

       # Non-zero exit code means, that a script executed with error
       exit 1


   If you do not want to run plug-in build, but you want to check that
   plug-in format is correct, you can use *--check* parameter with
   the following command:

   ::

     fpb --check <fuel_plugin_name>


#. Build and install the plug-in:

   .. code-block:: bash

      fpb --build <fuel_plugin_name/>
      fuel plugins --install <fuel_plugin_name>/<fuel_plugin_name>-1.0.0.fp

#. Use Fuel web UI or CLI to create an environment:

   .. code-block:: bash

       fuel env create --name test --rel 1 --mode multinode --network-mode nova

#. Enable the plug-in on Fuel web UI **Settings** tab and then add several nodes.
   The first node has *Controller* role, the second node has *Cinder*
   and *Computes* roles.

   .. code-block:: bash

      fuel node set --node 1 --env 1 --role controller
      fuel node set --node 2 --env 1 --role compute,cinder

#. Check that Nailgun generates correct configuration
   data that a user can set on Fuel web UI:

   .. code-block:: bash

      fuel deployment --default --env 1
      cat deployment_1/controller_1.yaml
      ...
      fuel_plugin_name:
        fuel_plugin_name_text: Set default value
     ...

   Now can see that the file for target node contains plug-in data.

   .. note::

      The command mentioned above is useful when you do not know how
      your configuration data
      from Fuel web UI **Settings** tab will look like in **/etc/astute.yaml** file on
      target nodes.

#. Perform provisioning without deployment for two nodes:

   .. code-block:: bash

      fuel --env 1 node --provision --node 1,2

  .. note::

          To reduce the time required for testing, make a snapshot after nodes are provisioned.
          Note that if you use virtual machines, make snapshots of your target nodes.

#. Now you can run deployment:

   .. code-block:: bash

       fuel --env 1 node --deploy --node 1,2


#. The deployment fails with the following message:

   ::

      Deployment has failed. Method deploy. Failed to deploy plugin <fuel_plugin_name>-1.0.0.

#. You can see an error in **/var/log/docker-logs/astute/astute.log** task executor logs:

   ::

       [394] Shell command failed. Check debug output for details
       [394] 13edd324-6a11-4342-bc04-66c659e75e35: cmd: ./deploy.sh
       cwd: /etc/fuel/plugins/fuel_plugin_name-1.0.0/
       stdout:
       stderr:
       exit code: 1

#. It fails due to the changes in **deploy.sh** script that you made in
   step 2. Let's assume that we do not know what happened and try to debug the problem:

   .. code-block:: bash

       # Go to the first node
       ssh node-1

#. All plug-in deployment scripts are copied to the separate directory on the
   target node; in this case, it is **/etc/fuel/plugins/<fuel_plugin_name>-1.0.0/**:

   .. code-block:: bash

      cd /etc/fuel/plugins/<fuel_plugin_name>-1.0.0/
      # The directory contains our deploy.sh script, lets run it
      ./deploy.sh
      # And check exit code
      echo $? # Returns 1

#. Now we can see that deployment fails due to non-zero exit code error.
   To fix the problem and check that the proposed solution works,
   edit the */var/www/nailgun/plugins/<fuel_plugin_name>-1.0.0/deployment_scripts/deploy.sh* script
   on the Fuel Master node.
   Note that there is no need to rebuild and reinstall a plug-in:

   .. code-block:: bash

       #!/bin/bash

       # It's a script which deploys your plugin
       echo <fuel_plugin_name > /tmp/<fuel_plugin_name>

       # Now our deployment script returns 0 instead of 1
       exit 0

#. If you run the deployment again, it goes successfully:

   .. code-block:: bash

       fuel --env 1 node --deploy --node 1,2

   .. warning::

        During the testing of your deployment scripts, make sure that
        your scripts are idempotent: they should work correctly when
        applied several times.
        Run environment deployment at least twice and check that
        your plug-in works properly. The reason for this workflow
        is the following:
        Fuel can run deployment of your plug-in several times in case
        the first deployment try failed. Also, your deployment scripts can be
        executed during OpenStack patching.

 #. To make sure that plug-in works without errors, revert snapshots
    which you made in step 6, and run deployment again:

    .. code-block:: bash

        fuel --env 1 node --deploy --node 1,2

   In the same way with no plug-in reinstallation,
   you can edit */var/www/nailgun/plugins/<fuel_plugin_name>-1.0.0/tasks.yaml* file.
   Note that in this case to make sure that your tasks have a valid format, you should at least
   run the following command:

   ::

     fpb --check /var/www/nailgun/plugins/<fuel_plugin_name>-1.0.0/

.. _puppet-fuel:

Puppet in Fuel
--------------

Fuel does not use puppet master. Task executor copies manifest from
Fuel Master node and runs 'puppet apply' command on each target node.

It is recommended to use `puppet` tasks in your plug-in instead of running
puppet in shell tasks.

Task executor has `code with special logic <https://github.com/stackforge/fuel-astute/blob/122cdaab/mcagents/puppetd.rb>`_ which handles errors, if **puppet apply**
command returned zero/non-zero exit code.
Note that it does not mean that command is
succeed or failed. That means, it returns '2' if there were changes during the execution:
task executor parses '/var/lib/puppet/state/last_run_summary.yaml' file to
determine the status of puppet run.

FAQ
---

Where is Fuel Plug-in Builder source code?
++++++++++++++++++++++++++++++++++++++++++

**fuel-plugin-builder** is located in `fuel-plugins <https://github.com/stackforge/fuel-plugins/tree/master/fuel_plugin_builder>`_ repository.


Are there any plug-ins examples?
++++++++++++++++++++++++++++++++

The `Fuel plug-ins <https://github.com/stackforge/fuel-plugins>`_ repository has
several useful examples.

How can I reuse Puppet modules from Fuel?
+++++++++++++++++++++++++++++++++++++++++

According to the design, every plug-in should have all necessary components to be then deployed.
This means, every plug-in should have its own copy of Fuel Puppet modules.
If you do not want to keep copy of Fuel library manifests in your repository,
you can use **pre_build_hook** to download the required modules during the
plug-in build. To do that, add the following code into your hook:


.. code-block:: bash

    #!/bin/bash
    set -eux

    ROOT="$(dirname `readlink -f $0`)"
    MODULES="${ROOT}"/deployment_scripts/puppet/modules
    mkdir -p "${MODULES}"
    REPO_PATH='https://github.com/stackforge/fuel-library/tarball/f43d885914d74fbd062096763222f350f47480e1'
    RPM_REPO="${ROOT}"/repositories/centos/
    DEB_REPO="${ROOT}"/repositories/ubuntu/

    wget -qO- "${REPO_PATH}" | \
        tar -C "${MODULES}" --strip-components=3 -zxvf - \
        stackforge-fuel-library-f43d885/deployment/puppet/{inifile,stdlib}

The code then copies *inifile* and *stdlib* modules from **fuel-library** repository.

.. warning::

    To reuse existing Puppet manifests you can also specify several Puppet
    modules in your task with colon separator: for example,
    *puppet_modules: "puppet/modules:/etc/puppet/modules"*.
    Note that we do not
    recommend using this approach, because Fuel puppet modules can be changed
    during OpenStack update procedure; this can lead to compatibility failures.

How can I download the packages which are required for a plug-in?
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Use **wget** in your **pre_build_hook** script to download packages
in the required directories:

.. code-block:: bash

    #!/bin/bash
    set -eux

    ROOT="$(dirname `readlink -f $0`)"
    RPM_REPO="${ROOT}"/repositories/centos/
    DEB_REPO="${ROOT}"/repositories/ubuntu/

    wget -P "${RPM_REPO}" http://mirror.fuel-infra.org/fuel-plugins/6.0/centos/glusterfs-3.5.2-1.mira2.x86_64.rpm
    wget -P "${DEB_REPO}" http://mirror.fuel-infra.org/fuel-plugins/6.0/ubuntu/glusterfs-client_3.5.2-4_amd64.deb

It downloads two packages in your plug-in's directories before Fuel Plugin Builder starts
building repositories.

Why is there no /etc/astute.yaml file, when I run pre_deployment task?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

If you have task with "stage: pre_deployment"  parameter set, you will not find
**/etc/astute.yaml** file on the target node during the task execution.
The file **/etc/astute.yaml** is a symlink that is created before Fuel
deploys a role.

Target node can have several roles and each role contains its own file with
deployment data.

Here is the example of a node with
ID 2 and two roles, Controller and Cinder:

::

    root@node-2:~# ls -l /etc/ | grep yaml
    -rw------- 1 root     root      8712 Nov 19 12:48 controller.yaml
    -rw------- 1 root     root      8700 Nov 19 12:48 cinder.yaml

Let's assume that we need deployment data file for Controller role.

We can use '/etc/controller.yaml' file directly in deployment script.
