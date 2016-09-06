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

* Using the Fuel Master CLI:

  #. Log in to the Fuel Master CLI.
  #. Depending on your needs, configure the creation of a diagnostic snapshot:

     * To gather logging information from a particular OpenStack node:

       .. code-block:: console

          timmy --env <ENV_ID> --id <NODE_ID>

     * To designate the time frame the logging information should cover:

       .. code-block:: console

          timmy --days <NUM>

       The default log collection period is 30 days.

     * To specify a role to run timmy on:

       .. code-block:: console

          timmy --env <ENV_ID> --role <ROLE_NAME>

     * To specify a filename for the archive in the ``tar.gz`` format to
       store a shapshot:

       .. code-block:: console

          timmy --dest-file <FILE_NAME>

       If log files are collected, they will be placed in the same folder
       but as separate archives.

       By default, timmy creates a ``general.tar.gz`` snapshot and stores it
       in ``/tmp/timmy/archives``.

.. seealso::

   * `Timmy documentation <http://timmy.readthedocs.io/en/latest/index.html>`__
