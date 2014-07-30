
.. _redeploy-compute-storage-ops:

Redeploy a Compute or Storage node
----------------------------------

Redeploying a :ref:`node<node-term>` refers to the process
of changing the roles that are assigned to it.
For example, you may have several nodes that run
both Compute and Storage roles
and you want to redeploy some of those nodes to be only Storage nodes
while others become only Compute nodes.
Or you might want to redeploy some Compute and Storage nodes
to be MongoDB or Zabbix nodes.

To redeploy a Compute or Storage node, follow these steps:

#. Use `live migration <http://docs.openstack.org/admin-guide-cloud/content/section_configuring-compute-migrations.html>`_
   to move instances from the Compute and Storage nodes
   you are going to redeploy.

#. Use the Fuel screens discussed in :ref:`assign-roles-ug`
   to remove the node from your environment.
   Select the node(s) to be deleted then click on the "Delete Nodes" button.

#. Click on the "Deploy Changes" button on that screen.

#. Wait for the host to become available as an unallocated node.

#. Use the same Fuel screen
   to assign an appropriate role to each node being redeployed.

#. Click on the "Deploy Changes" button.

#. Wait for the environment to be deployed.


