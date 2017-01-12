.. _upgrade_local_repo:

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

    fuel-mirror create -P REPO_NAME -G GROUP

   **Example:**

   .. code-block:: console

    fuel-mirror create -P ubuntu -G ubuntu

#. Apply the local mirror to an environment:

   .. code-block:: console

    fuel-mirror apply -P REPO_NAME -G GROUP

   **Example:**

   .. code-block:: console

    fuel-mirror apply -P ubuntu -G ubuntu

#. Reboot the Fuel Master node.

#. Verify that the repository URL is successfully changed:

   #. Log in to the Fuel web UI.
   #. Navigate to the :guilabel:`Settings` tab.
   #. Scroll down to the :guilabel:`Repositories` section.
   #. Verify that the new repository URI is listed in this section.

.. note:: If you change the default Fuel root password, add the
          ``--fuel-password YOUR_PASSWORD`` flag to the script command.

About the fuel-mirror script
----------------------------

The ``fuel-mirror`` is a built-in Fuel utility that enables
you to modify the Fuel repository sources through the Fuel CLI.

* The script supports only RSYNC mirrors.
  See the `the list of official upstream Ubuntu mirrors <https://launchpad.net/ubuntu/+archivemirrors>`_.

* The script uses a Docker container with Ubuntu to support dependencies
  resolution.

* To view help information, type ``fuel-mirror -h``.

* The script supports running behind an HTTP proxy configured to
  port 873 (RSYNC). The following environment variables can be set either
  system-wide (through ``~/.bashrc``), or in the script configuration file:

  .. code-block:: console

   http_proxy=http://username:password@host:port/
   RSYNC_PROXY=username:password@host:port

* You can also configure Docker to use proxy to download the Ubuntu
  image needed to resolve the packages dependencies. Add the environment
  variables to the ``/etc/sysconfig/docker`` file and export them:

  .. code-block:: console

   http_proxy=http://username:password@host:port/
   RSYNC_PROXY=username:password@host:port
   export http_proxy RYSNC_PROXY
