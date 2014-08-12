
.. _zabbix-plan:

Zabbix monitoring tool
----------------------

:ref:`zabbix-term` is an open source cluster monitoring utility
that Fuel 5.1 and later can deploy in your OpenStack environment.
See :ref:`zabbix-arch` for details about how Zabbix is implemented
in Mirantis OpenStack.

When planning your Mirantis OpenStack deployment,
you must consider the following resource requirements
if you will be deploying Zabbix:

- The Zabbix server must run on its own dedicated node in Mirantis OpenStack 5.1.
  This server also stores the Zabbix database.
- A Zabbix agent is installed on each Compute and Storage node in the environment.
- Significant network traffic is generated
  as the agents report back to the server.

To deploy Zabbix in your Mirantis OpenStack environment:

- Enable Experimental tools.
- Assign the Zabbix role to the appropriate node
  on the :ref:`assign-roles-ug` screen.
- If you like, reset the password used to access the Zabbix dashboard
  on the :ref:`zabbix-access-ug` screen.

QUESTIONS:

- Can the Zabbix server be replicated for high availability?
- How do I size the server that hosts the Zabbix server?
  Need to consider compute power as well as database storage.
- What about networking ramifications?
  I assume a fair amount of traffic as the agents report to the servers;
  can they use OVS bonding, Mellanox, etc to increase the networking throughput?
- What sort of resources does each agent consume
  on the Compute and Storage nodes?
