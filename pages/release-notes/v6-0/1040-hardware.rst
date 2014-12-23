
.. _hardware-rn:

Hardware support issues
=======================

New Features and Resolved Issues in 6.0
---------------------------------------

* Now both CentOS and Ubuntu include drivers for
  NetFPGA devices
  See `LP1270889 <https://bugs.launchpad.net/fuel/+bug/1270889>`_.

Known Issues in 6.0
-------------------

Ubuntu does not support NetFPGA cards
+++++++++++++++++++++++++++++++++++++

CentOS includes drivers for netFPGA devices
but Ubuntu does not.
See `LP1270889 <https://bugs.launchpad.net/fuel/+bug/1270889>`_.

CentOS issues using Neutron-enabled installations with VLANS
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Deployments using CentOS may run into problems
using Neutron VLANs or GRE
(with VLAN tags on the management, storage or public networks).
The problems include poor performance, intermittent connectivity problems,
one VLAN but not others working, or total failure to pass traffic.
This is because the CentOS kernel is based on a pre-3.3 kernel
and so has poor support for VLAN tagged packets
moving through :ref:`ovs-term`  Bridges.
Ubuntu is not affected by this issue.
Fuel provides configuration options
to alleviate problems using VLANs on CentOS;
see :ref:`vlan-splinters-ug`.

HP BL120/320 RAID controller line is not supported
++++++++++++++++++++++++++++++++++++++++++++++++++

You should contact Mirantis to get a non-standard kernel ISO.
Note that it is impossible to update the kernel if there are no drivers for this
version. This happens because the source code for the hpvsa module is not open and
HP publishes the hpvsa binaries only for specific kernel versions.
They do not always coincide with the ones used in Fuel with Ubuntu.
Currently, no equipment for testing is available and the testing itself can not
be performed due to closed HP VSA source code. ISO may be assembled only for kernel
versions specified by HP. See `LP1359331 <https://bugs.launchpad.net/bugs/1359331>`_.
For information about kernel modules that are compiled for specific kernel versions,
see `HP storage <https://launchpad.net/~hp-iss-team/+archive/ubuntu/hp-storage>`_ and
`hpvsa update <https://launchpad.net/~hp-iss-team/+archive/ubuntu/hpvsa-update>`_.

RAID-1 spans all configured disks on a node
+++++++++++++++++++++++++++++++++++++++++++

RAID-1 spans all configured disks on a node,
putting a boot partition on each disk
because OpenStack does not have access to the BIOS.
It is not currently possible to exclude some drives
from the Fuel configuration on the Fuel UI.
This means that one cannot, for example,
configure some drives to be used for backup and recover
or as b-cache.
A work-around is described in :ref:`exclude-from-raid`.
See `LP1258347 <https://bugs.launchpad.net/fuel/+bug/1258347>`_.

Other issues
++++++++++++

* Large number of disks may fail Ubuntu installation.
  See `LP1340414 <https://bugs.launchpad.net/bugs/1340414>`_.

* Currently, all vboxnets are created as host-only networks;
  this disables checking Internet connectivity from the deployed cluster.
  We should set a vboxnet used for a Public network as a NAT-network.
  And don't forget to check against Ubuntu, MacOS X and any modern Windows.
