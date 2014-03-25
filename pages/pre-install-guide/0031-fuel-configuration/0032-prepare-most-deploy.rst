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
|    | (Nova-Network: FlatDHCP,   | :ref:`Network <fuelui-network>`.          |
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

