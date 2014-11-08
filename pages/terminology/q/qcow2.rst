
.. _qcow2-term:

qcow2
-----

qcow2 (QEMU Copy-on-Write) is one of the file formats
Fuel supports for Glance image storage
and ephemeral volumes.
You can set the file format to use for images
on the :ref:`qcow-format-ug` screen.

- When using :ref:`Swift<swift-object-storage-term>` as the storage backend,
  qcow2 is the recommended format for storage images.
  It provides copy-on-write and snapshot functionality
  for Swift.

- When using :ref:`Ceph<ceph-term>` as the storage backend for Cinder,
  you must disable qcow2 so that images are stored in raw format.
  Ceph includes its own mechanisms that provide
  copy-on-write capabilities and snapshots;
  if you use the qcow2 image format with Ceph,
  images must be converted to raw format in order to be cloned.

