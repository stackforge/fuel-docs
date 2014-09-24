
.. raw:: pdf

   PageBreak


.. _settings-storage-ug:

Storage
+++++++

.. image:: /_images/user_screen_shots/settings-storage.png

You can use this screen to modify the choices made
on the :ref:`cinder-glance-backend-ug` screen.
Be sure that you have assigned the appropriate roles
on the :ref:`assign-roles-ug` screen
to support the storage backends you select here.
For example, if you configure any Ceph storage options here,
you must configure an appropriate number of Ceph OSD nodes;
if you configure a Cinder LVM over iSCSI role here,
you must configure a Cinder LVM node.

The "Ceph replication factor" value determines the minimum number of
Ceph OSD nodes that must be deployed.
At least three Ceph OSD nodes are recommended for production environments
but it is possible to set this value to 1
and then run OpenStack with a single Ceph OSD node.
