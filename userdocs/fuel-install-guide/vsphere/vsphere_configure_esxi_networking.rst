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

