.. _bootstrap_view:

View available bootstraps
-------------------------

You can view bootstrap images available in your system.

#. Each bootstrap image has a unique ID which identifies it:

   .. code-block:: console

    $ fuel-bootstrap  list

   **System response:**

   .. code-block:: console

    +--------------------------------------+--------------------------------------+--------+
    | uuid                                 | label                                | status |
    +--------------------------------------+--------------------------------------+--------+
    | 2b7fe334-4ef7-4a9d-8fcb-e0d7cc009d0c | 2b7fe334-4ef7-4a9d-8fcb-e0d7cc009d0c | active |
    | centos                               | deprecated                           |        |
    +--------------------------------------+--------------------------------------+--------+

#. To check, which exactly bootstrap image is currently loaded on a discovered node:

   .. code-block:: console

    # fuel nodes

   **System response:**

   .. code-block:: console

    id | status   | name             | cluster | ip         | mac               | roles | pending_roles | online | group_id
    ---|----------|------------------|---------|------------|-------------------|-------|---------------|--------|---------
    1  | discover | Untitled (29:bb) | None    | 10.109.0.3 | 64:26:37:0b:29:bb |       |               | True   | None


#. Connect to a node by SSH and check the file:

   .. code-block:: console

      ssh 10.109.0.3 cat /etc/nailgun-agent/config.yaml

   **System response:**

   .. code-block:: console

    {runtime_uuid: 2b7fe334-4ef7-4a9d-8fcb-e0d7cc009d0c}

#. You can use Fuel web UI as well:

   * Go to ``Nodes`` tab of your environment.
   * Locate the node and click on ``gear`` button in front of the node name.
   * Expand the ``System`` tab and find ``runtime uuid`` record.

As you can see, Fuel loaded the discovered node with the bootstrap image marked
as ``Active`` in the bootstrap list.
