
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
| Initialize Fuel            | See :ref:`initialize-fuel`                |
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
| Customize disk partitions  |                                           |
+----------------------------+-------------------------------------------+
| Assign a role or roles to  | A node may act as a controller, compute,  |
| each node server.          | or storage node. You can combine          |
|                            | a storage role with a controller or       |
|                            | compute role.                             |
+----------------------------+-------------------------------------------+
| In **Network** tab,        | If you chose Neutron as your network      |
| configure the network      | service, additional sections are          |
| settings from the address  | available for setting your L2 and L3      |
| plan prepared earlier.     | configuration.                            |
+----------------------------+-------------------------------------------+
| Map logical networks to    |                                           |
| NICs                       |                                           |
+----------------------------+-------------------------------------------+
| Set up NIC bonding         | See                                       |
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
| If necessary, you can stop | See                                       |
| deployment after it stops. |                                           |
+----------------------------+-------------------------------------------+
| If necessary, you can      | See                                       |
| reset the deployment.      |                                           |
+----------------------------+-------------------------------------------+
| Once deployed, run the     | You can run the test groups in parallel or|
| tests in the **Health**    | one at a time.                            |
| **Check** tab to confirm   | See                                       |
| success.                   |                                           |
+----------------------------+-------------------------------------------+
| (Optional) Set up Sahara   |                                           |
+----------------------------+-------------------------------------------+
| (Optional) Set up Murano   |                                           |
+----------------------------+-------------------------------------------+
| Set up VMs containers,     |                                           |
| load your applications     |                                           |
| and storage                |                                           |
+----------------------------+-------------------------------------------+



Each of these steps is discussed below in more detail.

.. _initialize-fuel:

Initialize Fuel
===============

After Fuel is installed,
point your browser to the default Fuel UI
URL: `http://10.20.0.2:8000 <http://10.20.0.2:8000>`__
or to the IP address and port number that you specified.

The following screen appears:

.. image:: /_images/user_screen_shots/fuel_starts.png
   :width: 50%


Press the "Tab" key to display the **grub** command line;
you can edit this line to modify the boot settings
for the Fuel Master Node.
Normally this is not necessary.

Press "Enter" to initialize Fuel.
The boot messages display on your screen as Fuel boots up.

The following screen appears:

.. image:: /_images/user_screen_shots/create_new_environ.png
   :width: 50%



Click on the "New OpenStack environment" icon
to launch the "Create a new OpenStack Environment" wizard
used to create a new environment.

.. raw:: pdf

   PageBreak

.. _create-env-ug:

Create a new environment
========================

In the Fuel UI, begin the creation of a new OpenStack environment.

.. image:: /_images/user_screen_shots/name_environ.png
   :width: 50%


Give the environment a name
and select the Linux distribution from the drop-down list.
This is the operating system that will be installed
on the Controller, Compute, and Storage nodes in the environment.

.. raw:: pdf

  PageBreak

Configure and deploy the environment
====================================

.. _mode-ha-ug:

Chose high-availability (HA) or non-HA mode
-------------------------------------------


.. image:: /_images/user_screen_shots/choose_deploy_mode.png
   :width: 50%

Multi-node HA is recommended for deployment environments
but the multi-node mode without HA can be useful
for familiarizing yourself with OpenStack
and doing some unit testing.

You must have at least three nodes
(two used as replicated Controller nodes,
one used as a Compute node)
in order to deploy your environment in Multi-node HA mode.

Note that, beginning with Mirantis OpenStack 5.0,
you can initially deploy a multi-node environment
and then convert it to a multi-node HA environment
without creating a new environment from scratch.

.. raw:: pdf

  PageBreak

.. _hypervisor-ug:

Choose your Hypervisor
----------------------


.. image:: /_images/user_screen_shots/choose-hypervisor-ug.png
   :width: 50%


.. raw:: pdf

  PageBreak

.. _choose-network-ug:

Select your network service
---------------------------

Four network topologies are supported.
You can choose either either of the Neutron topologies here.
If you choose Nova-network here,
you can choose between the FlatDHCP or VLAN topologies
on the Network Settings page.

.. raw:: pdf

  PageBreak

.. _cinder-glance-backend-ug:

Select the storage background for Cinder and Glance
---------------------------------------------------


.. image:: /_images/user_screen_shots/cinder-storage-backend.png
   :width: 50%

Select the storage backend for :ref:`cinder-term`:

- If you select "Default",
  then the Local Volumes over iSCSI are used as the backend for Cinder.
- If you select "Ceph",
  you must assign at least two nodes as Ceph-OSD nodes.

Select the storage backend for Glance:

- If you select "Default" and are using the Multi-node HA mode,
  Swift is used as a backend for Cinder
  and is automatically installed on the Controller nodes.
- If you select "Default" and are using the Multi-node (no HA) mode,
  local storage is used as the backed for Glance.
- If you selected Ceph,
  you must assign at least two nodes as Ceph-OSD nodes.


.. raw:: pdf

  PageBreak

.. _platform-services-ug:

Choose additional platform services
-----------------------------------


.. image:: /_images/user_screen_shots/platform_services.png
   :width: 50%

Specify any services that you want to deploy on your system:

- For additional information about deploying :ref: `ceilometer-term`,
  see :ref:`ceilometer-deployment-notes`.
- For additional infomration about deploying :ref:`sahara-term`,
  see :ref:`sahara-install`.
- For additional infomration about deploying :ref:`murano-term`,
  see the Murano deployment notes.

.. raw:: pdf

  PageBreak

.. _deploy-ug:

Complete the creation of your environment
-----------------------------------------


.. image:: /_images/user_screen_shots/deploy_env.png
   :width: 50%


Select "Create" and click on the icon for your named environment.

.. raw:: pdf

  PageBreak

.. _configure-env-ug:

Configure your Environment
==========================

After you exit from the "Create a New OpenStack Environment" wizard,
Fuel displays a set of configuration tabs
that you use to finish configuring your environment.


.. _customize-partitions-ug:

Customize your disk partitioning
--------------------------------

.. image:: /_images/user_screen_shots/partition-disks.png
   :width: 50%


.. raw:: pdf

  PageBreak

.. _assign-roles-ug:

Assign a role or roles to each node server
------------------------------------------


.. image:: /_images/user_screen_shots/assign-roles1.png
   :width: 50%


.. image:: /_images/user_screen_shots/assign-roles2.png
   :width: 50%


.. raw:: pdf

  PageBreak

.. _network-settings-ug:

Configure the Network settings
------------------------------

These example screens are for a Neutron deployment,
which includes sections for setting the L2 and L3 configuration
that are not provided for Nova-network deployments.

.. image:: /_images/user_screen_shots/net-settings1.png
   :width: 50%


.. image:: /_images/user_screen_shots/net-settings2.png
   :width: 50%


.. image:: /_images/user_screen_shots/net-settings3.png
   :width: 50%

.. include:: /pages/user-guide/config-envir/0220-map-logical-to-physical-nic.rst
.. include:: /pages/user-guide/3000-nic-bonding-ui.rst


.. raw:: pdf

  PageBreak

.. _verify-networks-ug:

Click "Verify Networks"
-----------------------

When you have applied all your information to the "Network Settings" screen,
click the "Verify Networks" button at the bottom of the screen.
This checks and confirms the network configuration
It can be run before or after OpenStack deployment.

The network check includes tests for connectivity between 
nodes via configured VLANs on configured host interfaces.
Additionally, checks for an unexpected DHCP server are done
to ensure that outside DHCP servers will not interfere with deployment.
The image below shows a sample result of the check. 
If there are errors, it is either in your configuration of interfaces
or possibly the VLAN tagging feature is disabled on your switch port. 

.. image:: /_images/net_verify_failure.jpg

Resolve any errors before attempting to deploy your environment.

.. raw:: pdf

  PageBreak

.. _settings-ug:

Settings tab
------------

   * Modify access permissions for Horizon

   * Modify OpenStack Components to include

   * Hypervisor type

   * Scheduler driver

   * Syslog

   * Storage

.. _access-horizon-ug:

Modify access permissions for Horizon
+++++++++++++++++++++++++++++++++++++

The first part of the screen allows you to modify
the user name, password, and tenant used
to access the Horizon screens.

.. image:: /_images/user_screen_shots/settings-access.png
   :width: 50%


.. raw:: pdf

   PageBreak

.. _modify-services-ug:

Modify services included in the environment
+++++++++++++++++++++++++++++++++++++++++++

The next part of the Settings screen
allows you to modify the services
you chose when you first created your environment.

.. image:: /_images/user_screen_shots/settings-mod-services.png
   :width: 50%


.. raw:: pdf

   PageBreak

.. _vcenter-config-ug:

Configure your vCenter
++++++++++++++++++++++

Use this section to configure your vCenter:

.. image:: /_images/user_screen_shots/settings-vcenter.png
   :width: 50%

Common settings
+++++++++++++++

This section of the screen enables you to:

- Turn debug logging on/off
- Define Nova quotas
- Modify the Hypervisor choice you made when first creating your environment
- Choose whether to auto-assign floating IPs
- Choose the scheduler driver to use in the environment
- Select whether to use qcow format for images
- Select whether to start/restart guests when the host boots
- Set Public key for deployed nodesjjj

.. raw:: pdf

   PageBreak

.. _vlan-splinters-ug:

Configure VLAN splinters
++++++++++++++++++++++++


.. image:: /_images/user_screen_shots/settings-vlan-splinters.png
   :width: 50%


.. raw:: pdf

   PageBreak

.. _settings-syslog-ug:

Configure syslog
++++++++++++++++


.. raw:: pdf

   PageBreak

.. _settings-storage-ug:

Configure storage
+++++++++++++++++

The first part of the screen allows you to modify
the user name, password, and tenant used
to access the Horizon screens.

.. image:: /_images/user_screen_shots/settings-storage.png
   :width: 50%

