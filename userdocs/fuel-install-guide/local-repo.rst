.. _local-repo:

=========================
Set up a local repository
=========================

Fuel downloads the OpenStack and operating system packages
from the predefined repositories on the Fuel Master node.
If your Fuel Master node does not have an Internet connection,
you must configure a local repository mirror with the required
packages and configure Fuel to use this repository. This
configuration is done using the ``fuel-mirror`` script.

.. caution:: The ``fuel-createmirror`` script is deprecated. Use
             ``fuel-mirror`` instead.

**To set up a local repository using the Fuel CLI:**

#. Log in to the Fuel Master node CLI.
#. Create a new local mirror on the Fuel Master node:

   .. code-block:: console

    fuel-mirror create -P PROFILE_NAME -G GROUP

   where ``PROFILE_NAME`` is the name of one of files without the
   ``.yaml`` extension that are provided by the ``fuel-mirror`` package
   (``/usr/share/fuel-mirror/*.yaml``).

   **Example:**

   .. code-block:: console

    fuel-mirror create -P ubuntu -G ubuntu

#. Apply the local mirror to an environment:

   .. code-block:: console

    fuel-mirror apply -P PROFILE_NAME -G GROUP

   **Example:**

   .. code-block:: console

    fuel-mirror apply -P ubuntu -G ubuntu

#. Verify that the repository URL is successfully changed using the
   :command:`fuel2 release repos list` command.

.. note:: If you change the default Fuel root password, add the
          ``--fuel-password YOUR_PASSWORD`` flag to the script command.

About the fuel-mirror script
----------------------------

The ``fuel-mirror`` script provided with the ``fuel-mirror`` package enables
you to modify the Fuel repository sources through the Fuel CLI.

* The script uses a Docker container with Ubuntu to support dependencies
  resolution.

* To view help information, type ``fuel-mirror -h``.

* The script supports running behind an HTTP or HTTPS proxy.
  The following environment variable can be set either
  system-wide (through ``~/.bashrc``) or in the script configuration file:

  .. code-block:: console

   http_proxy=http://username:password@host:port/
