.. _sysreqs_sample_target_node_config_controller:

Controller nodes
~~~~~~~~~~~~~~~~

In addition to the basic OpenStack components such as Nova, Neutron, Cinder, and
Glance, controller nodes require sufficient resources to run Ceph
monitors and a MySQL database.

Each controller node must have:

+--------------+-----------------------------------+
| CPU          | 2 CPUs with at least six physical |
|              | cores each.                       |
+--------------+-----------------------------------+
| RAM          | * For testing: 2 GB               |
|              | * For production:                 |
|              |   * 24 GB (minimum)               |
|              |   * 64 GB for deployments of      |
|              |     1000 VMs or more              |
+--------------+-----------------------------------+
| Network      | For testing: 2 x 1 Gbit/s NICs    |
|              | For production: 2 x 10 Gbit/s NICs|
+--------------+-----------------------------------+
| Storage      | Hardware RAID 1 with at least 1 TB|
|              | formatted capacity for the host   |
|              | host operating system disk.       |
|              |                                   |
|              | Larger disks may be warranted     |
|              | depending on the expected database|
|              | and log storage requirements.     |
+--------------+-----------------------------------+
