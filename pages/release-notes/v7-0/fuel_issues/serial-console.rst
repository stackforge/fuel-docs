
* As a serial console may not be able to handle intensive log floods
  and, therefore, lock up a kernel, it is disabled by default.

  However, if the serial console usage is safe as, for example, in case
  of running `getty` on it, you can turn the console on by setting
  ``console=ttyS0,9600`` kernel parameters through:

  * :ref:`Web UI <kernel-parameters-ops>` for all the nodes in a cluster
    for a target operating system;

  * :ref:`Cobbler Web UI <kernel-cobbler-ops>` or :ref:`the dockerctl
    command <kernel-cmd-line-ops>` for a bootstrap node.

  See `LP1493767 <https://bugs.launchpad.net/mos/+bug/1493767>`_.
