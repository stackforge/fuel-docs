Once you update the product, the maintenance updates below will
become available for you.

Horizon
+++++++

* Horizon caches the whole [large] file object in the RAM before
  returning a response object, therefore causing the memory overrun.
  The patch prevents the web-server memory overrun when downloading
  objects from Swift. See `LP1423311`_.

* By making repeated requests to the Horizon login page, a remote attacker
  may generate unwanted session records, potentially resulting in a denial
  of service. Only Horizon setups that use a db or memcached session
  engine are affected. See `LP1398893`_ and `LP1399271`_.

Nova
++++

* Due to a memory leak in the python-libvirt package, nova-compute
  consumes all of the system's free memory. The fix updates the
  python-libvirt package to prevent memory leaks. See `LP1419362`_.

* Due to the hard-coded values ``max_tries`` and ``wait_between``,
  Nova may run out of time while waiting for the block-device
  allocation and sets the instances into the error state. The fix
  introduces new options: ``block_device_allocate_retries`` and
  ``block_device_allocate_retries_interval`` in order to make the
  block-device allocation timeout configurable. See `LP1461574`_.

* Previously, due to the inverted order of the timestamps subtraction,
  the ``max_age_quota`` value was calculated incorrectly. The fix puts
  the timestamps in the correct order. See `LP1440740`_.

* Currently, Nova is able to restart successfully, even if
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

* In the Icehouse release, to list floating IPs, Nova API gives you
  the instance ID of the associated instance when Neutron is used.
  But starting from Juno which is used for MOS 5.1, the
  ``instance_id`` is always null. The fix returns
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
  handlers non-patched and breaking ``threading.RLock``. The
  initialization order is fixed, so the eventlet locks work
  correctly. See `LP1413341`_.

* A CVE-2015-1852 vulnerability in the OpenStack keystonemiddleware
  has been fixed: the s3_token middleware used to effectively ignore
  the value set for the ``insecure`` option in the ``paste.ini`` file
  assuming it was always ``True``. As a result, certificate
  verification was disabled leaving TLS connections opened to MITM
  attacks. See `LP1442579`_.

* Due to mechanical error, python-keystoneclient does not respect
  ``insecure`` option in ``api-paste.ini`` regardless of the True or False
  setting. The fix restores the correct behavior. See `LP1509329`_.

* OpenStack Identity (Keystone) logs the content of the ``backend_argument``
  configuration option, which allows remote authenticated users to obtain
  passwords and other sensitive back-end information by reading the Keystone
  logs. See `LP1469149`_.

Glance
++++++

* Previously, the CooperativeReader wrapper was ignoring the "length"
  parameter of the read method always giving the whole chunk returned
  by the underlying generator (in case of HTTP source the size of this
  chunk is 16 M). The patchset introduces a buffer in the
  CooperativeReader to store the most recently fetched iterator chunk.
  The read calls are independent from the requests to iterator, so the
  CooperativeReader is able to return the exact requested amount of
  bytes and no data is lost due to the extra-reads. See `LP1405386`_
  and `LP1411704`_.

* Previously, the errors in ``glance-reg`` were handled incorrectly,
  so it went down with an error saying that the initial error was not
  in unicode. The patch adds ``safe_encode()`` from
  ``oslo_utils.encodeutils`` that is needed by ``exception_to_str()``
  in order to emit the original error message. See `LP1474015`_.

* By submitting an HTTP PUT request with the ``x-image-meta-status``
  header to Glance API v1, a tenant could manipulate the status of their
  images. Setups that also use the v2 API could allow a subsequent
  re-upload of an image contents. That was fixed by adding an additional
  check to Glance API to forbid the status manipulation via an HTTP PUT
  request. See `LP1496798`_.

* [CVE-2015-5286], [CVE-2014-9623] Fixed security vulnerabilities in Glance
  images. When you delete images that are BEING uploaded using a token that is
  about to expire, a malicious user can overcome the storage quota and
  accumulate untracked image data in the back end. It may result in a
  resource exhaustion and denial-of-service attack. The fix removes chunks
  left from an image whose uploading was canceled due to the `Unauthorized`
  exception. See `LP1497984`_, `CVE-2015-5286`_ and `LP1414685`_,
  `CVE-2014-9623`_.

* By setting an image location, an authenticated user can
  download or delete any file from the Glance server to which the Glance
  process user has access to. Only setups using the Glance V2 API are
  affected by this flaw. The fix restricts the user from downloading and
  deleting any file via the glance-api server. The fix also ensures that
  `file`, `filesystem`, and `swift+config` URI schemes are not allowed when
  setting the ``location`` field. See `LP1403102`_ and `LP1514467`_.

Swift
+++++

* An authenticated user can delete the most recent version of any
  versioned object whose name is known if the user have listed access
  to the ``x-versions-location`` container. The patch prevents the
  unauthorized deletion in the versioned container. See `LP1442041`_.

  By default, MOS 5.1/5.1.1 is not affected by this bug. It may be
  affected only if the ``allow_version`` setting value was manually
  changed in the Swift configuration file.

* When in possession of a ``Temp-URL-Key`` authorized for ``PUT``,
  a malicious user may retrieve other objects in the same Swift account
  (tenant). The fix restricts the ``PUT`` method in TempURLs from creating
  pointers to other data. It prevents discoverability attacks and tricky
  and potentially unexpected consequences of the unsafe ``PUT`` method.
  See `LP1487450`_.

* Previously, ``.upstart`` scenarios did not allow Swift to automatically
  respawn if an unexpected shutdown occurs. The fix introduces minor
  changes to the ``.upstart`` scripts including the ``respawn`` options. See
  `LP1466101`_.

* Swift does not apply the documented metadata constraints properly. It
  leads to a possibility of exceeding metadata limits by making multiple
  requests. The fix adds new metadata validation method which enforces
  existing limits across all the requests. See `LP1509328`_.

Heat
++++

* Sometimes Heat is unable to attach/detach volumes from
  servers. While a stack is being deleted, it may stuck in a
  DELETE_IN_PROGRESS or DELETE_FAILED state, so some volumes and
  instances may not be removed. The fix removes the redundant delete
  calls to a volume in order to avoid a race condition. See
  `LP1459605`_.

Cinder
++++++

* If a malicious user overwrites an image with a ``qcow2`` header,
  ``cinder upload-to-image`` behaviour changes resulting in a disclosure of
  any file from the Cinder server. All Cinder setups are affected.
  The fix restricts referencing backing files as a security measure
  that prevents a user from writing an image header into a raw volume with a
  backing file pointing to data they want to access. See `LP1465333`_.

* Making long-running tasks like removing big volumes (~100GB, ~1TB)
  blocks the eventlet loop, and all cinder-volume service hangs until the
  process is finished when ``rados_connect_timeout`` is disabled. It makes
  cinder-volume services unavailable for a while. The fix moves all RADOS
  calls to a separate Python thread which does not block the eventlet loop.
  See `LP1444546`_.

* If you detach a volume from an instance immediately after attaching, the
  volume moves to the undeletable state (it remains marked ``in-use``, but is
  not attached to an instance). The fix adds an exception to Cinder API that
  does not allow detaching a volume until the volume status becomes ``in-use``
  and the ``attach_status`` becomes ``attached``. See `LP1510957`_.

Neutron
+++++++

* If Neutron uses the ML2 plug-in or the security groups AMQP API, the race
  condition could be possible. This race condition allows authenticated users
  to bypass IP anti-spoofing controls by changing the device owner of a port
  to start with network before the security group rules are applied. The fix
  restricts a user from setting the ``device_owner`` field to any parameter
  that starts with ``network:`` on networks that they do not own.
  See `LP1489958`_.

Other resolved issues
+++++++++++++++++++++

* Sometimes the RPC subsystem could lose its temporary queues and
  cause actions failure. The issue is fixed by improving the
  "Queue not found" exception handling. See `LP1415932`_ and
  `LP1463802`_.

.. _`CVE-2014-9623`: https://bugs.launchpad.net/bugs/cve/2014-9623
.. _`CVE-2015-5286`: https://bugs.launchpad.net/bugs/cve/2015-5286
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
.. _`LP1474015`: https://bugs.launchpad.net/mos/+bug/1474015
.. _`LP1442041`: https://bugs.launchpad.net/mos/+bug/1442041
.. _`LP1459605`: https://bugs.launchpad.net/mos/+bug/1459605
.. _`LP1415932`: https://bugs.launchpad.net/mos/+bug/1415932
.. _`LP1463802`: https://bugs.launchpad.net/mos/+bug/1463802
.. _`LP1398893`: https://launchpad.net/bugs/1398893
.. _`LP1399271`: https://launchpad.net/bugs/1399271
.. _`LP1496798`: https://launchpad.net/bugs/1496798
.. _`LP1414685`: https://launchpad.net/bugs/1414685
.. _`LP1497984`: https://launchpad.net/bugs/1497984
.. _`LP1403102`: https://launchpad.net/bugs/1403102
.. _`LP1514467`: https://launchpad.net/bugs/1514467
.. _`LP1465333`: https://launchpad.net/bugs/1465333
.. _`LP1444546`: https://launchpad.net/bugs/1444546
.. _`LP1510957`: https://launchpad.net/bugs/1510957
.. _`LP1487450`: https://launchpad.net/bugs/1487450
.. _`LP1466101`: https://launchpad.net/bugs/1466101
.. _`LP1509328`: https://launchpad.net/bugs/1509328
.. _`LP1509329`: https://launchpad.net/bugs/1509329
.. _`LP1469149`: https://launchpad.net/bugs/1469149
.. _`LP1489958`: https://launchpad.net/bugs/1489958
