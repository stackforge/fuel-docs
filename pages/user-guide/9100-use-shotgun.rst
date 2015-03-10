
.. _shotgun-ug:

Create diagnostic snapshot using shotgun
========================================

Shotgun is a tool that you can use to generate diagnostic snapshots
for Fuel. Although, Fuel API for diagnostic snapshots provides similar
functionality, you may prefer to use Shotgun due to the following limitations
of Fuel API: 

* When the size of log files is too big, Fuel drops a timeout exceptions.
* When you use Fuel API, you may run out of space in the */var/* partition.

Therefore, use Shotgun from the Fuel Master node directly and fetch the
default configuration from the Fuel Client.

Shotgun stores temporary snapshots in ``/var/www/nailgun/dump/fuel-snapshot``.
A symlink to the last compressed snapshot is located in
``/var/www/nailgun/dump/last``.

With Shotgun you can use standard commands such as :command:`dir`, :command:`command`,
and :command:`file`:

.. code-block:: ini

    - command: brctl show
      to_file: brctl_show.txt
      type: command
    - path: /etc/sysconfig/network-scripts
      type: dir

**To use Shotgun:**

#. Install Shotgun on the Fuel Master node:

   .. code-block:: console

      yum install -y shotgun

#. Fetch the default configuration:

   .. code-block:: console

      fuel snapshot --conf > dump_conf.yaml

#. Provide the configuration to Shotgun and execute it:

   .. code-block:: console

      shotgun -c dump_conf.yaml
