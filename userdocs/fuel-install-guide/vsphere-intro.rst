.. raw:: pdf

   PageBreak oneColumn

.. _vsphere_intro:

Install Fuel on VMware vSphere
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section describes how to configure your VMware vSphere environment
to install Fuel.

.. _vmware_prereq:

VMware vSphere prerequisites
----------------------------

Before you install Fuel and use your Mirantis OpenStack environment
in intergration with vSphere, you must configure all components
of VMware vSphere.

.. note::

   The vCenter Server supported versions are 5.1, 5.5, and 6.0.

Complete the following steps:

* Install ESXi.
* Install vCenter.
* Configure vCenter.
* Create Datacenter.
* Create vCenter cluster.
* Add ESXi hosts to clusters in vCenter.

For more information, see the VMware vSphere documentation.

.. _configure_esxi:

Configure ESXi host networking
------------------------------

To integrate Mirantis OpenStack with VMware vCenter,
you must configure the VMware ESXi host networking.

**To configure ESXi host networking**:

#. In VMware vSphere web-client open the ESXi host page.
#. Select **Manage** > **Networking**.
#. Click **Add network**.
   The **Add networking** wizard starts.
#. In the **Add Networking** wizard, select the Virtual Machine Port
   group.
#. Select the **Virtual Machine Port Group** option
   to ensure that the network is created in vSwitch0.
#. Create a network called **br100**.

   .. note::
      You must name the network ``br100``. Otherwise, Fuel will not
      be able to communicate with VMware vSphere.

#. In the VLAN ID field, type a VLAN Tag.
#. Proceed to :ref:`vsphere_upload_iso`.
