.. _upgrade_local_repo:

Set up a local repository
=========================

Fuel downloads the OpenStack and operating system packages
from the predefined repositories on the Fuel Master node.
If your Fuel Master node does not have an Internet connection,
you must configure a local repository mirror with the required
packages and configure Fuel to use this repository.

You can set up a local repository in the Fuel web UI
or through Fuel CLI using the ``fuel-createmirror`` script.

**To set up a local repository in the Fuel web UI**

#. In the Fuel web UI, navigate to the **Settings** tab
   and then scroll down to the **Repositories** section.
#. Change the path under **URI**.

**To set up a local repository with the ``fuel-createmirror`` script**

#. Log in to the Fuel Master node CLI.
#. Run the ``fuel-createmirror`` script:

 * If you use the default Fuel root password, type::

     fuel-createmirror

 * If you change the default Fuel root password, type::

     fuel-createmirror --password PASSWORD

#. Restart the the docker daemon::

    service docker restart

   Alternatively (recommended), reboot the Fuel Master node.

About ``fuel-createmirror``
---------------------------

The ``fuel-createmirror`` is a built-in Fuel script that enables
you to modify the Fuel repository sources from the CLI.

``fuel-createmirror`` details:

  * The script supports only rsync mirrors.
    See the `official upstream Ubuntu mirrors list <https://launchpad.net/ubuntu/+archivemirrors>`_.

  * The script uses a Docker container with Ubuntu to support dependencies
    resolution.

  * To view help information, type ``fuel-createmirror -h``.

  * The script supports running behind an HTTP proxy configured to
    Port 873 (rsync). The following environment variables can be set either
    system-wide (via ~/.bashrc), or in the script configuration file::

       http_proxy=http://username:password@host:port/
       RSYNC_PROXY=username:password@host:port

    You can also configure Docker to use the proxy to download the Ubuntu
    image needed to resolve the packages dependencies. Add the environment
    variables to the `/etc/sysconfig/docker` file, and export them::

      http_proxy=http://username:password@host:port/
      RSYNC_PROXY=username:password@host:port
      export http_proxy RYSNC_PROXY
