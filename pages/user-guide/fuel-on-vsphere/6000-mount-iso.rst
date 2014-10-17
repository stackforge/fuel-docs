
.. _mount-iso-vsphere:

Mount the Mirantis OpenStack ISO
++++++++++++++++++++++++++++++++

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
