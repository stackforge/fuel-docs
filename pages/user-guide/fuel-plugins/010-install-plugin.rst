
.. _install-plugin:

Install Fuel plug-ins
=====================

Beginning with Mirantis OpenStack 6.0,
Fuel features the ability to install plug-ins before you deploy your environment.
Fuel plug-ins are downloadable software components that extend the functionality of your environments in a flexible, repeatable and reliable manner.

For example, :ref:`Neutron LBaaS<plugin-lbaas>` plug-in for Fuel provides Load-Balancing-as-a-Service for Neutron.

Fuel plug-ins fall into two categories:

* *Certified*: certified plug-ins are thoroughly reviewed, tested and supported by Mirantis.

* *Non-Certified*: non-certified plug-ins are reviewed by Mirantis, but not supported or guaranteed.

All Fuel plug-ins, both certified and non-certified are digitally signed and hosted by Mirantis.


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
