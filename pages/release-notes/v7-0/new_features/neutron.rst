Neutron-related features
++++++++++++++++++++++++

* Neutron Distributed Virtual Router (DVR). Neutron DVR significantly
  increases performance and eliminates a single point of failure. For
  more information, see :ref:`Neutron with DVR <neutron-dvr-ref-arch>`.

* Networking options have been amended from VLAN and GRE to VLAN and
  tunneling. The default tunnel protocol has been changed to VXLAN.

* Now, you can deploy Neutron with ``gre`` along with ``vxlan``
  segmentation type. ``gre`` is still available in Fuel CLI as a usual
  option, but it is deprecated.