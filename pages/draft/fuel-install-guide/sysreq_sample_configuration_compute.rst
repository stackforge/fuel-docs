.. _sysreqs_sample_target_node_config_controller:

Compute nodes
-------------

Your virtual machines are hosted on the compute nodes, therfore
you must allocate enough resources to run these virtuel machines.

Each compute node must include:

+---------------+--------------------------------+
| CPU           | Dual-socket CPU with a minimum |
|               | of 4 cores per socket.         |
+---------------+--------------------------------+
| RAM           | 64 GB.                         |
+---------------+--------------------------------+
| Storage       | Hardware RAID 1 controller with|
|               | at least 500 GB capacity for   |
|               | the host operating system disk.|
+---------------+--------------------------------+
| Network       | For testing: 2 x 1 Gbit/s NICs.|
|               | For production: 2 x 10 Gbit/s  |
|               | NICs.                          |
+---------------+--------------------------------+
