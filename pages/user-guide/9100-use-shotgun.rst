
.. _shotgun-ug:

Diagnostic snapshot using shotgun
=================================

Shotgun is a tool that is used to generate diagnostic snapshots
for Fuel. While using Fuel API for diagnostic snapshots is good enough
for the regular user, there are a few issues with it: timeout
exceptions due to large logs, or running out of space on
the */var/* partition.

To avoid these issues, it is better to use Shotgun from the Fuel Master
node directly and fetch the default configuration from fuelclient.

To use Shotgun:

#. Install Shotgun on the Fuel Master node::

      yum install -y shotgun

#. Fetch the default configuration::

      fuel snapshot --conf > dump_conf.yaml

The most useful options are:

::

    # this is a place where temporary files will be stored
    target: /var/www/nailgun/dump/fuel-snapshot
    # symlink on last compressed snapshot
    lastdump: /var/www/nailgun/dump/last

There are also standard commands like *dir*, *command*, *file*

::

    - command: brctl show
      to_file: brctl_show.txt
      type: command
    - path: /etc/sysconfig/network-scripts
      type: dir

Provide the configuration to Shotgun and execute it:

::

    shotgun -c dump_conf.yaml
