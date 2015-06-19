
.. _external-ubuntu-ops:

Downloading Ubuntu system packages
==================================

In Fuel 6.0 and older there is an option
to select an Ubuntu release in Fuel
and deploy it, since all the Ubuntu packages
are located on the Fuel Master node by default.

Now all Ubuntu packages are downloaded from
the Ubuntu official mirrors by default,
but you can specify another mirror in
Fuel UI or by using Fuel CLI.

Updates to the Mirantis packages are fetched
from the Mirantis mirrors by default.

.. note:: To be able to download Ubuntu system packages
          from the official Ubuntu mirrors and Mirantis
          packages from the Mirantis mirrors you need to make
          sure your Fuel Master node and Slave nodes have
          Internet connectivity.

To change the Ubuntu system package repositories
from the official ones to your company's local ones,
do the following:

#. In Fuel web UI, navigate to the **Settings** tab
   and then scroll down to the **Repositories** section.
#. Change the path under **URI**:

.. image:: /_images/externalUbuntu.png

.. note:: You can also change the repositories
          after a node is deployed, but the new
          repository paths will only be used for
          the new nodes that you are going to add
          to a cluster.

There is also a ``fuel-createmirror`` script on the
Fuel Master node that you can use to synchronize Ubuntu
packages to the Fuel Master node.

fuel-createmirror usage
-----------------------

The ``fuel-createmirror`` script creates and
updates local mirrors of Mirantis OpenStack
and/or Ubuntu packages.

.. note:: The script supports only rsync mirrors.
   Please refer to the `official upstream Ubuntu mirrors list <https://launchpad.net/ubuntu/+archivemirrors>`_.

The script uses a Docker container with Ubuntu to support
dependencies resolution.

The script can be installed on any Red Hat based
or Debian based system. On a Debian based system
it requires only bash and rsync. On a Red Hat based system
it also requires docker-io,
dpkg, and dpkg-devel packages (from Fedora).

When run on the Fuel Master
node, the script will attempt to set the created Mirantis OpenStack
and/or Ubuntu local repositories as the default
ones for new environments, and apply these
repositories to all the existing environments
in the "new" state. This behavior can be
changed by using the command line options
described below.

The script supports running behind an HTTP proxy
as long as the proxy is configured to allow
proxying to Port 873 (rsync). The following
environment variables can be set either
system-wide (via ~/.bashrc), or in the script
configuration file (see below):

::

   http_proxy=http://username:password@host:port/
   RSYNC_PROXY=username:password@host:port

Issue the following command to get the *fuel-createmirror* help:

::

  fuel-createmirror -h

OR

::

  fuel-createmirror --help

To create or update a local Mirantis OpenStack mirror only,
issue:

::

  fuel-createmirror -M

OR

::

  fuel-createmirror --mos

To create or update a local Ubuntu mirror only,
issue:

::

 fuel-createmirror -U

OR

::

  fuel-createmirror --ubuntu

If no parameters are specified, the script will create/update
both Mirantis OpenStack and Ubuntu mirrors.

.. note:: Options ``-M/--mos`` and ``-U/--ubuntu`` can't be used simultaneously.

To disable changing the default repositories for new environments,
issue:

::

 fuel-createmirror -d

OR

::

  fuel-createmirror --no-default

To disable applying the created repositories to all environments,
in the "new" state, issue:

::

 fuel-createmirror -a

OR

::

  fuel-createmirror --no-apply

.. note:: If you change the default password (admin) in Fuel web UI,
          you will need to run the utility with the
          ``--password`` switch, or it will fail.

The following configuration file can be used to modify the
script behavior:

::

  /etc/fuel-creamirror/common.cfg

In this file you can redefine the upstream mirrors, set local
paths for repositories, configure the upstream packages mirroring
mode, set proxy settings, enable or disable using Docker, and
set a path for logging. Please refer to the comments inside the file
for more information.

The following configuration file contains the settings related to
Fuel:

::

  /etc/fuel-createmirror/fuel.cfg

If you run the script outside of Fuel node, you may need
to redefine the FUEL_VERSION and the FUEL_SERVER parameters.

Installing on a Red Hat based server
------------------------------------

1. Configure MOS RPM repository:

::

   tee /etc/yum.repos.d/mos-rpm.repo <<EOF
   [mos-rpm]
   name=MOS RPM packages
   baseurl=http://mirror.fuel-infra.org/fwm/6.1/centos/os/x86_64
   gpgcheck=0
   enabled=0
   EOF

2. Install the package and its dependencies:

::

  yum --enablerepo=mos-rpm install fuel-createmirror

3. Check and configure the settings in ``/etc/fuel-createmirror/common.cfg``.
4. Make sure the Docker service is up and running.
5. Run ``fuel-createmirror``

Debian-based server
-------------------

1. Configure MOS DEB repository:

::

  echo "deb http://mirror.fuel-infra.org/mos/ubuntu/ mos6.1 main restricted"\
  | sudo tee /etc/apt/sources.list.d/mos-deb.list

2. Make ``apt-get update``, then install the package ``apt-get install fuel-createmirror``
3. Check and configure the settings in ``/etc/fuel-createmirror/common.cfg``.
4. Run ``fuel-createmirror``

Troubleshooting partial mirror
------------------------------

If there some packages required by your installation missing from
from the partial mirror created by the script, add them to
``/etc/fuel-createmirror/requirements-deb.txt``.

The package format to add to the ``requirements-deb.txt`` file
is simple:

::

  package1
  package2
  ...
  packageN

You can also look up the package names at
the `official Ubuntu website <http://packages.ubuntu.com/trusty/>`_.

Having done that, restart the script.
This will download all the missing packages and recreate a local
partial mirror.
