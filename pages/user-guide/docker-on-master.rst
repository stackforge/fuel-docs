Docker provides user-friendly commands that can be used to deploy 
`LXC <https://linuxcontainers.org/> (Linux Containers)`.  Linux Containers are
piecemeal containers that can be modified, upgraded, and backed up 
independently. Docker brings LXC to the  foreground by wrapping it with 
user-friendly commands. Coupled with volume and port linking capabilities,
 Docker can let you replace your complex server install with smaller,
manageable containers. On top of that, Docker's image format allows you to 
build once and deploy everywhere.

Background
----------

Docker contains a rich toolkit for building, running, and sharing containers
that run on LXC. However, there are some limits in offline image handling
and container versioning that requires a wrapper, dockerctl. Dockerctl is a
simple wrapper for Docker that adds additional management tools in order to
help manage your Fuel deployment. The list of limitations in Docker is 
relatively short, but they include:
* Ability to use the same idempotent identifiers across application versions 
(such as rabbitmq)
* Ability to expose DHCP broadcast traffic to an LXC container running Cobbler
and dnsmasq.
* Utility for running arbitrary commands or exposing a shell in a Docker 
container (via lxc-attach).
* Implement image management that really works in a deployment without Internet
access.

Benefits
--------

Docker's image and Dockerfile format allow you to design containers that behave
predictably on any system. Additionally, multiple copies of the same image can
run at the same time, enabling upgrades to take place without showing any
service interruptions to an end user.


Docker container versus KVM
---------------------------

Docker/LXC offer several advantages, but it is worth stating that there are 
some limitations. Containers inside Docker use the same kernel as your host OS.
It means that the disk footprint for a container is smaller and has less memory
overhead. Additional limitations to running on Docker/LXC to take note of:
* Process limits cannot be modified
* Custom or different kernel modules cannot be loaded
* If the parent process of a container exits, the container is considered off.
* There is no pause or live migration.
* No ability to use linked ports or volumes during docker build process

Container types
---------------

Application Container
+++++++++++++++++++++

An application container is the most common type of container. It usually runs
a single process in the foreground and logs to stdout/stderr. Docker traps
these logs and saves it automatically in its database.

Storage Container
+++++++++++++++++

A storage container is a minimalistic container that runs Busybox and acts as a
sharer of one or more directories. It needs to run only one time and then spends
the majority of its existence in Exited state.
Command reference
-----------------

Below is a list of commands that are useful in connection with managing LXC
containers on Fuel Master.

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

.. note:: the storage containers used for sharing files among application 
   containers are usually in Exited state. Exited state means that the 
   container  exists, but no processes inside are running.

Start a new Docker container with specified commands. 
::

  docker run [options] imagename [command]

*Example:* The command below creates a temporary postgres container that is 
ephemeral and not tied to any other containers. It is be useful for 
testing without impacting production containers.
::

  docker run --rm -i -t fuel/postgres /bin/bash

Import a Docker image
::

  docker load -i (archivefile)

Loads in a Docker image in the following formats: .tar, .tar.gz, .tar.xz. lrz is
not supported.

Save a Docker image to a file.
::

  docker save image > image.tar

Dockerctl
+++++++++

Builds and runs storage containers, then runs application containers.
::
  dockerctl build all
.. note:: This can take a few minutes, depending on your hardware

Launches a container from its image with the necessary options. If container 
already exists, will ensure that this container is in a running state.
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

Create a shell or run a command
::
  dockerctl shell **appname** [command]
.. note:: The container must be running first in order to use this feature.
   Additionally, quotes must be escaped if your command requires them.

Stop and destroy a container
::
  dockerctl destroy **appname**
.. note:: This is not reversible, so use with caution.


System changes affecting Fuel 5.0 and later
-------------------------------------------

There are a number of changes to note about modifications to the Fuel Master 
base system itself. These changes were made mostly to enable directory sharing 
between containers to operate smoothly:
* /etc/astute.yaml moved to /etc/fuel/astute.yaml
* /etc/nailgun/version.yaml moved to /etc/fuel/version.yaml
* Base OS puppet is now run from 
/etc/puppet/modules/nailgun/examples/host-only.pp
* Postgres DB is now inside a container. You can access it if you run dockerctl
shell postgres or connect to localhost from base host.
* DNS resolution is now performed inside the cobbler container. Additional 
custom entries should be added inside /etc/dnsmasq.d/ inside the cobbler 
container or via Cobbler itself.
* Cobbler operates inside LXC with the help of dhcrelay running on the host.
* Application logs are inside /var/log/docker-logs, including astute, nailgun,
cobbler, and others.
* Supervisord configuration is located inside 
/etc/supervisord.d/(CurrentRelease)/
* Containers are automatically restarted by supervisord. If you need to stop
a container for any reason, first run supervisorctl stop /app/, and then 
dockerctl stop /app/

Fuel Master architecture changes
--------------------------------

In order to enable containerization of Fuel Master's services, several pieces
of the Fuel Master node design were changed. Most of this change came from 
Puppet, but below is a list of modifications to Fuel to enable Docker:
* DNS lookups come from Cobbler container
* App containers launch in order, but not in a synchronous manner. Retries
were added to several sections of deployment in case a dependent service is
not yet ready.
* The version.yaml file is exstended to include production key with values
docker and docker-build.
* Extended Docker's default iptables rules to ensure traffic visibility is 
appropriate for each service.

Backing up Mirantis OpenStack (Experimental)
--------------------------------------------

You can now back up your Fuel deployment with no downtime. In order to back up 
Fuel, you need to make sure your system meets these requirements:
* No environments are currently deploying
* You have at least 10gb free in /var partition

Load this script onto your system and run it: 
https://gist.github.com/mattymo/fdda177ca346a19dbafa (Work in progress)

Restoring from backup (Experimental)
------------------------------------

Restoring can be done at any point, but keep in mind that the following data
will be replaced:
* Puppet manifests
* CentOS and Ubuntu repositories
* Logs
* DB data
* All OpenStack environment configuration

If you have deployed a new system since the backup, it may need to be 
manually reset to bootstrap mode so that it can be usable in the
environment again.
