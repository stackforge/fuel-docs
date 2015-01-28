
.. _redeploy-compute-storage-ops:

Redeploy a Non-Controller Node
------------------------------

Redeploying a :ref:`node<node-term>` refers to the process
of changing the roles that are assigned to it.
For example, you may have several nodes that run
both Compute and Storage roles
and you want to redeploy some of those nodes to be only Storage nodes
while others become only Compute nodes.
Or you might want to redeploy some Compute and Storage nodes
to be MongoDB nodes.

.. note: The Zabbix node must be deployed before any other nodes,
         so you cannot add a Zabbix node to an existing environment.

To redeploy a non-controller node,
follow these steps:

#. Use `live migration <http://docs.openstack.org/admin-guide-cloud/content/section_configuring-compute-migrations.html>`_
   to move instances from the Compute nodes
   you are going to redeploy.

#. If appropriate, back up or copy information
   from the Operating System nodes being redeployed.

#. Use the procedure described in :ref:`assign-roles-ug`
   to remove the node from your environment.
   Select the node(s) to be deleted then click on the "Delete Nodes" button.

#. Click on the "Deploy Changes" button on that screen.

#. Wait for the node to become available as an unallocated node.

#. Use the same Fuel screen
   to assign an appropriate role to each node being redeployed.

#. Click on the "Deploy Changes" button.

#. Wait for the environment to be deployed.


After redeploying an Operating System node,
you will have to manually apply any configuration changes you made
and reinstall the software that was running on the node
or restore the system from the backup you made
before redeploying the node.


