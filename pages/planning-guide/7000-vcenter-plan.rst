
.. _vcenter-plan:

Preparing for vSphere Integration
=================================
Fuel 5.0 and later can deploy a Mirantis OpenStack environment
that boots and manages virtual machines in VMware vSphere.
VMware provides a vCenter driver for OpenStack
that enables the nova-compute service to
communicate with a VMware vCenter server
that manages one or more ESX host clusters.
If your vCenter manages multiple ESX host clusters, Fuel 5.1 allows
you to specify several or all clusters for a single OpenStack environment,
so that one nova-compute service manages
multiple ESX host clusters via single vCenter server.

Please, note the following:

* Beginning with Fuel 6.1, vCenter cannot be
  integrated with NSX: NSX support is now deprecated.
  Due to Pluggable Architecture, it might
  be turned into a plugin in the future Fuel
  releases.


* In 5.x environments that use vCenter as the hypervisor,
  the nova-compute service runs only on Controller nodes.

* In 6.0 Fuel release, the relation between a nova-compute service and an ESXi host cluster
  is changed from one-to-many to one-to-one (so-called 1-1 mapping).
  In other words, to manage multiple ESXi host clusters,
  you now need to run multiple nova-compute services.

* In Fuel 6.1, each OpenStack environment can support more than one
  vCenter cluster.


The vCenter driver makes management convenient
from both the OpenStack Dashboard (:ref:`horizon-term`)
and from vCenter,
where advanced vSphere features can be accessed.

This section summarizes the planning you should do
and other steps that are required
before you attempt to deploy Mirantis OpenStack
with vCenter integration.

For more information:

- See :ref:`vcenter-arch` for information about how vCenter support
  is implemented in Mirantis OpenStack;

- :ref:`vcenter-deploy` gives instructions for creating and deploying
  a Mirantis OpenStack environment that is integrated with VMware vSphere.

- For background information about VMware vSphere support in OpenStack,
  see the `VMware vSphere - OpenStack Manuals
  <http://docs.openstack.org/trunk/config-reference/content/vmware.html>`_.

- The official vSphere installation guide can be found here:
  `vSphere Installation and Setup
  <http://pubs.vmware.com/vsphere-55/index.jsp#com.vmware.vsphere.install.doc/GUID-7C9A1E23-7FCD-4295-9CB1-C932F2423C63.html>`_.

- See :ref:`Limitations<vcenter-limitations>` section for more details
  on compatility with other VMware components and Mirantis lab setup.


vSphere Installation
--------------------
Before installing Fuel and using it
to create a Mirantis OpenStack environment
that is integrated with VMware vSphere,
the vSphere installation must be up and running.
Please check that you completed the following steps:

* Install vSphere

* Install vCenter

* Install ESXi

* Configure vCenter

* Create DataCenter

* Create vCenter cluster

* Add ESXi host(s)

.. raw:: pdf

   PageBreak

ESXi Host Networks Configuration
--------------------------------
The ESXi host(s) network must be configured appropriately
in order to enable integration of Mirantis OpenStack with vCenter.
Follow the steps below:

#. Open the ESXi host page,
   select the "Manage" tab and click on "Networking".
   vSwitch0 and all its networks are shown.
   Click the Add Network button:

   .. image:: /_images/esx-manage-networks.png


#. In the "Add Networking" wizard, select the Virtual Machine Port group:

   .. image:: /_images/esx-connection-type.png


.. raw: pdf

   PageBreak

#. On the next page, select the "Virtual Machine Port Group" option
   to ensure that the network will be created in vSwitch0:

   .. image:: /_images/esx-target-device.png


#. Always name the network **br100**;
   this is the only value that works with Fuel;
   type a VLAN Tag in the VLAN ID field;
   (the value must be equal to the VLAN Tag at *VM Fixed*
   on Fuel’s :ref:`network-settings-vcenter-ug` tab):

   .. image:: /_images/esx-connection-settings.png


.. _vcenter-limitations:

Limitations
-----------

- Only vCenter versions 5.1 and later are supported
- It is not possible to specify the vCenter cluster
  where virtual instances will be launched.
- :ref:`security-groups-term` are not supported.
- The only supported backend for Cinder is VMDK.
- Volumes that are created by Cinder appear as SCSI disks. To be able
  to read/write that disk, be sure that the operating system inside
  the instance supports SCSI disks. The CirrOS image that is shipped with Fuel
  supports only IDE disks, so even if the volume is attached to it, CirrOS is
  not able to use it.
- The Ceph backend for Glance, Cinder and RadosGW object storage is not supported.
- Murano is not supported. It requires Neutron and vCenter utilizes nova-network.


.. note::    Mirantis has the following lab setup tested for Mirantis OpenStack release 6.0
             for VMware environment:

             * vCenter 5.5.

             * vCenter 5.5.u2



For background information about how vCenter support
is integrated into Mirantis OpenStack, see :ref:`vcenter-arch`.

Follow the instructions in :ref:`vcenter-deploy`
to deploy your Mirantis OpenStack environment with vCenter support.
