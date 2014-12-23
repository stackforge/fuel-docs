.. raw:: pdf

   PageBreak

.. _vcenter-deploy:

Deploying vCenter
-------------------

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
++++++++++++++++++++++++++++++++++++++++++++++++++++++

Either the CentOS or Ubuntu distro
can be used as the host operating system on the Slave nodes
for environments that support integration with vSphere:

.. image:: /_images/user_screen_shots/vcenter-create-env.png
   :width: 50%

Choose Deployment Mode for vCenter
++++++++++++++++++++++++++++++++++

You can deploy Mirantis OpenStack with or without :ref:`ha-term`.

.. image:: /_images/user_screen_shots/vcenter-deployment-mode.png
   :width: 50%

.. raw: pdf

   PageBreak

Select vCenter Hypervisor for vCenter
+++++++++++++++++++++++++++++++++++++

Select the vCenter :ref:`hypervisor<hypervisor-ug>`
when you create your OpenStack Environment.
After that you need to fill corresponding fields.
You can modify the vCenter specific values on the Settings tab after you
create the environment.

.. image:: /_images/user_screen_shots/vcenter-hv.png
   :width: 50%

Select Network Service for vCenter
++++++++++++++++++++++++++++++++++

Choose either Nova-Network or Neutron with VMware NSX plugin.

.. note:: Neutron is available only when Experimental features are enabled.
          For more information, see :ref:`experimental-features-op`.

For instructions on NSX, see :ref:`nsx-plan` and :ref:`nsx-deploy`.

.. image:: /_images/user_screen_shots/vcenter-networking.png
   :width: 50%

.. raw: pdf

   PageBreak

Choose Backend for Cinder and Glance with vCenter
+++++++++++++++++++++++++++++++++++++++++++++++++

Ceph cannot be used as a Cinder or Glance backend;
the only choice here is to leave the default options,
which are:
- :ref:`VMDK<vmdk-term>` driver for Cinder.
- Swift for Glance.
- VMWare vCenter/:ref:`ESXi<esxi-term>` for Glance.

.. image:: /_images/user_screen_shots/vcenter-cinder.png
   :width: 50%

VMware vCenter managed datastore is now supported as a backend for Glance;
select VMWare vCenter/ESXi option to enable it.

.. image:: /_images/user_screen_shots/vcenter-glance-backend.png
   :width: 50%

After you create the environment, you must enable the VMDK
driver for Cinder on the Settings tab.


.. image:: /_images/user_screen_shots/vcenter-glance-backend.png
   :width: 50%

- If you are using the deprecated Multi-node (no HA) mode,
  local storage is used as the backend for Glance.

Related projects for vCenter
++++++++++++++++++++++++++++

Nova-network does not support Murano,
so you cannot run Murano in the OpenStack environment
with vSphere integration.


.. image:: /_images/user_screen_shots/vcenter-additional.png
   :width: 50%

Note that not all :ref:`Ceilometer<ceilometer-term>`
metrics are collected for the vCenter environment.
For more details about the Ceilometer plug-in for vCenter,
see `Support for VMware vCenter Server <https://wiki.openstack.org/wiki/Ceilometer/blueprints/vmware-vcenter-server#Support_for_VMware_vCenter_Server>`_.

.. raw: pdf

   PageBreak

Complete the creation of your vCenter environment
+++++++++++++++++++++++++++++++++++++++++++++++++


.. image:: /_images/user_screen_shots/deploy_env.png
   :width: 50%


Select "Create" and click on the icon for your named environment.

Configuring your environment for vCenter
----------------------------------------

After you exit from the "Create a New OpenStack Environment" wizard,
Fuel displays a set of configuration tabs
that you use to finish configuring your environment.

Let's focus on the steps specific for OpenStack environments
integrated with vSphere.

.. _assign-roles-vcenter-ug:

Assign a role or roles to each node server
++++++++++++++++++++++++++++++++++++++++++

For VMware vCenter integration,
the Nova plugin runs on the Controller node.
The Compute and Controller roles are combined on one node.

.. image:: /_images/user_screen_shots/vcenter-add-nodes.png
   :width: 80%

.. _network-settings-vcenter-ug:

Network settings
++++++++++++++++

Choose either the Nova-network FlatDHCP or the VLAN manager.

VLAN manager provides better virtual machine isolation, i.e. enables segregating
virtual machine tenants into separate broadcast domains.

- For *FlatDHCP manager*, select the checkbox in the Nova-network settings

.. image:: /_images/user_screen_shots/vcenter-network-manager.png
   :width: 50%

- Check the vCenter credentials

.. image:: /_images/user_screen_shots/settings-vcenter.png
   :width: 50%

.. note: The Fuel web UI now has a new option for vCenter:
         you can fill in **Datastore regexp** field to indicate data stores to use with Compute. To learn more about
         this setting, see `VMware vSphere <http://docs.openstack.org/juno/config-reference/content/vmware.html>`_ guide.

For example, if you add *nas.*, all data stores that have a name starting
with "nas" will be chosen.

If you plan to use all available datastores, leave the field blank.
In this case, Compute node will pick the first data store returned by the vSphere API.

.. image:: /_images/vcenter-regexp.png
   :width: 50%

- Enable the 'Use VLAN tagging for fixed networks' checkbox
  and enter the VLAN tag you selected
  for the VLAN ID in the ESXi host network configuration

.. image:: /_images/user_screen_shots/vcenter-nova-network.png
   :width: 50%

- For *VLAN manager*, select the checkbox in the Nova-network settings

.. image:: /_images/user_screen_shots/nova-vlan-check.png
   :width: 50%

- Check the vCenter credentials

- Specify Nova-network configuration

.. image:: /_images/user_screen_shots/nova-net-vlan.png
   :width: 50%



Storage
+++++++

To enable VMware vCenter for volumes,
you must first uncheck the Cinder LVM over iSCSI option.

.. image:: /_images/user_screen_shots/vcenter-cinder-uncheck.png
   :width: 80%

To enable VMware vCenter managed datastore as a backend for Glance,
check VMWare vCenter/ESXi datastore for images (Glance) option
and specify the required settings.

.. image:: /_images/user_screen_shots/vcenter_glance_settings.png
   :width: 80%

For more information about how vCenter support is implemented,
see :ref:`vcenter-arch`.
