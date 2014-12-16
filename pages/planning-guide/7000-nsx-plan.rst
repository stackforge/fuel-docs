
.. _nsx-plan:

Preparing for VMware NSX integration
====================================

Fuel 5.1 and later can deploy a Mirantis OpenStack environment that can
manage virtual networks in VMware NSX.
VMware provides an NSX plug-in for OpenStack that enables the Neutron
service to communicate and provision virtual networks in NSX that can
manage Open vSwitches on controller and compute nodes.

This section summarizes the planning you should do
and other steps that are required
before you attempt to deploy Mirantis OpenStack
with NSX integration.

For more information:

- See :ref:`neutron-nsx-arch` for information about how NSX support
  is implemented in Mirantis OpenStack;

- :ref:`nsx-deploy` gives instructions for creating and deploying
  a Mirantis OpenStack environment that is integrated
  with an NSX networking backend that utilizes the NSX Neutron plug-in.

- The official VMware NSX installation guide can be found here:
  `NSX Installation and Upgrade Guide
  <http://pubs.vmware.com/NSX-6/topic/com.vmware.ICbase/PDF/nsx_6_install.pdf>`_.

- See :ref:`Limitations<nsx-limitations>` section for more details
  on compatility with other VMware components and Mirantis lab setup.

VMware NSX Installation
-----------------------

Before installing Fuel and using it
to create a Mirantis OpenStack environment
that is integrated with VMware NSX,
the VMware NSX installation must be installed and running.
Please check that you completed the following steps:


* Install NSX Controller node
* Install NSX Gateway node
* Install NSX Manager node
* Install NSX Service node (you may skip this step if you are going to test
  NSX cluster; Service nodes are mandatory for high volume traffic
  environments)

VMware NSX cluster configuration
--------------------------------

* Configure NSX Controller

        * Assign an IP address to the NSX controller.  If the controller is going
          to be placed in any of the OpenStack :ref:`logical
          networks<logical-networks-arch>` (Public, Management, Storage),
          you must assign an IP address that does not overlap
          with IP addresses that are managed by OpenStack.
          For example if the Public network
          has range 172.16.0.0/24 and addresses 172.16.0.1 -
          172.16.0.126 are managed, any IP address in the range
          172.16.0.127 - 172.16.0.254 can be used for the NSX controller.
          If the controller IP belongs to a separate network,
          there must be L3 connectivity between the Public network
          and the network where the VMware NSX controller resides.

* Configure NSX Gateway node
* Configure NSX Service node
* Create NSX cluster in NSX Manager

        * Create new cluster
        * Create new Transport Zone. You need to write down the Transport
          Zone UUID; you will use this value when
          configuring parameters on the Settings tab in the Fuel web UI.
        * Add Gateway node to the NSX cluster
        * When you add the Gateway node, you must select the Transport
          Type the Gateway node will be using.

        .. image:: /_images/user_screen_shots/nsx-gateway-transport-type.png

        * You need to write down the Transport Type you chose.
          Later, you will provide this value
          on the Settings tab in the Fuel web UI.
        * Add the L3 Gateway Service to NSX cluster.
          You need to write down the Gateway Service UUID;
          later you need to provide this value
          on the Settings tab in the Fuel web UI.

.. Attention::

  You must specify the same transport type on the Settings tab in FUEL web UI.

* Obtain and put NSX specific packages on the Fuel Master node

        * Upload NSX package archives to the Fuel Master node which has IP
          address 10.20.0.2 in this example:

          ::

          $ scp nsx-ovs-2.0.0-build30176-rhel61_x86_64.tar.gz root@10.20.0.2:
          $ scp nsx-ovs-2.0.0-build30176-ubuntu_precise_amd64.tar.gz root@10.20.0.2:

        * Go to the Fuel Master node and put the NSX packages in the
          */var/www/nailgun/* directory:

          ::

          [root@fuel ~]# mkdir /var/www/nailgun/nsx
          [root@fuel ~]# cd /var/www/nailgun/nsx
          [root@fuel nsx]# tar -xf ~/nsx-ovs-2.0.0-build30176-rhel61_x86_64.tar.gz
          [root@fuel nsx]# tar -xf ~/nsx-ovs-2.0.0-build30176-ubuntu_precise_amd64.tar.gz

        * Check out that the files are listed by web server. Open the URL
          http://10.20.0.2:8080/nsx/ in a web browser and check that the web
          server successfully lists the packages.

        * Now you can provide the URL http://10.20.0.2:8080/nsx/
          for the "URL for NSX bits" setting on the Settings tab
          in the Fuel web UI.

.. SeeAlso::

   You can read blog posts
   `NSX appliances installation  <https://www.edge-cloud.net/2013/12/openstack-with-vsphere-and-nsx-part1>`_ and `NSX cluster configuration <https://www.edge-cloud.net/2013/12/openstack-with-vsphere-and-nsx-part2>`_
   for details about the NSX cluster deployment process.

.. _nsx-limitations:

Limitations
-----------

- Only KVM or QEMU are supported as hypervisor options
  when using VMware NSX.
- Resetting or deleting the environment via "Reset" and "Delete" buttons
  on the Actions tab does not flush the entities (logical switches, routers,
  load balancers, etc) that were created in the NSX cluster.
  Eventually, the cluster may run out of resources; it is up to the cloud
  operator to remove unneeded entities from the VMware NSX cluster. Each time
  the deployment fails or is interrupted; after solving the problem, restart
  the deployment process.

.. note::    Mirantis has the following lab setup for VMware enrivonment,
             that was checked for compatibility of the NSX and vCenter:

             * NSX version 4.0.1 (4.0.1-build30244) for Gateway, Manager, Controller
               and Service nodes.

             * NSX OpenVSwitch version 2.0.0 (2.0.0-build30176)

             * vCenter 5.5. Note that vCenter 5.5.u2 is also used, but
               was not tested properly for compatibility with NSX and
               does not work with NSX 4.0.1.

             To learn more about NSX
             and vCenter compatibility,
             see `the VMware Product Interoperability Matrixes <http://www.vmware.com/resources/compatibility/sim/interop_matrix.php>`_.

.. warning::  Mirantis lab setup was tested for the Mirantis OpenStack release 6.0.
               This particular setup works properly at CentOS 6.5.
               Nevertheless, at Ubuntu 12.04 it **does not** work properly
               due to incompatibility of the Linux 3.13 kernel and NSX OVS 2.0.


To cleanup the NSX cluster, log into the NSX Manager, open the dashboard and
  click on numbered link in "Hypervisor Software Version Summary":

  .. image:: /_images/nsx-cleanup-1.png

  Tick all registered nodes and press "Delete Checked" button:

  .. image:: /_images/nsx-cleanup-2.png
    :width: 60%

  Then click on "Logical Layer" in the "category" column, tick all remaining
  logical entities and remove them by pressing the corresponding "Delete
  Checked" button:

  .. image:: /_images/nsx-cleanup-3.png
    :width: 60%
