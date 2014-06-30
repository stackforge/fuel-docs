
.. _fuel-on-vsphere-plan:

Preparing to run Fuel on vSphere
================================

For information about how Fuel runs on vSphere,
see :ref:`fuel-on-vsphere-arch`.

This section gives instructions for setting up your vSphere.
When you have completed this process,
follow the instructions in :ref:`fuel-on-vsphere-ug`
to install Fuel on vSphere.

To set up your vSphere environment to run Fuel:

+----------------------------+-------------------------------------------+
| Step Description           | Additional Information                    |
+============================+===========================================+
| Download the Mirantis      | See :ref:`download-iso-vsphere`           |
| OpenStack ISO file         |                                           |
+----------------------------+-------------------------------------------+
| Upload the ISO file        | See :ref:`upload-iso-vsphere`             |
| to the vCenter Datastore   |                                           |
+----------------------------+-------------------------------------------+
| Create a vCenter Port Group| See :ref:`port-group-vsphere`             |
| network                    |                                           |
+----------------------------+-------------------------------------------+
| Create a Virtual Machine   | See :ref:`mount-iso-vsphere`              |
| connected to that Port     |                                           |
| Group and mount the ISO    |                                           |
| the DVD drive              |                                           |
+----------------------------+-------------------------------------------+
| Install Fuel Master node   | See :ref:`install-boot-fuel-vsphere`      |
+----------------------------+-------------------------------------------+
| Verify that Fuel booted    | See :ref:`verify-fuel-boot-vsphere`       |
| on ESXI                    |                                           |
+----------------------------+-------------------------------------------+

Installation of Mirantis OpenStack 5.0 on vSphere
If you want to install the Fuel Master node on  the vCenter cluster you need:
1) Download the Mirantis OpenStack (MOS) ISO.
2) Upload the ISO to the vCenter Datastore.
3) Create a vCenter Port Group network with the Promiscuous mode enabled.
4) Create a Virtual Machine connected to that Port Group and with the ISO mounted to the DVD drive.
5) Install Mirantis OpenStack on that Virtual Machine.
6) (Optional) Verify the installation by launching another Virtual Machine in that Port Group and wait until it occurs in the Fuel Web UI.

.. _download-iso-vsphere:

Download the Mirantis OpenStack ISO
-----------------------------------

Go to the Mirantis OpenStack
`download page <http://software.mirantis.com/>`_
and download the Mirantis OpenStack ISO image.

.. _upload-iso-vsphere:

Upload the ISO to the vCenter Datastore
---------------------------------------

Log into the vSphere web client
and click on the vCenter item in the left menu:

.. image:: /_images/vCenter/2.1-Fuel-vCenter-go-to-vCenter.png
   :width: 50%

Now go to the Datastores and choose your datastore
(`datastore1` in our example):

.. image:: /_images/vCenter/2.2a-fuel-vcenter-go-to-datastore.png
   :width: 50%

.. image:: /_images/vCenter/2.2b-fuel-vcenter-select-your-datastore.png
   :width: 50%


Go to the Actions menu and choose the ‘Browse Files’ item:

.. image:: /_images/vCenter/2.3-fuel-vcenter-brouse-files.png
   :width: 50%


Click on the ‘Upload Files’ icon
then browse your filesystem and select the Mirantis OpenStack image:

.. image:: /_images/vCenter/2.4-fuel-vcenter-click-upload.png
   :width: 50%


Now you must create a network for Fuel PXE traffic
and enable Promiscuous mode on it.

Go back to the vCenter screen and choose the ‘Hosts’ item in the left menu:


.. image:: /_images/vCenter/3.1-fuel-vcenter-go-to-hosts.png
   :width: 50%


Click on the host where you want to run the Fuel Master node:

.. image:: /_images/vCenter/3.2-fuel-vcenter-choose-host.png
   :width: 50%

Click on the ‘Networking’ button.

.. image:: /_images/vCenter/3.3-fuel-vcenter-choose-manage-networking.png
   :width: 50%

Click on the ‘Add Host Networking’ icon:

.. image:: /_images/vCenter/3.4-fuel-vcenter-create-network.png
   :width: 50%

.. _port-group-vsphere:

Create a vCenter Port Group network
-----------------------------------

Choose a Port Group connection type:

.. image:: /_images/vCenter/3.5-fuel-vcenter-portgroup-net.png
   :width: 50%


Choose a switch:

.. image:: /_images/vCenter/3.6-fuel-vcenter-choose-a-switch.png
   :width: 50%


Name your network and set the VLAN number.
This is optional and depends on your underlying network infrastructure:


.. image:: /_images/vCenter/3.7-fuel-vcenter-network-name-and-vlan.png
   :width: 50%


After the network is created,
select the network on the network map by clicking on its name,
then click on the ‘Edit Settings’ icon:

.. image:: /_images/vCenter/3.8-fuel-vcenter-select-created-network.png
   :width: 50%


In the opened window,
click the ‘Security’ item in the left menu
and ensure that Promiscuous mode is set to Accept.
Then click the ‘OK’ button:

.. image:: /_images/vCenter/3.9-fuel-vcenter-accept-promiscuous.png
   :width: 50%

.. _vm-mount-iso-vsphere:

Create Virtual Machine and Mount ISO
------------------------------------

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
The Fuel Master node hardware recomendations are described here:
:ref:`HardwarePrerequisites`.
A network adapter must be connected to the Fuel PXE network
created above.

.. _mount-iso-vsphere:

Mount the Mirantis OpenStack ISO
--------------------------------

For the CD/DVD drive,
choose the "Datastore ISO File" item from the dropdown menu on the right:

.. image:: /_images/vCenter/4.8-fuel-vcenter-VM-use-ISO.png
   :width: 50%



Navigate through the Datastore
and choose the MOS ISO image you uploaded earlier:


.. image:: /_images/vCenter/4.9-fuel-vcenter-VM-select-ISO.png
   :width: 50%


Then enable the CD/DVD drive by clicking to the
"Connect..." checkbox opposite to the drive.
The Virtual Machine hardware settings should look like this:


.. image:: /_images/vCenter/4.10-fuel-vcenter-VM-hardware-settings.png
   :width: 50%


Go to the "VM Options" tab and expand the "Boot Options" submenu.
Then enable the ‘Force BIOS setup’ item:


.. image:: /_images/vCenter/4.11-fuel-vcenter-vm-enable-bios.png
   :width: 50%


Click the "Next" button, verify the new Virtual Machine settings and proceed:

.. image:: /_images/vCenter/4.12-fuel-vcenter-VM-settings-verify.png
   :width: 50%


You are now ready to install Fuel on vSphere,
following the instructions in :ref:`fuel-on-vsphere-ug`.
