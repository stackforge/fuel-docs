.. _bootstrap_builder:

Overview of the Fuel bootstrap builder
--------------------------------------

The bootstrap generator creates bootstrap images for the Fuel Master node
that Fuel will use to boot the Fuel Slave nodes. The bootstrap
generator uses default configurations, however, you
can modify these settings.

You can customize a Fuel bootstrap image using one of the following options:

* Set additional packages for the installation.
* Copy custom files into the root bootstrap.
* Run a user script at the bootstrap file system during the image
  creation.


You can configure Fuel bootstrap images using the ``fuel-bootstrap`` command:

.. code-block:: console

    usage: fuel-bootstrap [--version] [-v] [--log-file LOG_FILE] [-q] [-h]
                          [--debug]


.. list-table:: **Optional arguments**
   :widths: 10 25
   :header-rows: 0

   * - Option
     - Description
   * - ``--version``
     - Shows a program's version number and exits.
   * - ``-v``, ``--verbose``
     - Increases a verbosity of output. Can be repeated.
   * - ``--log-file LOG_FILE``
     - Specify a file to log output. Disabled by default.
   * - ``-q``, ``--quiet``
     - Suppress output except for warnings and errors.
   * - ``-h``, ``--help``
     - Shows this help message and exits.
   * - ``--debug``
     - Shows tracebacks on errors.


.. list-table:: **Commands to operate with a bootstrap image**
   :widths: 5 25
   :header-rows: 0

   * - Command
     - Description
   * - ``activate``
     - Activates the specified bootstrap image.
   * - ``build``
     - Builds a new bootstrap image with the specified parameters.
   * - ``delete``
     - Deletes the specified bootstrap image from the system.
   * - ``help``
     - Print the detailed help information for the corresponding command.
   * - ``import``
     - Imports an already created bootstrap image to the system.
   * - ``list``
     - Lists all available bootstrap images.
