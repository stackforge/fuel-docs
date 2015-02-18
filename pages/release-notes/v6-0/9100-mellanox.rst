
.. _mellanox-rn:

Known limitations for the Mellanox SR-IOV plug-in
-------------------------------------------------

The Mellanox SR-IOV plug-in is fully integrated
into Mirantis OpenStack 6.0
but it has some known limitations:


* Instances that use SR-IOV for
  networking are created successfully,
  but taking a snapshot fails.
  To work this issue around, shut down the instance
  before taking a snapshot.
  See `LP1398986 <https://bugs.launchpad.net/bugs/1398986>`_.

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

* The *intel_iommu=on* kernel parameter is essential for Mellanox feature
  set and is automatically added to the nodes during deployments when using Mellanox.
  This parameter might cause kernel panic on hardware that does not support IOMMU.
  To work around this issue,
  add *intel_iommu=off* to the kernel parameters list on the *Settings* tab.
  See `LP1391776 <https://bugs.launchpad.net/bugs/1391776>`_.

* Mellanox provides additional information in their
  `HowTo Install Mirantis Fuel 5.1 OpenStack with Mellanox Adapters Support
  <http://community.mellanox.com/docs/DOC-1474>`_ document,
  including example images to use with the Mellanox SR-IOV plugin
  and advanced configuration instructions
  (for example, instructions to increase the number of virtual functions).
  and advanced configuration instructions.

* Deleting multiple instances on a compute node simultaneously
  might cause the host losing network connectivity. Rebooting
  the compute node will work around this. For a persistent solution please contact
  Mellanox support for upgrading the ConnectX-3 firmware version.
  See `LP1404659 <https://bugs.launchpad.net/bugs/1404659>`_.

* When you try to terminate an instance during its creation,
  the virtual function used by that instance might not
  be reused afterwards. That causes the total amount
  of available virtual functions to decline.
  To work around this issue,
  restart the eswitchd
  service on the compute node with the following command:

  ::

    service eswitchd restart

  See `LP1404661 <https://bugs.launchpad.net/bugs/1404661>`_.
