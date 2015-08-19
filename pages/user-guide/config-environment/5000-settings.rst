
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

* Security: reset login credentials for Horizon,
  set/reset login credentials for vCenter,
  set the SSH Public Key that will be authorized to access target nodes,
  enable TLS.

* Logging: set configuration parameters for Syslog,
  turn debug logging on/off.

* Modify the characteristics defined when you first created
  the Fuel environment, including which additional components
  (Sahara, Murano, and Ceilometer) are included,
  the hypervisor type, and the storage backend that are configured.

* Repository management: define repositories to download the operating
  system and various updates.

After you modify values on the "Settings" screen,
click the "Save Settings" button at the bottom of the screen.
If you want to go back to the Fuel default values,
you can click on the "Load Defaults" button at the bottom of the
screen.

.. note:: The "Load Defaults" this will load the default values for all
          the Fuel settings, not just the settings section that you are
          on.

.. include:: /pages/user-guide/config-environment/settings/1000-access-horizon.rst
.. include:: /pages/user-guide/config-environment/settings/1500-modify-services.rst
.. include:: /pages/user-guide/config-environment/settings/2500-common-settings.rst
.. include:: /pages/user-guide/config-environment/settings/3250-debug-set.rst
.. include:: /pages/user-guide/config-environment/settings/3400-qcow.rst
.. include:: /pages/user-guide/config-environment/settings/2590-public-key.rst
.. include:: /pages/user-guide/config-environment/settings/3525-kernel-parameters.rst
.. include:: /pages/user-guide/config-environment/settings/neutron-dvr.rst
.. include:: /pages/user-guide/config-environment/settings/repos.rst
.. include:: /pages/user-guide/config-environment/settings/3550-syslog.rst
.. include:: /pages/user-guide/config-environment/settings/public-network.rst
.. include:: /pages/user-guide/config-environment/settings/4000-settings-storage.rst
.. include:: /pages/user-guide/config-environment/settings/dns-ntp-support.rst
.. include:: /pages/user-guide/config-environment/settings/public-tls.rst
