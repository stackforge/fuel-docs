
.. _vcenter-plan:

Preparing for vSphere Integration
=================================
OpenStack Compute supports the VMware vSphere product family.
The VMware vCenter driver enables the Nova-compute service to
communicate with a VMware vCenter server
that manages one or more ESX host clusters.

For background information about VMware vSphere support in OpenStack,
see `VMware vSphere - OpenStack Manuals <http://docs.openstack.org/trunk/config-reference/content/vmware.html>`_.

This section summarizes the planning you should do
and other steps that are required
before you attempt to deploy Mirantis OpenStack
with vCenter intergration.

vSphere Installation
--------------------
The vSphere installation must be up and running.

The official vSphere installation guide can be found here:
  `vSphere Installation and Setup <http://pubs.vmware.com/vsphere-55/index.jsp#com.vmware.vsphere.install.doc/GUID-7C9A1E23-7FCD-4295-9CB1-C932F2423C63.html>`_.

Please check that you completed the following steps:

* Install vSphere
* Install vCenter
* Install ESXi
* Configure vCenter

	* Create DataCenter
	* Create vCenter cluster
	* Add ESXi host(s)

ESXi Host Networks Configuration
--------------------------------
In order to enable intergration of Mirantis OpenStack with vCenter,
the ESXi host(s) networks must be configured in a certain way.
Follow the steps below:

1. Open the ESXi host page, select Manage tab and click Networking.
   vSwitch0 and all its networks are shown.
   Click the Add Network button:

.. image:: /_images/esx-manage-networks.png
  :width: 50%

2. In the Add networking wizard, select the Virtual Machine Port group:

.. image:: /_images/esx-target-device.png
  :width: 50%

3. On next page make sure network will be created in vSwitch0:

.. image:: /_images/esx-connection-type.png
  :width: 50%

4. Always name the network **br100**;
   this is the only value that works with Fuel;
   type a VLAN Tag in the VLAN ID field;
   (the value must be equal to the VLAN Tag at *VM Fixed*
   on Fuel’s :ref:`network-settings-vcenter-ug` tab):

.. image:: /_images/esx-connection-settings.png
  :width: 50%
  
Limitations
------------------------------
- Only :ref:`nova-network-term` with flatDHCP mode is supported
  in the current version of the integration.
- OpenStack Block Storage service (Cinder)
  with VMware VMDK datastore driver is not supported.
- Each OpenStack environment can support one vCenter cluster.
- VMware vCenter can be deployed on Mirantis OpenStack
  with or without high-availability (HA) configured.
  Note, however, that the vCenter Nova plugin
  runs on only one Controller node,
  even if that Controller node is replicated to provide HA.

For background information about how vCenter support
is integrated into Mirantis OpenStack, see :ref:`vcenter-arch`.

Follow the instructions in :ref:`vcenter-deploy`
to deploy your Mirantis OpenStack environment with vCenter support.
