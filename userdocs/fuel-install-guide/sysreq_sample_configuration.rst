.. _sysreqs_sample_target_node_config:

Sample hardware configuration for Fuel Slave nodes
--------------------------------------------------

The example provided in this section is a general-purpose medium-size
hardware configuration that you can use for a variety of OpenStack
installations and later moderately scale to accommodate
growing requirements of your environment.

.. note::
    This example is not a best practice document of how to design an
    OpenStack environment. The purpose of the example is to help
    OpenStack administrators to understand how to plan an installation
    and demonstrate how an OpenStack environment may look.

The sample OpenStack environment includes:

+--------------------------+-----------------------------+
| Number of servers        | 12                          |
|                          | The servers include:        |
|                          |                             |
|                          | * 1 Fuel Master node        |
|                          | * 3 Controller nodes        |
|                          | * 3 Storage nodes           |
|                          | * 5 Compute nodes           |
+--------------------------+-----------------------------+
| Network                  | Neutron, using VLAN or GRE  |
|                          | topology                    |
+--------------------------+-----------------------------+
| Storage                  | Ceph as back end for Cinder |
|                          | Glance and Nova (ephemeral  |
|                          | storage)                    |
+--------------------------+-----------------------------+
| Additional Components    | No additional components.   |
|                          | If you want to install      |
|                          | Ceilometer with the MongoDB |
|                          | database, you must add three|
|                          | more servers.               |
+--------------------------+-----------------------------+
