.. _vsphere_intro:

Before you install Fuel on VMware vSphere
=========================================

VMware vSphere prerequisites
----------------------------

Before you install Fuel and use your Mirantis OpenStack environment
in intergration with vSphere, you need to get vSphere up and running.

Complete the following steps:

* Install ESXi.
* Install vCenter.
* Configure vCenter.
* Create DataCenter.
* Create vCenter cluster.
* Add ESXi hosts to clusters in vCenter.

Configure ESXi host networking
------------------------------

Configure ESXi host networking to enable integration of Mirantis
OpenStack with vCenter:

#. Open the ESXi host page, select the "Manage" tab, and click
   on "Networking". Click the "Add Network" button:

#. In the "Add Networking" wizard, select the Virtual Machine Port group:

#. Select the "Virtual Machine Port Group" option
   to ensure that the network is created in vSwitch0:

#. Always name the network **br100**; this is the only value that
   works with Fuel. Type a VLAN Tag in the VLAN ID field;
   the value must be equal to the one you will specify in
   "Use VLAN tagging for fixed networks" in the Networks tab of Fuel.
