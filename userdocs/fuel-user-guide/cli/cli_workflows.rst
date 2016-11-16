.. _cli-workflows:

========================================
Deployment workflows management commands
========================================

The following table describes the deployment workflows management commands
supported by the Fuel CLI.

.. list-table:: **Deployment workflows management commands**
   :widths: 15 20
   :header-rows: 1

   * - Description
     - Command

   * - List deployment workflows.
     - ``fuel2 graph list -e <ENV_ID>``

   * - Upload deployment workflows for an environment, release, or plugin
       to the ``tasks.yaml`` file.
     - * ``fuel2 graph upload -e <ENV_ID> [-t <GRAPH_TYPE>] --file tasks.yaml``
       * ``fuel2 graph upload -r <RELEASE_ID> [-t <GRAPH_TYPE>] --file tasks.yaml``
       * ``fuel2 graph upload -p <PLUGIN_ID> [-t <GRAPH_TYPE>] --file tasks.yaml``

       | The ``-t`` parameter is optional. If not specified, the default workflow is uploaded.

   * - Download deployment workflows from a certain environment.
       Use the ``--all``, ``--cluster``, ``-r``, or ``-p`` flag to specify the level of the workflows to download.
     - * ``fuel2 graph download -e <ENV_ID> --all [-t <GRAPH_TYPE>] [--file <cluster_graph.yaml>]``
       * ``fuel2 graph download -e <ENV_ID> --cluster [-t <GRAPH_TYPE>] [--file <cluster_graph.yaml>]``
       * ``fuel2 graph download -e <ENV_ID> -r <RELEASE_ID> [-t <GRAPH_TYPE>] [--file <cluster_graph.yaml>]``
       * ``fuel2 graph download -e <ENV_ID> -p <PLUGIN_ID> [-t <GRAPH_TYPE>] [--file <cluster_graph.yaml>]``

       | The ``-t`` parameter is optional. If not specified, the default workflow is downloaded.

       | The workflows downloaded with the keys ``--all`` and ``-p`` are the
         result of other workflows merge. They are not supposed to be edited and uploaded back,
         because, in most cases, they will override further changes in source workflows.

   * - Execute deployment workflows. Available for environments only.
     - ``fuel2 graph execute -e <ENV_ID> [-t <GRAPH_TYPE>] [--node <node_id>]``

       | The ``-t`` parameter is optional. If not specified, the default workflows is downloaded.

   * - Delete deployment workflows.
     - ``fuel2 graph delete [-e <ENV_ID>] [-r <RELEASE_ID>] [-p <PLUGIN_ID>] -t <GRAPH_TYPE>``

   * - Run any task workflow in a ``noop`` mode to detect customizations.
     - ``fuel2 graph execute -e <ENV_ID> [-t <GRAPH_TYPE>] --noop --force``

       | The ``--force`` parameter is optional and is necessary for previously
         executed workflows or tasks to prevent tasks skipping by Fuel
         LCM engine.