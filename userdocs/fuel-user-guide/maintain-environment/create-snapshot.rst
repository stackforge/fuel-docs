.. _create-snapshot:

============================
Create a diagnostic snapshot
============================

Fuel enables you to generate a diagnostic snapshot of your OpenStack
environment to simplify troubleshooting. The diagnostic snapshot feature
is available right after the Fuel Master node installs.

Fuel uses timmy, a diagnostic utility for OpenStack environments, to generate
diagnostic snapshots through the Fuel web UI or CLI.

**To create a diagnostic snapshot using the Fuel web UI:**

#. Log in to the Fuel web UI.
#. Navigate to :menuselection:`Support > Download Diagnostic Snapshot`.
#. Click :guilabel:`Generate Diagnostic Snapshot`.

By default, Fuel generates a diagnostic snapshot of all OpenStack nodes
with logging details for the last 3 days creating a ``.tar`` tarball with
archives inside that becomes available for downloading once the generation
of a snapshot completes successfully.

**To create a diagnostic snapshot using the Fuel Master CLI:**

#. Log in to the Fuel Master CLI.
#. Use the :command:`timmy` command to create a snapshot:

   .. code-block:: console

      timmy

   The :command:`timmy` command initiates the snapshot creation of all
   OpenStack nodes without log collection and according to default
   configuration.

   You can specify additional options for the :command:`timmy` command.

   **Examples:**

   * Create a diagnostic snapshot according to default configuration but
     with log collection for a definite period of time in days:

     .. code-block:: console

        timmy --logs --days <NUM>

     .. note:: If not specified, timmy collects logging information for
               the last 30 days.

   * Run timmy on a particular OpenStack node:

     .. code-block:: console

        timmy --env <ENV_ID> --id <NODE_ID>

   * Run timmy on a particular node role:

     .. code-block:: console

        timmy --role <ROLE_NAME>

   * Specify a custom filename for the snapshot archive:

     .. code-block:: console

        timmy --dest-file <FILE_NAME>

     If log files are collected, they will be placed in the specified folder
     but as separate archives.

     .. note:: By default, timmy creates a ``general.tar.gz`` snapshot
               and stores it in ``/tmp/timmy/archives``.

.. seealso::

   * `Timmy documentation <http://timmy.readthedocs.io/en/latest/index.html>`__
