.. _cli_basic_usage:

Basic usage
-----------

Use the following usage pattern for Fuel commands:

::

  fuel [global optional args] <namespace> [action] <optional args>

**Example:**

::

  fuel --env-id=1 node set --node-id=1,4,5 --role=controller

.. list-table:: **Fuel commands parameters**
   :widths: 10 10
   :header-rows: 1

   * - Parameter
     - Description
   * - ``--env-id=1``
     - A global argument pointing to a specific environment. This is an
       optional parameter.
   * - ``node``
     - A namespace for all node control functions.
   * - ``set``
     - An action that assigns nodes with defined roles to specific
       environments.

To get the list of all global optional arguments and namespaces, run:

::

  fuel --help

To get the list of actions and optional arguments for a namespace, run:

::

  fuel <namespace> --help

