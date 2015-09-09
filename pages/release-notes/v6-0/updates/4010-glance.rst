
.. _updates-glance-rn:

OpenStack Image (Glance)
------------------------

Resolved Issues
+++++++++++++++

* Glance no longer fails to import (copy from a remote source)
  large images (>5GB) if Swift backend is in use. See `LP1411704`_.

* Previously, a storage quota bypass flaw persisted in the Image
  service setups configured with ``user_storage_quota``. By deleting
  images that were being uploaded, a malicious user could overcome
  the storage quota and thus overrun the backend. Images in the
  ``saving`` state were not taken into account by quota and were
  not effectively deleted until the upload was completed. The issue
  is fixed, and now the images are deleted correctly, with no chunks
  left over.

* In case of slow connection to the external storage, Image service
  was not able to upload image. It happened because of a one-minute
  timeout that broke the connection if 16 MB chunk had not been
  downloaded within that time period. To prevent these timeouts,
  the chunk size is reduced to 4 MB. See `LP1401118`_.

* When an image is created using the :guilabel:`Create Image` button
  in the OpenStack dashboard, and the user selects the
  :guilabel:`Image File` option in the :guilabel:`Image Source`
  section, the image is uploaded to ``/tmp`` on the controller node.
  Earlier after a successful transfer to the Image service,
  it did not remove the temporary image file from ``/tmp``, thus
  finally running out of the file-system space. Now the image is
  cleaned up from the ``/tmp`` after the upload (succeeded or
  failed) from the OpenStack dashboard.
  See `LP1389380`_.

* Previously, uploading an image to the vCenter backend without
  checking the session resulted in the broken pipe socket error.
  When this happened, glance-api sent a 400 response, because the
  IOError was not handled by the store. Now there is a check whether
  the session is authenticated before uploading the image. The IOError
  is handled, and the response code is checked. See
  `LP1436034`_.

* Currently, the WSGI server allows persist connections. Hence, even
  after the response is sent to a client, it does not close the
  client's socket connection. Because of this problem, the green
  thread is not released back to the pool. The fix introduces new
  configuration options: ``http_keepalive`` and
  ``client_socket_timeout``. See `LP1463522`_.

* Previously, the errors in ``glance-registry`` were handled
  incorrectly; so ``glance-registry`` went down with an error saying
  that the initial error was not in unicode. The fix correctly encodes
  the exception error messages to the unicode strings. See `LP1474015`_.

* Previously, if SSL was set for endpoints, :command:`nova image-list`
  command failed, because it tried to use HTTP instead of HTTPS while
  calling glance-client. Now, this behavior is fixed, and Nova works
  when using HTTPS. See `LP1471992`_.

.. _`LP1411704`: https://bugs.launchpad.net/mos/6.0-updates/+bug/1411704
.. _`LP1401118`: https://bugs.launchpad.net/mos/+bug/1401118
.. _`LP1389380`: https://bugs.launchpad.net/mos/+bug/1389380
.. _`LP1436034`: https://bugs.launchpad.net/mos/+bug/1436034
.. _`LP1463522`: https://bugs.launchpad.net/mos/+bug/1463522
.. _`LP1474015`: https://bugs.launchpad.net/mos/+bug/1474015
.. _`LP1471992`: https://bugs.launchpad.net/mos/+bug/1471992