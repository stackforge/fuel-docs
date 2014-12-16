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

.. note:: Due to the way how OVS handles GRE tunnels,
          it tries to copy DF flag to wrap GRE
          packet header, thus making it impossible
          for packets of more than 1430 bytes size
          to be transfered through regular interfaces;
          this breaks almost all applications. In Mirantis OpenStack 6.0,
          Open vSwitch agent now sets *df_inherit* flag to this option for
          OVS versions that support *df_inherit* flag.
          To avoid performance issues,
          you should extend your MTU size to a reasonable one.
          See `the Official OpenStack documentation <http://docs.openstack.org/icehouse/install-guide/install/yum/content/neutron-ml2-network-node.html>`_
          for more information and instructions.

