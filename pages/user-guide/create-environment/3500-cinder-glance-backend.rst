
.. raw:: pdf

  PageBreak

.. _cinder-glance-backend-ug:

Storage backend for Cinder and Glance
----------------------------------------

.. image:: /_images/user_screen_shots/cinder-storage-backend.png
   :width: 50%

Select the storage backend for :ref:`cinder-term`:

- If you select "Default" here,
  then the Local Volumes over iSCSI are used as the backend for Cinder.
  You must configure at least one node with the "cinder" role
  on the :ref:`assign-roles-ug` screen.
  Disk space for Cinder will be allocated automatically.
- If you select "Ceph",
  you must assign at least two nodes as Ceph-OSD nodes
  on the :ref:`assign-roles-ug` screen.
- If you are using :ref:`vCenter<vcenter-term>` as the hypervisor,
  "VMWare vCenter/ESXi" is pre-selected,
  meaning that you will use :ref:`VMDK<vmdk-term>`
  to store your volumes in the vCenter datastore.

Select the storage backend for :ref:`glance-term`:

- If you select "Default" and are using the Multi-node HA mode,
  Swift is used as a backend for Cinder
  and is automatically installed on the Controller nodes.
- If you select "Default" and are using the Multi-node (no HA) mode,
  local storage is used as the backend for Glance.
- If you select Ceph,
  you must assign the Ceph-OSD role on at least two nodes
  on the :ref:`assign-roles-ug` screen.
- If you are using :ref:`vCenter<vcenter-term>` as the hypervisor,
  "VMWare vCenter/ESXi" is pre-selected,
  meaning that you will use :ref:`VMDK<vmdk-term>`
  to store your volumes in the vCenter datastore.

You can later change these settings
on the :ref:`settings-storage-ug` screen,
where you can also set the Ceph replication factor.

See :ref:`storage-plan` for more information
about Cinder, Glance, and Ceph.

