
Neutron agents state reporting
------------------------------

MOS 6.1 has obtained its own logic to determine
if agents are dead or alive. Agents do not need use
REST API calls anymore to notify a neutron server
which maintains agent's state by collecting state
reports from agents via amqp. They can report their
own status by saving it in local files.
So in case when a message queue has issues CRM
still can response in time if something goes
wrong with an agent.

See the `feature description
<https://mirantis.jira.com/browse/PROD-169>`_
for details about the implementation.
