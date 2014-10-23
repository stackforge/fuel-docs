.. _plugin-dev:

HowTo: Create a plugin
======================

Fuel 6.0 supports a pluggable architecture	that allows new functionality to be added to
:ref:`Neutron<neutron-term>` and :ref:`Cinder<cinder-term>`	in a self-contained archive.	29

			

Preparing environment for plugin development
---------------------------------------------

To prepare your environment for development, follow these steps:

1.  If you have Ubuntu 12.04.2 LTS, perform:
 
::

        sudo apt-get install createrepo rpm dpkg-dev
         
         
If you have Centos 6.5, perform:

::


      yum install createrepo rpm dpkg-devel
      
2. Install Fuel plugin builder. To do that, follow these steps:

* Clone https://github.com/stackforge/fuel-plugins.git repo:

::

        https://github.com/stackforge/fuel-plugins.git


* Navigate to fuel-plugins directory:

::

        cd fuel-plugins

* Apply https://review.openstack.org/#/c/129649/ patch: 

::

        git fetch https://evgeniyl@review.openstack.org/stackforge/fuel-plugins refs/changes/49/129649/6 && git checkout FETCH_HEAD


* Install Fuel plugin builder:

::

        cd fuel_plugin_builder/
        python setup.py develop

Creating your plugin
--------------------

To create your Fuel plugin, follow these steps:

1. Generate the structuregit@github.com:stackforge/fuel-plugins.git:

::

        fpb --create fuel_plugin_example

2. Structuregit has the following components:

* Deployment_scripts - used to add your bash scripts or puppet manifests

* Environment_config.yaml - used to change settings for your plugin

* Repositories - used to add your packages for Ubuntu or CentOS

* Tasks.yaml - used to specify when, where and how to run your tasks

Note, that it is not required to change the following files:

* pre_build_hook

* metadata.yaml

* install

* register_plugin.py

3. Build your plugin:

::

        cd fuel_<plugin_example_name>
        <plugin_example_name> --build

Preparing Fuel Master node
--------------------------

To prepare Fuel Master node, follow these steps:

1. Download an iso at http://jenkins-product.srt.mirantis.net:8080/view/custom_iso/job/custom_6_0_iso/107/

2. Install the iso.

3. Copy your plugin on the Master node into /tmp directory:

::

       tar vxf fuel_<plugin_example-0.1.0.fp>
       cd fuel_<plugin_example-0.1.0>/

4. Install the plugin on Fuel Master node:

::

       ./install


5. After your environment is created and deployed, you will be able to see the checkbox on Settings tab.
Use the Settings tab to enable and configure the plugin and run deployment.







