.. _sysreqs_sample_target_node_config:

Sample Hardware Configuration for Target Nodes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The example provided in this section is a general-purpose medium-size
hardware configuration that you can use for a variety of OpenStack
installations and that you can later moderaly scale to accommodate
growing requirements of your environment.

.. note::
    This example is not a best pracice document of how to design an
    OpenStack environment. The purpose of the examples is to help the
    OpenStack administrator to understand how to plan an installation
    and demonstrate how an OpenStack environment may look.

The sample general-purpose medium-size highly-available OpenStack environment
includes:

+--------------------------+-----------------------------+
| Number of servers        | 12.                         |
|                          | The servers include:        |
|                          |                             |
|                          | * 1 Fuel Master node        |
|                          | * 3 Controller nodes        |
|                          | * 3 Storage nodes           |
|                          | * 5 Compute nodes           |
+--------------------------+-----------------------------+
| Network                  | Neutron, using VLAN or GRE  |
|                          | topology.                   |
+--------------------------+-----------------------------+
| Storage                  | Ceph as backend for Cinder  |
|                          | Glance, and Nova (ephemeral |
|                          | storage).                   |
+--------------------------+-----------------------------+
| Additional Components    | None.                       |
|                          | If you want to install      |
|                          | Ceilometer with the MongoDB |
|                          | database, three more servers|
|                          | are required.               |
+--------------------------+-----------------------------+
