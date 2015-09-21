
* The kernel is configured to not use the serial console by default.

  In general, using a serial device as a kernel console incurs a substantial
  runtime overhead, especially if the kernel produces a lot of logs.
  This may result in a kernel lockup.

  However, using serial devices from userspace programs is safe.
  For example, running `getty` to enable logins via serial device should not
  cause any system wide problems. Moreover, the kernel serial console can be
  very useful when debugging the kernel, for example.

  To enable the serial console, add the ``console=ttyS0`` parameter to the 
  kernel command line through:

  * :ref:`Web UI <kernel-parameters-ops>` for all the nodes in a cluster
    for a target operating system;

  * :ref:`Cobbler Web UI <kernel-cobbler-ops>` or :ref:`the dockerctl
    command <kernel-cmd-line-ops>` for a bootstrap node.

  See `LP1493767 <https://bugs.launchpad.net/mos/+bug/1493767>`_.
