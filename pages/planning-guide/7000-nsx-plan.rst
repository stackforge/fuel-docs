
.. _nsx-plan:

Preparing for VMware NSX integration
====================================

Fuel 5.1 and later can deploy a Mirantis OpenStack environment that can
manage virtual networks in VMware NSX.
VMware provides an NSX plug-in for OpenStack that enables the Neutron
service to communicate and provision virtual networks in NSX that can
manage Open vSwitches on controller and compute nodes.

.. note: Fuel 6.0 supports NSX as an Experimental Feature.
         See :ref:`experimental-features-op` for more information.

This section summarizes the planning you should do
and other steps that are required
before you attempt to deploy Mirantis OpenStack
with NSX integration.

For more information:

- See :ref:`neutron-nsx-arch` for information about how NSX support
  is implemented in Mirantis OpenStack.

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

  You must specify the same transport type on the *Settings* tab in the Fuel web UI.

* Obtain and put NSX-specific packages on the Fuel Master node

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

Cleaning up the NSX cluster
---------------------------

To cleanup the NSX cluster, log into the NSX Manager,  follow these steps:

#. Open the dashboard and click on numbered link in *Hypervisor Software Version Summary*:

   .. image:: /_images/nsx-cleanup-1.png

#. Tick all registered nodes and press *Delete Checked* button:

   .. image:: /_images/nsx-cleanup-2.png
     :width: 60%

#. Click on *Logical Layer* in the *category* column. Tick all remaining
   logical entities and remove them by pressing the corresponding *Delete
   Checked* button:

   .. image:: /_images/nsx-cleanup-3.png
     :width: 60%


Preparing for Neutron with VMware NSX plugin installation
---------------------------------------------------------

This section is dedicated to integration of Mirantis OpenStack with NSX as the networking option
and vCenter as a hypervisor.

To enable Neutron with VMware NSX plugin, you should have
the NSX cluster configured.
Once it is enabled, an NSX vSwitch should be
configured inside the ESXi hosts.

.. note:: To install NSX with KVM or QEMU hypervisor,
          see :ref:`nsx-deploy` and :ref:`Select Hypervisor for NSX<select-hyperv-nsx>`.


Installing NSX vSwitch
~~~~~~~~~~~~~~~~~~~~~~

The NSX vSwitch is a part of an SDN solution
for the VMware vSphere platform,
similar to the Standard
vSwitch and the Virtual Distributed Switch.
The NSX vSwitch needs a dedicated
physical uplink (vmnic) to connect to the upstream network.
Before proceeding to the actual installation,
ensure that you have at least one unused vmnic
interface available on all your ESXi hosts.
The NSX vSwitch is provided as
a vSphere Installation Bundle (VIB)
that needs to be installed on each ESXi
host that you plan on using.

To install NSX vSwitch, follow these steps:

#. Make sure VIB file is available to the ESXi hosts (for example, via a shared storage).

   .. image:: /_images/nsx-vswitch1.png
     :width: 50%


#. Temporarily enable SSH access to the ESXi hosts.

   .. image:: /_images/nsx-vswitch2.png
     :width: 50%

#. After you have enabled SSH access to the ESXi hosts, connect to your first ESXi host via SSH.
   Start the installation of the NSX vSwitch VIB file with
   the *esxcli software vib install --no-sig-check -v <path and filename>* command:

  ::


      ~ # esxcli software vib install --no-sig-check -v /vmfs/volumes/SiteA-IPv6-NFS/vmware-nsxvswitch-2.0.1-30494-release.vib
      Installation Result
      Message: Operation finished successfully.
      Reboot Required: false
      VIBs Installed: VMware_bootbank_vmware-nsxvswitch_2.0.1-30494
      VIBs Removed:
      VIBs Skipped:
      ~ #

4. The installation of VIB file is over. Do not shut down SSH.

Configuring the NSX vSwitch
~~~~~~~~~~~~~~~~~~~~~~~~~~~

In comparison to the Standard vSwitch and the virtual Distributed Switch installation procedure,
done via vCenter, the NSX vSwitch is configured with the CLI.

#. To configure the NSX vSwitch, connect an uplink to the switch:
   this will create an NVS bridge.

   ::

       ~ # nsxcli uplink/connect vmnic4

#. Configure the IP address for the transport endpoint. This transport
   endpoint creates overlay tunnels with other transport endpoints,
   such as Hypervisors, Gateway nodes and Service Nodes. The NSX
   vSwitch uses a separate IP stack for this:
   the VMware NSX transport endpoint has its own default gateway.
   Set the IP address of the transport endpoint with the *nsxcli uplink/set-ip <interface> <ip address> <netmask>*
   command.
   VLAN tag can also be set by putting *<vlan_id>* as an additional parameter to the command (for example, *100*).

   ::


        ~ # nsxcli uplink/set-ip vmnic4 192.168.110.123 255.255.255.0

#. Set the default gateway with the
   *nsxcli gw/set tunneling <ip address of default gateway>* command.

   ::


      ~ # nsxcli gw/set tunneling 192.168.110.121
      ~ #

#. Create a Transport-Net Bridge to which Virtual Machines will later
   connect to. The name of this bridge must be *br-int*.
   Create the NSX bridge with the following command:

   ::


      ~ # nsxcli network/add br-int br-int nsx.network manual
      success
      ~ #

#. Register the NSX vSwitch with the NSX controller.
   First, use the *nsxcli manager/set ssl:<IP address of a NSX controller node>* command
   to point the NSX vSwitch to the NSX controller. In
   the case of an NSX controller cluster, you can specify any IP address of a cluster member.

   ::


       ~ # nsxcli manager/set ssl:192.168.110.101
       ~ #


#. Extract the SSL certificate from the NSX vSwitch with
   *cat /etc/nsxvswitch/nsxvswitch-cert.pem.* command.
   Copy the text including the * —–BEGIN CERTIFICATE—– and —–END CERTIFICATE—–* line.
   You will need this text in the next step.

   .. image:: /_images/nsx-vswitch3.png
     :width: 50%

#. Do not close the SSH session yet.
   Return to the NSX Manager Dashboard.
   Within the *Summary of Transport Components* section, click on
   *Add within the Hypervisor* row.

   .. image:: /_images/nsx-vswitch4.png
     :width: 50%

#. Confirm that the pre-selected transport type is Hypervisor.

   .. image:: /_images/nsx-vswitch5.png
     :width: 50%


#. Give the hypervisor node a name; the hostname can be used here.

   .. image:: /_images/nsx-vswitch6.png
     :width: 50%

#. As the *Integration Bridge Id*, specify *br-int*.
   Leave the other values default.
   The *Tunnel Keep-alive Spray* would randomize TCP source ports for STT tunnel keep-alives
   for packet spray across active network path.

   .. image:: /_images/nsx-vswitch7.png
     :width: 50%

#. Select the Credential Type of Security Certificate and paste the previously copied certificate
   into the Security Certificate field.

   .. image:: /_images/nsx-vswitch8.png
     :width: 50%

#. Create a transport connector for
   the NSX vSwitch using STT as the transport type and the IP address that you configured a few steps earlier.

   .. image:: /_images/nsx-vswitch9.png
     :width: 50%

#. Return to the NSX Manager Dashboard: you will see the new Hypervisor within
   the *Summary of Transport Components* section on the *Hypervisors* row.
   Click on the number for active hypervisors to see more details.

   .. image:: /_images/nsx-vswitch10.png
     :width: 50%

#. You should see the ESXi host with the NSX vSwitch successfully added as a hypervisor with the Connection status as Up.

   .. image:: /_images/nsx-vswitch11.png
     :width: 50%

#. Instruct VMware NSX to export the OpenStack virtual machine virtual interface
   (*vif*) UUID as extra information besides the VMware vSphere one.
   This is necessary as OpenStack uses a different UUID than VMware vSphere does.
   Without this setting OpenStack will not recognize a virtual machine that it created for further operations via the Neutron API.
   Instruct NSX to allow custom vifs with the *nsxd --allow-custom-vifs* command.
   When asked for a username and password, enter the username and password for the ESXi host.

   ::


        ~ # nsxd --allow-custom-vifs
        2013-12-18T19:50:15Z|00001|ovs_esxd|INFO|Normal operation
        username : root
        Password:
        WARNING: can't open config file: /etc/pki/tls/openssl.cnf
        nsxd: NSXD will be restarted now.
        Killing nsxd (227588).
        2013-12-18T19:50:21Z|00001|ovs_esxd|INFO|Normal operation
        WARNING: can't open config file: /etc/pki/tls/openssl.cnf
        Starting nsxd.
        ~ #


   .. note:: You can safely ignore the warning message about the */etc/pki/tls/openssl.cnf* configuration file.

#.  Verify that the configuration change has been applied with the *nsxcli custom-vifs/show* command.
    Repeat the above steps for any additional ESX host that you want to use with this setup.

    ::


       ~ # nsxcli custom-vifs/show
      Custom-VIFs: Enabled
      ~ #


#. Return to the vSphere Web Client where you can see vmnic4 connected to the NSX vSwitch.

   .. image:: /_images/nsx-vswitch12.png
     :width: 50%

#. After you have installed and configured the NSX vSwitch on
   all Hypervisors, you can see the results in the NSX Manager Dashboard.

   .. image:: /_images/nsx-vswitch13.png
     :width: 50%


For further instructions on configuring Neutron with VMware NSX plugin in the Fuel web UI, see :ref:`vcenter-deploy`.

.. _nsx-limitations:

Limitations
-----------


- Only KVM or QEMU are supported as hypervisor options
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
              due to incompatibility of the Linux 3.13 kernel and NSX OVS 2.0.0-build30176.



