.. _create-snapshot:

============================
Create a diagnostic snapshot
============================

Fuel enables you to generate a diagnostic snapshot of your OpenStack
environment to simplify troubleshooting. The diagnostic snapshot feature
is available right after the Fuel Master node installs.

Fuel uses timmy, a diagnostic utility for OpenStack environments, to generate
diagnostic snapshots through the Fuel web UI or CLI.

**To create a diagnostic snapshot:**

* Using the Fuel web UI:

  #. Log in to the Fuel web UI.
  #. Navigate to :guilabel:`Support > Download Diagnostic Snapshot`.
  #. Click :guilabel:`Generate Diagnostic Snapshot`.

  By default, Fuel generates a diagnostic snapshot of all OpenStack nodes
  with loggng details for the last 3 days creating the ``tar.gz`` archive
  that becomes available for downloading once the generation of a snapshot
  completes successfully.

* Using the Fuel Master CLI:

  #. Log in to the Fuel Master CLI.
  #. Use the timmy CLI to create a snapshot.

     By typing the :command:`timmy` command, you will initiate the snapshot
     creation of all OpenStack nodes without logging collection for the last
     30 days. 

     Though, depending on your needs, you can specify different options.
     For example:

     * To gather logging information from a particular OpenStack node:

       .. code-block:: console

          timmy --env <ENV_ID> --id <NODE_ID>

     * To specify a role to run timmy on:

       .. code-block:: console

          timmy --role <ROLE_NAME>

     * By default, timmy creates a ``general.tar.gz`` snapshot and stores it
       in ``/tmp/timmy/archives``. To specify a filename for the archive:

       .. code-block:: console

          timmy --dest-file <FILE_NAME>

       If log files are collected, they will be placed in the same folder
       but separate archives.

.. seealso::

   * `Timmy documentation <http://timmy.readthedocs.io/en/latest/index.html>`__
