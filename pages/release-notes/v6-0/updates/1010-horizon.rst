
.. _updates-horizon-rn:

OpenStack Dashboard (Horizon)
-----------------------------

Resolved Issues
+++++++++++++++

* Horizon login page no longer contains a DOS attack
  mechanism (CVE-2014-8124). Previously,
  it used to handle session records improperly by accessing
  a session too early in the login process. That resulted in
  the creation of session records in a session back end, and
  was especially problematic when using non-cookie back ends.
  See `LP1399271 <https://bugs.launchpad.net/mos/6.0-updates/+bug/1399271>`_.
