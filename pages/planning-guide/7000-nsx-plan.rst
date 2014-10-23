
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

VMware NSX Installation
-----------------------

Before installing Fuel and using it
to create a Mirantis OpenStack environment
that is integrated with VMware NSX,
the VMware NSX installation must be up and running.
Please check that you completed the following steps:


* Install NSX Controller node
* Install NSX Gateway node
* Install NSX Manager node
* Install NSX Service node

.. note:: According to VMware documentation, an NSX cluster can operate
          successfully without an NSX Service node, but its presence is
          mandatory for deploying Mirantis OpenStack. Support of NSX clusters
          without a Service node might appear in future versions of Fuel.

VMware NSX cluster configuration
--------------------------------

* Configure NSX Controller

        * Assign IP address to NSX controller.  If the controller is going
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

Preparing for Neutron with VMware NSX plugin installation
---------------------------------------------------------

The NSX vSwitch is a virtual switch
for the VMware vSphere platform,
similar to its brothers the Standard
vSwitch and the Virtual Distributed Switch.
The NSX vSwitch needs a dedicated
physical uplink (vmnic) to connect to the upstream network.
Before proceeding to the actual installation,
ensure that you have a vmnic interface available on all your ESXi hosts.

Installing NSX vSwitch
~~~~~~~~~~~~~~~~~~~~~~

The NSX vSwitch is provided as
a vSphere Installation Bundle (VIB)
that needs to be installed on each ESXi
hosts that you plan on using.

To enable NSX vSwitch, follow these steps:

1. In esxcli, install the NSX vSwitch vib file:

::


      ~ # esxcli software vib install --no-sig-check -v /tmp/vmware-  nsxvswitch-2.1.3-35984-prod2013-stage-release.vib
     Installation Result
     Message: Operation finished successfully.
     Reboot Required: false
     VIBs Installed: VMware_bootbank_vmware-nsxvswitch_2.1.3-35984
     VIBs Removed:
     VIBs Skipped:
     ~ #
     ~ # esxcli software vib list | grep nsx
     vmware-nsxvswitch              2.1.3-35984                           VMware  VMwareCertified   2014-07-13
    ~ #

2. Make sure that a new vSwitch has been created on the ESXi host:

::


     ~ # esxcfg-vswitch -l
    Switch Name      Num Ports   Used Ports  Configured Ports  MTU     Uplinks
    vSwitch0         1536        7           128               1500    vmnic0,vmnic1

    PortGroup Name        VLAN ID  Used Ports  Uplinks
    vMotion               0        1           vmnic0,vmnic1
    Management Network    0        1           vmnic0,vmnic1

    Switch Name      Num Ports   Used Ports  Configured Ports  MTU     Uplinks
    vSwitch1         1536        6           128               1500    vmnic2,vmnic3

    PortGroup Name        VLAN ID  Used Ports  Uplinks
    vsan                  0        1           vmnic2,vmnic3

   Switch Name      Num Ports   Used Ports  Uplinks
   nsx-vswitch      1536        1

   ~ #

Configuring the NSX vSwitch
~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. To configure the NSX vSwitch, connect an uplink to the switch;
   this will create an NVS bridge.

::

    nsxcli uplink/connect vmnic4

2. Set an IP address for the uplink.
   The specified IP address will then be used to create the transport tunneling endpoint while connecting the ESXi as a transport node to NSX. 
   VLAN tag can also be set by adding *vlan<vlan_id>* as an additional parameter to the command.

::


     nsxcli uplink/set-ip vmnic4 192.168.110.123 255.255.255.0

3. Check that the bridge is properly configured.
   To do that, use *nsxcli port/show* command, so that the bridge and nsxcli uplink/show for the uplink is verified.

::


    ~ # nsxcli port/show
    br-int:
    -------

    br-vmnic4:
    ----------
   vmnic4
   vmk3

   ~ #

4. In the *uplink/show* command output, search for the similar entry.

::


    ==============================
    vmnic4:
    MAC       : 00:50:56:01:08:ca
    Link      : Up
    MTU       : 1500
    IP config :
    ------------------------------
    VMK intf  : vmk3
    MAC addr  : 00:50:56:6b:ca:dd
    Services  : NSX-Tunneling
    VLAN      : 0
    IP        : 192.168.110.123(Static)
    Mask      : 255.255.255.0(Static)
    ..............................
    ------------------------------
    Connection : NVS (uplink0)
    Configured as standalone interface
    ==============================

The status of the vmkernel interface can also be checked via esxcli and with nsxcli.

::


     ~ # esxcli network ip interface ipv4 get -i vmk3
     Name  IPv4 Address     IPv4 Netmask   IPv4 Broadcast   Address Type  DHCP DNS
     ----  ---------------  -------------  ---------------  ------------  --------
     vmk3  192.168.110.123  255.255.255.0  192.168.110.255  STATIC           false
     ~ #
     ~ # nsxcli vmknic/show vmk3
     vmk3:
     MAC addr  : 00:50:56:6b:ca:dd
     Services  : NSX-Tunneling
     VLAN      : 0
     IP        : 192.168.110.123(Static)
     Mask      : 255.255.255.0(Static)
    Assoc with: vmnic4
   ..............................
   ~ #

5. Configure the gateway for the NSX vSwitch.

::

    ~ # nsxcli gw/set tunneling 192.168.110.2
    ~ #
    ~ # nsxcli gw/show tunneling
    Tunneling:
    Configured default gateway       : 192.168.110.2
    Currently active default gateway : 192.168.110.2 (Manual)
    ~ #

6. Connect the NSX vSwitch instance to the NSX controller cluster.

::


     ~ # nsxcli manager/set ssl:192.168.110.31
     ~ #
     ~ # nsx-dbctl show
    e42912a7-693f-43ee-84d5-11b5bb3491eb
    Manager "ssl:192.168.110.31:6632"
    Bridge br-int
    fail_mode: secure
    Bridge "br-vmnic4"
    fail_mode: standalone
    Port "vmk3"
    Interface "vmk3"
    Port "vmnic4"
    Interface "vmnic4"
    ovs_version: "2.1.3.35984"
    ~ #


7. Create an opaque network that will serve as a transport bridge providing the network backend for
   the virtual machines.
   [clear up]
   Opaque networks must be identified during its creation based on its type and ID.
   The ESXi will be added later to a cluster, acting as nova-compute backend for the deployed
   OpenStack environment
   The network type must be specified as *nsx.network*; the UUID must match the
   configured one [network?] for the *integration_bridge* setting
   in *nova.conf* file. The port attach mode should also be configured.
   For OpenStack environments this can me done via *manual* command.

::


    ~ # nsxcli network/add NSX-Bridge NSX-Bridge nsx.network manual
    success
    ~ #
    ~ # nsxcli network/show
   UUID                                        Name                    Type            Mode
   ----                                        ----                    ----            ----
   NSX-Bridge                                  NSX-Bridge              nsx.network     manual
   ~ #


Adding ESXi as transport node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Add the created ESXi server as a transport node to NSX.
   Log into the NSX Manager web UI and initiate the wizard to add a new hypervisor.
   Specify the name of the new hypervisor.

.. image:: /_images/vCenter/1.vcenter-nsx.png
  :width: 50%

2. Set the integration bridge for this hypervisor.

.. image:: /_images/vCenter/2.vcenter-nsx.png
  :width: 50%

3. As a credential type, select *Security Certificate* and paste the NSX vSwitch SSL certificate.
   The certificate can be retrieved from */etc/nsxvswitch/nsxvswitch-cert.pem* folder.

.. image:: /_images/vCenter/3.vcenter-nsx.png
  :width: 50%

4. Add an SST transport connector, using the IP address configured for the uplink.

.. image:: /_images/vCenter/4.vcenter-nsx.png
  :width: 50%

5. Click *Save & View* button and check the new hypervisor configuration in NSX.

.. image:: /_images/vCenter/5.vcenter-nsx.png
  :width: 50%

For further instructions on configuring Neutron with VMware NSX plugin in Fuel Web UI, see :ref:`vcenter-deploy`.

Limitations
-----------
- Only KVM or QEMU are supported as hypervisor options
  when using VMware NSX.
- Only VMware NSX 4.0 is supported
- Resetting or deleting the environment via "Reset" and "Delete" buttons
  on the Actions tab does not flush the entities (logical switches, routers,
  load balancers, etc) that were created in the NSX cluster.
  Eventually, the cluster may run out of resources; it is up to the cloud
  operator to remove unneeded entities from the VMware NSX cluster. Each time
  the deployment fails or is interrupted; after solving the problem, restart
  the deployment process.

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
