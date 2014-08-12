
.. _zabbix-arch:

Zabbix implementation
---------------------

This section describes how Fuel deploys
:ref:`zabbix-term`.
See :ref:`zabbix-plan` for information
about how to prepare to deploy Zabbix in your environment.

The Fuel implementation of Zabbix has these major components:

- The Zabbix `server
  <https://www.zabbix.com/documentation/2.2/manual/concepts/server>`_
  runs on a dedicated node
  and is responsible for storing, processing, and displaying data.
- Zabbix `agents
  <https://www.zabbix.com/documentation/2.2/manual/concepts/agent>`_
  are installed on each Compute and Storage node
  in the OpenStack environment.
  Zabbix does not monitor the MongoDB database
  so no agent is installed on MongoDB nodes.
  They gather data based on the checks that are configured for them.
- The Zabbix MySQL database resides on the same dedicated node
  as the Zabbix server.
- A virtual host is defined
  to represent the OpenStack environment
  as it is seen from the public network;
  in other words, from outside the environment.

Each monitored node has an entry in the Zabbix database.
Application-specific `templates
<https://www.zabbix.com/documentation/2.2/manual/config/templates>`_
are associated
with each agent-specific entry in the database
to define the checks to be performed on that node,
how to detect failures, and so forth.
One parameter of each check defines how long to keep the data.
Fuel deploys some base templates;
the administrator can use the Zabbix Web UI
to customize the templates.

Nailgun handles the deployment of Zabbix.
It ensures that the Zabbix server and agents are deployed
before any other nodes.
It also automatically removes node-specific entries from the Zabbix database
when that node is deleted from the environment.


