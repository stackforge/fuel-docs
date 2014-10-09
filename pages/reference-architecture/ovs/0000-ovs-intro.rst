.. raw:: pdf

   PageBreak

.. index:: Advanced Network Configuration using OVS

.. _ovs-arch:

Advanced Network Configuration using Open VSwitch
=================================================

The Neutron networking model uses Open VSwitch (OVS) bridges and the Linux
namespaces to create a flexible network setup and to isolate
tenants from each other on L2 and L3 layers. Mirantis OpenStack also
provides a flexible network setup model based on Open VSwitch primitives,
which you can use to customize your nodes. Its most popular feature is
link aggregation. While the FuelWeb UI uses a hardcoded
per-node network model, the Fuel CLI tool allows you to modify it in your own way.

.. note:: When using encapsulation protocols for network segmentation,
          take header overhead into account to avoid guest network slowdowns
          from packet fragmentation or packet rejection. With a physical host
          MTU of 1500 the maximum instance (guest) MTU is 1430 for GRE and 1392
          for VXLAN. When possible, increase MTU on the network infrastructure
          using jumbo frames. The default OpenVSwitch behavior in Mirantis
          OpenStack 6.0 and newer is to fragment packets larger than the MTU.
          In prior versions OpenVSwitch discards packets exceeding MTU.
          See `the Official OpenStack documentation <http://docs.openstack.org/icehouse/install-guide/install/yum/content/neutron-ml2-network-node.html>`_
          for more information.

