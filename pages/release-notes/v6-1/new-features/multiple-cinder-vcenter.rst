.. _multiple-cinder-vcenter:

Multiple Cinder types support
-----------------------------

Previously, when vCenter was used as a hypervisor,
it could use volumes only from Cinder VMDK.
The same happened with KVM: when enabled, it could not mount volumes from Cinder VMDK.
Since dual hypervisors are now supported, Cinder can be deployed
with multiple backends - VMDK plus LVM/Ceph.

Fuel 6.1 now has "Cinder with VMDK", a new role,
that provides this opportunity. For instructions, see