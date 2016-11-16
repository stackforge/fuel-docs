.. _cli-graphs:

=====================================
Deployment graphs management commands
=====================================

The following table describes the deployment graphs management commands
supported by the Fuel CLI.

.. list-table:: **Deployment graphs management commands**
   :widths: 15 20
   :header-rows: 1

   * - Description
     - Command

   * - List deployment graphs.
     - ``fuel2 graph list --env <env_id>``

   * - Upload deployment graphs for an environment, release, or plugin
       to the ``tasks.yaml`` file.
     - * ``fuel2 graph upload --env <env_id> [--type graph_type] --file tasks.yaml``
       * ``fuel2 graph upload --release <release_id> [--type graph_type] --file tasks.yaml``
       * ``fuel2 graph upload --plugin <plugin_id> [--type graph_type] --file tasks.yaml``

       | The ``--type`` parameter is optional. If not specified, the default graph is uploaded.

   * - Download deployment graphs from a certain environment. Use the ``--all``, ``--cluster``, ``--release``, or ``plugins`` flag to specify the level of the graphs to download.
     - * ``fuel2 graph download --env <env_id> --all [--type <graph_type>] [--file <cluster_graph.yaml>]``
       * ``fuel2 graph download --env <env_id> --cluster [--type <graph_type>] [--file <cluster_graph.yaml>]``
       * ``fuel2 graph download --env <env_id> --release [--type <graph_type>] [--file <cluster_graph.yaml>]``
       * ``fuel2 graph download --env <env_id> --plugins [--type <graph_type>] [--file <cluster_graph.yaml>]``

       | The ``--type`` parameter is optional. If not specified, the default graph is downloaded.

       | The graphs downloaded with the keys ``--all`` and ``--plugins`` are the
         result of other graphs merge. They are not supposed to be edited and uploaded back,
         because, in most cases, they will override further changes in source graphs.

   * - Execute deployment graphs. Available for environments only.
     - ``fuel2 graph execute --env <env_id> [--type <graph_type>] [--node <node_id>]``

       | The ``--type`` parameter is optional. If not specified, the default graph is downloaded.

   * - Delete deployment graphs. Available for environments only.
     - ``fuel2 graph delete -e <ENV_ID> [-r <RELEASE_ID>] [-p <PLUGIN_ID>] [-t <GRAPH_TYPE>]``

       | The ``-t`` parameter is optional. If not specified, the default
         graph is deleted.

   * - Run any task graph in a ``noop`` mode to detect customizations.
     - ``fuel2 graph execute --env <env_id> [--type <graph_type>] --noop --force``

       | The ``--force`` parameter is optional and is necessary for previously
         executed graphs or tasks to prevent tasks skipping by Fuel LCM engine.