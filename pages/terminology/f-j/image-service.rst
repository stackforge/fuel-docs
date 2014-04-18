.. _image-service-term:

Image Service
-------------

The OpenStack Image Service provides discovery,
registration and delivery services for disk and server images.
The ability to copy or snapshot a server image
and immediately store it away
is a powerful capability of the OpenStack cloud operating system.
A stored image can be used as a template
to get new servers up and running quickly and consistently;
it can also be used to store and catalog an umlimited number of backups.

The Image Service can store disk and server images in a variety of back-ends,
including OpenStack Object Storage.
The Image Service API provides a standard REST interface
for querying information about disk images
and lets clients stream the images to new servers.

Capabilities of the Image Service include:

* Administrators can create base templates
  from which their users can start new compute instances
* Users can choose from available images,
  or create their own images from existing servers
* Snapshots can be stored in the Image Service
  so that virtual machines can be backed up quickly
* A multi-format image registry,
  the image service allows uploads of private and public images
  in a variety of formats, including 
  Raw, Machine (kernel/ramdisk outside of image, a.k.a. AMI),
  VHD (Hyper-V), VDI (VirtualBox), qcow2 (Qemu/KVM),
  VMDK (VMWare), and OVF (VMWare, others).

Pacemaker uses an OpenStack Resource Agent
to manage the Image Service in OpenStack High Availability deployments.
For information about the High Availability Image service, see
`Highly Available OpenStack Image API <http://docs.openstack.org/high-availability-guide/content/s-glance-api.html>`_.

