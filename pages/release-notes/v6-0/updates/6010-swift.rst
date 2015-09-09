
.. _updates-swift-rn:

OpenStack Object Storage (Swift)
--------------------------------

Resolved Issues
+++++++++++++++

* Previously, an authenticated user could delete the most recent
  version of any versioned object whose name was known if the user
  had listing access to the x-versions-location container. By
  default, Mirantis OpenStack 6.0 was not affected except the case if
  the ``allow_version`` setting value had been manually changed to
  true in Swift configuration. The issue is fixed, and an
  authenticated user can not delete the most recent version of any
  versioned object anymore. See `LP1442041`_.

* Now it is possible to change the default permissions for files
  created by Swift in order to restrict access to these files.

* Swift ``.upstart`` scripts don't include instructions for tracking
  unexpected shutdowns of services. The fix adds ``respawn`` stanza
  and sets limit to 20 retries within 5 seconds as a reasonable value
  for such kind of services. See `LP1466101`_.

  .. note::
     Due to a conflict between configuration files, replace the old
     `swift-container-sync.conf` file in the `/etc/init` with the
     `swift-container-sync.conf.dpkg-dist` file which was created
     during the upgrade.

* If a malicious user has a ``temp_url`` key authorized for a *PUT*
  access in a Swift account (tenant), he can retrieve different objects
  in the same Swift account (CVE-2015-5223). All Swift setups are
  affected.
  The fix prevents allowing the *PUT* method in temporary URLs to
  create pointers to other data.

.. Links
.. _`LP1442041`: https://bugs.launchpad.net/mos/+bug/1442041
.. _`LP1466101`: https://bugs.launchpad.net/mos/+bug/1466101
