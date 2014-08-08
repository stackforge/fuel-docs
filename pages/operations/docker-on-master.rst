.. _docker-ops:

Docker Containers and Dockerctl
===============================

Docker provides user-friendly commands
that can be used to deploy :ref:`lxc-term` containers.

* Docker brings LXC to the  foreground by wrapping it with user-friendly commands.
* Dockerctl is a simple wrapper for Docker
  that improves Docker's offline image handling and container versioning.
  It adds additional management tools
  that are useful when managing your Fuel deployment.

See :ref:`docker-term` for more background information.

Container types
---------------

Application Container
    An application container is the most common type of container.
    It usually runs a single process in the foreground and writes logs to stdout/stderr.
    Docker traps these logs and saves them automatically in its database.

Storage Container
    A storage container is a minimalistic container
    that runs Busybox and acts as a sharer of one or more directories.
    It needs to run only one time and then spends
    the majority of its existence in Exited state.

Command reference
-----------------

Below is a list of commands that are useful when managing LXC containers on the Fuel Master.

Basic usage
+++++++++++
Get a list of available commands
::

  docker help


Get a list of all running containers
::

  docker ps

Get a list of all containers available
::

  docker ps -a

.. note:: the storage containers used for sharing files among application containers
   are usually in Exited state. Exited state means that the
   container  exists, but no processes inside are running.

Start a new Docker container with specified commands.
::

  docker run [options] imagename [command]

*Example:* The command below creates a temporary postgres container that is
ephemeral and not tied to any other containers.
This is useful for testing without impacting production containers.
::

  docker run --rm -i -t fuel/postgres /bin/bash

Import a Docker image
::

  docker load -i (archivefile)

Loads in a Docker image in the following formats: .tar, .tar.gz, .tar.xz.
lrz is not supported.

Save a Docker image to a file.
::

  docker save image > image.tar

Dockerctl
+++++++++

Build and run storage containers, then run application containers.
::

  dockerctl build all

.. note:: This can take a few minutes, depending on your hardware

Launch a container from its image with the necessary options.
If the container already exists,
will ensure that this container is in a running state.
::

  dockerctl start **appname* [--attach]

Optionally, --attach can be used to monitor the process and view its stdout and
stderr.


Display the entire container log for /app/. Useful for troubleshooting.
::

  dockerctl logs **appname**

Stop or restart a container
::

  dockerctl stop|restart **appname**

Create a shell or run a command.
::

  dockerctl shell **appname** [command]

.. note:: The container must be running first in order to use this feature.
   Additionally, quotes must be escaped if your command requires them.

Stop and destroy a container
::

  dockerctl destroy **appname**

.. note:: This is not reversible, so use with caution.

.. _fuel-docker-changes:

System changes for Docker affecting Fuel 5.0 and later
------------------------------------------------------

The Fuel Master base system is modified in 5.0.
These changes were made mostly to enable directory sharing
between containers to operate smoothly:

* /etc/astute.yaml moved to /etc/fuel/astute.yaml
* /etc/nailgun/version.yaml moved to /etc/fuel/version.yaml
* Base OS puppet is now run from
  /etc/puppet/modules/nailgun/examples/host-only.pp
* Postgres DB is now inside a container.
  You can access it if you run "dockerctl shell postgres"
  or connect to localhost from base host.
* DNS resolution is now performed inside the cobbler container.
  Additional custom entries should be added inside /etc/dnsmasq.d/
  inside the cobbler container or via Cobbler itself.
* Cobbler operates inside LXC with the help of dhcrelay running on the host.
* Application logs are inside /var/log/docker-logs,
  including astute, nailgun, cobbler, and others.
* Supervisord configuration is located inside /etc/supervisord.d/(CurrentRelease)/
* Containers are automatically restarted by supervisord.
  If you need to stop a container for any reason,
  first run supervisorctl stop /app/, and then dockerctl stop /app/

Fuel Master architecture changes for Docker
-------------------------------------------

In order to enable containerization of the Fuel 5.0 Master's services,
several pieces of the Fuel Master node design were changed.
Most of this change came from Puppet,
but below is a list of modifications to Fuel to enable Docker:

* DNS lookups come from Cobbler container
* App containers launch in order, but not in a synchronous manner.
  Retries were added to several sections of deployment
  in case a dependent service is not yet ready.
* The version.yaml file is extended to include production key
  with values docker and docker-build.
* Extended Docker's default iptables rules to ensure
  that traffic visibility is appropriate for each service.
