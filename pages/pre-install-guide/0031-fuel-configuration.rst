.. _calculator: https://www.mirantis.com/openstack-services/bom-calculator/

.. index:: Preparing for the Mirantis OpenStack Deployment

.. _PrepMirDep:

Preparing the Mirantis OpenStack Deployment
===========================================

Before installation, plan your deployment. Determine the deployment type that 
is appropriate for you configuration needs. You may want to print this 
list and make notes indicating your selection so you can be sure 
you have planned your deployment correctly.

The following table provides a list of configuration steps that you must 
complete to plan the Mirantis OpenStack deployment.

+----+----------------------------+-------------------------------------------+
|    | Step Description           | Additional Information                    |
+====+============================+===========================================+
| 1  | Consider which deployment  | For more information, see:                |
|    | mode you will deploy       | :ref:`Reference Architecture <ref-arch>`. |
|    | (Multi-node HA or non HA)  |                                           |
+----+----------------------------+-------------------------------------------+
| 2  | Select a network service   | For more information, see:                |
|    | (Nova-Network: FlatDHCP,   | :ref:`Network <_fuelui-network>`.          |
|    | VLAN manager or Neutron:   |                                           |
|    | GRE, VLAN).                |                                           |
+----+----------------------------+-------------------------------------------+
| 3  | Prepare all the necessary  | For more information, see: the Mirantis   |
|    | hardware.                  | Hardware Bill of Materials calculator_,   |
|    |                            | HardwarePrerequisites_                    |
+----+----------------------------+-------------------------------------------+
| 4  | Plan a role (or roles) to  | A node may act as a controller, compute   |
|    | be assigned to each node   | or storage node - or combine storage or   |
|    | server.                    | compute role. Network services are        |
|    |                            | automatically installed onto the          |
|    |                            | controller when utilizing the Fuel UI.    |
+----+----------------------------+-------------------------------------------+
| 5  | Prepare an addressing plan | Identify the network addresses and VLAN   |
|    | and network association.   | IDs for your Public, floating, Management,|
|    |                            | Storage, and virtual machine (fixed)      |
|    |                            | networks. For more information on how to  |
|    |                            | plan your network, see:                   |
|    |                            | NetworkConfiguration_                     |
+----+----------------------------+-------------------------------------------+
| 6  | Prepare a logical network  | For more information, see:                |
|    | diagram.                   | NetworkConfiguration_                     |
+----+----------------------------+-------------------------------------------+
| 7  | Connect the Fuel and node  | For more information, see the instructions|
|    | servers' NICs to the       | for your network.                         |
|    | switches.                  |                                           |
+----+----------------------------+-------------------------------------------+
| 8  | Connect the Fuel and node  | For more information, see the instructions|
|    | servers' IPMI cards to the | for your hardware.                        |
|    | out of band management     |                                           |
|    | network.                   |                                           |
+----+----------------------------+-------------------------------------------+
| 9  | Configure access to the    | For more information, see the IPMI        |
|    | node servers through IPMI  | instructions for your hardware.           |
+----+----------------------------+-------------------------------------------+
| 10 | Prepare the proper         | According to your addressing plan and     |
|    | physical network           | logical network diagram.                  |
|    | configuration (configure   |                                           |
|    | switches, routers, etc).   |                                           |
+----+----------------------------+-------------------------------------------+
| 11 | Connect the OpenStack      | For more information, see the instructions|
|    | networks to the server     | for your routers and/or switches.         |
|    | Ethernet port on each      |                                           |
|    | server.                    |                                           |
+----+----------------------------+-------------------------------------------+
| 12 | Install the Fuel server    | For more information, see:                |
|    |                            | FuelQuickInstall_.                        |
+----+----------------------------+-------------------------------------------+

.. seealso:: `Mirantis Services <http://www.mirantis.com/openstack-services>`_

Post-installation Configuration Tasks
========================================

You must complete the following steps for configuring your OpenStack environment. 
After completing this stage, configure the parameters for deployment, 
including networking, storage, and optional parameters.

+----+----------------------------+-------------------------------------------+
|    | Step Description           | Additional Information                    |
+====+============================+===========================================+
| 1  | Point your browser to the  | For example: http://10.20.0.2:8000/       |
|    | Fuel server (on port 8000) |                                           |
+----+----------------------------+-------------------------------------------+
| 2  | Click on the **New**       | The **Create a new OpenStack              |
|    | *OpenStack environment*    | Environment** wizard launches             |
|    | icon to create a new       | automatically.                            |
|    | environment.               |                                           |
+----+----------------------------+-------------------------------------------+
| 3  | Choose a name for your     | If you install Mirantis OpenStack, you can|
|    | environment and choose the | select Ubuntu Enterprise Linux or CentOS  |
|    | Operating System and       | OpenStack.                                |
|    | OpenStack distribution.    |                                           |
+----+----------------------------+-------------------------------------------+
| 4  | Choose your Deployment     | High Availability mode requires at        |
|    | Mode (Multi-node HA or non | least 3 nodes to be assigned as           |
|    | HA).                       | controllers.                              |
+----+----------------------------+-------------------------------------------+
| 5  | Choose your hypervisor.    | Current choices from the UI are KVM or    |
|    |                            | QEMU. Additional hypervisors are          |
|    |                            | available through the `Mirantis Services`_|
|    |                            | engagement.                               |
+----+----------------------------+-------------------------------------------+
| 6  | Select your network        | If you choose Nova-network, you can       |
|    | service (Nova-network,     | choose FlatDHCP or VLAN Manager later in  |
|    | Neutron with GRE           | the **Network** settings tab.             |
|    | segmentation or Neutron    |                                           |
|    | with VLAN segmentation.    |                                           |
+----+----------------------------+-------------------------------------------+
| 7  | Select your storage        | If you select **default**, then the Local |
|    | backend for Cinder.        | Volumes over iSCSI are used as backend for|
|    |                            | Cinder. If you select **Ceph**, you must  |
|    |                            | assign at least 2 nodes as Ceph-OSD nodes.|
+----+----------------------------+-------------------------------------------+
| 8  | Select your storage        | If you select **default**, then the local |
|    | backend for Glance.        | storage in non-HA mode and Swift in HA    |
|    |                            | mode is used as backend for Cinder. Swift |
|    |                            | will be automatically installed on the    |
|    |                            | controllers. If you select **Ceph**, you  |
|    |                            | must assign at least 2 nodes as Ceph-OSD  |
|    |                            | nodes.                                    |
+----+----------------------------+-------------------------------------------+
| 9  | Choose additional Platform | Savanna enables on-demand provisioning of |
|    | Services.                  | Hadoop clusters on OpenStack.             |
|    |                            | Murano enables Windows-based datacenter   |
|    |                            | services to be deployed on OpenStack.     |
+----+----------------------------+-------------------------------------------+
| 10 | Select Create and click on | Additional configuration tabs appear.     |
|    | the icon with your named   |                                           |
|    | environment.               |                                           |
+----+----------------------------+-------------------------------------------+
| 11 | In **Nodes** tab, assign a | A node may act as a controller, compute,  |
|    | role or roles to each node | or storage node. You can combine          |
|    | server.                    | a storage role with a controller or       |
|    |                            | compute role.                             |
+----+----------------------------+-------------------------------------------+
| 12 | In **Network** tab,        | If you chose Neutron as your network      |
|    | configure the network      | service, additional sections are          |
|    | settings from the address  | available for setting your L2 and L3      |
|    | plan prepared earlier.     | configuration.                            |
+----+----------------------------+-------------------------------------------+
| 13 | Click **Verify Networks**  | This sends test frames and 802.1Q         |
|    | to check and confirm the   | tagged frames to each node server to      |
|    | network configuration.     | confirm connectivity.                     |
+----+----------------------------+-------------------------------------------+
| 14 | (Optional) In the          | You may also modify your choices for      |
|    | **Settings** tab, you can  | hypervisor, storage, and Platform         |
|    | configure or modify the    | Services configured before the            |
|    | options for Horizon        | deployment.                               |
|    | access, scheduler type,    |                                           |
|    | logging, and other         |                                           |
|    | OpenStack options.         |                                           |
+----+----------------------------+-------------------------------------------+
| 15 | Click the **Deploy**       | Mirantis OpenStack deployment may take    |
|    | **Changes** button.        | 15-60 minutes, depending on your the      |
|    |                            | selected options. You can monitor status  |
|    |                            | by opening the **Nodes** tab or by        |
|    |                            | checking individual node logs in the Logs |
|    |                            | tab.                                      |
+----+----------------------------+-------------------------------------------+
| 16 | Once deployed, run the     | You can run the test groups in parallel or|
|    | tests in the **Health**    | one at a time.                            |
|    | **Check** tab to confirm   |                                           |
|    | success.                   |                                           |
+----+----------------------------+-------------------------------------------+

After you complete these tasks, Mirantis OpenStack is ready to use.

In the following sections, you can view specific examples of deploying 
Mirantis OpenStack, including complete switch configuration and cabling.  

.. seealso:: :ref:`Nova-network <novanetwork>`, :ref:`Neutron <neutron>` 
