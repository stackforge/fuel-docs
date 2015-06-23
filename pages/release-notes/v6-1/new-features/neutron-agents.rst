Multiple L3 Agents per environment
++++++++++++++++++++++++++++++++++

Fuel 6.1 deploys one :ref:`L3 Agent<l3-agent-term>` per
Controller node, which helps eliminate HA bottlenecks
that could occur in environments with only one L3 agent running.
Rescheduling of networks is moved to Neutron server code.
Neutron server code reschedules networks
by automatically reassigning routers to L3 agents
when it detects that a particular L3 agent is failed.
See :ref:`tshoot-corosync-ops` for examples and the
`fuel-multiple-l3-agents blueprint <https://blueprints.launchpad.net/fuel/+spec/fuel-multiple-l3-agents>`_
for details about the implementation.

Neutron agent state reporting
+++++++++++++++++++++++++++++

Mirantis OpenStack 6.1 has obtained its own logic to determine
if agents are dead or alive. Agents now do not rely
REST API calls to notify a neutron server
which maintains agents' state by collecting state
reports from agents via AMQP. They can report their
own status by saving it in local files.
So, when a message queue has issues, the Cluster Resource Manager
still can respond in time if something goes
wrong with an agent. See the `neutron-agents-local-reports blueprint
<https://blueprints.launchpad.net/fuel/+spec/neutron-agents-local-reports>`_
for details about the implementation.

.. note::
       This feature is disabled by default in Mirantis OpenStack 6.1
       since it solves a very specific corner case, which might happen
       in production. So enabling it by default is very risky and
       should be handled with the help of Mirantis support team.

Multiple DHCP-agents
++++++++++++++++++++

In Mirantis OpenStack 6.1, multiple DHCP agents are configured with
one on each Controller. In earlier releases, each environment
had a single DHCP agent that was located on one of the Controllers.
With the help of multiple DHCP agents, you can avoid the HA
bottlenecks that could occur with only one DHCP agent running in the
environment. Also, each network with a DHCP server enabled is served
by two DHCP agents simultaneously, so a failure of one DHCP agent is
completely transparent to DHCP clients. Rescheduling of networks is
moved to Neutron server code, which accomplishes this by
automatically reassigning networks to DHCP agents when it detects
that a particular DHCP agent is dead. See the `fuel-multiple-dhcp-agents blueprint
<https://blueprints.launchpad.net/fuel/+spec/fuel-multiple-dhcp-agents>`_
for details about the implementation.
