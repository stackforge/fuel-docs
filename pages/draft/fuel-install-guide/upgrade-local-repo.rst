.. _upgrade_local_repo:

Set up a local repository
=========================

You can set up local repositories in the Fuel Web UI
or through CLI using the ``fuel-createmirror`` script.

**To set up a local repository in the Fuel Web UI**

#. In Fuel Web UI, navigate to the **Settings** tab
   and then scroll down to the **Repositories** section.
#. Change the path under **URI**.

**To set up a local repository with the fuel-createmirror script**

You need to set up a local repository for the Mirantis OpenStack
environment and Ubuntu packages if there is no Internet connection
for your Fuel Master node.

If there is Internet connection, skip this section and go to
:ref:`upgrade_major_versions`.

#. Run the ``fuel-createmirror`` script delivered with your Fuel ISO:

 * If you did not change the default password of your Fuel installation,
   log in to the Fuel Master node and issue the following command::

     fuel-createmirror

 * If you changed the password of your Fuel installation,
   issue the following command::

     fuel-createmirror --password PASSWORD

   where PASSWORD is your Fuel Master node password.

 ``fuel-createmirror`` details:

  * The script supports only rsync mirrors.
    See the `official upstream Ubuntu mirrors list <https://launchpad.net/ubuntu/+archivemirrors>`_.

  * The script uses a Docker container with Ubuntu to support dependencies
    resolution.

  * To get all the available options, issue ``fuel-createmirror -h``.

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

#. Restart the docker daemon::

     service docker restart

   Or alternatively (recommended), reboot the Fuel Master node.

Proceed to :ref:`upgrade_major_versions`.
