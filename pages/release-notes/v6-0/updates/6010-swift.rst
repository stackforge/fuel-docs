
.. _updates-swift-rn:

OpenStack Object Storage (Swift)
--------------------------------

Resolved Issues
+++++++++++++++

* Previously, an authenticated user could delete the most recent version of
  any versioned object whose name was known if the user had listing access
  to the x-versions-location container. By default, Mirantis OpenStack 6.0
  was not affected except the case if the ``allow_version`` setting value had
  been manually changed to true in Swift configuration. The issue is fixed,
  and an authenticated user can not delete the most recent version of any
  versioned object anymore. See `LP1442041`_.

* Now it is possible to change the default permissions for files
  created by Swift in order to restrict access to these files.

* Because of upstart limitations when program makes more than two
  fork/clone operations, a ``respawn`` stanza was added to the Swift
  ``.upstart`` scripts. See `LP1466101`_.

.. Links
.. _`LP1442041`: https://bugs.launchpad.net/mos/+bug/1442041
.. _`LP1466101`: https://bugs.launchpad.net/mos/+bug/1466101
