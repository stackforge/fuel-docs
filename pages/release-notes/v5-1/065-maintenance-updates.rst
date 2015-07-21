Once you update the product, the below maintenance updates will
become available for you.

Horizon
+++++++

* Horizon caches the whole [large] file object in the RAM before
  returning a response object, therefore causing the memory overrun.
  The patch prevents the web-server memory overrun when downloading
  objects from Swift. See `LP1423311`_.

Nova
++++

* Due to a memory leak in the python-libvirt package, nova-compute
  consumes all the free system memory. The fix updates the
  python-libvirt package to prevent the memory leaks. See `LP1419362`_.

* Due to the hard-coded values ``max_tries`` and ``wait_between``,
  Nova may run out of time while waiting for the block-device
  allocation and sets the instances into the error state. The fix
  introduces new options: ``block_device_allocate_retries`` and
  ``block_device_allocate_retries_interval`` in order to make the
  block-device allocation timeout configurable. See `LP1461574`_.

* Previously, due to the inverted order of the timestamps subtraction,
  the ``max_age_quota`` value was calculated incorrectly. The fix puts
  the timestamps in the correct order. See `LP1440740`_.

* If an instance is created from a multi-part image (separate kernel
  and ramdisk files), and ``resume_guests_state_on_host_boot=True``,
  the resulting ``_hard_reboot`` fails and puts the instance into an
  error state. The fix ensures that the attempts to get access to the
  images are possible when the context is available. See `LP1462991`_.

* Currently, Nova-compute is able to restart successfully, even if
  ``_init_instance`` fails. Previously, the compute process used to
  exit unexpectedly in case an unhandled exception was raised from
  an instance. See `LP1438680`_.

* The CVE-2015-0259 vulnerability has been fixed in the Nova console
  websocket. By tricking an authenticated user into clicking a
  malicious URL, a remote attacker was able to trigger a
  cross-site-websocket-hijacking vulnerability resulting in a
  potential hijack of consoles where a user was still logged in. See
  `LP1420273`_.

* Previously, ``_poll_connection`` could fall into a loop waiting for
  a reply message if RabbitMQ was down and up after a reboot. The
  ``oslo.messaging`` issue is fixed now. See `LP1454174`_.

* In the Icehouse release, to list floating IPs (/os-floating-ips),
  Nova API gives you the instance ID of the associated instance when
  Neutron is used. But starting from Juno which is used for MOS 5.1,
  the ``instance_id`` is always null. The fix returns
  ``floating_ip['fixed_ip']['instance_uuid']`` from neutronv2 API.
  See `LP1420371`_.

* Previously, the Nova user didn’t have a ``/bin/bash`` shell after
  the package was installed, and puppet didn’t change its shell. The
  fix changes the default Nova shell to ``/bin/lshell``.
  See `LP1393785`_.

Keystone
++++++++

* The eventlet monkeypatching now precedes the logging system
  initialization. Previously, it occurred after the logging system
  initialization thus leaving all the locks used in the logging
  handlers non-patched and breaking  ``threading.RLock``. The
  initialization order is fixed, so the eventlet locks work
  correctly. See `LP1413341`_.

* A CVE-2015-1852 vulnerability in the OpenStack keystonemiddleware
  has been fixed: the s3_token middleware used to effectively ignore
  the value set for the ``insecure`` option in the ``paste.ini`` file
  assuming it was always ``True``. As a result, certificate
  verification was disabled leaving TLS connections opened to MITM
  attacks. See `LP1442579`_.

Glance
++++++

* Previously, the CooperativeReader wrapper was ignoring the "length"
  parameter of the read method always giving the whole chunk returned
  by the underlying generator (in case of HTTP source the size of this
  chunk is 16 M). The patchset introduces a buffer in the
  CooperativeReader to store the most recently fetched iterator chunk.
  The reads are independent from the requests to iterator, so the
  CooperativeReader is able to return the exact requested amount of
  bytes and no data is lost due to the extra-reads. See `LP1405386`_
  and `LP1411704`_.

Cinder
++++++

* Previously, making long-running tasks like removing big volumes
  (100GB, 1TB) blocked the eventlet loop, and all the cinder-volume
  services hanged until the volumes were removed. The issue is fixed
  by moving all the RADOS calls to a separate python thread that does
  not block the eventlet loop. See `LP1444546`_.

Swift
+++++

* An authenticated user can delete the most recent version of any
  versioned object whose name is known if the user have listed access
  to the ``x-versions-location`` container. Only Swift setups with
  an ``allow_version`` setting are affected. The patch prevents the
  unauthorized deletion in the versioned container. See `LP1442041`_.
  By default, MOS 6.0 is not affected by this bug. It may be affected
  only if the ``allow_version`` setting value was changed in the
  Swift configuration file manually.

Heat
++++

* Under some conditions, Heat is unable to attach/detach volumes from
  servers. While a stack is being deleted, it may stuck in a
  DELETE_IN_PROGRESS or DELETE_FAILED state, so some volumes and
  instances may not be removed. The fix removes the redundant delete
  calls to a volume in order to avoid a race condition. See
  `LP1459605`_.

Other resolved issues
+++++++++++++++++++++

* Sometimes the RPC subsystem could lose its temporary queues and
  caused the actions failure. The issue is fixed by improving the
  "Queue not found" exception handling. See `LP1415932`_ and
  `LP1463802`_.


.. _`LP1423311`: https://bugs.launchpad.net/mos/+bug/1423311
.. _`LP1419362`: https://bugs.launchpad.net/mos/+bug/1419362
.. _`LP1461574`: https://bugs.launchpad.net/mos/5.1-updates/+bug/1461574
.. _`LP1440740`: https://bugs.launchpad.net/mos/+bug/1440740
.. _`LP1462991`: https://bugs.launchpad.net/mos/+bug/1462991
.. _`LP1438680`: https://bugs.launchpad.net/mos/+bug/1438680
.. _`LP1420273`: https://bugs.launchpad.net/mos/+bug/1420273
.. _`LP1454174`: https://bugs.launchpad.net/mos/+bug/1454174
.. _`LP1420371`: https://bugs.launchpad.net/mos/+bug/1420371
.. _`LP1393785`: https://bugs.launchpad.net/mos/+bug/1393785
.. _`LP1413341`: https://bugs.launchpad.net/mos/+bug/1413341
.. _`LP1442579`: https://bugs.launchpad.net/mos/+bug/1442579
.. _`LP1405386`: https://bugs.launchpad.net/mos/+bug/1405386
.. _`LP1411704`: https://bugs.launchpad.net/bugs/1411704
.. _`LP1444546`: https://bugs.launchpad.net/mos/+bug/1444546
.. _`LP1442041`: https://bugs.launchpad.net/mos/+bug/1442041
.. _`LP1459605`: https://bugs.launchpad.net/mos/+bug/1459605
.. _`LP1415932`: https://bugs.launchpad.net/mos/+bug/1415932
.. _`LP1463802`: https://bugs.launchpad.net/mos/+bug/1463802
