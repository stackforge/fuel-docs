
.. _updates-neutron-rn:

OpenStack Networking (Neutron)
------------------------------

Resolved Issues
+++++++++++++++

* RPC method in OVS agent attempts to access an uninitialized attribute.
  This failure at startup of OVS agent has been addressed and does
  not lead to a connectivity failure of a whole node caused by improper
  tunnels setup anymore.
  See `LP1419763 <https://bugs.launchpad.net/mos/6.0-updates/+bug/1419763>`_.

* Neutron loses connection to RrabbitMQ with Errno 32.
  The update allows disabling client heartbeats from a configuration file,
  which should dramatically reduce the amount of reconnects.
  See `LP1430894 <https://bugs.launchpad.net/mos/+bug/1430894>`_.

* There is no connectivity to instances in HA neutron environment.
  In rare circumstances, OVS streams that enable network access to
  VM instances are dropped.
  See `LP1393771 <https://bugs.launchpad.net/mos/+bug/1393771>`_.

* Security group listing operation fails with timeout.
  If we have a large number of security groups (more than 1000) with
  security group rules (about 100 for each group) listing them
  could take rather long time (more than 1 minute). Adding a lazy join
  to backref to the SecurityGroupRule model will make it faster at list by 15%.
  See `LP1403107 <https://bugs.launchpad.net/mos/+bug/1403107>`_.

* Neutron server creates more than one port for a VM.
  In certain cases, compute does not clean up neutron ports after unsuccessful
  VM spawn. The fix checks if `network_info` is empty at the moment
  failure occurs. If it is empty, clean up a network to
  avoid having orphaned ports in neutron.
  See `LP1418911 <https://bugs.launchpad.net/mos/+bug/1418911>`_.

* Incorrect exception reference in ML2 plugin.
  In certain cases, ML2 plugin gets more than one port named with the same prefix
  from DB. With an incorrect exception reference it leads to an RPC callback failure.
  See `LP1430437 <https://bugs.launchpad.net/mos/+bug/1430437>`_.

* Neutron server consumes redundant resources.
  The RPC handler for security groups calls `get_port_from_device` individually for
  each device in a list it receives. Each one results in a separate SQL query
  for security groups and port details. This becomes very inefficient as the number
  of devices on a single node is increasing.
  This patch adds a logic to the RPC handler to see if the core plugin has a method
  to lookup all of device IDs at once.
  See `LP1418267 <https://bugs.launchpad.net/mos/+bug/1418267>`_.

* Neutron `PortNotFound` exception.
  In some cases, a concurrent port deletion by DHCP agent causes PortNotFound
  exception during network_delete. This exception should not prevent network
  from being deleted.
  See `LP1420286 <https://bugs.launchpad.net/mos/+bug/1420286>`_.

* Performance improvement of RPC-related code for security groups.
  Currently, the complexity of the method is O(n^2) where n is the amount of IPs
  (the amount of VMs in a network). When the amount of VM is big (a large L2 domain),
  this method can significantly load a controller. The update reduces the method complexity to
  O(n) on average by using sets instead of lists.
  See `LP1430171 <https://bugs.launchpad.net/mos/+bug/1430171>`_.

* radvd >= 2.0 blocks router update processing
  Previously, the radvd did not require the -m option. In the new 2.0+ version radvd
  is called using the -m option. The fix eliminates the possibility of Neutron L3 agent
  being blocked using radvd.
  See `LP1398779 <https://bugs.launchpad.net/neutron/+bug/1398779>`_.
