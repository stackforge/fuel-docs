Known Issues in Mirantis OpenStack 4.0
======================================

The Ceilometer section within Horizon is disabled by default
------------------------------------------------------------
The Ceilometer integration with Horizon in OpenStack Havana has several known
issues:

* The metering panel in Horizon requires the 'metadata_query' Ceilometer feature `that is not supported by Ceilometer with the MySQL driver <https://bugs.launchpad.net/horizon/+bug/1260528>`_.
* `Deleting the statistics tables from the resource usage page <https://review.openstack.org/#/c/60317/>`_ caused the tables to interpret some of the stats incorrectly, and in some cases it was not possible to get certain statistics. The panels with these tables have been removed from the OpenStack Havana release.

Because of these conditions, Mirantis OpenStack disables the Ceilometer section
within Horizon by default. Mirantis recommends that the customers who want to
use Ceilometer with Mirantis OpenStack 4.0 use the CLI interface for Ceilometer
instead. Once these defects are addressed, Mirantis OpenStack will re-enable this
default in a future release.

The Murano project can only be deployed if Neutron is chosen as the network type
--------------------------------------------------------------------------------
If during deployment you choose nova-network as the network type, the option
to install the Murano project will be greyed out. In this release, Murano will
only be formally supported when Neutron is chosen as the network type. This
change has been made due to a lack of customer demand for Murano support on
nova-network and to focus efforts on Neutron.

Issues with Neutron-enabled installations when using certain NIC models with VLANS
----------------------------------------------------------------------------------
Some network interface drives in kernels prior to 3.3 (RHEL, CentOS) are known
to have poor support for VLAN tagged packets moving through OpenVSwitch (OVS)
Bridges. Ubuntu is not affected by this issue. A workaround to this is to enable
VLAN Splinters in OVS. Deployments using Neutron VLANs or GRE (with VLAN tags on
the management, storage or public networks) may run into problems ranging from
poor performance, intermittent connectivity problems, one vlan but not others
working or total failure to pass traffic.

For CentOS, The Fuel UI Settings page now has the option to deploy with a VLAN
splinters workaround enabled in two separate modes--soft trunks and hard trunks.
The soft trunks mode will configure OVS to enable splinters and attempt to
automatically detect in-use VLANs. This will provide the least amount of
performance overhead but in some edge cases may result in the traffic's not
being passed onto the OVS bridge. The hard trunks mode will also configure OVS
to enable splinters but will use an explicitly defined list of all VLANs across
all interfaces. This should prevent any edge cases like those in the soft mode
but will require creation of corresponding tags on all of the interfaces. This
will introduce additional performance overhead. In the hard trunks mode, it's
recommended that you use fewer than 50 VLANs in the Neutron VLAN mode.

GRE-enabled Neutron installation run inter VM traffic through management network
--------------------------------------------------------------------------------
In all Neutron GRE installations, a physical interface is used for both OpenStack
management traffic and VM-to-VM communications. This limitation is restricted to
UI only. It is possible to use other physical interfaces when configured via the
Fuel CLI.

File injection into VMs fails on CentOS
---------------------------------------
VM creation may fail, issuing the following error::

    ERROR: Error injecting data into image
    5e9f173d-aa6f-4153-a41a-8f59c651651e (Error mounting
    /var/lib/nova/instances/c0733320-0c11-48f9-863e-b7d54e8d0812/disk with
    libguestfs (command failed: LC_ALL=C '/usr/libexec/qemu-kvm' -nographic
    -help

    errno: No such file or directory

In this situation, Nova service will fail to inject files into VM instances.
This is due to a Nova/QEMU bug that may be related to an incorrect path, but
the details of the failure have not yet been determined.

Heat, Sahara, and Murano do not configure send logs to the remote syslog
-------------------------------------------------------------------------
At the time of this release, Heat, Sahara, and Murano services do not send
logs to the remote syslog. To handle any issues with these services,
attach the corresponding logs (/var/log/murano*|/var/log/heat*|/var/log/sahara*)
from all of the nodes to the corresponding support requests and bug reports.

Ceph RadosGW might not start on all controllers
-----------------------------------------------
In the HA mode, it's possible for RadosGW services to fail to start on some
controller nodes during deployment (https://bugs.launchpad.net/fuel/+bug/1261966).
This can be fixed by manually starting the rados-gw service.

Health Check tests may fail in slow environments
------------------------------------------------
If multiple environments are deployed, or if the environments are slow,
some tests may fail due to timeouts.  Once the load on the environment is
reduced, the tests can be run again successfully.

Support for OpenStack Havana
----------------------------
The following improvements in Havana are not currently supported directly by Fuel:

* Nova Compute

 - Cells

 - Availability zones

 - Host aggregates

* Neutron (formerly Quantum)

 - Load Balancer as a Service (LBaaS)

 - Multiple L3 and DHCP agents per cloud

* Keystone

 - Multi-factor authentication

 - PKI authentication

* Swift

 - Regions

 - Adjustable replica count

 - Cross-project ACLs

* Cinder

 - Cinder-backup service

 - Support for Fibre Channel over Ethernet (FCoE)

 - Support for linux-iscsi.org (LIO) as an Internet Small Computer System Interface
   (iSCSI) backend

These capabilities are being considered for future releases of Mirantis OpenStack.

In addition, support for the High Availability of Neutron (Quantum) on RHEL is not
available due to a limitation within the RHEL kernel. This issue has been addressed
in a later version of RHEL not yet supported by Mirantis OpenStack. This issue does
not affect the CentOS or Ubuntu distributions included in the Mirantis OpenStack
hardened packages.

No ability to add new controller nodes without redeployment
-----------------------------------------------------------
New Compute and Cinder nodes can be added to an existing OpenStack environment.
However, at the moment, this capability cannot be used to deploy additional
controller nodes in the High Availability mode.

Each network type choice requires a minimum number of interfaces
Depending on your choice of network type, Mirantis OpenStack requires a minimum
number of interfaces. The minimum requirements are as follows:

+--------------------------------+----------------------------------------------+
| Network type                   | Minimum interfaces and assignments           |
+================================+==============================================+
| Nova-network                   | One interface for all networks (Admin [PXE], |
|                                | Private, Storage, Management, Public)        |
+--------------------------------+----------------------------------------------+
| Neutron with GRE Segmentation  | Two interfaces                               |
|                                |                                              |
|                                | * Admin (PXE)                                |
|                                | * Private, Storage, Management, Public       |
+--------------------------------+----------------------------------------------+
| Neutron with VLAN Segmentation | Three interfaces                             |
|                                |                                              |
|                                | * Admin (PXE)                                |
|                                | * Private                                    |
|                                | * Storage, Management, Public                |
+--------------------------------+----------------------------------------------+

   NOTE: There is a workaround for these minimum requirements that can be
   applied for advanced users who are using only the Fuel CLI Library. Please
   refer to the documentation section "Advanced Network Configuration using
   Open VSwitch" for more information.

Other limitations
-----------------
* The Fuel Master Node is installed with CentOS as the host OS. While Mirantis 
  OpenStack nodes can be installed with Ubuntu or CentOS as the host OS and RHEL-OSP
  can be installed with RHEL as the host OS, the Fuel Master Node is only supported
  on CentOS.
* When using the Fuel UI, the floating VLAN and public networks must use the same
  L2 network and L3 Subnet. In the UI, these two networks are locked together and
  can only run via the same physical interface on the server. This is due to a
  limitation in Neutron.
* Deployments done through the Fuel UI create all of the networks on all servers
  even if they are not required by a specific role (for example, a Cinder node will
  have VLANs created and addresses obtained from the public network).
* Some of OpenStack's services listen to all of the interfaces, a situation that may
  be detected and reported by third-party scanning tools not provided by Mirantis.
  Please discuss this issue with your security administrator if it is a concern for
  your organization.
* The provided scripts that enable Fuel to be automatically installed on VirtualBox
  will create separate host interfaces. If a user associates logical networks to
  different physical interfaces on different nodes, that will lead to network
  connectivity issues between OpenStack components. Please check to see if this has
  happened prior to deployment by clicking on the "Verify Networks" button on the
  Networks tab.
* When configuring disks on nodes where Ubuntu has been selected as the host OS, the
  Base System partition modifications will not be properly applied. The default Base
  System partition will be applied regardless of the user choice due to limitations
  in Ubuntu provisioning.
* The "Verify Networks" button on the Networks tab allows you to check the network
  connectivity between nodes both before deployment and on an installed environment.
  However, this verification is not available on the environments that have already
  been deployed with Neutron.
