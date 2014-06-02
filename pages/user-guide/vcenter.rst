.. raw:: pdf

   PageBreak

.. _vcenter-deploy:

vSphere deployment notes
========================

.. contents :local:

:ref:`vcenter-plan` discusses actions and decisions
that should be made before attempting to deploy
Mirantis OpenStack with vSphere integration.

To deploy an OpenStack cloud that is integrated with the vSphere environment click on the "New OpenStack environment" icon to launch the wizard that creates a new OpenStack environment.

Create Environment and Choose Distribution
----------------------------------------

Both CentOS and Ubuntu host operating systems support integration with vSphere

.. image:: /_images/user_screen_shots/vcenter-create-env.png
   :width: 50%

Choose Deployemnt Mode
----------------------

Note that either you choose to deploy Mirantis OpenStack with or without high-availability (HA), the vCenter Nova plugin runs on only the primary Controller node, even if that Controller node is replicated to provide HA.

.. image:: /_images/user_screen_shots/vcenter-deployment-mode.png
   :width: 50%

Select vCenter Hypervisor
-------------------------

Select the vCenter :ref:`hypervisor<hypervisor-ug>` when you create your OpenStack Environment.

.. image:: /_images/user_screen_shots/vcenter-hv.png
   :width: 50%

Select Network Service
----------------------

You can choose only nova-network and specify FlatDHCP manager on the Network Settings page.

.. image:: /_images/user_screen_shots/vcenter-networking.png
   :width: 50%

Choose Background for Cinder and Glance
---------------------------------------

Ceph cannot be used as a Cinder backend. You can select only the LVM over iSCSI option.

.. image:: /_images/user_screen_shots/vcenter-cinder.png
   :width: 50%

- If you are using the Multi-node HA mode, 
  Swift is used as a backend for Cinder
  and is automatically installed on the Controller nodes.
- If you are using the Multi-node (no HA) mode,
  local storage is used as the backed for Glance.

Related projects
----------------

Nova-network doesn't allow to use Murano. 

.. image:: /_images/user_screen_shots/vcenter-additional.png
   :width: 50%

Complete the creation of your environment
-----------------------------------------


.. image:: /_images/user_screen_shots/deploy_env.png
   :width: 50%


Select "Create" and click on the icon for your named environment.

Configure your environment
==========================

After you exit from the "Create a New OpenStack Environment" wizard,
Fuel displays a set of configuration tabs
that you use to finish configuring your environment.

Let's focus on the steps specific for OpenStack environments integrated with vSphere.


Assign a role or roles to each node server
------------------------------------------
For VMware vCenter integration Nova plugin runs on Controller node. Compute and Controlles roles are combined on one node.

.. image:: /_images/user_screen_shots/vcenter-add-nodes.png
   :width: 50%

Network settings
----------------

As it was said only :ref:`nova-network-term` with FlatDHCP mode is supported in the current version of the integration.

- Select FlatDHCP manager in nova-network settings

.. image:: /_images/user_screen_shots/vcenter-network-manager.png
   :width: 50%

- Specify the credentials used to access the vCenter installation:

.. image:: /_images/user_screen_shots/settings-vcenter.png
   :width: 50%

- Check the mark 'Use VLAN tagging for fixed networks' and enter the VLAN tag you selected for VLAN ID in ESXi host network configuration:

.. image:: /_images/user_screen_shots/vcenter-nova-network.png
   :width: 50%

For more information about how vCenter support is implemented,
see :ref:`vcenter-arch`.
