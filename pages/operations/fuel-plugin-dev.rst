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
A second task creates '/tmp/plugin.all' file that containes 'all' text

(irina): what to you mean under *all*?;
this task is applied to all nodes with a specific role.

Each task has a 'stage' parameter which tells us when to run a particular task;
'stag' can have two values: 'post_deployment' and 'pre_deployment'.

* *post_deployment* - run task when deployment of entire environment
  is completed

* *pre_deployment* - run task when deployment is started before
  Fuel node (?) roles are deployed

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

In this file you can describe additional attributes for the cluster.
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

TODO(eli): describe all possible UI elements, probably it should be
separate page, because there are people who are intrested in such
kind of documentation not in context of plugins.
(irina) - I agree with you, let's make a separate page

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
    description: Enable to use plugin X for Neutron
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


How it works
------------

TODO(eli): to be described
(irina): how about 'a typical/example workflow' instead of 'how it works'?

Debugging your plugin
---------------------

TODO(eli): to be described
