
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

* Previously, there was a risk of tricking a Horizon user into using
  a malicious template. That could result in potential assets theft
  like user access credentials. Only setups exposing the orchestration
  dashboard in Horizon were affected. The issue is fixed by escaping
  the description parameter from Heat template. See `LP1462095`_.

* An authenticated user may conduct a persistent XSS attack by
  setting a malicious metadata to a Glance image, a Nova flavor, or a
  host aggregate, and by tricking an administrator to load the updated
  metadata page. Once executed in a legitimate context, this attack
  may result in a privilege escalation. To fix this, the metadata is
  escaped and then is interpreted as JSON. See `LP1468744`_.

.. Links
.. _`LP1399271`: https://bugs.launchpad.net/mos/6.0-updates/+bug/1399271
.. _`LP1446213`: https://bugs.launchpad.net/mos/+bug/1446213
.. _`LP1462095`: https://bugs.launchpad.net/mos/+bug/1462095
.. _`LP1468744`: https://bugs.launchpad.net/mos/+bug/1468744
