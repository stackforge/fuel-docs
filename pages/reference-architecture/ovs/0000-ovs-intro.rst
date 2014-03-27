.. raw:: pdf

   PageBreak

.. index:: Advanced Network Configuration using OVS

Advanced Network Configuration using Open VSwitch
=================================================

The Neutron networking model uses Open VSwitch (OVS) bridges and the Linux
namespaces to create a flexible network setup and to isolate
tenants from each other on L2 and L3 layers. Mirantis OpenStack also
provides a flexible network setup model based on Open VSwitch primitives,
which you can use to customize your nodes. Its most popular feature is
link aggregation. While the FuelWeb UI uses a hardcoded
per-node network model, the Fuel CLI tool allows you to modify it in your own way.

