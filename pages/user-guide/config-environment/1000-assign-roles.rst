
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
   :width: 80%


.. image:: /_images/user_screen_shots/assign-roles2.png
   :width: 80%


To assign roles to the nodes:

- Select the role or roles you want to assign
- Click on the appropriate node(s) in the "Unallocated Nodes" list
- Click on the "Apply Changes" button.
- Proceed to do this until roles have been assigned to all nodes.

As you make your selections,
Fuel displays information about combinations
that are not allowed
and other configurations that are required.

.. note:: The Zabbix role appears on this screen
          only after you have enabled
          :ref:`experimental features<experimental-features-term>`
          on the Fuel Master node.

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

When you click the "Apply Changes" button,
Fuel displays the configuration you have chosen:


.. image:: /_images/user_screen_shots/assign-role-confirm.png
   :width: 80%

To rename the nodes, click on the "Unnamed nodes" string
for each node and then type in the name you want to use.
You should only modify the "Untitled" part of the name;
the suffix is the last digits of the MAC address for this node.

For more information, see:

- :ref:`nodes-roles-arch` describes the Controller,
  Compute, and Storage nodes.
- :ref:`storage-plan` for more details about the
  ramifications of the different Storage roles.
- :ref:`nodes-roles-plan` includes guidelines about setting up nodes.
- :ref:`mongodb-term` for information about MongoDB.
- :ref:`zabbix-plan` for information about Zabbix.



