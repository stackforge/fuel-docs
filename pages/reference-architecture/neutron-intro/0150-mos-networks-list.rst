Terminology
~~~~~~~~~~~

* **Public network** (also known as External network) used for Internet 
  access for all nodes.
* **Floating IP network** subnet within public network allocated for tenant 
  Internet access. A Neutron server directly assigns IP addresses for this network.
  If a user delegates a floating IP address to an instance, an IP address will 
  be assigned from this subnet (by SNAT/DNAT).
* **Private network** used for passing tenant private traffic.
* **Admin network** shared network between Fuel Master and all nodes in the 
  cluster for PXE installation and orchestration of environment for deployment.
* **Storage network** network used for communicating between storage nodes 
  (using Ceph, swift, or cinder) and compute nodes.
* **Management network** (also known as Internal) used
  for necessary communication between controllers and computes for AMQP
  messaging, DB queries, other inter-controller traffic required for
  supporting services.
* **Router** virtual Neutron router.
* **NIC** network interface card (ethernet adapter).
