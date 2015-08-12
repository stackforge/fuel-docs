
.. _assign-roles-ug:

Assign a role or roles to each node server
------------------------------------------

The first screen that is displayed has a list of roles at the top
and a list of unallocated nodes at the bottom.

* A **node** is a physical or virtual server
  that is provisioned to run a specific set of OpenStack services.

* A **role** is a functional set of services
  that Fuel installs as a whole on a node,
  usually in its own disk partition.


.. image:: /_images/user_screen_shots/assign-roles1.png

| To assign roles to the nodes:

- Select the role or roles you want to assign;
  roles that cannot be assigned are indicated.
- Click on the appropriate node(s) in the "Unallocated Nodes" list.
- Click on the "Apply Changes" button.
- Proceed to do this until roles have been assigned to all nodes.

As you make your selections,
Fuel displays an icon
(a gold triangle with an exclamation point)
next to the roles that are not allowed.
It also tells you about other environment settings that are required.

.. image:: /_images/user_screen_shots/assign-roles2.png

If you want to modify the roles assigned to a node:

- If you assigned the wrong role to a node
  (for example, you defined a node as a Compute node but want it
  to be a Ceph OSD node),
  select that node and click the "Delete" button:

  .. image:: /_images/user_screen_shots/assign-roles3.png

  This moves that node back to the pool of "Unallocated nodes"
  so you can click on "Add Node" to assign a new role.
- If you want to add a role to a node
  (for example, you defined a node as a Compute node but want it
  to also have a Ceph OSD role),
  select that node and click "Edit Roles":

  .. image:: /_images/user_screen_shots/assign-roles4.png

To rename the nodes, click on the "Untitled" string
for each node and then type in the name you want to use.
The suffix is the last digits of the MAC address for this node;
you can keep these digits or delete them.

You can remove an offline node from the inventory by selecting it
and clicking "Remove". This will remove the node from the pool
of available nodes completely.

You can also delete any node from the environment by selecting it
and clicking "Delete". This will delete the node and return it to the
pool of unallocated nodes.

To do that, you should select the node and hit *Delete*. This
works for any offline node both deployed and not.
To remove any node from inventory using the
Fuel CLI, see :ref:`Remove a node from Fuel DB <remove-inv>`.

.. image:: /_images/user_screen_shots/remove-node-inventory.png

For more information, see:

- :ref:`nodes-roles-arch` describes the Controller,
  Compute, and Storage nodes.
- :ref:`storage-plan` for more details about the
  ramifications of the different Storage roles.
- :ref:`nodes-roles-plan` includes guidelines about setting up nodes.
- :ref:`mongodb-term` for information about MongoDB.
- :ref:`operating-system-role-term` defines the Operating System role
  and points to other documents with additional information.


