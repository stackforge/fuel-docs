.. _plugin-dev:

HowTo: Create a plugin
======================

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

Now you can install your plugin TODO(eli): add a link to installation
section in user guide

Detailed description of plugin structure
----------------------------------------

tasks.yaml
++++++++++

By default, Fuel plugin builder generates two tasks.
The first one runs a *deploy.sh* bash script which is located in *deployment_scripts* directory;
this task is applied only on nodes with controller role.
A second task creates '/tmp/plugin.all' file that contains 'all' text
this task is applied to all nodes with a specific role.

Each task has a 'stage' parameter which tells us when to run a particular task;
'stage' can have two values: 'post_deployment' and 'pre_deployment'.

* *post_deployment* - run task when deployment of entire environment
  is completed

* *pre_deployment* - run task when deployment is started before
  OpenStack node roles are deployed

Also, for each task you can specify execution 'timeout' in seconds, i.e.
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
`deployment_scripts/puppet/manifests/` directory and put all required modules
in `deployment_scripts/puppet/modules` directory.

* *puppet_manifest* - specify directory path
  for you manifest relative to `deployment_scripts` 

* *puppet_modules* - specify directory path
  for you modules relative to `deployment_scripts`

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
This attributes will be shown on Fuel web UI on `Settings` tab; when
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

See :ref:`fuel-plugin-dev-ui`

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
  will be shown on UI

* *description* - description for your plugin

* *version* - version of your plugin, follow this guide http://semver.org/
  for plugin versioning

* *fuel_version* - a list of comptible versions of Fuel

* *package_version* - version of plugin format, don't change it until
  you are trying to migrate your plugin to newer format

* *releases* - a list of OpenStack releases which the plugin is
  compatible with

  * *os* - a name of OpenStack release, 'ubuntu' or 'centos'

  * *version* - version of OpenStack release

  * *mode* - a list of modes which the plugin is compatible with,
    'ha' if plugin supports High Availability, 'multinode' if it
    doesn't

  * *deployment_scripts_path* - a path in your plugin directory
    where all deployment scripts for the release are placed in

  * *repository_path* - a path in your plugin directory
    where all packages for the release are placed in

Implementation details
----------------------

Installation
++++++++++++

User uploads on the master node *fuel_plugin_name-1.0.0.fp* file, the
file is 'tar.gz' archive despite the fact that it has '.fp' extension.

When user installs a plugin, he runs a command
*fuel plugins --install fuel_plugin_name-1.0.0.fp*, Fuel client
copies content of fuel_plugin_name-1.0.0.fp file to
*/var/www/nailgun/plugins/fuel_plugin_name-1.0.0* directory, then it registers
the plugin via REST API Service (Nailgun) i.e. sends POST request with content
of *metadata.yaml* to */api/v1/plugins*.

Configuration
+++++++++++++

During a new environment creation Nailgun tries to find plugins which
are compatible with the environment, then it merges contents of
*environment_config.yaml* files with base attributes of the environment.
Also for the plugins Nailgun generates groups and checkboxes on UI.

When user enables a plugin, Fuel UI sends the data to Nailgun, it
parses the request and creates relations between *Plugin* and *Cluster*
models.

Deployment
++++++++++

After environment is created and configured, user starts a deployment,
during the deployment Nailgun gets enabled plugins and parses *task.yaml*
files for them, based on found tasks Nailgun generates tasks for Orchestrator.

This tasks for Orchestrator are generated from default *tasks.yaml* file

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

Here is an example of tasks for Orchestrator when we deploy two nodes
environment, on node is Controller which has id 7, and Compute with id 8.

TODO(eli): is there a spoiler tag for rst?

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

* *pre_deployment* - has three tasks, two of them are autogenerated by nailgun
  and third is user's task from *tasks.yaml* file which was converted to
  Orchestrator format,

  * the first task adds a new repository for node, repository's path
    is built from template
    *http://{{master_ip}}:8080/plugins/{{plugin_name}}-{{plugin_version}}/{{repository_path}}*, where *master_ip* ip address of the master node, *plugin_name*
    is a plugin name, *plugin_version* is a version of the plugin,
    *repository_path* is a path which is specified for release in
    *metadata.yaml* file

  * the second tasks copies plugin's deployment scripts on the slave nodes,
    we use rsync to copy the files, path is pretty simialr to repository
    path, the diffrenece is deployment scripts path is taken from
    *deployment_scripts_path* which is in *metadata.yaml* file

* *post_deployment* - the section has only one task which was taken from
  *tasks.yaml* file, "uids" field has a single node uid to be executed
  on, because in *tasks.yaml* file the task has "role: ['controller']",
  we have only on controller with has 7th uid

* *deployment_info* - the section has regular deployment data for each node


Debugging your plugin
---------------------

TODO(eli): to be described
