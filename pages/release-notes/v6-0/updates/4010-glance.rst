
.. _updates-glance-rn:

OpenStack Image (Glance)
------------------------

Resolved Issues
+++++++++++++++

* Glance no longer fails to import (copy from a remote source)
  large images (>5GB) if Swift back end is in use. See `LP 1411704
  <https://bugs.launchpad.net/mos/6.0-updates/+bug/1411704>`_.

* Previously, a storage quota bypass flaw persisted in the Image
  service setups configured with ``user_storage_quota``. By deleting
  images that were being uploaded, a malicious user could overcome
  the storage quota and thus overrun the back end. Images in the
  ``saving`` state were not taken into account by quota and were
  not effectively deleted until the upload was completed. The issue
  is fixed, and now the images are deleted correctly, with no chunks
  left over.

* In case of slow connection to the external storage, Image service
  was not able to upload image. It happened because of a 1 minute
  timeout that broke the connection if 16 MB chunk had not been
  downloaded within that time period. To prevent 1 minute timeouts,
  the chunk size is reduced to 4 MB. See `LP1401118 <https://bugs.launchpad.net/mos/+bug/1401118>`_.

* When the :guilabel:`Create Image` function (:menuselection:`Image
  Source == Image File`) is used in OpenStack dashboard, it uploads
  the image to :filename:`/tmp` on the controller node. But earlier
  after a successful transfer to the Image service, it did not remove
  the temporary image file from :filename:`/tmp`, thus finally running
  out of the file-system space. Now the image is cleaned up from the
  :filename:`/tmp` after the upload (succeeded or failed) from
  OpenStack dashboard. See `LP1389380 <https://bugs.launchpad.net/mos/+bug/1389380>`_.

* Previously, uploading an image to the vCenter back end without
  checking the session resulted in the broken pipe socket error.
  When this happened, glance-api sent a 400 response, because the
  IOError was not handled by the store. Now there is a check whether
  the session is authenticated before uploading the image. The IOError
  is handled, and the response code is checked. See
  `LP1436034 <https://bugs.launchpad.net/mos/+bug/1436034>`_.
