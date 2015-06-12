.. _updates-keystone-rn:

OpenStack Identity (Keystone)
-----------------------------

Resolved Issues
+++++++++++++++

* CVE-2015-1852 vulnerability in OpenStack keystonemiddleware has
  been fixed: the s3_token middleware used to effectively ignore the
  value set for the ``insecure`` option in the ``paste.ini`` file
  assuming it is always ``True``. As a result, certificate
  verification was disabled, leaving TLS connections opened to MITM
  attacks. See `LP1442579`_.

* A correct version of ``oslo.utils`` was added to the requirements
  package, so the python27 jobs in the OSTF tests for
  ``python-keystoneclient`` do not fail anymore. See `LP1459286`_.

* While the token is being deleted, its revocation list update is now
  removed if an SQL database is used as a token revocation storage.
  See `LP1435912`_.

* The SQL initialization now occurs after the eventlet monkeypatching
  to avoid the SQLAlchemy locks. See `LP1425559`_.

.. Links
.. _`LP1442579`: https://bugs.launchpad.net/mos/+bug/1442579
.. _`LP1459286`: https://bugs.launchpad.net/mos/+bug/1459286
.. _`LP1435912`: https://bugs.launchpad.net/mos/+bug/1435912
.. _`LP1425559`: https://bugs.launchpad.net/mos/+bug/1425559
