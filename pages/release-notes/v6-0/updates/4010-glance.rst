
.. _updates-glance-rn:

OpenStack Image (Glance)
------------------------

Resolved Issues
+++++++++++++++

* Glance no longer fails to import (copy from a remote source)
  large images (>5GB) if Swift back end is in use. See `LP 1411704
  <https://bugs.launchpad.net/mos/6.0-updates/+bug/1411704>`_.

* Previously, a storage quota bypass flaw persisted in the Image
  service setups configured with user_storage_quota. By deleting
  images that were being uploaded, a malicious user could overcome
  the storage quota and thus overrun the back end. Images in the
  ``deleted`` state were not taken into account by quota and were
  not effectively deleted until the upload was completed. The issue
  is fixed, and now the images are correctly deleted with no chunks
  left over.
