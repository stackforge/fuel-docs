
.. _download-install-ug:

Download and Install Fuel
=========================

Mirantis provides the images you will use to
install Fuel and Mirantis OpenStack.
You can download an ISO file and,
for many modern servers,
use a remote control utility such as
`ipmitool <http://sourceforge.net/projects/ipmitool/>`_,
HP iLO, or Dell iDRAC
to mount the ISO image directly
to the server's virtual DVD drive.

For a bare-metal installation,
you can instead burn the ISO image to a DVD or
burn the IMG file to a USB drive
then use that media to install the software.

.. note:: You can use the same ISO image
   to install Fuel and Mirantis OpenStack
   in VirtualBox.
   In that case, copy the ISO file to the disk
   and boot directly from that disk file.
   See the `Quick Start Guide <http://software.mirantis.com/quick-start/>`_.
   and :ref:`virtualbox-top`.


Download the Fuel image from the
`Mirantis web-site <http://software.mirantis.com/>`_ web page.
Depending on the speed of your Internet connection,
this could take a half hour or more.

Use and standard software to burn the ISO to a writeable DVD.
Some popular options:

- **Linux** --
  `Brasero` and `Xfburn` are commonly pre-installed applications

- **Mac OS X** --
  Open `Disk Utility` from `Applications > Utilities`,
  drag the ISO into the disk list on the left side of the window and select it,
  insert a blank DVD, and click `Burn`.
  If you prefer a different utility,
  check out the open source
  `Burn <http://burn-osx.sourceforge.net/Pages/English/home.html>`_.

- **Windows** -- 
  Use `ImgBurn <http://www.imgburn.com/>`_ and the
  open source `InfraRecorder <http://infrarecorder.org/>`_

.. _initialize-fuel-ug:

Initialize Fuel
===============

+----------------------------+-------------------------------------------+
| Step Description           | Additional Information                    |
+============================+===========================================+
| Boot Fuel.  If necessary,  | See :ref:`boot-fuel-ug` and               |
| modify the boot settings   | :ref:`modify-boot-settings-ug`            |
+----------------------------+-------------------------------------------+
| If necessary, modify the   | See :ref:`Network_Install`                |
| network settings for the   |                                           |
| Admin (PXE) logical network|                                           |
+----------------------------+-------------------------------------------+
| Boot the node servers in   | See :ref:`boot-nodes-ug`                  |
| PXE mode                   |                                           |
+----------------------------+-------------------------------------------+

.. _boot-fuel-ug:

Boot Fuel
---------

Insert the media you created in :ref:`download-install-ug`
in the the server that will be your Fuel Master Node
and power the machine on,
just as you would for any operating system installation.

The following screen appears.

.. image:: /_images/user_screen_shots/fuel_starts.png
   :width: 50%


.. _modify-boot-settings-ug:

Modify Boot settings (optional)
-------------------------------

If necessary, you can modify the boot settings from this screen.
This allows you to configure the IP address,
default gateway, and DNS server for the Fuel Master Node.
To do this,
press the "Tab" key to display the **grub** command line
and then edit that line.
This is not normally necessary.

.. include:: /pages/user-guide/initialize-fuel/0400-pxe-config.rst
.. include:: /pages/user-guide/initialize-fuel/0500-fuel-boot.rst
.. include:: /pages/user-guide/initialize-fuel/0600-boot-nodes.rst


.. raw:: pdf

   PageBreak


.. _create-env-ug:

Create a new environment
========================

+----------------------------+-------------------------------------------+
| Step Description           | Additional Information                    |
+============================+===========================================+
| Initialize Fuel            | See :ref:`initialize-fuel-ug`             |
| server (on port 8000)      |                                           |
+----------------------------+-------------------------------------------+
| Click on the "New"         | See :ref:`start-create-env-ug`            |
| OpenStack environment"     |                                           |
| icon to create a new       |                                           |
| environment.               |                                           |
+----------------------------+-------------------------------------------+
| Choose the name for your   | See :ref:`name-distro-ug`                 |
| environment and choose the |                                           |
| Operating System (distro)  |                                           |
+----------------------------+-------------------------------------------+
| Choose your Deployment     | See :ref:`mode-ha-ug`                     |
| Mode (Multi-node HA or non |                                           |
| HA).                       |                                           |
+----------------------------+-------------------------------------------+
| Choose your                | See :ref:`hypervisor-ug`                  |
| :ref:`hypervisor-term`     |                                           |
+----------------------------+-------------------------------------------+
| Select your network        | See :ref:`choose-network-ug`.             |
| service (Nova-network,     | If you choose Nova-network, you can       |
| Neutron with GRE           | choose FlatDHCP or VLAN Manager later in  |
| segmentation or Neutron    | the **Network** settings tab.             |
| with VLAN segmentation.    |                                           |
+----------------------------+-------------------------------------------+
| Select your storage        | See :ref:`cinder-glance-backend-ug`       |
| backends for Cinder and    |                                           |
| Glance.                    |                                           |
+----------------------------+-------------------------------------------+
| Choose additional related  | See :ref:`platform-services-ug`           |
| projects.                  |                                           |
+----------------------------+-------------------------------------------+
| Select Create and click on | See :ref:`deploy-ug`                      |
| the icon with your named   |                                           |
| environment.               |                                           |
+----------------------------+-------------------------------------------+


.. _start-create-env-ug:

Launch Wizard to Create New Environment
---------------------------------------

After Fuel is installed,
point your browser to the default Fuel UI
URL: `http://10.20.0.2:8000 <http://10.20.0.2:8000>`__
or to the IP address and port number that you specified.

The Fuel UI screen appears:

.. image:: /_images/user_screen_shots/create_new_environ.png
   :width: 50%


Click on the "New OpenStack environment" icon
to launch the wizard that creates a new OpenStack environment.


.. _name-distro-ug:

Name Environment and Choose Distribution
----------------------------------------

When you click on the "New OpenStack Environment" icon
on the Fuel UI, the following screen is displayed:

.. image:: /_images/user_screen_shots/name_environ.png
   :width: 50%

Give the environment a name
and select the Linux distribution from the drop-down list;
see :ref:`linux-distro-plan`.
This is the operating system that will be installed
on the Controller, Compute, and Storage nodes in the environment.

.. raw:: pdf

  PageBreak

.. _mode-ha-ug:

High-availability (HA) or non-HA mode
-------------------------------------


.. image:: /_images/user_screen_shots/choose_deploy_mode.png
   :width: 50%

All new deployments should use the Multi-node :ref:`ha-term` mode.

.. raw:: pdf

  PageBreak

.. _hypervisor-ug:

Hypervisor
----------


.. image:: /_images/user_screen_shots/choose-hypervisor-ug.png
   :width: 50%

Choose one of the following:

- :ref:`kvm-term` -- Choose this option for bare-metal installations

- :ref:`qemu-term` -- Choose this option for VirtualBox installations

- :ref:`vcenter-term` -- Choose this option if you have a vCenter environment
  with ESXi servers to be used as hypervisors.


.. raw:: pdf

  PageBreak

.. _choose-network-ug:

Network service
---------------

.. image:: /_images/user_screen_shots/network-services.png
   :width: 50%

Four network topologies are supported;
see :ref:`net-topology-plan`.

You can choose either of the Neutron topologies on this screen.
If you choose Nova-network here,
you can choose between the FlatDHCP and VLAN topologies
on the Network Settings page.


.. raw:: pdf

  PageBreak

.. _cinder-glance-backend-ug:

Storage background for Cinder and Glance
----------------------------------------

.. image:: /_images/user_screen_shots/cinder-storage-backend.png
   :width: 50%

Select the storage backend for :ref:`cinder-term`:

- If you select "Default",
  then the Local Volumes over iSCSI are used as the backend for Cinder.
- If you select "Ceph",
  you must assign at least two nodes as Ceph-OSD nodes.

Select the storage backend for :ref:`glance-term`:

- If you select "Default" and are using the Multi-node HA mode,
  Swift is used as a backend for Cinder
  and is automatically installed on the Controller nodes.
- If you select "Default" and are using the Multi-node (no HA) mode,
  local storage is used as the backed for Glance.
- If you selected Ceph,
  you must assign the Ceph-OSD role on at least two nodes.


.. raw:: pdf

  PageBreak

.. _platform-services-ug:

Related projects
----------------

Choose additional related projects
that should be included in your environment:

.. image:: /_images/user_screen_shots/platform_services.png
   :width: 50%

Specify any services that you want to deploy on your system:

- For additional information about deploying :ref:`ceilometer-term`,
  see :ref:`ceilometer-deployment-notes`.
- For additional information about deploying :ref:`sahara-term`,
  see :ref:`sahara-install`.
- For additional infomration about deploying :ref:`murano-term`,
  see :ref:`Murano-deployment-notes`.

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

+----------------------------+-------------------------------------------+
| Step Description           | Additional Information                    |
+============================+===========================================+
| Assign a role or roles to  | See :ref:`assign-roles-ug`                |
| each node server.          |                                           |
+----------------------------+-------------------------------------------+
| Customize disk partitions  | See :ref:`customize-partitions-ug`        |
+----------------------------+-------------------------------------------+
| In **Network** tab,        | See :ref:`network-settings-ug`            |
| configure the network      |                                           |
| settings from the address  |                                           |
| plan prepared earlier.     |                                           |
+----------------------------+-------------------------------------------+
| Set up NIC bonding         | See :ref:`nic-bonding-ui`                 |
| (optional)                 |                                           |
+----------------------------+-------------------------------------------+
| Map logical networks to    | See :ref:`map-logical-to-physical`        |
| NICs                       |                                           |
+----------------------------+-------------------------------------------+
| Click **Verify Networks**  | See :ref:`verify-networks-ug`             |
| to check and confirm the   |                                           |
| network configuration.     |                                           |
+----------------------------+-------------------------------------------+
| (Optional) In the          | See :ref:`settings-ug`                    |
| **Settings** tab, you can  |                                           |
| configure or modify the    |                                           |
| options for Horizon        |                                           |
| access, scheduler type,    |                                           |
| logging, and other         |                                           |
| OpenStack options.         |                                           |
+----------------------------+-------------------------------------------+
| Click the **Deploy**       | See :ref:`deploy-changes`                 |
| **Changes** button.        |                                           |
+----------------------------+-------------------------------------------+
| (Optional) Set up and test | See :ref:`sahara-install`                 |
| Sahara                     |                                           |
+----------------------------+-------------------------------------------+

Each of these steps is discussed below in more detail.

If necessary, you can :ref:`stop deployment<Stop_Deployment>`
or :ref:`reset the environment<Reset_Environment>`.

.. raw:: pdf

  PageBreak

.. _assign-roles-ug:

Assign a role or roles to each node server
------------------------------------------


.. image:: /_images/user_screen_shots/assign-roles1.png
   :width: 50%


.. image:: /_images/user_screen_shots/assign-roles2.png
   :width: 50%


For each role you want to assign,
drag it to the appropriate node
in the "Unallocated Nodes" list.

For more information, see:

- :ref:`nodes-roles-arch`
- :ref:`Storage-Architecture-arch`
- :ref:`mongodb-term`

.. _customize-partitions-ug:

Disk partitioning
-----------------

.. image:: /_images/user_screen_shots/partition-disks.png
   :width: 80%

Note that the disk partitions can be customized
only after a role is assigned to the node.

.. raw:: pdf

  PageBreak

.. _network-settings-ug:

Network settings
----------------

Use the network settings screens to notify Fuel
about the network hardware that is configured.
Different pages are used,
depending on the network topology you chose
on the :ref:`choose-network-ug` screen.

For more information,
see :ref:`public-floating-ips-arch`.

Neutron network settings
++++++++++++++++++++++++

These example screens are for a Neutron deployment,
which includes sections for setting the L2 and L3 configuration
that are not provided for Nova-network deployments.

.. image:: /_images/user_screen_shots/net-settings1.png
   :width: 80%


.. image:: /_images/user_screen_shots/net-settings2.png
   :width: 80%


.. image:: /_images/user_screen_shots/net-settings3.png
   :width: 80%

.. raw:: pdf

  PageBreak

Nova-network settings
++++++++++++++++++++++++

These example screens illustrate the Network Settings page
when using Nova-network:

.. image:: /_images/fuel-network-settings.png
   :width: 80%


.. include:: /pages/user-guide/config-environment/3000-nic-bonding-ui.rst
.. include:: /pages/user-guide/config-environment/0220-map-logical-to-physical-nic.rst


.. raw:: pdf

  PageBreak

.. _verify-networks-ug:

Verify Networks
---------------

When you have applied all your information to the "Network Settings" screen,
click the "Verify Networks" button at the bottom of the screen.
This checks and confirms the network configuration

The network check includes tests for connectivity between
nodes via configured VLANs on configured host interfaces.
Additionally, checks for an unexpected DHCP server are done
to ensure that outside DHCP servers will not interfere with deployment.
The image below shows a sample result of the check.
If there are errors, it is either in your configuration of interfaces
or possibly the VLAN tagging feature is disabled on your switch port.

.. image:: /_images/net_verify_failure.jpg
   :width: 90%

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

Access permissions for Horizon
++++++++++++++++++++++++++++++

The first part of the screen allows you to modify
the user name, password, and tenant used
to access the Horizon screens.

.. image:: /_images/user_screen_shots/settings-access.png
   :width: 80%


.. raw:: pdf

   PageBreak

.. _modify-services-ug:

Services included in the environment
+++++++++++++++++++++++++++++++++++++++++++

The next part of the Settings screen
allows you to modify the services
you chose when you first created your environment.

.. image:: /_images/user_screen_shots/settings-mod-services.png
   :width: 50%


.. raw:: pdf

   PageBreak

.. _vcenter-config-ug:

vCenter
+++++++

If you selected vCenter as your hypervisor,
you must complete the steps in this section
to configure communication with vCenter:

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
- Set Public key for deployed nodes

.. raw:: pdf

   PageBreak

.. _vlan-splinters-ug:

VLAN splinters
++++++++++++++

VLAN splinters are provided so that CentOS deployments
can support Neutron VLANS or GRE
(with VLAN tags on the management, storage, or public networks).
The kernel used for the CentOS version used with OpenStack
is based on a pre-3.3 kernel
and so has poor support for VLAN tagged packets
moving through :ref:`ovs-term` bridges.
Without VLAN splinters,
CentOS deployments may experience poor performance issues,
intermittent connectivity problems,
situations where one VLAN is working but others are not,
or a total failure to pass traffic.
Ubuntu deployments use a kernel that includes strong VLAN support
and so are not affected by these issues.


.. image:: /_images/user_screen_shots/settings-vlan-splinters.png
   :width: 50%

You can select either the soft trunks or hard trunks mode:

*  The **soft trunks mode** configures OVS to enable splinters
   and attempts to automatically detect in-use VLANs.
   This provides the least amount of performance overhead
   but the traffic may not be passed onto the OVS bridge in some edge cases.

*  The **hard trunks mode** also configures OVS to enable splinters
   but uses an explicitly defined list of all VLANs across all interfaces.
   This should prevent the occasional failures associated with the soft mode
   but requires that corresponding tags be created on all of the interfaces.
   This introduces additional performance overhead.
   You should use fewer than 50 VLANs
   if you run the Neutron VLAN mode and use the hard trunks mode.


.. raw:: pdf

   PageBreak

.. _settings-syslog-ug:

Syslog
++++++


.. raw:: pdf

   PageBreak

.. _settings-storage-ug:

Modify access permissions for Horizon
+++++++++++++++++++++++++++++++++++++

The first part of the screen allows you to modify
the user name, password, and tenant used
to access the Horizon screens.

Storage
+++++++

.. image:: /_images/user_screen_shots/settings-storage.png


.. raw:: pdf

   PageBreak

.. _deploy-changes:

Deploy Changes
==============

When you have made all the configuration changes you want to make,
click the "Deploy Changes" button
to deploy the environment you have defined.

It can take fifteen minutes to an hour to deploy Mirantis OpenStack,
depending on the options chosen;
deployment times out at two hours.
You can monitor the progress by opening the **Nodes** tab
or by checking individual node logs in the **Logs** tab.

.. include:: /pages/user-guide/stop_reset/0200-stop-deploy-ui.rst
.. include:: /pages/user-guide/stop_reset/0500-reset-environment.rst
