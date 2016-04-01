
.. _change-roles:

Change the role of a node
--------------------------

If you have assigned a wrong role or want to add additional roles to a node,
you can modify this setting before you deploy an OpenStack environment, as
well as after the deployment.

**To change the role of a node:**

#. In the Fuel web UI, click :guilabel:`Nodes`.
#. Select a node.

   * If the OpenStack environment is not yet deployed:

     #. Click :guilabel:`Edit Roles`.
     #. Modify the role as required.

   * If the OpenStack environment has been already deployed:

     #. Click :guilabel:`Delete`.

        Fuel changes the node's status to *Unallocated*.

     #. Click :guilabel:`Add Node`.
     #. Select the node and assign a new role or roles to the node as
        described in :ref:`add-nodes-ug`.
