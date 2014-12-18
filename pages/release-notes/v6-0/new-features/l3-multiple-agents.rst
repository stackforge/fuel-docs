
Multiple L3 Agents per environment
----------------------------------

Fuel 6.0 deploys one :ref:`L3 Agent<l3-agent-term>` per Controller node,
which helps avoid the performance bottlenecks
that could occur in environments
with only one L3 agent running.
Rescheduling of networks is moved to Neutron server code.
Neutron server code reschedules networks
by automatically reassigning routers to L3 agents
when it detects that a particular L3 agent is failed.

The **clone_p_neutron-l3-agent** resource is added
to support multiple L3 agents.
It is similar to the **p_neutron-l3-agent**
but it kills all L3 agent clones in the environment.
See :ref:`tshoot-corosync-ops` for examples.
