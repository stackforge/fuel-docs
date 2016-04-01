.. _ironic_prepare_image:

Prepare a physical machine image
--------------------------------

If you use default Fuel drivers for Ironic, you must build and upload a
physical machine image into Glance, as well as configure the image with
specific parameters.

**To prepare a physical machine image:**

#. Build a physical machine image.

   You can build images for a physical machine using a method of your personal
   preference. For example, using Disk Image builder (DIB):

   ::

     disk-image-create -a amd64 -p <packages> -o <image_name> <base_image>

   **Example:**

   ::

     disk-image-create -a amd64 -p grub2-common,grub-pc, \
     grub-gfxpayload-lists,emacs24-nox,parted baremetal ubuntu-minimal

#. Upload the image to Glance using the ``glance image-create`` command.

   **Example:**

   ::

     glance image-create --name test --disk-format raw --container-format bare
               --file test [--visibility public]

#. Tag the image with the corresponding metadata.

   **Example:**

   ::

     glance image-update <image-id> --property cpu_arch=x86_64
                                    --property hypervisor_type="baremetal"
                                    --property fuel_disk_info=DISK_INFO

   The ``DISK_INFO`` value is a structure that describes the partition layout
   required by the image.

   **Example:**

   ::

     ‘[{"name": "sda", "extra": [], "free_space": 11000, "type": "disk",
     "id": "vda", "size": 11000, "volumes": [{"mount": "/", "type":
     "partition", "file_system": "ext4", "size": 10000}]}]’

   .. warning::
      Only extended file systems are supported!

.. seealso::

   - ``glance help image-create``
   - *Disk Image Builder Documentation*
