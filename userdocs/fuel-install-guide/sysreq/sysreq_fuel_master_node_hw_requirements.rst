.. _sysreq_master_node_hardware_recs:

Fuel Master node hardware requirements
--------------------------------------

When planning hardware for the Fuel Master node, verify that your hardware
meets the following minimum requirements:

For a production environment:

* Quad-core CPU
* 4 GB RAM
* 10 Gigabit network port
* Disk size depends on the number of deployed nodes. All nodes send logs
  to the Fuel Master node using rsyslog. During installation, Fuel creates
  a separate partition for ``/var`` to store the remote logs and allocates 40%
  of the disk size to it. Our recommendation for the remote logs partition
  is 20 GB per node. If you deploy 10 nodes with Fuel, you need to have
  (20 x 10) x 2.5 = 500 GB disk for the Fuel Master node.
* IPMI access through an independent management network

For a testing environment:

* Dual-core CPU
* 2 GB RAM
* 1 Gigabit network port
* 50 GB disk
* Physical console access
