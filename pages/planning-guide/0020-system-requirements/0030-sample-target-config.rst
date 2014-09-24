
.. _sample-target-node-config-plan:

Sample Hardware Configuration for Target Nodes
----------------------------------------------

This is a general-purpose medium-sized hardware configuration
that is provides room for moderate growth
and is adequate for a variety of installations.
Note that this is not a recommendation
or some sort of "best practices" guide;
but provides a reasonable starting point
that avoids common configuration mistakes.

The characteristics of the environment are:

- 12 servers (one Fuel Master node, 3 Controller nodes,
  3 Storage nodes, 5 Compute nodes)
- High-availability configuration
- Neutron networking, using either the VLAN or GRE topology
- Ceph as the backend for Cinder, Glance, and Nova
  (for ephemeral storage)
- No Ceilometer/MongoDB monitoring is configured;
  three additional servers to be used as MongoDB nodes
  would be required to add Ceilometer/MongoDB to the environment

Controller nodes (3)
~~~~~~~~~~~~~~~~~~~~

Controllers require sufficient resources
to run the :ref:`Ceph <ceph-term>` monitors
and :ref:`mysql-term` in addition to the
core OpenStack components
(:ref:`nova-term`, :ref:`neutron-term`,
:ref:`cinder-term`, and :ref:`glance-term`).

Each controller should have:

- Single or dual-socket CPU with at least 4 physical cores
- 32GB RAM recommended; 24GB minimum
- RAID1 Controller with at least 500GB capacity
  for the Host operating system disk.
  Larger disks may be warranted
  if you determine that you need large database capacity.
  Note that it is non-trivial to expand the disk storage
  on running Controller nodes.
- 2 NICs, either 1 Gbit/s or 10 Gbit/s

Storage nodes (3)
~~~~~~~~~~~~~~~~~

We recommend separate Ceph nodes for
scalability and robustness.
The hardware estimate is based on the requirement
of .5 cores per Ceph-OSD CPU
and 1GB of RAM per TB of Ceph-OSD space.
All Ceph storage and journal hard disks
can be configured in JBOD (Just a Bunch of Disks) mode
on the RAID controller,
or can be plugged into free MB ports.

For production installations,
the Ceph replication factor should be set
to 3 or more;
see :ref:`settings-storage-ug`.

- Single-socket CPU with at least 4 physical cores
- 24GB RAM
- RAID1 Controller with at least 500GB capacity
  for the Host operating system disk
- 2 NICs, either 1 Gbit/s or 10 Gbit/s
- 18 TB of Ceph storage (6 x 3TB)
- 1-2 SSDs, 64GB or more each, for the Ceph Journal

Compute nodes (5)
~~~~~~~~~~~~~~~~~

Virtual Machines are hosted on the Compute nodes.
By default, Fuel configures the Scheduler to use
an 8:1 :ref:`overcommit ration <overcommit-term>`
on the Compute nodes;
We recommend that you turn this off
until you know what your user load will be.

Each Compute node should have:

- Dual-socket CPU with at least 4 physical cores per socket
- 64GB RAM
- RAID1 Controller with at least 500GB capacity
  for the Host operating system disk
- 2 NICs, either 1 Gbit/s or 10 Gbit/s
