
.. _updates-keystone-rn:

OpenStack Identity (Keystone)
-----------------------------

Resolved Issues
+++++++++++++++

* CVE-2015-1852 vulnerability in OpenStack keystonemiddleware has been fixed:
  the s3_token middleware used to effectively ignore the value set for the
  ``insecure`` option in the :file:`paste.ini` file assuming it is always ``True``.
  As a result, certificate verification was disabled, leaving TLS connections
  opened to MITM attacks. See `LP1442579`_.


.. _`LP1442579`: https://bugs.launchpad.net/mos/+bug/1442579

