
.. _vm-create-vm-vsphere:

Create Virtual Machine and Mount ISO
++++++++++++++++++++++++++++++++++++

Go back to the vCenter screen
and choose the ‘Virtual Machines’ item in the left menu:

.. image:: /_images/vCenter/4.1-fuel-vcenter-go-to-VMs.png
   :width: 50%

Click to the ‘Create a Virtual Machine’ icon:

.. image:: /_images/vCenter/4.2-fuel-vcenter-create-VM.png
   :width: 50%


We will create a Virtual Machine from scratch
without using any templates:

.. image:: /_images/vCenter/4.3-fuel-vcenter-new-vm-p1.png
   :width: 50%


Name your new VM
and choose the Datacenter where the MOS ISO is located:

.. image:: /_images/vCenter/4.4-fuel-vcenter-new-vm-name-and-DC.png
   :width: 50%


Select a compute resource (ESXi host),
storage, and compatibility for the VM:


.. image:: /_images/vCenter/4.5a-fuel-vcenter-new-vm-select-compute.png
   :width: 50%


.. image:: /_images/vCenter/4.5b-fuel-vcenter-new-vm-storage.png
   :width: 50%


.. image:: /_images/vCenter/4.5c-fuel-vcenter-new-vm-compatibility.png
   :width: 50%


Select a guest operating system such as RHEL 6 64-bit:

.. image:: /_images/vCenter/4.6-fuel-vcenter-new-vm-guest-os.png
   :width: 50%


Set the memory size to at least 2GB and HDD size at least 50 GB.
The Fuel Master node hardware recommendations are described here:
:ref:`HardwarePrerequisites`.
A network adapter must be connected to the Fuel PXE network
created above.
