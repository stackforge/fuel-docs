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

       Use ``-e <ENV_ID>``, ``--cluster``, ``--plugins``, or ``--release``
       flags to specify an environment, cluster-, plugins-, or
       release-specific workflows.
     - ``fuel2 graph list``

       The command supports filters, such as ``-c COLUMN``,
       ``--max-width <INTEGER>``, ``-f {csv,json,table,value,yaml}``,
       and others.

   * - Upload deployment workflows of a specific graph type for
       an environment, release, or plugin to the ``YAML`` file or
       the directory that includes ``tasks.yaml`` and ``metadata.yaml``.
     - * ``fuel2 graph upload -e <ENV_ID> -t <GRAPH_TYPE> (-f YAML_FILE_NAME | -d DIR_NAME)``
       * ``fuel2 graph upload -r <RELEASE_ID> -t <GRAPH_TYPE> (-f YAML_FILE_NAME | -d DIR_NAME)``
       * ``fuel2 graph upload -p <PLUGIN_ID> -t <GRAPH_TYPE> (-f YAML_FILE_NAME | -d DIR_NAME)``

   * - Download deployment workflows from an environment.

       Use the ``-a``, ``-c``, ``-r``, or ``-p`` flag to specify
       the level of the workflows to download.
     - * ``fuel2 graph download -e <ENV_ID> -a [-t <GRAPH_TYPE>]``
       * ``fuel2 graph download -e <ENV_ID> -c [-t <GRAPH_TYPE>]``
       * ``fuel2 graph download -e <ENV_ID> -r <RELEASE_ID> [-t <GRAPH_TYPE>]``
       * ``fuel2 graph download -e <ENV_ID> -p <PLUGIN_ID> [-t <GRAPH_TYPE>]``

       | The ``-t`` parameter is optional. If not specified, the default
         workflow is downloaded.

       | The workflows downloaded with the keys ``-a`` and ``-p`` are the
         result of other workflows merge. They are not supposed to be edited
         and uploaded back, because, in most cases, they will override
         further changes in source workflows.

   * - Start deployment with given workflow types.

       Available for environments only.
     - ``fuel2 graph execute -e <ENV_ID> -t GRAPH_TYPES <GRAPH_TYPES>``

       | The ``-t GRAPH_TYPES`` parameter specifies the types of deployment
         workflow in order of execution.

   * - Delete deployment workflows.

       Use ``-e <ENV_ID>``, ``-p``, or ``-r`` flags to specify
       an environment, plugins- or release-specific workflows.
     - * ``fuel2 graph delete -e <ENV_ID> -t <GRAPH_TYPE>``
       * ``fuel2 graph delete -r <RELEASE_ID> -t <GRAPH_TYPE>``
       * ``fuel2 graph delete -p <PLUGIN_ID> -t <GRAPH_TYPE>``

   * - Run any task workflow in a ``noop`` mode to detect customizations.
     - ``fuel2 graph execute -e <ENV_ID> [-t <GRAPH_TYPE>] --noop --force``

       | The ``--force`` parameter is optional and is necessary for previously
         executed workflows or tasks to prevent tasks skipping by Fuel
         LCM engine.
