40 contents:: :local:


.. _calculator: https://www.mirantis.com/openstack-services/bom-calculator/

.. index:: Preparing for the Mirantis OpenStack Deployment

.. _PrepMirDep:

Planning Summary
================

Before installation, plan your deployment. Determine the deployment type that
is appropriate for you configuration needs. You may want to print this
list and make notes indicating your selection so you can be sure
you have planned your deployment correctly.

The following table provides a list of configuration steps that you must
complete to plan the Mirantis OpenStack deployment.

+----------------------------+-------------------------------------------+
| Step Description           | Additional Information                    |
+============================+===========================================+
| Choose a deployment mode   | See :ref:`mode-ha-plan`                   |
| and whether or not to      |                                           |
| deploy high availability   |                                           |
+----------------------------+-------------------------------------------+
| Select a network topology  | See :ref:`net-topology-plan`              |
|                            |                                           |
+----------------------------+-------------------------------------------+
| Choose the Linux distro    | See :ref:`linux-distro-plan`              |
| to use on your nodes       |                                           |
+----------------------------+-------------------------------------------+
| Determine how many nodes   | See :ref:`nodes-roles-plan`               |
| to deploy and which roles  |                                           |
| to assign to each          |                                           |
+----------------------------+-------------------------------------------+
| Calculate the server and   | See :ref:`hardware-plan`                  |
| network hardware needed    |                                           |
+----------------------------+-------------------------------------------+
| Prepare an addressing plan | Identify the network addresses and VLAN   |
| and network association.   | IDs for your Public, floating, Management,|
|                            | Storage, and virtual machine (fixed)      |
|                            | networks.                                 |
+----------------------------+-------------------------------------------+
| Prepare a logical network  |                                           |
| diagram.                   |                                           |
+----------------------------+-------------------------------------------+
