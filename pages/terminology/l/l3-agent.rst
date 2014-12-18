
.. _l3-agent-term:

L3 Agents
---------

An L3 agent is a :ref:`Neutron<neutron-term>` agent
that allows administrators and tenants
to create routers that interconnect L2 networks
and floating IPs that create ports on private networks
to make them publicly accessible.

In Mirantis OpenStack 6.0 and later,
multiple L3 agents are configured, one on on each Controller.
In earlier releases, each environment had a single L3 agent
that was located on one of the Controllers.
This helps avoid the performance bottlenecks
that could occur with only one L3 agent running in the environment.
Rescheduling of networks is moved to Neutron server code,
which accomplishes this
by automatically reassigning routers to L3 agents
when it detects that a particular L3 agent is dead.

These multiple L3 agents are actually clones
that cam be addressed with the **clone_p_neutron-l3-agent** resource;
the **p_neutron-l3-agent** resource is still provided,
to act on a specific resource on a specific node.

