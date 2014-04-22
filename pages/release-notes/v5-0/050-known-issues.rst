Known Issues in Mirantis OpenStack 5.0
======================================

TODO: Move fixed bugs from this list to "Resolved issues"
as appropriate

Murano OSTF test for Linux Apache Service fails
-----------------------------------------------

The Murano OSTF test for the Linux Apache service fails with an AssertionError.
See `LP1271089 <https://bugs.launchpad.net/fuel/+bug/1271089>`_.


Savanna does not write logs unless "OpenStack debug logging" is selected
------------------------------------------------------------------------

Savanna does not write logs unless you select "OpenStack debug logging" in the Fuel settings.
When debug logging is not selected,
the */var/log/savanna-all.log* file
contains only log records from the external modules;
it does not contain logs from Savanna itself.
An example of a log from an external module is:

::

  savanna-savanna.openstack.common.db.sqlalchemy.session
  WARNING: Got mysql server has gone away: (2006, 'MySQL server has gone away')

See `LP1285766 <https://bugs.launchpad.net/fuel/+bug/1285766>`_.

As a work around, edit the  */etc/savanna/savanna.conf* file
and delete (or comment) the following lines from the [DEFAULT] section:

::

  use_syslog=True
  use_stderr=False
  syslog_log_facility=LOG_LOCAL0
  log_config=/etc/savanna/logging.conf

Then add the following line to the [DEFAULT] section:

::

  log_dir=/var/log/savanna


Enabling "Open Stack debug logs" does not enable debug logs for Savanna
-----------------------------------------------------------------------

Enabling the "OpenStack debug logs" checkbox in the Fuel settings
enables INFO level logging but does not enable DEBUG level logging.
See `LP 1288475 <https://bugs.launchpad.net/fuel/+bug/1288475>`_.

You can enable debug logging for Savanna
by editing the  */etc/savanna/savanna.conf* file
and adding the following line to the [DEFAULT] section:

::

  debug=TRUE


CentOS issues using Neutron-enabled installations with VLANS
------------------------------------------------------------

Deployments using CentOS may run into problems
using Neutron VLANs or GRE (with VLAN tags on the management, storage or public networks).
The problems include poor performance, intermittent connectivity problems,
one VLAN but not others working, or total failure to pass traffic.
This is because the CentOS kernel is based on a pre-3.3 kernel
and so has poor support for VLAN tagged packets moving through OpenVSwitch (OVS) Bridges.
Ubuntu is not affected by this issue.

A workaround is to enable VLAN Splinters in OVS.
For CentOS, The Fuel UI Settings page can now deploy
with a VLAN splinters workaround enabled in two separate modes -- soft trunks and hard trunks:

*  The **soft trunks mode** configures OVS to enable splinters
   and attempts to automatically detect in-use VLANs.
   This provides the least amount of performance overhead
   but the traffic may not be passed onto the OVS bridge in some edge cases.

*  The **hard trunks mode** also configureS OVS to enable splinters
   but useS an explicitly defined list of all VLANs across all interfaces.
   This should prevent the occasional failures associated with the soft mode
   but requires that corresponding tags be created on all of the interfaces.
   This introduces additional performance overhead.
   In the hard trunks mode,  you should use fewer than 50 VLANs in the Neutron VLAN mode.

See `Advanced Network Configuration using Open VSwitch <http://docs.mirantis.com/fuel/fuel-4.1/reference-architecture.html?highlight=vlan%20splinters#advanced-network-configuration-using-open-vswitch>`_
for more information about using Open VSwitch..

GRE-enabled Neutron installation runs inter VM traffic through management network
---------------------------------------------------------------------------------

In all Neutron GRE installations,
a physical interface is used for both OpenStack management traffic and VM-to-VM communications.
This limitation is restricted to the UI only.
It is possible to use other physical interfaces when configured via the Fuel CLI.
See `LP 1285059 <https://bugs.launchpad.net/fuel/+bug/1285059>`_.

File injection into VMs fails on CentOS
---------------------------------------

VM creation may fail, issuing the following error:

::

  ERROR: Error injecting data into image 5e9f173d-aa6f-4153-a41a-8f59c651651e
  (Error mounting /var/lib/nova/instances/c0733320-0c11-48f9-863e-b7d54e8d0812/disk with libguestfs
  (command failed: LC_ALL=C '/usr/libexec/qemu-kvm' -nographic -help
  errno: No such file or directory

In this situation, the Nova service fails to inject files into VM instances.
This is due to a Nova/QEMU bug that may be related to an incorrect path,
but the details of the failure have not yet been determined.

Ceph RadosGW might not start on all controllers
-----------------------------------------------

In HA mode, RadosGW services may fail on some controller nodes during deployment
This can be fixed by manually starting the rados-gw service.
See `LP1261955 <https://bugs.launchpad.net/fuel/+bug/1261966>`_.

Health Check tests may fail in slow environments
------------------------------------------------

If multiple environments are deployed or if the environments are slow,
some tests may fail due to timeouts.
Reducing the load on the environment allows the tests to run successfully.

Placing Ceph OSD on Controller nodes is not recommended
-------------------------------------------------------

Placing Ceph OSD on Controllers is highly unadvisable because it can severely
degrade controller's performance. It's better to use separate storage nodes
if you have enough hardware.

VMs that have ephemeral volumes stored in Ceph backend must be migrated from the command line
---------------------------------------------------------------------------------------------

Use the “nova live-migration” command to migrate such VMs.
Using the “Migrate instance” button in Horizon or the “nova migrate” command line
for such instances causes the migration to fail.
The Nova Compute non-live migration process assumes
that all image backends store ephemeral drives in a filesystem path on a compute host,
which is not the case for Ceph RBD.
Live migrations do not exhibit this behavior and work correctly with Ceph RBD.
Because the Horizon Dashboard in Havana does not support live migrations,
you must use the command line.

Other limitations
-----------------

* The Fuel Master Node can only be installed with CentOS as the host OS.
  While Mirantis OpenStack nodes can be installed with Ubuntu or CentOS as the host OS,
  the Fuel Master Node is only supported on CentOS.

* When using the Fuel UI, the floating VLAN and public networks
  must use the same L2 network and L3 Subnet.
  In the UI, these two networks are locked together
  and can only run via the same physical interface on the server.
  This is due to a limitation in Neutron.

* The Admin(PXE) network cannot be assigned to a bonded interface.
  When implementing bonding, at least three NICs are required:
  two for the bonding plus one for the Admin(PXE) network,
  which cannot reside on the bond and cannot be moved.

* Murano is supported only when Neutron is chosen as the network type;
  if you choose nova-network as the network type during deployment,
  the option to install the Murano project is greyed out.
  This change has been made due to a lack of customer demand
  for Murano support on nova-network and to focus efforts on Neutron.

* The ceph-mon and ceph-osd nodes should not be deployed on the same hardware.

* Deployments done through the Fuel UI create all of the networks on all servers
  even if they are not required by a specific role.
  For example, a Cinder node has VLANs created and addresses obtained from the public network.

* Some of OpenStack’s services listen to all of the interfaces,
  a situation that may be detected and reported by third-party scanning tools not provided by Mirantis.
  Please discuss this issue with your security administrator if it is a concern for your organization.

* The provided scripts that enable Fuel to be automatically installed on VirtualBox
  will create separate host interfaces.
  If a user associates logical networks to different physical interfaces on different nodes,
  that will lead to network connectivity issues between OpenStack components.
  Please check to see if this has happened prior to deployment
  by clicking on the “Verify Networks” button on the Networks tab.

* When configuring disks on nodes where Ubuntu has been selected as the host OS,
  the Base System partition modifications are not properly applied.
  The default Base System partition will be applied regardless of the user choice
  due to limitations in Ubuntu provisioning.

* The “Verify Networks” button on the Networks tab
  allows you to check the network connectivity between nodes
  both before deployment and on an installed environment.
  However, this verification is not available on the environments
  that have already been deployed with Neutron.
