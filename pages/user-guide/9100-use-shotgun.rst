
.. _shotgun-ug:

Diagnostic snapshot using shotgun
=================================

Shotgun is a tool that is used to generate diagnostic snapshots
for Fuel. While using Fuel API for diagnostic snapshots is good enough
for the regular user, there are a few issues with it: timeout
exceptions due to large logs, or running out of space on
the */var/* partition.

To avoid these issues, it is better to use Shotgun from the Fuel Master
node directly and fetch the default configuration from the Fuel Client.

To use Shotgun:

#. Install Shotgun on the Fuel Master node:

   .. code-block:: console

      yum install -y shotgun

#. Fetch the default configuration:

   .. code-block:: console

      fuel snapshot --conf > dump_conf.yaml

The most useful options are:

.. code-block:: ini

    # this is a place where temporary files will be stored
    target: /var/www/nailgun/dump/fuel-snapshot
    # symlink on last compressed snapshot
    lastdump: /var/www/nailgun/dump/last

There are also standard commands like :command:`dir`, :command:`command`, and :command:`file`:

.. code-block:: ini

    - command: brctl show
      to_file: brctl_show.txt
      type: command
    - path: /etc/sysconfig/network-scripts
      type: dir

Provide the configuration to Shotgun and execute it:

   .. code-block:: console

      shotgun -c dump_conf.yaml
