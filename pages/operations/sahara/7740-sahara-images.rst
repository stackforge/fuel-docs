

.. _sahara-images:

Image Requirements
------------------

Sahara deploys cluster of machines based on images stored in Glance.
Each plugin has its own requirements on image contents, see specific plugin
documentation for details. A general requirement for an image is to have
cloud-init package installed.

The Images can be built using the Disk Image Builder tool. The detailed guide
can be found here: `Building an Image <http://sahara.readthedocs.org/en/stable-icehouse/userdoc/diskimagebuilder.html>`_

Disk Image Builder will generate QCOW2 images, which may be used with a
default OpenStack Qemu/KVM hypervisors. If your OpenStack uses a different
hypervisor, the generated image should be converted to an appropriate format.

Vmvare Nova backend requires VMDK image format. You may use qemu-img
utility to convert a QCOW2 image to VMDK.

.. sourcecode:: console

    qemu-img convert -O vmdk <original_image>.qcow2 <converted_image>.vmdk