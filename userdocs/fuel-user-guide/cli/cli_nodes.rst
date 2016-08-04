.. _cli-nodes:

Node management commands
------------------------

The following table describes node management commands
available in the Fuel CLI.

.. list-table:: **Node management commands**
   :widths: 10 10 20
   :header-rows: 1

   * - Description
     - Command
     - Example
   * - List all available nodes.
     - ``fuel node list``
     - List nodes for a specific environment:

       ::

         fuel --env-id <env_id> node list
   * - Assign nodes with specific roles to an OpenStack environment.
     - ``fuel node set --node <node_id> --role <role> --env <env_id>``
     - ::

         fuel node set --node <node_id> --role controller --env <env_id>

       ::

         fuel node set --node <node1_id>,<node2_id>,<node3_id> \
         --role compute,cinder --env <env_id>
   * - Remove nodes from an OpenStack environment.
     - ``fuel node remove --node <node1_id>,<node2_id> --env <env_id>``
     - Remove nodes without specifying an OpenStack environment:

       ::

          fuel node remove --node <node1_id>,<node2_id>

       Remove all nodes from a specific OpenStack environment:

       ::

         fuel node remove --env <env_id>
   * - Delete nodes with the *offline* status from the Fuel database.
     - ``fuel node --node-id <id> --delete-from-db``
     - Delete nodes with any status from the Fuel database:

       ::

         fuel node --node-id <id> --delete-from-db --force


**Example: Deploy a node with an empty role**

.. note::

   You may need to deploy a node with OS installed only - an empty role,
   where you can further deploy your own service out of Fuel control.

**To deploy a node with an empty role:**

#. Verify available operating systems:

   .. code-block:: console

      fuel release

   **Example of system response:**

   .. code-block:: console

      id | name                       | state       | operating_system | version
      ---|----------------------------|-------------|------------------|-----------
      2  | Mitaka on Ubuntu 14.04     | available   | Ubuntu           | mitaka-9.0
      3  | Mitaka on Ubuntu+UCA 14.04 | available   | Ubuntu           | mitaka-9.0
      1  | Mitaka on CentOS 6.5       | unavailable | CentOS           | mitaka-9.0


   Note down the OS ``id`` you need to install on the node.

#. Verify available nodes:

   .. code-block:: console

      fuel node

   **Example of system response:**

   .. code-block:: console

      id | status   | name             | cluster | ip        | mac               | roles | pending_roles | online | group_id
      ---|----------|------------------|---------|-----------|-------------------|-------|---------------|--------|---------
      2  | discover | Untitled (90:9b) | None    | 10.20.0.4 | 08:00:27:f5:90:9b |       |               | True   | None
      3  | discover | Untitled (53:f1) | None    | 10.20.0.5 | 08:00:27:14:53:f1 |       |               | True   | None
      1  | discover | Untitled (7c:11) | None    | 10.20.0.3 | 08:00:27:72:7c:11 |       |               | True   | None


#. Create a new environment if you do not have one:

   .. code-block:: console

      fuel env create --name test --release 2

   **Example of system response:**

   .. code-block:: console

      Environment 'test' with id=1 was created!

#. Verify if the environment has been created:

   .. code-block:: console

      fuel env

   **Example of system response:**

   .. code-block:: console

      id | status | name | release_id
      ---|--------|------|-----------
      1  | new    | test | 2

   Note down the ``id`` of the environment.


#. Verify available roles:

   .. code-block:: console

      fuel role --release 2

   **Example of system response:**

   .. code-block:: console

      name
      -------------------
      compute-vmware
      compute
      cinder-vmware
      virt
      base-os
      controller
      ceph-osd
      ironic
      cinder
      cinder-block-device
      mongo

   The role that you need is ``base-os``.

#. Add one of the discovered nodes to the ``test`` environment with the ``base-os`` role assigned:

   .. code-block:: console

      fuel node set --env 1 --node 1 --role base-os

   **Example of system response:**

   .. code-block:: console

      Nodes [1] with roles ['base-os'] were added to environment 1

#. Verify the status of the nodes:

   .. code-block:: console

      fuel node

   **Example of system response:**

   .. code-block:: console

      id | status   | name             | cluster | ip        | mac               | roles | pending_roles | online | group_id
      ---|----------|------------------|---------|-----------|-------------------|-------|---------------|--------|---------
      1  | discover | Untitled (7c:11) | 1       | 10.20.0.3 | 08:00:27:72:7c:11 |       | base-os       | True   | 1
      2  | discover | Untitled (90:9b) | None    | 10.20.0.4 | 08:00:27:f5:90:9b |       |               | True   | None
      3  | discover | Untitled (53:f1) | None    | 10.20.0.5 | 08:00:27:14:53:f1 |       |               | True   | None


   Your node with an empty role has been added to the environment.
