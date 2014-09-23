

.. _sahara-vmware:

Image Requirements
------------------

Vmware Nova backend requires VMDK image format. You may use qemu-img
utility to convert a QCOW2 image to VMDK.

.. sourcecode:: console

    qemu-img convert -O vmdk <original_image>.qcow2 <converted_image>.vmdk