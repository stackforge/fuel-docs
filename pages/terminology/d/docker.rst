
.. _docker-term:

Docker containers and dockerctl
-------------------------------

Docker and dockerctl provide tools used to deploy applications
in :ref:`lxc-term` containers.
Docker brings LXC to the  foreground
by wrapping it with user-friendly commands.
Coupled with volume and port linking capabilities,
Docker lets you replace your complex server install
with smaller, more manageable containers.
Other benefits of Docker include:

* Docker's image format allows you
  to build once and deploy everywhere.
* Docker's image and Dockerfile format
  allow you to design containers
  that behave predictably on any system.
* Multiple copies of the same image can run at the same time,
  enabling upgrades to take place
  without showing any service interruptions to an end user.

See the `docker <http://www.docker.io>`_ home page.

Containers inside Docker do not include a copy of the kernel;
instead, they use the same kernel as your host operating system,
which means the disk footprint for a container is smaller
and has less memory overhead than a traditional Virtual Machine.
However, containers have some limitations
compared to kernel VMs:

* Process limits cannot be modified
* Custom or different kernel modules cannot be loaded
* If the parent process of a container exits, the container is considered off
* No pause or live migration functionality is supported
* Linked ports or volumes cannot be used during the docker build process

Dockerctl is a simple wrapper for Docker
that improves Docker's offline image handling
and container versioning.
Dockerctl augments basic Docker with the following capabilities:

* Ability to use the same idempotent identifiers across application versions
  (such as RabbitMQ)
* Ability to expose DHCP broadcast traffic to an LXC container
  running Cobbler and dnsmasq.
* Utility for running arbitrary commands or exposing a shell
  in a Docker container (via lxc-attach).
* Implement image management that really works
  in a deployment without Internet access.

Fuel 5.0 and later use Docker containers
for the Postgres database, Cobbler, Puppet,
and other components.
See :ref:`fuel-docker-changes` for more information.

See :ref:`docker-ops` for a list of commands
that are useful for managing LXC containers
on the Fuel Master.
