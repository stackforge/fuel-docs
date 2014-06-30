
.. _fuel-on-vsphere-ug:

Installing Fuel Master Node on vSphere
======================================

Before you follow this procedure to install
the Fuel Master Node on vSphere,
you should set up the vCenter Datastore
as described in :ref:`fuel-on-vsphere-plan`.

At the Virtual Machines screen,
select the Fuel VM and run it by clicking the ‘Power on’ icon:

.. image:: /_images/vCenter/5.1-fuel-vcenter-power-on-VM.png
   :width: 50%


Click to the "Open a virtual machine console" icon:


.. image:: /_images/vCenter/5.2-fuel-vcenter-open-vnc.png
   :width: 50%


.3) Click somewhere inside of the opened window,
wait until the BIOS appears,
and use the arrow keys on your keyboard to navigate to the "Boot" tab.
Then move the highlighted selection to the ‘CD-ROM drive’:


.. image:: /_images/vCenter/5.3-fuel-vcenter-bios-boot-priority.png
   :width: 50%


Using the ‘+’ button on the keyboard,
move the "CD-ROM Drive" item to the top level:


.. image:: /_images/vCenter/5.4-fuel-vcenter-use-CD-as-first-boot-device.png
   :width: 50%


Navigate to the ‘Exit’ tab, choose the "Exit Saving Changes" item
and confirm your decision:


.. image:: /_images/vCenter/5.5-fuel-vcenter-save-bios-and-proceed.png
   :width: 50%


When the MOS ISO boot menu appears,
press the "Tab" key on the keyboard
and modify the last kernel parameter "showmenu" to "yes".
Then press the "Enter" key:

.. image:: /_images/vCenter/5.6-fuel-vcenter-iso-boot-menu.png
   :width: 50%



Wait until the operating system installation procedure is finished
and the Fuel menu occurs:

.. image:: /_images/vCenter/5.7-fuel-vcenter-fuelmenu.png
   :width: 50%


You can change some network parameters of the Fuel Master Node here.
For more information, see :ref:`Network_Install`.
If you want to use the default parameters,
just select the "Quit Setup" item on the left
and choose the "Quit without saving" button.


.. image:: /_images/vCenter/5.8-fuel-vcenter-fuelmenu-exit.png
   :width: 50%


Wait until the Fuel Master node installation completes:

.. image:: /_images/vCenter/5.9-fuel-vcenter-master-node-installation-complete.png
   :width: 50%


To reach the Fuel Web UI,
you must have IP connectivity to the Fuel Master Node IP
through the IP gateway that is connected to the Port Group network we use.
In this example, it is the ‘Fuel-PXE’ network
that is connected to the only physical interface on the ESXi Host:
10.20.123.190 with VLAN tag 200.
The default network settings for the Fuel Master node are:

  - node IP:  10.20.0.2/24
  - gateway and DNS:  10.20.0.1.

To test the operability of the Fuel Master Node,
you can create another VM on the same ESXi Host
and boot it using PXE;
it is a default boot option for VMWare.
If the boot is successful,
the "Total Nodes" counter in the upper right corner
of the Fuel Web UI will increase its value
after two to five minutes.


.. image:: /_images/vCenter/6a-fuel-vcenter-slave-settings.png
   :width: 50%


.. image:: /_images/vCenter/6b-fuel-vcenter-slave-nodes-occur.png
   :width: 50%


To verify that the  Fuel bootstrap node runs on ESXi,
open the Node Info window in the Fuel Web UI
and verify that the ‘Manufacturer’ field says "VMWARE":


.. image:: /_images/vCenter/6.1-fuel-vcenter-bootstrap-vmware.png
   :width: 50%

