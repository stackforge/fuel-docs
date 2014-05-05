
.. _deploy-environment-ug:

Deploy a New OpenStack Environment
==================================

You must complete the following steps
to deploy your OpenStack environment.
After completing this stage, configure the parameters for deployment,
including networking, storage, and optional parameters.

+----------------------------+-------------------------------------------+
| Step Description           | Additional Information                    |
+============================+===========================================+
| Point your browser to the  | For example: http://10.20.0.2:8000/       |
| Fuel server (on port 8000) |                                           |
+----------------------------+-------------------------------------------+
| Click on the **New**       | The **Create a new OpenStack              |
| *OpenStack environment*    | Environment** wizard launches             |
| icon to create a new       | automatically.                            |
| environment.               |                                           |
+----------------------------+-------------------------------------------+
| Choose a name for your     | If you install Mirantis OpenStack, you can|
| environment and choose the | select Ubuntu Enterprise Linux or CentOS  |
| Operating System and       | OpenStack.                                |
| OpenStack distribution.    |                                           |
+----------------------------+-------------------------------------------+
| Choose your Deployment     | High Availability mode requires at        |
| Mode (Multi-node HA or non | least 3 nodes to be assigned as           |
| HA).                       | controllers.                              |
+----------------------------+-------------------------------------------+
| Choose your                | Current choices from the UI are           |
| :ref:`hypervisor-term`     | :ref:`kvm-term`, :ref:`qemu-term`, or     |
|                            | vcenter.                                  |
+----------------------------+-------------------------------------------+
| Select your network        | If you choose Nova-network, you can       |
| service (Nova-network,     | choose FlatDHCP or VLAN Manager later in  |
| Neutron with GRE           | the **Network** settings tab.             |
| segmentation or Neutron    |                                           |
| with VLAN segmentation.    |                                           |
+----------------------------+-------------------------------------------+
| Select your storage        | If you select **default**, then the Local |
| backend for Cinder.        | Volumes over iSCSI are used as backend for|
|                            | Cinder. If you select **Ceph**, you must  |
|                            | assign at least 2 nodes as Ceph-OSD nodes.|
+----------------------------+-------------------------------------------+
| Set up NIC bonding         | See :ref: `nic_bonding`.                  |
+----------------------------+-------------------------------------------+
| Select your storage        | If you select **default**, then the local |
| backend for Glance.        | storage in non-HA mode and Swift in HA    |
|                            | mode is used as backend for Cinder. Swift |
|                            | will be automatically installed on the    |
|                            | controllers. If you select **Ceph**, you  |
|                            | must assign at least 2 nodes as Ceph-OSD  |
|                            | nodes.                                    |
+----------------------------+-------------------------------------------+
| Choose additional Platform | Savanna enables on-demand provisioning of |
| Services.                  | Hadoop clusters on OpenStack.             |
|                            | Murano enables Windows-based datacenter   |
|                            | services to be deployed on OpenStack.     |
+----------------------------+-------------------------------------------+
| Select Create and click on | Additional configuration tabs appear.     |
| the icon with your named   |                                           |
| environment.               |                                           |
+----------------------------+-------------------------------------------+
| In **Nodes** tab, assign a | A node may act as a controller, compute,  |
| role or roles to each node | or storage node. You can combine          |
| server.                    | a storage role with a controller or       |
|                            | compute role.                             |
+----------------------------+-------------------------------------------+
| In **Network** tab,        | If you chose Neutron as your network      |
| configure the network      | service, additional sections are          |
| settings from the address  | available for setting your L2 and L3      |
| plan prepared earlier.     | configuration.                            |
+----------------------------+-------------------------------------------+
| Click **Verify Networks**  | This sends test frames and 802.1Q         |
| to check and confirm the   | tagged frames to each node server to      |
| network configuration.     | confirm connectivity.                     |
+----------------------------+-------------------------------------------+
| (Optional) In the          | You may also modify your choices for      |
| **Settings** tab, you can  | hypervisor, storage, and Platform         |
| configure or modify the    | Services configured before the            |
| options for Horizon        | deployment.                               |
| access, scheduler type,    |                                           |
| logging, and other         |                                           |
| OpenStack options.         |                                           |
+----------------------------+-------------------------------------------+
| Click the **Deploy**       | Mirantis OpenStack deployment may take    |
| **Changes** button.        | 15-60 minutes, depending on your the      |
|                            | selected options. You can monitor status  |
|                            | by opening the **Nodes** tab or by        |
|                            | checking individual node logs in the Logs |
|                            | tab.                                      |
+----------------------------+-------------------------------------------+
| Once deployed, run the     | You can run the test groups in parallel or|
| tests in the **Health**    | one at a time.                            |
| **Check** tab to confirm   |                                           |
| success.                   |                                           |
+----------------------------+-------------------------------------------+
| If necessary, you can stop | See :ref:                                 |
| deployment after it stops. |                                           |
+----------------------------+-------------------------------------------+
| If necessary, you can      | See :ref:                                 |
| reset the deployment.      |                                           |
+----------------------------+-------------------------------------------+
| Once deployed, run the     | You can run the test groups in parallel or|
| tests in the **Health**    | one at a time.                            |
| **Check** tab to confirm   | See :ref: `<health_tests>`                |
| success.                   |                                           |
+----------------------------+-------------------------------------------+
| (Optional) Set up Sahara   |                                           |
+----------------------------+-------------------------------------------+
| (Optional) Set u Murano    |                                           |
+----------------------------+-------------------------------------------+
| Set up VMs and LXC         |                                           |
| containers, load your apps |                                           |
| and storage                |                                           |
+----------------------------+-------------------------------------------+


After you complete these tasks, Mirantis OpenStack is ready to use.

In the following sections, you can view specific examples of deploying
Mirantis OpenStack, including complete switch configuration and cabling.  

.. see also:: :ref:`Nova-network <novanetwork>`, :ref:`Neutron <neutron>`

Create a new environment
========================

After Fuel completes the installation,
point your browser to default Fuel UI
URL: `http://10.20.0.2:8000 <http://10.20.0.2:8000>`__.

Alternatively, point your browser
to the IP address and port number that you specified.

In the Fuel UI, create a new OpenStack environment.

.. image:: /_images/fuel-wizard.png
   :align: center
   :width: 70%

Network settings page
=====================

#. Configure the network settings using the address plan.

#. Verify the network configuration by clicking **Verify Networks**.


.. image:: /_images/fuel-network-settings.png
   :align: center
   :width: 70%

Settings page
=============

#. In the **Settings** tab, modify additional options:

   * Access

   * OpenStack Components

   * Hypervisor type

   * Scheduler driver

   * Syslog

   * Storage

.. image:: /_images/fuel-settings1.png
   :align: center
   :width: 70%

.. image:: /_images/fuel-settings2.png
   :align: center
   :width: 70%

.. image:: /_images/fuel-settings3.png
   :align: center
   :width: 70%

.. image:: /_images/fuel-settings4.png
   :align: center
   :width: 70%

Add nodes to environment
========================

.. image:: /_images/fuel-nodes.png
   :align: center
   :width: 70%

Select discovered nodes
=======================

#. Assign a role for each node server.

.. image:: /_images/fuel-nodes-selected.png
   :align: center
   :width: 70%

Node's network settings
=======================

.. image:: /_images/fuel-node-network.png
   :align: center
   :width: 70%

Additional left-over text
=========================


