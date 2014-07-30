
.. _add-compute-storage-ops:

Add a Compute or Storage node
-----------------------------

Compute and Storage nodes can be added
to your OpenStack environment.

To add a Compute, Storage, MongoDB, or Zabbix node to your environment,
follow these steps:

#. Physically configure the node into your hardware environment.

#. Wait for the new node to show up as an "Unallocated Node"
   on your Fuel dashboard.

#. [Manually insert new node in corosync -- need info]

#. Click the "Add Node" button;
   on the screen described in :ref:`assign-roles-ug`;
   the unallocated node will be displayed.
   Assign the role or roles to the node that you want.

#. Click the "Deploy Changes" button
   and wait for the node to be deployed.

   The cluster must be redeployed to update the configuration files.
   Most of the services that are running are not affected
   but HAProxy must be restarted.


   Expect a couple seconds of API downtime;
   improvements to galera and RabbitMQ deployment
   reduce the amount of downtime.

