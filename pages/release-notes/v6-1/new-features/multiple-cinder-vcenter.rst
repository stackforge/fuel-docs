.. _multiple-cinder-vcenter:

Multiple Cinder types support
-----------------------------

Previously, when vCenter was used as a hypervisor,
it could use volumes only from Cinder :ref:`VMDK<vmdk-term>`.
The same occurred with :ref:`KVM<kvm-term>`: when enabled,
it could not mount volumes from Cinder VMDK.
Since :ref:`dual hypervisors<dual-hyperv-support>` are now supported, Cinder can be deployed
with multiple backends - VMDK plus :ref:`LVM<lvm-term>` or Ceph.

Fuel 6.1 now has *Storage - Cinder Proxy to VMware Datastore*, a new role,
that provides this opportunity. For instructions, see

See the related
`Cinder with VMDK role blueprint <https://blueprints.launchpad.net/fuel/+spec/cinder-vmdk-role>`_.