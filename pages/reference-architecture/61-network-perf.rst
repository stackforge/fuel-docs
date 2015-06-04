.. _6061network:

Mirantis OpenStack 6.1 Network Performance Changes and Results
==============================================================

Architecture in 6.1 as compared to 6.0
--------------------------------------

The network architecture in Mirantis OpenStack 6.1
has undergone considerable changes when compared to
Mirantis OpenStack 6.0 and older releases.

In Mirantis OpenStack 6.0 (MOS 6.0) bridging, bonding,
separating ethernet to 802.1q VLANs were provided
by Open VSwitch.

In Mirantis OpenStack 6.1 (MOS 6.1) Open VSwitch provides
infrastructure only required for Neutron.
All other networks, bridges, bonds are provided by
native Linux means.

.. image:: /_images/6061network.png

Mirantis OpenStack 6.1 Network Performance Hardware
---------------------------------------------------

The following hardware was used to run
the network performance tests:

* Compute nodes:
  * Node is a part of DELL microcloud with 10Gbps NICs
  * Node has 4xIntel(R) Xeon(R) CPU E3-1230 v3 @ 3.30GHz, 32GB RAM.

* Network infrastructure:
  * 10GE network built by one Dell PowerConnect 8132 10GE switch (PCT8132).

Storage network performance
---------------------------

Storage network on the 10ge interface. 

The following results were achieved
for default MTU and no NIC tuning:

* Centos/MOS-6.0 -- 9.4 Gbit/s
* Ubuntu/MOS-6.0 -- 8.3 Gbit/s
* Ubuntu/MOS-6.1 -- 9.4 Gbit/s

The following results were achieved
for MTU=9000 and NIC with enabled offloading:

* CentOS/MOS-6.0 -- 9.9 Gbit/s
* Ubuntu/MOS-6.0 -- 9.4 Gbit/s
* Ubuntu/MOS-6.1 -- 9.9 Gbit/s

Virtual network (VM to VM) performance (VLAN segmentation)
----------------------------------------------------------

Private network on the 10ge interface.

The following results were achieved
for default MTU and no NIC tuning:

* CentOS/MOS-6.0 -- 2.8 Gbit/s
* Ubuntu/MOS-6.0 -- 3.8 Gbit/s
* Ubuntu/MOS-6.1 -- 3.3 Gbit/s

The following results were achieved
for MTU=9000 and NIC with enabled offloading:

* CentOS/MOS-6.0 -- 7.4 Gbit/s
* Ubuntu/MOS-6.0 -- 9.9 Gbit/s
* Ubuntu/MOS-6.1 -- 9.9 Gbit/s

Virtual network (VM to VM) performance (GRE segmentation)
---------------------------------------------------------

The following results were achieved
for Mirantis OpenStack 6.1 Ubuntu based
environments:

* Non-optimized network -- 3.5 Gbit/s
* Optimized network -- 9.7 Gbit/s
