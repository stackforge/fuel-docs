
Multiple L3 Agents per environment
----------------------------------

Fuel 6.0 deploys one :ref:`L3 Agent<l3-agent-term>` per Controller node,
which helps eliminate performance bottlenecks
that could occur in environments
with only one L3 agent running.
Rescheduling of networks is moved to Neutron server code.
Neutron server code reschedules networks
by automatically reassigning routers to L3 agents
when it detects that a particular L3 agent is failed.
See :ref:`tshoot-corosync-ops` for examples.
