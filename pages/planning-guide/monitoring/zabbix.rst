
.. _zabbix-plan:

Zabbix monitoring tool
----------------------

:ref:`zabbix-term` is an open source infrastructure monitoring utility
that Fuel 5.1 and later can deploy with your OpenStack environment.
See :ref:`zabbix-arch` for details about how Zabbix is implemented
in Mirantis OpenStack.

When planning your Mirantis OpenStack deployment,
you must consider the following resource requirements
if you will be deploying Zabbix:

- The Zabbix server must run on its own dedicated node
  in Mirantis OpenStack 5.1.
  This server also stores the Zabbix database.
- A Zabbix agent is installed on each Compute and Storage node
  in the environment.
  The agents send all information to the Zabbix server immediately
  although some small amount of temporary data may be written
  to the local disk for processing.
- Significant network traffic is generated on the Zabbix node
  as the agents report back to the server;
  the agents themselves do not put much load on the network.
- The amount of storage required on the Zabbix node
  depends on the number of resources being monitored,
  the amount of data being gathered for each,
  and so forth
  but our internal tests indicate that 30GB of data storage
  is adequate for monitoring up to 100 nodes.
- The agents running on the Compute and Storage nodes
  run periodically;
  they mainly consume CPU resources,
  although they are fairly light-weight processes.

See `Performance tuning
<https://www.zabbix.com/documentation/2.2/manual/appendix/performance_tuning>`_
for information about how to maximize the performance of Zabbix.

To deploy Zabbix in your Mirantis OpenStack environment:

- Enable :ref:`Experimental<experimental-features-term>` tools.
- Assign the Zabbix role to the appropriate node
  on the :ref:`assign-roles-ug` screen.
- If you like, reset the password used to access the Zabbix dashboard
  on the :ref:`zabbix-access-ug` screen.

For information about using the Zabbix Web UI,
see `Zabbix Web interface <https://www.zabbix.com/documentation/2.2/manual/web_interface>`_.

Limitations:

- The Zabbix server cannot be replicated for high availability
  in Mirantis OpenStack.

- :ref:`OVS bonding<bonding-term>`
  and Mellanox :ref:`sr-iov-term` based networking
  over the Mellanox ConnectX-3 adapter family
  are not supported on the Zabbix node.

