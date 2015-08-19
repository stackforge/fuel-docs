
.. _plugins_rn_7.0:

Fuel Plugins
++++++++++++

* Previously, VIP reservation was based on network metadata.
  Now, it is based on a description of network roles.
  This enables a plugin developer to create extra VIPs
  as a puppet resource in the pre-deployment or
  post-deployment stage.
  See more in
  `Virtual IP reservation via Fuel Plugin's metadata <https://wiki.openstack.org/wiki/Fuel/Plugins#Virtual_IP_reservation_via_Fuel_Plugin.27s_metadata>`_
  section of the Fuel Plugins SDK.

* Beginning with Fuel 7.0, after adding and enabling custom plugins for
  a cluster, a user can define a new role described in these plugins
  via Fuel Web UI as well as via :ref:`Fuel CLI<cli_usage>`.
  You can find more information in
  `Configuration of Fuel Plugins with new roles <https://wiki.openstack.org/wiki/Fuel/Plugins#Configuration_of_Fuel_Plugins_with_new_roles>`_
  section of the Fuel Plugins SDK.

* Sometimes new functionality, minor updates or security fixes
  should be delivered. A plugin developer creates a new version
  of a plugin. Now, you can find detailed information on how
  Fuel plugin versioning works in
  `Plugin versioning system <https://wiki.openstack.org/wiki/Fuel/Plugins#Plugin_versioning_system>`_
  section of the Fuel Plugins SDK.
