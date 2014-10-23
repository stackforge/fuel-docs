
.. _install-plugin:

Install Fuel plug-ins
=====================

What are plug-ins?
------------------

Beginning with Mirantis OpenStack 6.0,
our cloud deployment manager, Fuel,
features the ability to install plug-ins when you deploy your environment.
Plug-ins are downloadable software components that extend the functionality of your environments in a flexible, repeatable and reliable manner.  There is no need to install drivers and patches manually after Fuel deploys your cloud - plug-ins do this for you.

What can plug-ins do for me?
----------------------------

Plug-ins allow you to install and configure additional functionality for your cloud, such as additional storage types and networking functionality.   For example, a Load Balancing as a Service (LBaaS) plug-in allows you to add network load balancing functionality to your cloud so that incoming traffic can be spread across multiple nodes.  Or you might want to use a GlusterFS plug-in so that you can use a Gluster file system as backend storage for blocks (Cinder).

What kinds of plug-ins are available?
-------------------------------------

Plug-ins come in the following flavors:

* Compute - extend Nova

* Network - extend Neutron

* Storage - extend Cinder and Glance

* Operations - extend monitoring and logging

Plug-ins also fall into two categories:

* *Certified*: certified plug-ins are thoroughly reviewed, tested and supported by Mirantis.

* *Non-Certified*: non-certified plug-ins are reviewed by Mirantis, but not supported or guaranteed.

All plug-ins, both certified and non-certified are digitally signed and hosted by Mirantis.


Installing Fuel plug-ins
------------------------

Installation procedure is common for all plug-ins, but their requirements differ.

.. note:: Fuel plug-ins can be installed only before
          deploying an environment you want to use the plug-in with.

#. Copy the plug-in on already installed Fuel Master node; ssh can be used for that.
   If you do not have the Fuel Master node yet, see :ref:`virtualbox`.

   ::

         scp fuel_plugin_name-1.0.0.fp root@:master_node_ip:/tmp
         cd /tmp
         fuel plugins --install fuel_plugin_name-1.0.0.fp

#. After your environment is created, the checkbox will appear on Fuel web UI *Settings* tab.
   Use the *Settings* tab to enable and configure the plug-in and run the deployment.

.. include:: /pages/user-guide/fuel-plugins/020-fuel-plugin-ver.rst
.. include:: /pages/user-guide/fuel-plugins/030-fuel-plugin-ext.rst
