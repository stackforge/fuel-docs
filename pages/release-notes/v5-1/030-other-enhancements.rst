Other Enhancements
==================

The minimum number of controllers for a Highly Available architecture has been eliminated
-----------------------------------------------------------------------------------------
Previously, the Highly Available architecture (also known as Multi-node HA)
required a minimum of 3 controllers for deployment.
This minimum has been eliminated in Mirantis OpenStack 5.1,
enabling the HA architecture to be deployed onto any number of controllers,
including just one.
If deployed with only one controller,
the environment is not considered highly available
(because no secondary controller is present for failover),
but controllers can be added to the environment at a later time
and will be configured properly for High Availability
in conjunction with the initially deployed controller.
In this way, a highly available environment can be scaled up
with additional controllers at any time to meet your desired level of tolerance.
The multinode option, previously used to deploy with only one controller,
will be removed in a future release.

vCenter integration has been enhanced
-------------------------------------

The ability to utilize vCenter ESXi servers as compute resources for OpenStack
was introduced in Mirnatis OpenStack 5.0.
In Mirantis OpenStack 5.1, this integration has been enhanced
in the following ways:

- Fuel can now be configured to utilize multiple vCenter clusters.
  This can be accomplished by entering multiple vCenter cluster names
  into the Cluster field in the Settings Tab,
  separating the cluster names with commas.
  with each cluster name separated by a comma.

- vCenter integration now provides high availability
  for the Nova-compute service.
  This resolves `LP1312653 <https://bugs.launchpad.net/fuel/+bug/1312653>`_.

- The compute service used to communicate with vCenter
  is now deployed on multiple controllers (if available),
  thus making the implementation highly available.

- The vCenter Virtual Machine Disk (VMDK) can be utilized
  as a back-end for Cinder
  utilizing the standard upstream VMWare VMDK Cinder driver.
  Cinder LVM is no longer supported
  as a storage option for vCenter.
  This resolves `LP1352401 <https://bugs.launchpad.net/fuel/+bug/1352401>`_.

Zabbix can be installed as a monitoring solution (experimental)
---------------------------------------------------------------

When the experimental feature group is enabled,
Mirantis OpenStack can now deploy the Zabbix solution
to monitor network and server devices as well as OpenStack services.
The Zabbix server can be selected as a role
to be deployed onto a discovered node;
Zabbix agents are automatically deployed
onto all other OpenStack nodes in the environment.

Support for SR-IOV based networking and ISER block storage over Mellanox ConnectX-3 adapter family
--------------------------------------------------------------------------------------------------

Mirantis OpenStack can now properly detect Mellanox hardware
that is installed on discovered nodes
when the experimental feature group is enabled,
This enables an operator to:

- Configure storage to work over ISER (High performance RDMA based iscsi)
- Install OFED drivers, firmware and configure SR-IOV kernel parameters
- Install and configure Mellanox SR-IOV plugin for OpenStack
  (included in ML2 plugin)
  for high performance VM links
  (included in ML2 plugin) for high performance VM links
- Test the environment utilizing Mirantis OpenStack Health Checks

Ceph distribution has been updated to Firefly
---------------------------------------------

Mirantis OpenStack 5.1 deploys the 0.80.5 version ("Firefly").
Previous versions of Mirantis OpenStack deployed the Dumpling version of Ceph.

Improvements to Pacemaker and Corosync
--------------------------------------

Structural changes have been implemented for Pacemaker and Corosync
to improve the stability, performance, and scalability
of highly available clusters.
These are detailed in  `HA Improvements of pacemaker and corosync <https://blueprints.launchpad.net/fuel/+spec/ha-pacemaker-improvements>`_.
This resolves `LP1283062 <https://bugs.launchpad.net/fuel/+bug/1283062>`_
and `LP1312627 <https://bugs.launchpad.net/fuel/+bug/1312627>`_,
and other issues.

All upstream neutron packages are included in the 5.1 ISO file
--------------------------------------------------------------

These packages are made available as a convenience;
Mirantis does not fully support these packages
or guarantee that they work.
A comparable set of packages are provided on the mirrors
for the 5.0.1 and 4.1.x releases of Mirantis OpenStack.

Additional information
----------------------
Information about additional implemented improvements
(also known as blueprints)
can be found on the
`Fuel Project 5.1 milestone page <https://launchpad.net/fuel/+milestone/5.1>`_.


