
.. _zabbix-arch:

Zabbix implementation
---------------------

The Zabbix implementation has these major components:

- Zabbix server runs on a dedicated node
  and is responsible for storing, processing, and displaying data.
- Zabbix agents are installed on each Compute and Storage node
  in the OpenStack environment.
  They gather data based on the checks that are configured for them.
- The Zabbix database resides on the same dedicated node
  as the Zabbix server.
- A virtual host is defined
  to represent the OpenStack environment
  as it is seen from the public network;
  in other words, from outside the environment.

Each node has an entry in the Zabbix database.
Application-specific templates are associated
with each agent-specific entry in the database
to define the checks to be performed on that node,
how to detect failures,
and so forth.

Nailgun handles the deployment of Zabbix.
It ensures that the Zabbix server and agents are deployed before [what?].
It also automatically removes node-specific entries from the Zabbix database
when that node is deleted from the environment.

QUESTIONS:

- Can I run multiple Zabbix server nodes to achieve high availability?
- The spec says agents are installed on all nodes -- does this include
  dedicated MongoDB nodes or only Compute and Storage nodes?
- What is the format of the Zabbix database?
  Does it get purged of old entries automatically
  or does the administrator need to manage the purging?
- Is there any data storage on the nodes that have Zabbix agents
  or do they send all data to the Zabbix server immediately?
- What transport is used to send data from the agents to the server?
- What details should we provide about the Templates?
  How does an admin view and define them?
