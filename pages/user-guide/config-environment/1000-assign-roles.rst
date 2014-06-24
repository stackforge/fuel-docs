
.. _assign-roles-ug:

Assign a role or roles to each node server
------------------------------------------


.. image:: /_images/user_screen_shots/assign-roles1.png
   :width: 50%


.. image:: /_images/user_screen_shots/assign-roles2.png
   :width: 50%


Select the role or roles you want to assign,
then click on the appropriate node(s)
in the "Unallocated Nodes" list,
then click on the "Apply Changes" button.

If you want to modify the roles assigned to a node:

- If you assigned the wrong role to a node
  (for example, you defined a node as a Compute node but want it
  to be a Ceph OSD node),
  select that node and click the "Delete" button.
  This moves that node back to the pool of "Unallocated nodes"
  so you can click on "Add Node" to assign a new role.
- If you want to add a role to a node
  (for example, you defined a node as a Compute node but want it
  to also have a Ceph OSD role),
  select that node and click the additional roles you want to assign
  (in this case, click the "Ceph OSD" node
  and leave the "Compute" role selected);
  click the "Apply Changes" button.

For more information, see:

- :ref:`nodes-roles-arch` describes the Controller,
  Compute, and Storage nodes.
- :ref:`Storage-Architecture-arch` for more details about the
  ramifications of the different Storage roles.
- :ref:`nodes-roles-plan` includes guidelines about setting up nodes.
- :ref:`mongodb-term` for information about MongoDB.

