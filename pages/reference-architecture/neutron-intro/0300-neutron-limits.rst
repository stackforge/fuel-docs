Known limitations
~~~~~~~~~~~~~~~~~

* Neutron will not allocate a floating IP range for your tenants. After each
  tenant is created, a floating IP range must be created. Note that this does
  not prevent Internet connectivity for a tenant's instances, but it would
  prevent them from receiving incoming connections. You, the administrator,
  should assign a floating IP addresses for the tenant. Below are steps you can
  follow to do this:
  ::

    # get admin credentials:
    source /root/openrc
    # get admin tenant-ID:
    keystone tenant-list

  +----------------------------------+----------+---------+
  |                id                |   name   | enabled |
  +==================================+==========+=========+
  | b796f91df6b84860a7cd474148fb2229 |  admin   |   True  |
  +----------------------------------+----------+---------+
  | cba7b0ff68ee4985816ac3585c8e23a9 | services |   True  |
  +----------------------------------+----------+---------+

  ::

    # create one floating-ip address for admin tenant:
    neutron floatingip-create --tenant-id=b796f91df6b84860a7cd474148fb2229 net04_ext

* You can't combine Private or Admin network with any other networks on one NIC.
* To deploy OpenStack using Neutron with GRE segmentation, each node requires at
  least 2 NICs.
* To deploy OpenStack using Neutron with VLAN segmentation, each node requires
  at least 3 NICs.

