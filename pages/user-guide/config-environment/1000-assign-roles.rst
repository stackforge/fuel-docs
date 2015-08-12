
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

- If you assigned the wrong role to a node and deployed the
  environment (for example, you defined a node as a Compute node
  but want it to be a Ceph OSD node), select that node and click
  the "Delete" button:

  .. image:: /_images/user_screen_shots/assign-roles3.png

  This moves that node back to the pool of "Unallocated nodes"
  so you can click on "Add Node" to assign a new role. This means that
  you will also have to redeploy the environment for the changes to
  take effect.
- If you want to add a role to a node or edit the roles in an
  environment that has not yet been deployed
  (for example, you defined a node as a Compute node but want it
  to also have a Ceph OSD role),
  select that node and click "Edit Roles":

  .. image:: /_images/user_screen_shots/assign-roles4.png

You can remove an offline node from the inventory by selecting it
and clicking "Remove". This will remove the node from the pool
of available nodes completely.

You can also delete any node from the environment by selecting it
and clicking "Delete". This will delete the node and return it to the
pool of unallocated nodes.

To remove any node from inventory using the
Fuel CLI, see :ref:`Remove a node from Fuel DB <remove-inv>`.

.. image:: /_images/user_screen_shots/remove-node-inventory.png

To rename the nodes, click on the "Untitled" string
for each node and then type in the name you want to use.
The suffix is the last digits of the MAC address for this node;
you can keep these digits or delete them.

.. note:: You can change the node names at any time: before
          the deployment or after it.

Beginning with Fuel 7.0, you can define the hostnames of the slave
nodes through Fuel Web UI or CLI prior to deploying an environment.

.. note:: Whereas you can change the **node names** at any time (before
          the deployment or after it), you can only change the
          **hostnames** before the deployment. Hostnames are
          locked after the deployment and there is no way to change
          them.

To change the hostnames (which will be locked after the deployment),
in Fuel Web UI select the "Nodes" tab and then click the
settings icon next to the node for which you want to define the
hostname:

.. image:: /_images/user_screen_shots/define-hostname01.png

In the pop-up window, type in the hostname that you would like to
assign to the node:

.. image:: /_images/user_screen_shots/define-hostname02.png

You can also set the hostname through Fuel CLI by issuing the
following command:

::

  fuel node --node <NODE_ID> --hostname <NODE_HOSTNAME>

where <NODE_ID> points to a specific node identified by its ID
(a number) that you can get by issuing the ``fuel nodes`` command;
<NODE_HOSTNAME> is the new hostname for the node that want to set.

Beginning with Fuel 7.0, after adding and enabling custom plugins for
a cluster, a user can define a new role described in these plugins
via Web UI as well as via :ref:`Fuel CLI<cli_usage>`.
You can find more information in `Fuel Plugins SDK
<https://wiki.openstack.org/wiki/Fuel/Plugins#Configuration_of_Fuel_Plugins_with_new_roles>`_.

For more information, see:

- :ref:`nodes-roles-arch` describes the Controller,
  Compute, and Storage nodes.
- :ref:`storage-plan` for more details about the
  ramifications of the different Storage roles.
- :ref:`nodes-roles-plan` includes guidelines about setting up nodes.
- :ref:`mongodb-term` for information about MongoDB.
- :ref:`operating-system-role-term` defines the Operating System role
  and points to other documents with additional information.
