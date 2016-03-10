.. _vsphere_create_vm:

Create the Fuel Master node virtual machine
-------------------------------------------

You need to create a new virtual machine with a guest
operating system to run the Fuel Master node on it.

**To create the Fuel Master node virtual machine:**

#. On the vCenter screen choose **Virtual Machines**.
#. Click **Create a Virtual Machine**.
#. Click **Create a new virtual machine**.
    Do not use templates.
#. Name your new VM and choose the datacenter where the Mirantis ISO
   is located.
#. Select a compute resource (ESXi host), storage, and compatibility
   for the VM.
#. Select a guest operating system.
#. Proceed to: :ref:`vsphere_mount_iso`.
