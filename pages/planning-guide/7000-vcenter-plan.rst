
.. _vcenter-plan:

Preparing for vSphere Integration
=================================
Fuel 5.0 and later can deploy a Mirantis OpenStack environment
that boots and manages virtual machines in VMware vSphere.
VMware provides a vCenter driver for OpenStack
that enables the Nova-compute service to
communicate with a VMware vCenter server
that manages one or more ESX host clusters.
If your vCenter manages multiple ESX host clusters, Fuel 5.1 allows
you to specify several or all clusters for a single OpenStack environment,
so that one Nova-compute service manages
multiple ESX host clusters via single vCenter server.

.. note:: In 5.x environments that use vCenter as the hypervisor,
   the Nova-compute service runs only on Controller nodes.

   In future Fuel releases, the plan is to change
   the relation between a Nova-compute service and an ESX host cluster
   from one-to-many to one-to-one.
   In other words, to manage multiple ESX host clusters,
   you will need to run multiple Nova-compute services.

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

1. Open the ESXi host page,
   select the "Manage" tab and click on "Networking".
   vSwitch0 and all its networks are shown.
   Click the Add Network button:

.. image:: /_images/esx-manage-networks.png
  :width: 70%

2. In the "Add Networking" wizard, select the Virtual Machine Port group:

.. image:: /_images/esx-target-device.png
  :width: 70%

.. raw: pdf

   PageBreak

3. On the next page, select the "Virtual Machine Port Group" option
   to ensure that the network will be created in vSwitch0:

.. image:: /_images/esx-connection-type.png
  :width: 70%

4. Always name the network **br100**;
   this is the only value that works with Fuel;
   type a VLAN Tag in the VLAN ID field;
   (the value must be equal to the VLAN Tag at *VM Fixed*
   on Fuel’s :ref:`network-settings-vcenter-ug` tab):

.. image:: /_images/esx-connection-settings.png
  :width: 70%

.. _vcenter-limitations:

Limitations
-----------

- Only vCenter versions 5.1 and later are supported
- It is not possible to specify the vCenter cluster
  where virtual instances will be launched.
- Each OpenStack environment can support one vCenter cluster.
- :ref:`security-groups-term` are not supported.
- The only supported backend for Cinder is VMDK.
- Volumes that are created by Cinder appear as SCSI disks. To be able
  to read/write that disk, be sure that the operating system inside
  the instance supports SCSI disks. The CirrOS image that is shipped with Fuel
  supports only IDE disks, so even if the volume is attached to it, CirrOS is
  not able to use it.
- The Ceph backend for Glance, Cinder and RadosGW object storage is not supported.
- Murano is not supported. It requires Neutron and vCenter utilizes nova-network.
- Fuel does not configure Ceilometer to collect metrics from vCenter virtual resources.
  For more details about the Ceilometer plugin for vCenter,
  see `Support for VMware vCenter Server
  <https://wiki.openstack.org/wiki/Ceilometer/blueprints/vmware-vcenter-server#Support_for_VMware_vCenter_Server>`_


.. note::    Mirantis has the following lab setup for VMware enrivonment,
             that was checked for compatibility of the NSX and vCenter:

             * NSX version 4.0.1 (4.0.1-build30244) for Gateway, Manager, Controller
               and Service nodes.

             * NSX OpenVSwitch version 2.0.0 (2.0.0-build30176)

             * vCenter 5.5. Note that vCenter 5.5.u2 is also used, but
               was not tested properly for comptibility with NSX and
               does not work with NSX 4.0.1.

             To learn more about NSX and vCenter
             compatibility, see
             `the VMware Product Interoperability Matrixes <http://www.vmware.com/resources/compatibility/sim/interop_matrix.php>`_.


.. warning:: Mirantis lab setup was tested for the Mirantis OpenStack release 6.0.
              This particular setup works properly at CentOS 6.5.
              Nevertheless, at Ubuntu 12.04 it **does not** work properly
              due to incompatibility of the Linux 3.13 kernel and NSX OVS 2.0.


For background information about how vCenter support
is integrated into Mirantis OpenStack, see :ref:`vcenter-arch`.

Follow the instructions in :ref:`vcenter-deploy`
to deploy your Mirantis OpenStack environment with vCenter support.
