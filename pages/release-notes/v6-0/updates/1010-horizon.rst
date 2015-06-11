
.. _updates-horizon-rn:

OpenStack Dashboard (Horizon)
-----------------------------

Resolved Issues
+++++++++++++++

* Horizon login page no longer contains a DoS
  vulnerability (CVE-2014-8124). Previously,
  it used to handle session records improperly by accessing
  a session too early in the login process. That resulted in
  the creation of session records in a session back end, and
  was especially problematic when using non-cookie back ends.
  See `LP1399271`_.

* There was an issue with no files being copied to the
  ``openstack-dashboard-theme`` package, though it was declared in
  the RPM ``spec`` file. The bug is fixed by removing the
  ``openstack-dashboard-theme`` package. See `LP1446213`_.

.. Links
.. _`LP1399271`: https://bugs.launchpad.net/mos/6.0-updates/+bug/1399271
.. _`LP1446213`: https://bugs.launchpad.net/mos/+bug/1446213
