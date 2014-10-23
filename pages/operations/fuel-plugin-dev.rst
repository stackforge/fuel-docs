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

1. Generate plugin structure

::

        fpb --create fuel_plugin_name

2. Here is a structure of your plugin

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


* `deployment_scripts` - directory where you can add your bash script or puppet manifests

* `environment_config.yaml` - define plugin specific parameters, which user can configure on UI settings tab

* `repositories` - add ubuntu or centos packages which are required for your plugin

* `tasks.yaml` - used to specify when, where and how to run your scripts

3. Build your plugin:

::

       fpb --build fuel_plugin_name/

After your plugin is built, you can see it in your plugin's directory
for example `fuel_plugin_name/fuel_plugin_name-0.1.0.fp`

Installing your plugin
----------------------

1. Install newer version of Fuel (6.0 or newer)
  TODO(eli): here should be a link on the instruction
  how to setup env with virtualbox scripts
2. Copy plugin on the master node, you can us ssh

::

       scp fuel_plugin_name-0.1.0.fp root@:master_node_ip:/tmp
       cd /tmp
       fuel plugins --install fuel_plugin_name-0.1.0.fp

3. After your environment is created, you will be able to see the checkbox on Settings tab.
Use the Settings tab to enable and configure the plugin and run deployment.

Debugging your plugin
-------------------

TODO(eli): to be described
