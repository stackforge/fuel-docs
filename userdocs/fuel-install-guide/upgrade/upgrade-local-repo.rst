.. _upgrade_local_repo:

=========================
Set up a local repository
=========================

Fuel downloads the OpenStack and operating system packages
from the predefined repositories on the Fuel Master node.
If your Fuel Master node does not have an Internet connection,
you must configure a local repository mirror with the required
packages and configure Fuel to use this repository.

You can set up a local repository using the Fuel web UI
or the Fuel CLI with the help of the ``fuel-mirror`` script.

.. caution:: The ``fuel-createmirror`` script is deprecated. Use
             ``fuel-mirror`` instead.

**To set up a local repository using the Fuel web UI:**

#. In the Fuel web UI, navigate to the :guilabel:`Settings` tab
   and then scroll down to the :guilabel:`Repositories` section.
#. Change the path under :guilabel:`URI`.

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

#. Restart the Docker daemon:

   .. code-block:: console

    service docker restart

   Alternatively (recommended), reboot the Fuel Master node.

.. note:: If you change the default Fuel root password, add the
          ``--fuel-password YOUR_PASSWORD`` flag to the script command.

.. important:: If you do not specify any parameters, running the ``fuel-mirror``
               script will:

               #. Create or update both Mirantis OpenStack and Ubuntu local
                  mirrors.
               #. Set these mirrors as repositories for existing
                  environments.
               #. Set the mirrors as the default repositories for new
                  environments.

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
