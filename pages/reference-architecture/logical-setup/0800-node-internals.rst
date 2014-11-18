
.. _nodes-arch:

How Nodes are Defined and Managed
---------------------------------

:ref:`Nailgun<nailgun-term>` populates the database
with hardware configuration information
about all the managed :ref:`nodes<node-term>` it discovers
as well as the configuration and status of each node.
Use the **fuel node list** command on the Fuel Master node
to list out the current information about the nodes
for the environment:

::

    id | status | name             | cluster | ip         | mac               | roles      | pending_roles | online
    ---|--------|------------------|---------|------------|-------------------|------------|---------------|-------
    5  | ready  | Untitled (4d:4d) | 2       | 10.110.0.3 | b2:8b:55:17:ae:40 | controller |               | True
    8  | ready  | Untitled (3a:7f) | 2       | 10.110.0.6 | 92:93:99:70:14:4c | compute    |               | True
    6  | ready  | Untitled (34:84) | 2       | 10.110.0.4 | f2:b3:1a:74:da:41 | cinder     |               | True
    7  | ready  | Untitled (f0:9b) | 2       | 10.110.0.5 | 56:09:fe:c6:06:40 | compute    |               | True


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

:cluster:    ID of the environment to which the node is assigned.

:ip:    IP address of the admin interface,
        which is the IP address for the default route.

:mac:   MAC address of the admin interface,
        determined the same way as the IP address.

:roles:   :ref:`Role(s)<role-term>` that the node has;
          populated only after deployment.

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



