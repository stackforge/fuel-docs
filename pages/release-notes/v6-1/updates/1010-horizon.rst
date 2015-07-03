
.. _updates-horizon-rn:

OpenStack Dashboard (Horizon)
-----------------------------

Known Issues
+++++++++++++++

* Avoid using HTML in metadata passed from Django,
  which can lead to security issues.
  Alternatively, if you change URL to update_metadata
  for an image (for example,
  http://<horizon_ip>/admin/images/<image_id>/update_metadata/),
  it will display the alert box.
  See `LP1468744`_.

.. Links
.. _`LP1468744`: https://bugs.launchpad.net/mos/+bug/1468744
