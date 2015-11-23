Once you update the product, the maintenance updates below will
become available for you.

Horizon
+++++++

* Horizon caches the whole [large] file object in the RAM before
  returning a response object, therefore causing the memory overrun.
  The patch prevents the web-server memory overrun when downloading
  objects from Swift. See `LP1423311`_.

* By making repeated requests to the Horizon login page a remote
  attacker may generate unwanted session records, potentially
  resulting in a denial of service. Only Horizon setups using
  a db or memcached session engine are affected. See `LP1398893`_
  and `LP1399271`_.

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
  ``insecure`` option in api-paste.ini regardless it’s set to
  True or False. The fix restores correct behavior. See `LP1509329`_.

* OpenStack Identity (Keystone) logs the backend_argument configuration
  option content, which allows remote authenticated users to obtain
  passwords and other sensitive backend information by reading the Keystone
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

* By submitting a HTTP PUT request with a 'x-image-meta-status'
  header, a tenant can manipulate the status of their images.
  A malicious tenant may exploit this flaw to reactivate disabled
  images, bypass storage quotas and in some cases replace image
  contents. Setups using the Glance v1 API allow the illegal modification
  of image status. Setups which also use the v2 API may allow a subsequent
  re-upload of image contents. See `LP1496798`_.

* A storage quota bypass flaw was found in OpenStack Image (glance).
  If an image was deleted while it was being uploaded, it would not count
  towards a user's quota. A malicious user could use this flaw to
  deliberately fill the backing store, and cause a denial of service.
  See `LP1414685`_.

* If image was deleted during file upload when we want to update image
  status from 'saving' to 'active' it's expected to get Duplicate error
  and delete stale chunks after that. But if user's token is expired
  there will be Unathorized exception and chunks will stay in store
  and clog it. Only Glance setups configured with user_storage_quota
  are affected. See `LP1497984`_.

* By setting  a malicious image location an authenticated user can
  download or delete any file on the Glance server for which the Glance
  process user has access to. Only setups using the Glance V2 API are
  affected by this flaw. See `LP1403102`_.

* The path traversal vulnerabilities in Glance were not fully patched
  in OSSA 2014-041.By setting a malicious image location to a filesystem://
  scheme an authenticated user can still download or delete any file
  on the Glance server for which the Glance process user has access to.
  Only setups using the Glance V2 API are affected by this flaw.
  See `LP1514467`_.

Swift
+++++

* An authenticated user can delete the most recent version of any
  versioned object whose name is known if the user have listed access
  to the ``x-versions-location`` container. The patch prevents the
  unauthorized deletion in the versioned container. See `LP1442041`_.

  By default, MOS 5.1/5.1.1 is not affected by this bug. It may be
  affected only if the ``allow_version`` setting value was manually
  changed in the Swift configuration file.

* When in possession of a tempurl ``key`` authorized for ``PUT``,
  a malicious actor may retrieve other objects in the same Swift account
  (tenant). The fix disallows the ``PUT`` method in tempurls to create
  pointers to other data, what prevents discoverability attacks and a tricky
  and potentially unexpected consequences of the unsafe ``PUT`` method.
  See `LP1487450`_.

* Previously, upstart scenarios did not allow Swift to automatically
  respawn in case if unexpected shutdown occurs. The fix introduces minor
  changes to the upstart scripts including ``respawn`` options. See
  `LP1466101`_.

* Swift doesn’t apply the documented metadata constraints properly, this
  leads to a possibility of exceeding metadata limits by making multiple
  requests. The fix adds new metadata validation method, which enforces
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

* By overwriting an image with a malicious qcow2 header, an authenticated
  user may mislead Cinder upload-to-image action, resulting in disclosure
  of any file from the Cinder server. All Cinder setups are affected.
  See `LP1465333`_.

* RBD is a python binding for librados which isn't patched by eventlet.
  Making long-running tasks like removing big (~100GB, ~1TB) volumes
  blocks eventlet loop and all cinder-volume service hangs until it
  finished when rados_connect_timeout is disabled. It makes cinder-volume
  services unavailable for a while. This patch moves all rados calls
  to a separate python thread which doesn't block eventlet loop.
  See `LP1444546`_.

* If detach volume from instance immediately after attaching, volume
  ends up in an undeletable state (it remains marked in-use, but it not
  attached to instance). See `LP1510957`_.

Neutron
+++++++

* Race condition in OpenStack Neutron, when using the ML2 plugin or the
  security groups AMQP API, allows authenticated users to bypass IP
  anti-spoofing controls by changing the device owner of a port to start
  with network: before the security group rules are applied. See
  `LP1489958`_.

Other resolved issues
+++++++++++++++++++++

* Sometimes the RPC subsystem could lose its temporary queues and
  cause actions failure. The issue is fixed by improving the
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
