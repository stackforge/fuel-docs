
Neutron agents state reporting
------------------------------

Mirantis OpenStack 6.1 has obtained its own logic to determine
if agents are dead or alive. Agents do not need to use
REST API calls anymore to notify a neutron server
which maintains agents' state by collecting state
reports from agents via AMQP. They can report their
own status by saving it in local files.
So, when a message queue has issues the Cluster Resource Manager
still can response in time if something goes
wrong with an agent.

See the `neutron-agents-local-reports blueprint
<https://blueprints.launchpad.net/fuel/+spec/neutron-agents-local-reports>`_
for details about the implementation.

Multiple DHCP-agents
--------------------

In Mirantis OpenStack 6.1, multiple DHCP agents are configured
by one on each Controller. In earlier releases, each environment
had a single DHCP agent that was located on one of the Controllers.
Multiple DHCP agents allows to avoid the performance bottlenecks
that could occur with the only one DHCP agent running in the environment.
Also each network with a DHCP server enabled is served by two DHCP agents
simultaneously, so a failure of one DHCP agent is completely transparent
for DHCP clients. Rescheduling of networks is moved to Neutron server code,
which accomplishes this by automatically reassigning networks to DHCP agents,
when it detects that a particular DHCP agent is dead.

See the `fuel-multiple-dhcp-agents blueprint
<https://blueprints.launchpad.net/fuel/+spec/fuel-multiple-dhcp-agents>`_
for details about the implementation.

.. note::
       This feature is disabled by default in Mirantis OpenStack 6.1 since it solves
       very specific corner case, which might happen in production.
       So enabling it by default is very risky and should be handled through Mirantis
       support team if customer have such a suspicios behaviour.
