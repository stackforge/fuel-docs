
.. _mellanox-rn:

Mellanox SR-IOV plug-in
=======================

Known limitations for the Mellanox SR-IOV plug-in
-------------------------------------------------

The Mellanox SR-IOV plug-in is fully integrated
into Mirantis OpenStack 5.1
but it has some known limitations:

* The Mellanox SR-IOV plugin has been tested
  against guest images of the following Linux distributions:

  - CentOS 6.4 with kernel 2.6.32-358.el6.x86
  - Ubuntu 13.10 with kernel 3.11.0-26-generic

* By default, up to 16 virtual functions (VFs) can be configured.
  To use more VFs in the compute nodes,
  you must make additional configuration changes manually
  or through a script.

* 3rd party adapters based on the Mellanox chipset may not have SR-IOV enabled
  by default. In such a case, please contact the device manufacturer for
  configuration instructions and for the required firmware.

* Mellanox OEM adapter cards may be burned with SR-IOV disabled.
  In such cases,
  you may need to burn a special firmware version
  to enable SR-IOV.

* External network is not configured when changing the ML2 mechanism
  to Mellanox and Open vSwitch.
  When installing Centos HA with Neutron with VLAN
  and changing the ML2 mechanism to Mellanox and Open vSwitch,
  the external network is not configured after deployment.
  See `LP1369988 <https://bugs.launchpad.net/bugs/1369988>`_.

* Mellanox provides additional information in their
  `HowTo Install Mirantis Fuel 5.1 OpenStack with Mellanox Adapters Support
  <http://community.mellanox.com/docs/DOC-1474>`_ document,
  including example images to use with the Mellanox SR-IOV plugin
  and advanced configuration instructions
  (for example, instructions to increase the number of virtual functions).
  and advanced configuration instructions.

