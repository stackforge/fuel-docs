.. raw:: pdf

   PageBreak

.. _vcenter-deploy:

vSphere deployment notes
========================

.. contents :local:

:ref:`vcenter-plan` discusses actions and decisions
that should be made before attempting to deploy
Mirantis OpenStack with vSphere integration.

To deploy an OpenStack cloud that is integrated
with the vSphere environment,
click on the "New OpenStack environment" icon
to launch the wizard that creates a new OpenStack environment.

.. _vcenter-start-create-env-ug:

Create Environment and Choose Distribution for vCenter
------------------------------------------------------

Either the CentOS or Ubuntu distro
can be used as the host operating system on the Slave nodes
for environments that support integration with vSphere:

.. image:: /_images/user_screen_shots/vcenter-create-env.png
   :width: 50%

Choose Deployment Mode for vCenter
----------------------------------

You can deploy Mirantis OpenStack with or without :ref:`ha-term`.
Note that the vCenter Nova plugin runs only on the primary Controller node,
even if that Controller node is replicated to provide HA.

.. image:: /_images/user_screen_shots/vcenter-deployment-mode.png
   :width: 50%

.. raw: pdf

   PageBreak

Select vCenter Hypervisor for vCenter
-------------------------------------

Select the vCenter :ref:`hypervisor<hypervisor-ug>`
when you create your OpenStack Environment.
After that you need to fill corresponding fields.
You can modify the vCenter specific values on the Settings tab after you
create the environment.

.. image:: /_images/user_screen_shots/vcenter-hv.png
   :width: 50%

Select Network Service for vCenter
----------------------------------

Choose the Nova-network FlatDHCP manager on the Network settings page.
This the only network topology you can use
to deploy vCenter with Fuel 5.0.

.. image:: /_images/user_screen_shots/vcenter-networking.png
   :width: 50%

.. raw: pdf

   PageBreak

Choose Backend for Cinder and Glance with vCenter
-------------------------------------------------

Ceph cannot be used as a Cinder backend;
you should select the LVM over iSCSI option.

.. image:: /_images/user_screen_shots/vcenter-cinder.png
   :width: 50%

- If you are using the Multi-node HA mode,
  Swift is used as a backend for Cinder
  and is automatically installed on the Controller nodes.
- If you are using the Multi-node (no HA) mode,
  local storage is used as the backend for Glance.

Related projects for vCenter
----------------------------

Nova-network does not support Murano,
so you cannot run Murano in the OpenStack environment
with vSphere integration.

.. image:: /_images/user_screen_shots/vcenter-additional.png
   :width: 50%

.. raw: pdf

   PageBreak

Complete the creation of your vCenter environment
-------------------------------------------------


.. image:: /_images/user_screen_shots/deploy_env.png
   :width: 50%


Select "Create" and click on the icon for your named environment.

Configure your environment
==========================

After you exit from the "Create a New OpenStack Environment" wizard,
Fuel displays a set of configuration tabs
that you use to finish configuring your environment.

Let's focus on the steps specific for OpenStack environments
integrated with vSphere.


Assign a role or roles to each node server
------------------------------------------
For VMware vCenter integration.
Nova plugin runs on the Controller node.
Compute and Controller roles are combined on one node.

.. image:: /_images/user_screen_shots/vcenter-add-nodes.png
   :width: 50%

.. _network-settings-vcenter-ug:

Network settings
----------------

Only the :ref:`nova-network-term` with FlatDHCP topology
is supported in the current version of vCenter integration in Fuel.

- Select the FlatDHCP manager in the Nova-network settings

.. image:: /_images/user_screen_shots/vcenter-network-manager.png
   :width: 50%

- Specify the credentials used to access the vCenter installation:

.. image:: /_images/user_screen_shots/settings-vcenter.png
   :width: 50%

- Enable the 'Use VLAN tagging for fixed networks' checkbox
  and enter the VLAN tag you selected
  for the VLAN ID in the ESXi host network configuration:

.. image:: /_images/user_screen_shots/vcenter-nova-network.png
   :width: 50%

For more information about how vCenter support is implemented,
see :ref:`vcenter-arch`.
