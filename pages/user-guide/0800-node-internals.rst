
.. raw:: pdf

   PageBreak


.. _nodes-arch:


What stands for acronyms in CLI commands
++++++++++++++++++++++++++++++++++++++++

CLI commands contain a number
of acronyms.
For better understanding of those,
see the example command output below.


.. note:: :ref:`Nailgun<nailgun-term>` populates the database
          with hardware configuration information
          about all the managed :ref:`nodes<node-term>` it discovers
          as well as the configuration and status of each node.

The ``fuel node list`` command is used on the Fuel Master node
to list out the current information about the nodes
for the environment:

::

    [root@fuel ~]# fuel nodes

    id | status   | name             | cluster | ip        | mac               | ...
    ---|----------|------------------|---------|-----------|-------------------| ...
    4  | ready    | Untitled (b0:77) | 1       | 10.20.0.6 | 56:40:fa:cc:cf:45 | ...
    1  | ready    | Untitled (ca:9a) | 1       | 10.20.0.4 | ca:03:e6:b1:13:46 | ...
    3  | ready    | Untitled (0e:64) | 2       | 10.20.0.7 | 26:1f:eb:91:d8:49 | ...
    2  | ready    | Untitled (c1:ef) | 2       | 10.20.0.3 | 22:2a:45:36:5d:42 | ...
    5  | discover | Untitled (e1:c4) | None    | 10.20.0.5 | 08:00:27:1a:e1:c4 | ...


   id | status   | name             |...| roles      | pending_roles | online | group_id
   ---|----------|------------------|...|------------|---------------|--------|---------
   4  | ready    | Untitled (b0:77) |...| compute    |               | True   | 1
   1  | ready    | Untitled (ca:9a) |...| controller |               | True   | 1
   3  | ready    | Untitled (0e:64) |...| compute    |               | True   | 2
   2  | ready    | Untitled (c1:ef) |...| controller |               | True   | 2
   5  | discover | Untitled (e1:c4) |...|            |               | True   | None


The meaning of these fields is:

:id:   The node identifier, assigned incrementally
       when the node is first discovered
       (when the Fuel agent
       sends its first request to the Fuel Master node).

       This ID is the Primary Key for this record in the database;
       it is unique and is never reassigned;
       when you delete a node from the environment,
       that node's ID is deleted;
       the next node added to the environment is assigned
       a new ID that is higher than the highest-numbered ID in the database.

:status:    Current state of the node:

            :ready:   Node is deployed and provisioned, ready to use
            :discover:    Node is not deployed and not provisioned
            :provisioning:    Node is in the process of being provisioned
                              (operating system is being installed)
            :provisioned:     Node is provisioned but not deployed
            :deploying:       Node is being deployed
                              (OpenStack is being installed and configured)
            :error:    Deployment/provisiong of the node has failed

:name:    Name of the node as displayed on the screen when you
          :ref:`assign roles to nodes<assign-roles-ug>`.
          By default, this is "Untitled" with the final digits
          of the MAC address used by the Admin interface for that node.
          You can double-click on that title to change the name.

:cluster:    ID of the environment to which the node is assigned.

:ip:    IP address of the admin interface,
        which is the IP address for the default route.

:mac:   MAC address of the admin interface,
        determined the same way as the IP address.

:roles:   :ref:`Role(s)<role-term>` that the node has;
          populated only after deployment.

The following two columns appear at the right end of this display;
they are not shown here:

:pending_roles:    Before deployment, lists the roles that have been assigned to this node.
                   When deployment is complete,
                   the contents of this field are moved to the **roles** column

                   For Release 6.x and later,
                   this field can also contain the **primary** value
                   to indicate that this node is the Primary Controller node.
                   The **primary** value is persisted in the database
                   through the use of the **has_primary** field
                   in the :ref:`openstack.yaml<openstack-yaml-ref>` file.

:online:    Status of the node:

            :False:    Node is offline.

            :True:     Node is available via the Fuel admin network.

:group_id: The group node identifier.
           When you assign roles to your target nodes,
           Fuel tries to automatically determine the node's group based on the DHCP address.



