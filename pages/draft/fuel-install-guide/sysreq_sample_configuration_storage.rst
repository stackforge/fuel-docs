.. _sysreqs_sample_target_node_config:

Storage nodes (3)
~~~~~~~~~~~~~~~~~

We recommend separate Ceph nodes for scalability and robustness.
The hardware estimate is based on the requirement of .5 cores per Ceph-OSD CPU
and 1GB of RAM per 1 TB of Ceph-OSD space. All Ceph storage and journal hard
disks can be configured in JBOD (Just a Bunch of Disks) mode on the RAID
controller, or can be plugged into free MB ports.

For production installations, set the Ceph object replication factor to 3 or more
see :ref:`settings-storage-ug`.¬

A storage node configuration must include:

+------------------------+---------------------------------+
| CPU                    | Single-socket CPU with at least |
|                        | 4 physical cores.               |
+------------------------+---------------------------------+
| RAM                    | 24 GB.                          |
+------------------------+---------------------------------+
| Storage                | RAID 1 Controller with at least |
|                        | 500GB capacity for the host     |
|                        | operating system disk.          |
+------------------------+---------------------------------+
| Network                | For testing: 2 x 1 Gbit/s NICs  |
|                        | For production: 2 x 10 Gbit/s   |
|                        | NICs.                           |
+------------------------+---------------------------------+
| Storage                | * 18 TB for Ceph storage        |
|                        |   (6 x 3 TB)                    |
|                        | * 1-2 x 64 GB SSDs or more, for |
|                        |   the Ceph journal.             |
+------------------------+---------------------------------+

