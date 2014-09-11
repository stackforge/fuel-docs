
.. raw:: pdf

  PageBreak

.. _settings-ug:

Settings tab
------------

The "Settings" tab allows you to set or modify
various values for the system.
Many other values can be set by editing configuration files
and running command-line tools on the nodes.

The "Settings" tab provides configuration access to:

* Security:  reset login credentials for Horizon,
  set/reset login credentials for vCenter,
  set the SSH Public Key that will be authorized to access target nodes.

* Logging: set configuration parameters for Syslog,
  turn debug logging on/off

* Modify characteristics defined when you first created
  the Fuel environment, including which additional components
  (Sahara, Murano, and Ceilometer) are included,
  the hypervisor type, and the storage backend that are configured.

* Instance management: whether to automatically assign a floating IP
  to a new instance, whether to restart guests when the host reboots,
  and which scheduler to use to determine how to dispatch
  compute and volume requests.

* Configure VLAN Splinters for environments
  running CentOS on the target nodes
  with the Neutron VLAN network topology.

After you modify values on the "Settings" screen,
click the "Load Settings" button at the bottom of the screen.
If you want to go back to the Fuel default values,
you can click on the "Load Defaults" button at the bottom of the screen.

.. include:: /pages/user-guide/config-environment/settings/1000-access-horizon.rst
.. include:: /pages/user-guide/config-environment/settings/1500-modify-services.rst
.. include:: /pages/user-guide/config-environment/settings/2000-vcenter-config.rst
.. include:: /pages/user-guide/config-environment/settings/2500-common-settings.rst
.. include:: /pages/user-guide/config-environment/settings/3300-scheduler.rst
.. include:: /pages/user-guide/config-environment/settings/2590-public-key.rst
.. include:: /pages/user-guide/config-environment/settings/3500-vlan-splinters.rst
.. include:: /pages/user-guide/config-environment/settings/3600-mellanox-neutron.rst
.. include:: /pages/user-guide/config-environment/settings/4000-settings-storage.rst

