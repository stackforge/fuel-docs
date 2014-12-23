
.. _hardware-rn:

Hardware support issues
=======================

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

* Not only CentOS, but also Ubuntu now
  include drivers for netFPGA devices
  See `LP1270889 <https://bugs.launchpad.net/fuel/+bug/1270889>`_.


Known Issues in Mirantis Openstack 6.0
--------------------------------------

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

Other issues
++++++++++++

* Currently, all vboxnets are created as host-only networks;
  this disables checking Internet connectivity from the deployed cluster.
  We should set a vboxnet used for a Public network as a NAT-network.
  And don't forget to check against Ubuntu, MacOS X and any modern Windows.
