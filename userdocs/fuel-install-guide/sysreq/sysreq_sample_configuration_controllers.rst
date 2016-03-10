.. _sysreqs_sample_target_node_config_controller:

Controller nodes
----------------

In this example, we use Ceph as a back end for ephemeral storage.
Therefore, in addition to the basic OpenStack components and a MySQL database,
controller nodes require sufficient resources to run Ceph monitors.

Each controller node must include:

+--------------+-----------------------------------+
| CPU          | 2 CPUs with at least six physical |
|              | cores each                        |
+--------------+-----------------------------------+
| RAM          | * For testing: 2 GB               |
|              | * For production:                 |
|              |                                   |
|              |   * 24 GB (minimum)               |
|              |   * 64 GB for deployments of      |
|              |     1000 VMs or more              |
+--------------+-----------------------------------+
| Network      | * For testing: 2 x 1 Gbit/s NICs  |
|              | * For production: 2 x 10 Gbit/s   |
|              |   NICs                            |
+--------------+-----------------------------------+
| Storage      | Hardware RAID 1 with at least 1 TB|
|              | formatted capacity for the host   |
|              | host operating system disk        |
|              |                                   |
|              | Larger disks may be warranted     |
|              | depending on the expected database|
|              | and log storage requirements.     |
+--------------+-----------------------------------+
