.. raw:: pdf

   PageBreak

.. _vcenter-deploy:

Deploying vCenter
-------------------

.. contents :local:

:ref:`vcenter-plan` discusses actions and decisions
that should be made before attempting to deploy
Mirantis OpenStack with vSphere integration.

Note, that before following the instructions
below you should make sure that:

* vCenter is accesible.

* the login and the password are correct.


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

Beginning with Fuel 6.1, you can create a :ref:`dual hypervisor
environment <dualhyperv-arch>`.
That means, you now have three options:

#. enable vCenter only - select vCenter checkbox
   and leave the radio button as is; you will then
   finish this configuration using VMware tab of the Fuel web UI.
   See the :ref:`VMware tab<vmware-tab>` for more details.

   .. image:: /_images/user_screen_shots/select-vcenter-kvm.png

#. enable both vCenter and KVM/QEMU - select vCenter checkbox
   and choose between KVM and QEMU radio buttons.

   .. image:: /_images/user_screen_shots/select-vcenter-kvm.png

#. enable KVM/QEMU only - click the corresponding radio button
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

.. _ceilometer-related-projects:

Related projects for vCenter
++++++++++++++++++++++++++++

Nova-network does not support Murano,
so you cannot run Murano in the OpenStack environment
with vSphere integration.


.. image:: /_images/user_screen_shots/platform_services-vmware.png


Previously, when you selected vCenter,
Compute and Controller roles were assigned to the same node,
while Ceilometer compute agent was not present on this node.

In Fuel 6.1 release, this logic was changed to provide
metrics collection for the instances.

For previous Fuel releases,
support for collecting polling meters
from instances on vCenter was not implemented:
only central agent polled services like Glance and Swift on
Controller node. No metrics was collected from compute nodes.

In 6.1, Ceilometer support for vCenter is implemented according
to 1-1 mapping principle (the one done between :ref:`nova-compute and
vSphere cluster <1-1 mapping>`).
Now Ceilometer compute service is available
for each vSphere cluster. That means,every agent polls resources
about instances from those that only relate to their vSphere cluster.
Every agent uses its own configuration file with authentication
parameters for its specific vSphere cluster.
What is more, monitoring under Pacemaker is introduced
for every Ceilometer compute service to avoid failures
(for example, failover of primary controller node)
and missing polling data as the result.

.. raw: pdf

   PageBreak

Complete the creation of your vCenter environment
+++++++++++++++++++++++++++++++++++++++++++++++++

.. image:: /_images/user_screen_shots/deploy_env.png

Select *Create* and click on the icon for your named environment.


Configuring a vCenter environment
---------------------------------

Select your OpenStack environment integrated with vSphere to display
the configuration screen. Set up the environment using the following tabs.

.. _assign-roles-vcenter-ug:

Nodes tab
+++++++++

Assign a role to a node server by checking the required one from
the list of the available node roles.

.. list-table:: **Node roles for the OpenStack environments that support vCenter**
   :widths: 10 30
   :header-rows: 1

   * - Role
     - Description

   * - **Controller**
     - The Controller node initiates orchestration activities and provides
       an external API. Other components like Glance, Keystone, Horizon,
       and Nova-Scheduler installs on the Controller node as well.

       | The default value.

   * - **Compute**
     - The Compute node creates, manages, and terminates VMs.

   * - **Storage - Cinder**
     - The Cinder node provides scheduling of block storage resources,
       typically delivered over ISCi or other compatible back-end
       storage systems. You can use Block storage for database storage,
       expandable file systems, or to provide a server with access
       to raw block level devices. This node role can be enabled for
       the Cinder with LVM or Ceph environment.

   * - **Storage - Cinder Proxy to VMware Datastore**
     - Cinder-VMware provides scheduling of block storage resources delivered
       over VMware vCenter.
       You can use Block storage for database storage, expandable
       file systems, or to provide a server with access to raw block
       level devices. 

   * - **Operating System**
     - The Operating System node intalls base operating system without
       additional packages and configurations.

   * - **Compute VMware**
     - The Compute VMware node runs nova-compute with VCDriver that manages
       ESXI computing resources through VMware vCenter. It enables you to deploy
       a ``nova-compute`` service on a standalone node rather than on
       the Controller node.


Deploying nova-compute on a standalone node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Assign a *Compute VMware* role to the node.

   .. note::

      You cannot combine *Compute VMware* node role with any other
      available roles.

#. In the *VMware tab* for a specific cluster, select this node
   as the *Target node* for the ``nova-compute`` service.

   .. seealso::

      * :ref:`nova_computes` configuration.


.. _network-settings-vcenter-ug:


Networks tab
++++++++++++

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

  #. In the *Networks* tab, click the *FlatDHCP manager* radio button.

  #. In the *Nova-network configuration*, enable the *Use VLAN tagging
     for fixed networks* checkbox.

  #. Type the VLAN tag you selected for the VLAN ID in the ESXi host
     network configuration.

- To enable *VLAN manager*, follow these steps:

  #. In the *Networks* tab, click the *VLAN manager* radio button.

  #. In the *Nova-network configuration*, select *Fixed network size*
     using drop-down menu.

  #. Specify *Number of fixed networks* and type *Fixed VLAN ID range*.

  #. Click the **Verify Networks** button to check if networks are configured
     correctly.

  #. Click the **Save settings** button to continue.


.. _settings-tab:

Settings tab
++++++++++++

To enable VMware vCenter for volumes,
you should add a node and assign
*Storage - Cinder Proxy to VMware Datastore* role
to it, see
:ref:`Assign a role or roles to each node server <assign-roles-vcenter-ug>` for details.

To enable VMware vCenter managed datastore as a backend for Glance,
select *VMWare vCenter/ESXi datastore for images (Glance)* checkbox.

.. image:: /_images/user_screen_shots/vcenter_glance_settings.png


.. _vmware-tab:

VMware tab
++++++++++

Beginning with Fuel 6.1 release, all vCenter-related settings
are consolidated on the VMware tab of the Fuel web UI.


vCenter
^^^^^^^

In this section, you should enter not only vCenter credentials
(previously found on the Fuel UI wizard and *Settings* of the Fuel web UI
tab), but
also specify Availability zone:

* For KVM/QEMU nova-compute services, availability zone is *nova*.
  You cannot edit its name, because it is the default availability zone used by OpenStack.

* For vCenter nova-compute services, the availability zone name is set to *vcenter*
  by default, but it can be changed.

.. image:: /_images/user_screen_shots/vmware-tab-vcenter.png


.. _nova_computes:

Nova-Computes
^^^^^^^^^^^^^

Each nova-compute service controls a single vSphere cluster.
For each vSphere cluster, you need to configure separate nova-compute
service that will be running either on the Controller node,
or on a standalone host.

The following options are available:

* for vCenter only environment, do not add any compute nodes.

* for dual hypervisors environments, define the following:

  * **vSphere cluster** - specifies the name of the cluster that this nova-compute
    service will be managing.

  * **Service name** - specifies the service name to reference to your cluster.
    It is a string that should not contain any non-ASCII characters.

  * **Datastore regexp** - indicates datastores to use with Compute.
    For example, if you define `openstack-.*`, all datastores that have
    a name starting with `openstack-` are chosen.

    If you plan to use all available datastores, leave the field blank.
    In this case, nova-compute service will pick the first datastore returned by
    the vSphere API.

    .. seealso:: To learn more about the Datastore regexp setting, see the
       `VMware vSphere <http://docs.openstack.org/juno/config-reference/content/vmware.html>`_
       guide.

  * **Target node** - a dropdown list with the following items:

    * the *controllers* option is selected by default.
      It deploys the nova-compute service on the Controller nodes.

    * names of all the nodes with the compute-vmware role assigned.
      Select one of the available nodes if you decide to run
      the compute-service on that standalone node.

    .. image:: /_images/user_screen_shots/vmware-tab-nova-computes.png

If required, configure more nova-compute instances by clicking *+*.


Network
^^^^^^^

If you decided to use VLAN Manager,
enter the interface of ESXi hosts on which VLANs will be provisioned.

.. image:: /_images/user_screen_shots/vmware-tab-vlan.png



Glance
^^^^^^

To enable Glance, you should first select the checkbox on the *Settings* tab
(see :ref:`VMware vCenter/ESXi datastore for images (Glance) <settings-tab>`).
Then, you should enter the information for Glance.

.. image:: /_images/user_screen_shots/vmware-tab-glance.png



For more information about how vCenter support is implemented,
see :ref:`vcenter-arch`.
