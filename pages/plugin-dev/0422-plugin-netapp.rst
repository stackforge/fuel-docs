.. _0422-plugin-netapp:

NetApp
++++++

NetApp plug-in will replace `Cinder LVM driver <http://docs.openstack.org/juno/config-reference/content/lvm-volume-driver.html>`_.

**Requirements**

To enable NetApp plug-in for Cinder, you should check the following:

* NetApp appliance is deployed and configured.

* NetApp appliance is reachable via one of the Mirantis OpenStack networks.

.. note:: Since only one Cinder node should be deployed,
          Cinder volume is **not** highly available.

**Installation**

#. Download the plug-in from `<https://software.mirantis.com/fuel-plugins>`_.

#. Move this file to the Fuel
   Master node and install it using the following command:

   ::

        fuel plugins --install cinder_netapp-1.0.0.fp

#. After plug-in is installed, create an environment the default Cinder backend.

**Configuration**

#. Enable the plug-in on the *Settings* tab of the Fuel web UI.

   .. image:: /_images/plugins/fuel_plugin_netapp_configuration.png

#. Configure the plug-in and assign Cinder role to one of the nodes.

#. For more information on accessing Cinder NetApp functionality,
   see `the Official OpenStack documentation <http://docs.openstack.org/juno/config-reference/content/netapp-volume-driver.html>`_.