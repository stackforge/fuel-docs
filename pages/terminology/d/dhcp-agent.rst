
.. _dhcp-agent-term:

DHCP Agents
-----------

A DHCP agent is a :ref:`Neutron<neutron-term>` agent
that allows administrators and users in a tenant's environment
to use a DHCP server in tenant networks.

In Mirantis OpenStack 6.1 and later,
multiple DHCP agents are configured, one on each Controller.
In earlier releases, each environment had a single DHCP agent
that was located on one of the Controllers.
Multiple DHCP agents help to avoid the performance bottlenecks
that could occur with only one DHCP agent per environment.
Also, each network with DHCP server enabled is served by two DHCP agents
simultaneously, so failure of one agent is completely transparent for
DHCP clients.

Rescheduling of networks is moved to Neutron server code,
which accomplishes this by automatically reassigning networks to DHCP agents
when it detects that a particular DHCP agent is dead.

These multiple DHCP agents are actually clones
that can be addressed with the **clone_p_neutron-dhcp-agent** resource;
the **p_neutron-dhcp-agent** resource is still provided,
to act on a particular resource of a specific node.
