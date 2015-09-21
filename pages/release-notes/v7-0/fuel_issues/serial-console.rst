
* As a serial console may not be able to handle logs produced by OpenStack
  services and lock up the whole system, it is disabled by default.

  However, you can turn the serial console on, if needed, by setting
  ``console=ttyS0,9600`` kernel parameters through:

  * :ref:`Web UI <kernel-parameters-ops>` for all the nodes in a cluster
    for a target operating system;
  * :ref:`Cobbler Web UI <kernel-cobbler-ops>` or :ref:`the dockerctl
    command <kernel-cmd-line-ops>` for a bootstrap node.

  Generally, we recommend that you do not use the serial console to avoid
  kernel lockups.

  See `LP1493767 <https://bugs.launchpad.net/mos/+bug/1493767>`_
