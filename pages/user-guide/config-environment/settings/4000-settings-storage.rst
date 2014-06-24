
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

The "Ceph replica" value represents the minimum number of
Ceph OSD replicas that must be running for Ceph to be viable.
At least two Ceph OSD nodes are required
so this value cannot be set to a value lower than 2,
but the Ceph replica could be set to 2 even for environments
with very large numbers of Ceph OSD roles configured.
