.. _032-plugin-netapp:

NetApp
++++++

NetApp plug-in will replace LVM Cinder driver.

**Requirements**

Note that to enable NetApp plug-in for Cinder, you should check the following:

* NetApp aplience is deployed and configured.

* NetApp aplience is reachable via one of the Mirantis OpenStack networks.

You should also take into consideration the following:
since only one Cinder node should be deployed,
Cinder volume is not highly available.

**Installation**

1. Download the plug-in from TODO: <link>.

2. Move this file to the Fuel
   Master node and install it using the following command:

   ::

        fuel plugins --install cinder_netapp-1.0.0.fp

#. After plug-in is installed, create an environment the default Cinder backend.

**Configuration**

1. Enable the plug-in on the *Settings* tab of the Fuel web UI.

.. image:: /_images/fuel-plugin-netapp-configuration.png

2. Configure the plug-in and assign Cinder role to one of the nodes.

For more information on accessing Cinder NetApp functionality, see `the Official OpenStack documentation <http://docs.openstack.org/juno/config-reference/content/netapp-volume-driver.html>`_.