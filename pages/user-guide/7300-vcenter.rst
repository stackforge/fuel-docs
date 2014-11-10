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

Choose either the Nova-network FlatDHCP or the VLAN manager.
The VLAN manager provides better security and scalability than the
FlatDHCP manager.

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


- If you are using the deprecated Multi-node (no HA) mode,
  local storage is used as the backend for Glance.

Related projects for vCenter
++++++++++++++++++++++++++++

Nova-network does not support Murano,
so you cannot run Murano in the OpenStack environment
with vSphere integration.

.. image:: /_images/user_screen_shots/vcenter-additional.png
   :width: 50%

.. note:: Fuel does not configure Ceilometer
   to collect metrics from vCenter virtual resources.
   For more details about the Ceilometer plugin for vCenter,
   see `Support for VMware vCenter Server
   <https://wiki.openstack.org/wiki/Ceilometer/blueprints/vmware-vcenter-server#Support_for_VMware_vCenter_Server>`_


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

Note the following:
when node with controller role is added to the environment,
Cinder LVM role stays unavailable. To work this problem around
and unblock UI element, follow these steps:

* Establish an SSH connection to the Fuel Master node. Then go to a Docker
  container with Nailgun and run a Python shell to manage Nailgun DB.

  ::


       ssh root@<fuel-master-node-ip>
       dockerctl shell nailgun
       manage.py shell

* Then run this code in a Python console:

  ::


      from nailgun.db.sqlalchemy.models import *
      releases = db().query(Release).all()
      from copy import deepcopy
      for r in releases:
         r.roles_metadata = deepcopy(r.roles_metadata)
         res = r.roles_metadata['cinder']['restrictions'][0]
         res['condition'] = (
        'settings:storage.volumes_lvm.value == false'
        ' and settings:storage.volumes_vmdk.value == false'
        )
   res['message'] = 'Cinder LVM or VMDK should be enabled in settings'

      db().commit()
      exit()

* The change will now be applied to all existing and new environments
  Here is an example of console output when the patch is applied:

  ::


      user@laptop:~$ ssh root@10.20.0.2
      root@10.20.0.2's password:
      Last login: Fri Nov  7 08:14:03 2014 from 10.20.0.1
      [root@fuel ~]# dockerctl shell nailgun
      [root@24a34382eeff ~]# manage.py shell
      2014-11-10 06:36:47.625 DEBUG [7fe511c8a700]
      (settings) Looking for settings.yaml package config using old style __file__
      2014-11-10 06:36:47.625 DEBUG [7fe511c8a700]
      (settings) Trying to read config file /usr/lib/ python2.6/site-packages/nailgun/settings.yaml
      2014-11-10 06:36:47.807 DEBUG [7fe511c8a700]
      (settings) Trying to read config file /etc/nailgun/settings.yaml
      2014-11-10 06:36:47.822 DEBUG [7fe511c8a700]
      (settings) Trying to read config file /etc/fuel/version.yaml
      Python 2.6.6 (r266:84292, Jan 22 2014, 09:42:36)
      [GCC 4.4.7 20120313 (Red Hat 4.4.7-4)] on linux2
      Type "help", "copyright", "credits" or "license" for more information.
      (InteractiveConsole)
      >>> from nailgun.db.sqlalchemy.models import *
      >>> releases = db().query(Release).all()
      >>> for r in releases:
      ...   r.roles_metadata = deepcopy(r.roles_metadata)
      ...   res = r.roles_metadata['cinder']['restrictions'][0]
      ...   res['condition'] = (
      ...     'settings:storage.volumes_lvm.value == false'
      ...     ' and settings:storage.volumes_vmdk.value == false'
      ...   )
      ...   res['message'] = 'Cinder LVM or VMDK should be enabled in settings'
      ...
      >>> db().commit()
      >>> exit()
      [root@24a34382eeff ~]# exit
      exit
      [root@fuel ~]#exit
      [root@fuel ~]# exit
      logout
      Connection to 10.20.0.2 closed.
      user@laptop:~$


.. _network-settings-vcenter-ug:

Network settings
++++++++++++++++

Only the :ref:`nova-network-term` with FlatDHCP topology
is supported in the current version of vCenter integration in Fuel.

- Select the FlatDHCP manager in the Nova-network settings

.. image:: /_images/user_screen_shots/vcenter-network-manager.png
   :width: 80%

- Check the vCenter credentials

.. image:: /_images/user_screen_shots/settings-vcenter.png
   :width: 80%

- Enable the 'Use VLAN tagging for fixed networks' checkbox
  and enter the VLAN tag you selected
  for the VLAN ID in the ESXi host network configuration

.. image:: /_images/user_screen_shots/vcenter-nova-network.png
   :width: 80%

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
