
.. _fuel-agent-arch:

Two provisioning methods
========================

There are two possible methods of provisioning an operating system on a node.
They are:

1) Classic method -- Anaconda or Debian-installer is used to build the
   operating system from scratch on each node using online or local
   repositories.

2) Image based method -- A base image is created and copied to each node to
   be used to deploy the operating system on the local disks.

.. note:: Starting with Mirantis Openstack 7.0, only the image based
          method is used. Image based provisioning significantly reduces
          the time required for provisioning and it is more reliable to
          copy the same image on all nodes instead of building an
          operating system from scratch on each node.

Image Based Provisioning
========================

Image based provisioning is implemented using the Fuel Agent. The image
based provisioning process consists of two independent steps, which are:

1) Operating system image building.

This step assumes that we build an operating system image from a set of
repositories in a directory which is then packed into the operating system
image. The build script is run once no matter how many nodes one is going
to deploy.

Currently, the CentOS image is built at the development stage and then
this image is put into Mirantis OpenStack ISO and used for all CentOS
based environments.

Ubuntu images are built on the master node, one operating system image
per environment. We need to build different images for each environment
because each environment has its own set of repositories. In order to
deal with package differences between repository sets, we create an
operating system image for each environment. When the user clicks the
"Deploy changes" button, we check if the operating system package is already
available for a particular environment, and if it is not, we build a new one
just before starting the actual provisioning.

2) Copying of operating system image to nodes.

Operating system images that have been built can be downloaded via
HTTP from the Fuel Master node. So, when a node is booted into the
so called Bootstrap operating system, we can run
an executable script to download the necessary operating system image and
put it on a hard drive. We don't need to reboot the node into the installer
OS like we do when we use an Anaconda or Debian-installer. Our executable
script in this case plays the same role. We just need it to be installed into
the Bootstrap operating system.

For both of these steps we have a special program component which is called
Fuel Agent. Fuel Agent is nothing more than just a set of data driven
executable scripts. One of these scripts is used for building operating system
images and we run this script on the master node passing a set of repository
URIs and a set of package names to it. Another script is used for the actual
provisioning. We run it on each node and pass provisioning data to it. These
data contain information about disk partitions, initial node configuration,
operating system image location, etc. So, this script being run on a node,
prepares disk partitions, downloads operating system images and puts these
images on partitions. It is necessary to note that when we say operating
system image we actually mean a set of images, one per file system. If, for
example, we want ``/`` and ``/boot`` be two separate file systems, then
this means we need to separate the operating system images, one for ``/`` and
another for ``/boot``. Images in this case are binary copies of corresponding
file systems.


Fuel Agent
==========

Fuel Agent is a set of data driven executable scripts. It
is written in Python. Its high level architecture is depicted below:

.. image:: /_images/fuel-agent-architecture.png
   :width: 100%

When we run one of its executable entry, we pass the input data to it where
it is written what needs to be done and how. We also point out which data
driver it needs to use in order to parse these input data. For example:

.. code-block :: sh

   /usr/bin/provision --input_data_file /tmp/provision.json --data_driver nailgun

The heart of Fuel Agent is the manager ``fuel_agent/manager.py``, which does
not directly understand input data, but it does understand sets of Python
objects defined in ``fuel_agent/objects``. Data driver is the place where
raw input data are converted into a set of objects. Using this set of objects
manager then does something useful like creating partitions, building
operating system images, etc. But the manager implements only high-level
logic for all these cases and uses a low-level utility layer which is
defined in ``fuel_agent/utils`` to perform real actions like launching
parted or mkfs commands.

The Fuel Agent config file is located in ``/etc/fuel-agent/fuel-agent.conf``.
There are plenty of configuration parameters that can be set and all these
parameters have default values which are defined in the source code.
All configuration parameters are well commented.

The Fuel Agent leverages cloud-init for the Image based deployment process.
It also creates a `cloud-init drive <https://cloudinit.readthedocs.org/en/latest/>`_
which allows for post-provisioning configuration. The config drive uses
jinja2 templates which can be found in
``/usr/share/fuel-agent/cloud-init-templates``. These templates are filled
with values given from the input data.


Image building
==============

When Ubuntu based environment is being provisioned, there is
a pre-provisioning task which runs the ``/usr/bin/fa_build_image`` script.
This script is one of the executable Fuel Agent entry points. This script
is installed in the 'mcollective' docker container on the Fuel master node.
As input data we pass a list of Ubuntu repositories from which an operating
system image is built and some other metadata. When launched, Fuel Agent
checks if there is a Ubuntu image available for this environment and if
there is not, it builds an operating system image and puts this image in
a directory defined in the input data so as to make it available via
HTTP. See the sequence diagram below:

.. image:: /_images/fuel-agent-build-image-sequence.png
    :width: 100%


Operating system provisioning
=============================

The Fuel Agent is installed into a bootstrap ramdisk. An operating system
can easily be installed on a node if the node has been booted with this
ramdisk. We can simply run the ``/usr/bin/provision`` executable with
the required input data to start provisioning. This allows provisioning
to occur without a reboot unlike the classic provisioning method using
Anaconda or Debian-installer.

The input data need to contain at least the following information:

- Partitioning scheme for the node. This scheme needs to contain information
  about the necessary partitions and on which disks we need to create these
  partitions, information about the necessary LVM groups and volumes, about
  software raid devices. This scheme contains also information about on which
  disk a bootloader needs to be installed and about the necessary file systems
  and their mount points. On some block devices we are assumed to put
  operating system images (one image per file system), while on other
  block devices we need to create file systems using the ``mkfs`` command.

- Operating system images URIs. Fuel Agent needs to know where to download
  the images and which protocol to use for this (by default, HTTP is used).

- Data for initial node configuration. Currently, we use cloud-init for the
  initial configuration and Fuel Agent prepares the cloud-init config drive
  which is put on a small partition at the end of the first hard drive.
  Config drive is created using jinja2 templates which are to be filled with
  values given from the input data. After the first reboot, cloud-init is run
  by upstart or similar. It then finds this config drive and configures
  services like NTP, MCollective, etc. It also performs an initial network
  configuration to make it possible for Fuel to access this particular node
  via SSH or MCollective and run Puppet to perform the final deployment.


The sequence diagram is below:

.. image:: /_images/fuel-agent-sequence.png
   :width: 100%


.. _view-fuel-master-config-op:

Viewing the control files on the Fuel Master node
-------------------------------------------------

To view the contents of the bootstrap ramdisk, run the following commands
on the Fuel Master node:

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
    this is where Fuel Agent log messages are recorded
    when the **provision** script is run;
    <N> is the :ref:`node<node-term>` ID of the provisioned node.
