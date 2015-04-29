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



.. raw: pdf

   PageBreak

Select vCenter Hypervisor for vCenter
+++++++++++++++++++++++++++++++++++++

Beginning with Fuel 6.1, you can create a dual hypervisor
environment. That means, you now have three options:

#. enable vCenter only - select vCenter checkbox
   and leave the radio button as is; you will then
   finish this configuration using VMware tab of the Fuel web UI.
   See the :ref:`VMware tab<vmware-tab>` for more details.

  .. image:: /_images/user_screen_shots/select-vcenter-kvm.png

* enable both vCenter and KVM/QEMU - select vCenter checkbox
  and choose between KVM and QEMU radio buttons.

  .. image:: /_images/user_screen_shots/select-vcenter-kvm.png

* enable KVM/QEMU only - click the corresponding radio button
  and leave vCenter checkbox empty.

  .. image:: /_images/user_screen_shots/select-two-hypervisors.png



.. _vcenter-netv-service:

Select Network Service for vCenter
++++++++++++++++++++++++++++++++++

Currently, the only support network option for vCenter is nova-network.

.. image:: /_images/user_screen_shots/vcenter-networking-no-nsx.png


.. raw: pdf

   PageBreak

.. _vcenter-backend:

Choose Backend for Cinder and Glance with vCenter
+++++++++++++++++++++++++++++++++++++++++++++++++

At this step you should select
storage backend for Cinder that
is going to be used with KVM/QEMU if you deploy compute nodes.
You can choose Ceph as the backend for Cinder and Glance
with vCenter.
If you would like to use Glance with VMware datastore,
enable it on the *Settings* tab of the Fuel web UI
and finish backend configuration at the VMware tab.

.. image:: /_images/user_screen_shots/cinder-storage-backend-vmware.png



Related projects for vCenter
++++++++++++++++++++++++++++

Nova-network does not support Murano,
so you cannot run Murano in the OpenStack environment
with vSphere integration.


.. image:: /_images/user_screen_shots/platform_services-vmware.png


Note that not all :ref:`Ceilometer<ceilometer-term>`
metrics are collected for the vCenter environment.
For more details about the Ceilometer plugin for vCenter,
see `Support for VMware vCenter Server <https://wiki.openstack.org/wiki/Ceilometer/blueprints/vmware-vcenter-server#Support_for_VMware_vCenter_Server>`_.

.. raw: pdf

   PageBreak

Complete the creation of your vCenter environment
+++++++++++++++++++++++++++++++++++++++++++++++++


.. image:: /_images/user_screen_shots/deploy_env.png



Select *Create* and click on the icon for your named environment.

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
Beginning with Fuel 6.1, the *Storage - Cinder Proxy to VMware Datastore* role
is introduced. It will deploy Cinder with VMDK backend:
that means, the new role provides block storage for VMs that are running on VMware vCenter.
The already known *Storage - Cinder* role can be enabled for Cinder with LVM or Ceph.


.. image:: /_images/user_screen_shots/vcenter-add-nodes.png


.. _network-settings-vcenter-ug:


Network settings
++++++++++++++++

You should choose either the Nova-network FlatDHCP or the VLAN manager:

* VLAN manager provides better virtual machine isolation,
  i.e. enables segregating virtual machine tenants into separate broadcast domains.

* FlatDHCP manager uses a single IP subnet.
  Select it if you do not want to configure VLANs on your network equipment.

Please, note that nova-network will be working in a single-host mode (that
means, the process runs on one of the Controllers) if you are using vCenter.
When nova-network crashes it will be restarted by
:ref:`pacemaker<pacemaker-term>` on the same Controller or on another live
Controller, during this period of time, all virtual machines will lose
connectivity with external networks. Without vCenter, each compute node holds
its own nova-network process (multi-host mode).

For information on FlatDHCP and VLAN manager architecture,
see :ref:`Nova Network Topologies<nova-topologies-arch>`.

- To enable *FlatDHCP manager*, follow these steps:

   #. Click the *FlatDHCP manager* radio button in the *Networks* tab:


      .. image:: /_images/user_screen_shots/select-nova-config-dhcp.png


   #. In the *Nova-network configuration*,
      enable the 'Use VLAN tagging for fixed networks' checkbox
      and enter the VLAN tag you selected
      for the VLAN ID in the ESXi host network configuration:

      .. image:: /_images/user_screen_shots/nova-flatdhcp-man.png


- To enable *VLAN manager*, follow these steps:

   #. Click the *VLAN manager* radio button in the *Networks* tab:

      .. image:: /_images/user_screen_shots/select-nova-config-vlan.png


   #. In the *Nova-network configuration*, select *Fixed network size*
      using drop-down menu. Specify *Number of fixed networks* and enter
      *Fixed VLAN ID range*:

       .. image:: /_images/user_screen_shots/nova-net-vlan.png


Click **Verify Networks** button to check if networks are configured correctly.

       .. image:: /_images/user_screen_shots/nova-verify.png


Press **Save settings** button to continue.

.. _settings-tab:

Settings
++++++++

To enable VMware vCenter for volumes,
you must first uncheck the Cinder LVM over iSCSI option.

.. image:: /_images/user_screen_shots/vcenter-cinder-uncheck.png
   :width: 100%

To enable VMware vCenter managed datastore as a backend for Glance,
select *VMWare vCenter/ESXi datastore for images (Glance)* checkbox.

.. image:: /_images/user_screen_shots/vcenter_glance_settings.png


.. _vmware-tab:

VMware tab
----------

Beginning with Fuel 6.1 release, all vCenter-related settings
are consolidated on the VMware tab of the Fuel web UI.

.. image:: /_images/user_screen_shots/vmware-tab-common.png


vCenter
+++++++

In this section, you should enter not only vCenter credentials
(previously found on the Fuel UI wizard and *Settings* of the Fuel web UI
tab), but
also specify Availability zone:

* For KVM/QEMU nova-compute services, availability zone is *nova*.
  You cannot edit its name, because it is the default availability zone used by OpenStack.

* For vCenter nova-compute services, the availability zone name is set to *vcenter*
  by default, but it can be changed.

.. image:: /_images/user_screen_shots/vmware-tab-vcenter.png



Nova-Computes
+++++++++++++

Beginning with Fuel 6.1,
each nova-compute service controls
a single vSphere cluster.
For each vSphere cluster,
you need to configure separate nova-compute service that will be running on the Controller node.

The following options are available:

#. for vCenter only environment, do not add any compute nodes.

#. for dual hypervisors support (KVM or QEMU with vCenter),
   you should do the following:
   after selecting vCenter checkbox in the Fuel UI wizard, specify vCenter settings (host or IP),
   username, password and which clusters you want to use.

   * The cluster name is used to specify the cluster you would like
     to use for OpenStack.

   * Service name is the name that will be used to reference to your cluster in OpenStack.
     Usually, you can copy cluster name from the field above,
     but if the cluster name contains non-ASCII characters,
     you must provide valid service name for it
     (string that contains numbers, letters (a-z) and
     underscore).

   * Datastore regexp is used
     to indicate data stores to use with Compute.
     For example, if you add *nas.*, all data stores that have a name starting
     with "nas" will be chosen.
     If you plan to use all available datastores, leave the field blank.
     In this case, nova-compute service will pick the first data store returned by the vSphere API.
     To learn more about
     this setting, see
     `VMware vSphere <http://docs.openstack.org/juno/config-reference/content/vmware.html>`_ guide.

.. image:: /_images/user_screen_shots/vmware-tab-nova.png


Press +, add nova-compute services and fill in
the information for one more Instance.

.. image:: /_images/user_screen_shots/vmware-tab-nova-two.png



Network
+++++++

If you decided to use VLAN Manager,
enter the interface on which VLANs will be provisioned.

.. image:: /_images/user_screen_shots/vmware-tab-vlan.png



Glance
++++++

To enable Glance, you should first select the checkbox on the *Settings* tab
(see :ref:`VMware vCenter/ESXi datastore for images (Glance) <settings-tab>`).
Then, you should enter the information for Glance.

.. image:: /_images/user_screen_shots/vmware-tab-glance.png



For more information about how vCenter support is implemented,
see :ref:`vcenter-arch`.
