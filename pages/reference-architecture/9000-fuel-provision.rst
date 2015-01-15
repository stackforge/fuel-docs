
.. _fuel-agent-arch:

Two provisioning methods
========================

The are two possible methods how to provision an operating system on a node.
They are:

1) Classic method is when Anaconda or Debian-installer are used. They are
run on each node and build operating system from scratch on each node using
online or local repositories.

2) Image based method assumes operating system image is built once and then it
is copied on all nodes as is without changing it.

Since Mirantis Openstack 6.1 image based method is used by default. It
significantly reduces the time required for provisioning and it is more
reliable to copy the same image on all nodes instead of build OS from scratch
on each node.

Fuel Agent
==========

Image based provisioning is implemented in terms of so called Fuel Agent. Image
based provisioning process consists of two independent steps which are:

1) OS image building.

This step assumes we build OS image from a set of repositories
in a directory which is then packed into OS image. Build script is run once no matter
how many nodes one is going to deploy.

Currently, CentOS image is built on the development stage and then this image
is put on Mirantis Openstack ISO and used for all CentOS based environments.

Ubuntu images are built on the master node, one OS image per environment. We need
to build different images for different environments because each environment
has its own set of repositories and OS image being built from a set of repositories
might differ from one being built from other set of repositories due to packages differences.
When a user clicks "Deploy changes" button, we check if OS package is already
available for a particular environment and if it is not, we build a new one just
before starting actual provisioning.

2) Copying of OS image to nodes.

OS images being built are available via HTTP on the master node and can be downloaded.
So, when a node is booted into so called Bootstrap operating system, we can run
an executable script to download necessary OS image and put it on a hard drive.
We don't need to reboot the node into installer OS like we do when use Anaconda
or Debian-installer. Our excutable script in this case plays the same role. We just
need it to be installed into Bootstrap OS.

For both these steps we have a special program component which is called Fuel Agent.
And Fuel Agent is nothing more than just a set of data driven executable scripts.
One of these scripts is used for building OS images and we run this script on the
master node passing a set of repository URIs and a set of package names to it.
Another script is used for actual provisioning. We run it on each node and pass
provisioning data to it. These data contain information about disk partitions,
initial node configuration, OS image location, etc. So, this script being run
on a node, prepares disk partitions, downloads OS images and puts these images
on partitions. It is necessary to note that when we say OS image we actually mean
a set of images, one per file system. If, for example, we want / and /boot be two
separate file systems, then it means we need to separate OS images, one for / and
another for /boot. Images in this case are binary copies of corresponding file
systems.


Fuel Agent
==========

Like it's already said Fuel Agent is a set of data driven executable scripts. It
is written in Python. Its high level architecture is as depicted below

.. image:: /_images/fuel-agent-architecture.png
   :width: 100%

When we run one of its executable entry we pass input data to it where it is written
what needs to be done and how. We also point out which data driver it needs to use
in order to parse these input data. For example:

.. code-block :: sh

   /usr/bin/fa_provision --input_data_file /tmp/provision.json --data_driver nailgun

The heart of Fuel Agent is manager *fuel_agent/manager.py* which does not directly understand
input data but it does understand sets of Python objects defined in *fuel_agent/objects*.
Data driver is the place where raw input data are converted into a set of objects.
Using this set of objects manager then does something useful like creating partitions,
building OS images, etc. But manager implements only high level logic for all these
cases and uses low level utility layer which is defined in *fuel_agent/utils* to
perform real actions like launching parted or mkfs commands.

Fuel Agent config file is located in /etc/fuel-agent/fuel-agent.conf. There are plenty
of configuration parameters that can be set and all these parameters have default
values which are defined in the source code. All configuration parameters are well
commented.

One of Fuel Agent's abilities is to create cloud-init config drive (see `cloud-init <https://cloudinit.readthedocs.org/en/latest/>`_ documentation for details) using jinja2 templates. These templates are installed in */usr/share/fuel-agent/cloud-init-templates*. These templates are filled with values given from input data.


Image building
==============

When Ubuntu based environment is being provisioned, there is a pre-provisioning task which
runs /usr/bin/fa_build_image script. This script is one of executable Fuel Agent
entry points. This script is installed in 'mcollective' docker container on the
master node. As input data we pass a list of Ubuntu repositories from which OS image is
to be built and some other metadata. Being launched, Fuel Agent checks if there is Ubuntu image available for this environment and if there is not, it builds OS image and puts
this image in a directory defined in input data so as to make it available via
HTTP. See sequence diagram below:

.. image:: /_images/fuel-agent-build-image-sequence.png
    :width: 100%



OS provisioning
===============

Fuel Agent is installed into Bootstrap ramdisk. So, OS can be easily installed on a node
if this node is booted with this ramdisk. No need to reboot a node into installer
OS like we usually do when use Anaconda or Debian-installer. The only thing we
need to do is to run /usr/bin/fa_provision executable entry point passing input data to it.

Input data need to contain at least the following information:

- Partitioning scheme for the node. This scheme needs to contain information about
  necessary partitions and on which disks we need to create these partitions, information
  about necessary LVM groups and volumes, about software raid devices. This scheme
  contains also information about on which disk a bootloader needs to be installed and
  about necessary file systems and their mount points. On some block devices we are
  assumed to put OS images (one image per file system), while on other block devices
  we need to create file systems using *mkfs* command.

- OS images URIs. Fuel Agent needs to know where to download images and which protocol
  to use for this (by default HTTP is used).

- Data for initial node configuration. Currently, we use cloud-init for initial configuration and
  Fuel Agent prepares cloud-init config drive which is put on a small partition at the end of
  first hard drive. Config drive is created using jinja2 templates which are to be filled with
  values given from input data. After first reboot cloud-init is run by upstart or similar. It then
  finds this config drive and configures services like ntp, mcollective, etc. It also
  performs initial network configuration so as to make it possible for Fuel to access this
  particular node via ssh or mcollective and run puppet to perform final deployment.


Sequence diagram is shown below:

.. image:: /_images/fuel-agent-sequence.png
   :width: 100%


.. _view-fuel-master-config-op:

Viewing the control files on the Fuel Master node
-------------------------------------------------

Fuel Agent is part of the bootstrap ramdisk functionality.
One can see the contents of the bootstrap ramdisk
using the following commands:

::

  cd /var/www/nailgun/bootstrap
  mkdir initramfs
  cd initramfs
  gunzip -c ../initramfs.img | cpio -idv

You are now in the root file system of the ramdisk
and can view the files that are included in the bootstrap node.
For example:

::

  cat /etc/fuel-agent/fuel-agent.conf

Troubleshooting image-based provisioning
----------------------------------------

The following files provide information
for analyzing problems with the Fuel Agent provisioning.

- **Bootstrap**

  - *etc/fuel-agent/fuel-agent.conf* --
    main configuration file for the Fuel Agent,
    defines the location of the provision data file,
    data format and log output,
    whether debugging is on or off, and so forth.

  - *tmp/provision.json* -- Astute puts this file on a node
    (on the in-memory file system) just before running
    the **provision** script.

  - *usr/bin/provision* -- executable entry point for provisioning.
    Astute runs this; it can also be run manually.

- **Master**

  - *var/log/remote/node-N.domain.tld/bootstrap/fuel-agent.log* --
    File where Fuel Agent log messages are recorded
    when the **provision** script is run;
    <N> is the :ref:`node<node-term>` ID of the provisioned node.


