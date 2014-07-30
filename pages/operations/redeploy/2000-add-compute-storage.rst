
.. _add-compute-storage-ops:

Add a Compute or Storage node
-----------------------------

Compute and Storage nodes can be added
to your OpenStack environment.

To add a Compute or Storage node, follow these steps:

#. Physically configure the node into your hardware environment.

#. Wait for the new node to show up as an "Unallocated Node"
   on your Fuel dashboard.

#. [Manualy insert new node in corosync]

#. Open the "Nodes" tab on your Fuel dashboard.

#. Click the "Add Node" button;
   the unallocated node will be displayed.

#. Assign the role or roles to the node that you want;
   see :ref:`assign-roles-ug`.

#. Click the "Deploy Changes" button
   and wait for the node to be deployed.

   The cluster must be redeployed to update the configuration files.
   Most of the services that are running are not affected
   but HAProxy must be restarted.
   Expect a couple seconds of API downtime;
   improvements to galera and RabbitMQ deployment
   reduce the amount of downtime.

