
.. _fuel-agent-arch:

How Fuel Agent works
====================

The Fuel Agent provisions an OpenStack environment using pre-built images
rather than the native operating system installation mechanisms.
This significantly reduces the amount of time required
to deploy an environment.
In addition, the Fuel Agent runs inside the bootstrap ramdisk
so it is not necessary to boot into the operating system's installer ramdisk,
which means that one less reboot per node is required.
Fuel Agent is provided as an :ref:`experimental feature<experimental-features-term>`
in Release 6.0.

The Fuel Agent is a fully-customizable python script
that creates disk partitions, retrieves the operating system image,
then copies that operating system image to a hard drive
on each target node to be provisioned.
Two operating system images are included in the Fuel ISO file:
one for each of the supported distributions
(Ubuntu 12.04 LTS and CentOS 6.5).
These images are built from scratch
using debootstrap and anaconda
and include `cloud-init <https://cloudinit.readthedocs.org/en/latest/>`_,
which is used to install and configure
Puppet and MCollective after the first reboot.

.. note:: :ref:`Ironic <ironic-term>` was considered
          for image-based provisioning
          but Ironic is intended to work in cloud environments;
          it expects that all nodes are equipped with IPMI/ILO modules,
          and does not currently support advanced partitioning schemes.
          The Fuel Agent implements the image-based provisioning
          mostly on the agent side, fully independent of Ironic.

Sequence Diagram
----------------

.. image:: /_images/fuel-agent-sequence.png
   :width: 100%

The following steps occur to provision a node:

- Provisioned data is uploaded by the **MCollective** agent's
  */tmp/provision.json* file

- **execute_shell_command** launches provisioning.

- Provisioning data comes from the :ref:`Nailgun<nailgun-term>`
  provisioning serializer,
  which is very similar to that used for classic Fuel provisioning.
  Information about the available operating system images is appended.

- The *provision* script does the following:

  - creates partitions according to the configuration set on the
    :ref:`customize-partitions-ug` screen.

  - downloads the appropriate operating system image
    and copies it to the hard drive on the target node.

  - prepares **configdrive** and copies it to the hard drive.

    **configdrive** is a set of configuration files used by **cloud-init**,
    which configures Puppet and MCollective
    immediately after the node is rebooted.
    Fuel Agent retrieves parameters from a serialized provisioning data set
    and puts them into a **configdrive** in the format
    that **cloud-init** can read;
    this is the only data source for **cloud-init**,
    which is configured to have the NoCloud data source.
    During provisioning, **configdrive** is put on a separate partition
    at the end of a hard drive of each target node.
    **configdrive** is a file system that has the following structure:

    - *openstack/latest/meta_data*

    - *openstack/latest/user_data*: a multipart mime file
      that contains Puppet and MCollective configuration information
      and other stuff that exactly match what Cobbler snippets implement
      for the Classic provisioning tools.

- Cobbler manages the TFTP and DHCP services.

- By default the nodes are forced to boot into bootstrap operating system
  which has Fuel Agent installed.

- Astute gets serialized provisioning data which Nailgun has generated
  and puts the data on a node into /tmp/provision.json,
  and runs Fuel Agent (/usr/bin/provision) with the data.

- Once the provision process is completed, Astute modifies the TFTP configuration
  through an RPC call to Cobbler, so the node boots with a chain-loader
  which tries to boot a node from the first hard drive.
  Astute then reboots the node through an RPC call to Cobbler.

Implementation
--------------

.. image:: /_images/fuel-agent-implementation.png
   :width: 100%

The following files implement the steps to provision a node:

- *fuel_agent/cmd/agent.py* -- contains the */usr/bin/provision* entry point.
  It reads the */tmp/provision.json* file
  and instantiates the Manager with that data.

- *fuel_agent/manager.py* -- implements the top level agent logic.
  The methods included here are:
  do_parsing, do_partitioning, do_configdrive,
  do_copyimage, do_bootloader, and do_provisioning.

- *fuel_agent/drivers* -- contains the provisioning data drivers.
  In Release 6.0, only the **nailgun** driver is provided;
  it validates data using jsonschema
  and then converts that data into multiple python objects.

- *fuel_agent/objects* -- contains the agent python objects.
  The Fuel agent Manager does not understand any data format
  other than these objects.
  For example, the `PartitionScheme` object
  implements the disk partitioning;
  it contains the disk label, plain partition, lvm, md, and file system objects.
  and is instantiated by the **nailgun** data driver.

- *fuel_agent/utils* -- contains the code which runs the operating system
   level commands like parted, mdadm, lvcreate, etc.

- *cloud-init-templates* -- contains the **cloud-init** templates
  for **configdrive**.
  These are evaluated using **jinja2** and contain
  all necessary data for initial node configuration.

- *etc/fuel-agent/fuel.agent.conf.sample* -- default configuration file
  (*oslo.config*).

.. _view-fuel-master-config-op:

Viewing the control files on the Fuel Master node
-------------------------------------------------

Fuel Agent is part of the bootstrap ramdisk functionality
and is included in the functionality.
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
    just before running the **provision** script.

  - *usr/bin/provision* -- executable entry point for provisioning.
    Astute runs this; it can also be run manually.

- **Master**

  - *var/log/remote/node-N.domain.tld/bootstrap/fuel-agent.log* --
    File where Fuel Agent log messages are recorded
    when the **provision** script is run;
    <N> is the :ref:`node<node-term>` ID of the provisioned node.


