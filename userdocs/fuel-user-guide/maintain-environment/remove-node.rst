.. _remove-node:

=============
Remove a node
=============

You may need to remove a node from your environment to replace
hardware, repair an error, complete maintenance operations, and so on.

**To remove a node:**

#. Log in to the Fuel web UI.
#. In the :guilabel:`Nodes` tab, select the node that you want to remove and
   click :guilabel:`Delete`.

   The deployed node will be marked as :guilabel:`PENDING DELETION` and will
   be removed from the environment after redeployment.
#. Adjust the settings of your environment as required.
#. In the :guilabel:`Dashboard` tab, click :guilabel:`Deploy Changes`.

   Puppet removes the node from the configuration files and
   re-triggers corresponding services.

.. seealso::

 - `Node management commands <http://docs.openstack.org/developer/fuel-docs/userdocs/fuel-user-guide/cli/cli_nodes.html>`_
 - :ref:`add-nodes-ug`
 - :ref:`redeploy-node`
