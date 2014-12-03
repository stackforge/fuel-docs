
.. _floating-ip-term:

Floating IP address
-------------------

A floating IP address is an IP address, usually public,
that is dynamically associated with a running virtual instance
to make the VM accessible to the outside world.
Note that external ports are associated with tenant routers,
not with virtual instances.

To associate a floating IP address with your VM:

#. Add a floating IP using either the
   `Horizon dashboard
   <http://docs.openstack.org/admin-guide-cloud/content/section_l3_router_and_nat.html>`_
   or the `command line
   <http://docs.openstack.org/user-guide/content/manage_ip_addresses.html>`_.

#. Configure the :ref:`Security Group<security-groups-term>`
   to enable the kind of access required for the VM.
   See `Configure access and security
   <http://docs.openstack.org/user-guide/content/Launching_Instances_using_Dashboard.html>`_
   for instances.

#. Select the appropriate rule for ICMP and SSH access;
   preconfigured rules are available from a dreop-down menu
   inside the Security Group configuration dialogue.

#. If you plan to connect to the instance using SSH,
   make sure that you can either use a password
   to log into the instance
   (using, for example, a specific password-enabled image
   or cloud-init scripts)
   or inject your public key into the instance.
   Instructions are in the document referenced in Step #3.


For more information:

- To set the IP range when configuring your environment with Fuel,
  see :ref:`network-settings-ug`

- For details about the OpenStack requirements
  for configuring floating IP addresses,
  see :ref:`public-floating-ips-arch`.

- `Configure public (floating) IP addresses
  <http://docs.openstack.org/admin-guide-cloud/content/nova-associate-public-ip.html>`_

- `L3 routing and NAT
  <http://docs.openstack.org/admin-guide-cloud/content/section_l3_router_and_nat.html>`_


