
New Nova-related features
-------------------------

Mirantis OpenStack 6.1 includes a number of improvements related to Nova.


Instance Features
+++++++++++++++++

* Users are allowed to specify an image to use for rescue instead of
  the original base image.
  See the `API: Allow user to specify image to use during rescue`_ blueprint
  and the `Allow image to be specified during rescue`_ specification for details.

* Allow images to specify whether a config drive should be used.
  See the `Consider the image property for config drive option`_ blueprint
  and the `Config drive based on image property`_ specification for details.

* Users and administrators can control the vCPU topology exposed to
  guests via flavors.
  See the `Virt driver guest vCPU topology configuration`_ specification for details.

* All local disks are attached during rescue.
  See the `Attach All Disks During Rescue (partial)` blueprint
  and the `Attach All Local Disks During Rescue` specification for details.


Networking
++++++++++

* Nova-network allows per-network settings.
  See the `Better Support for Multiple Networks in nova-network (partial)`_ blueprint
  and the `Better Support for Multiple Networks in nova-network`_ specification for details.

* Allow deployers to add hooks which are informed as soon as networking
  information for an instance is changed.
  See the `Add hook for update_instance_cache_with_nw_info`_ for details.

* Permit VM instances to attach multiple interfaces to one network.
  See the `Support multiple interfaces from one VM attached to the same network`_ specification for details.

* VM instances can now be booted up with SR-IOV neutron ports.
  See the `enable a nova instance to be booted up with neutron SRIOV ports`_ blueprint
  and the `PCI SR-IOV passthrough to nova instance`_ specification for details.


Scheduling
++++++++++

*  Resource tracker is now pluggable.
   See the `Scheduler: Extensible Resource Tracking (partial)`_ blueprint
   and the `Extensible Resource Tracking`_ specification for details.

* It is not longer required to specify a target host when evacuating
  instances.
  See the `API: Evacuate instance to a scheduled host`_ specification for details.

* Status of a host in the database is now updated only when it is changed, instead
  of every 60 seconds.
  See the `Change compute updates from periodic to on demand`_ specification for details.


Other
+++++

* Status information is now included in API listings of hypervisor hosts.
  See the `Return hypervisor node status`_ specification for details.

* API callers can now specify more than one status to filter by when listing VMs.
  See the `servers list API support specify multi-status`_ specification for details.

* New quota values have been added to constrain the number and size of server
  groups a user can create.
  See the `Server Group Quotas`_ specification for details.


Libvirt Specific
++++++++++++++++

* Performance of listing instances on modern libvirt versions
  has been improved.
  See the `Speedup listing of domains in libvirt driver (partial)`_ blueprint
  and the `Speedup listing of domains in libvirt driver`_ specification for details.

* Meta-data about an instance is now recorded in the libvirt domain XML.
  This is intended to help administrators while debugging problems.
  See the `Libvirt driver domain metadata`_ specification for details.

* Add support for handing back unused disk blocks to the underlying storage system.
  See the `Libvirt-Enable suppport for discard option for disks managed by nova`_ blueprint
  and the `Libvirt-Enable support discard option for disk device`_ specification for details.

* Copy-on-write cloning for RBD-backed disks is now enabled.
  See the `Storage: Copy-on-write cloning for RBD-backed disks`_ specification for details.

* Allow controlled shutdown of guest operating systems during VM power off.
  See the `Allow Users to specify Guest shutdown behavior for Stop, Rescue, and Delete (partial)`_ blueprint
  and the `Allow controlled shutdown of GuestOS for operations which power off the VM`_ specification for details.



.. _`API: Allow user to specify image to use during rescue`: https://blueprints.launchpad.net/nova/+spec/allow-image-to-be-specified-during-rescue
.. _`Allow image to be specified during rescue`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/allow-image-to-be-specified-during-rescue.html
.. _`Consider the image property for config drive option`: https://blueprints.launchpad.net/nova/+spec/config-drive-image-property
.. _`Config drive based on image property`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/config-drive-image-property.html
.. _`Attach All Disks During Rescue (partial)`: https://blueprints.launchpad.net/nova/+spec/rescue-attach-all-disks
.. _`Attach All Local Disks During Rescue`: <http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/rescue-attach-all-disks.html>
.. _`Better Support for Multiple Networks in nova-network (partial)`: https://blueprints.launchpad.net/nova/+spec/better-support-for-multiple-networks
.. _`Better Support for Multiple Networks in nova-network`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/better-support-for-multiple-networks.html
.. _`enable a nova instance to be booted up with neutron SRIOV ports`: https://blueprints.launchpad.net/nova/+spec/pci-passthrough-sriov
.. _`PCI SR-IOV passthrough to nova instance`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/pci-passthrough-sriov.html
.. _`Scheduler: Extensible Resource Tracking (partial)`: https://blueprints.launchpad.net/nova/+spec/extensible-resource-tracking
.. _`Extensible Resource Tracking`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/extensible-resource-tracking.html
.. _`Speedup listing of domains in libvirt driver (partial)`: https://blueprints.launchpad.net/nova/+spec/libvirt-domain-listing-speedup
.. _`Speedup listing of domains in libvirt driver`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/libvirt-domain-listing-speedup.html
.. _`Libvirt-Enable suppport for discard option for disks managed by nova`: https://blueprints.launchpad.net/nova/+spec/libvirt-disk-discard-option
.. _`Libvirt-Enable support discard option for disk device`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/libvirt-disk-discard-option.html
.. _`Allow Users to specify Guest shutdown behavior for Stop, Rescue, and Delete (partial)`: https://blueprints.launchpad.net/nova/+spec/user-defined-shutdown
.. _`Allow controlled shutdown of GuestOS for operations which power off the VM`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/user-defined-shutdown.html
.. _`Virt driver guest vCPU topology configuration`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/virt-driver-vcpu-topology.html
.. _`Add hook for update_instance_cache_with_nw_info`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/instance-network-info-hook.htmlspecification
.. _`Support multiple interfaces from one VM attached to the same network`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/nfv-multiple-if-1-net.html
.. _`API: Evacuate instance to a scheduled host`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/find-host-and-evacuate-instance.html
.. _`Change compute updates from periodic to on demand`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/on-demand-compute-update.html
.. _`Return hypervisor node status`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/return-status-for-hypervisor-node.html
.. _`servers list API support specify multi-status`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/servers-list-support-multi-status.html
.. _`Server Group Quotas`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/server-group-quotas.html
.. _`Libvirt driver domain metadata`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/libvirt-driver-domain-metadata.html
.. _`Storage: Copy-on-write cloning for RBD-backed disks`: http://specs.openstack.org/openstack/nova-specs/specs/juno/implemented/rbd-clone-image-handler.html
