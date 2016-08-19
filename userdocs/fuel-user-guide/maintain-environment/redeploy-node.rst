.. _redeploy-node:

===============
Redeploy a node
===============

Redeploying a node refers to the process of changing the roles that are
assigned to a node. For example, you want to redeploy some compute and storage
nodes to be MongoDB nodes.

**To redeploy a node:**

#. Complete the following prerequisite steps if applicable:

   #. Live migrate instances from the compute nodes. For more information,
      see `Configure migrations <http://docs.openstack.org/admin-guide-cloud/compute-configuring-migrations.html>`_.
   #. Back up or copy information from the Operating System nodes being
      redeployed.

#. Log in to the Fuel web UI.
#. In the :guilabel:`Nodes` tab, select the node(s) that you want to remove
   and click :guilabel:`Delete`.

   The deployed node will be marked as :guilabel:`PENDING DELETION`.

#. In the :guilabel:`Dashboard` tab, click :guilabel:`Deploy Changes`.

#. Wait for the node to become available in the list of :guilabel:`Discovered`
   nodes in the :guilabel:`Nodes` tab.
#. Assign a new role to the node being redeployed.
#. Adjust the settings of your environment as required.
#. In the :guilabel:`Dashboard` tab, click :guilabel:`Deploy Changes`.
#. Wait for the environment to be redeployed.

.. caution:: After redeploying an Operating System node, you will have to
 manually apply any configuration changes you made and reinstall the software
 that was running on the node or restore the system from the backup you made
 before redeploying the node.
