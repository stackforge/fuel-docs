
.. _update-upgrade-rn:

Update and Upgrade Issues
=========================

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

Fuel upgrade no longer fails if custom python modules are installed
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

The fuel_upgrade script now works independently of the Python packages installed on the Fuel Master node by hand via pip or easy_install.
See `LP1341564 <https://bugs.launchpad.net/fuel/+bug/1341564>`_.

Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

Some components are omitted when upgrading Fuel
+++++++++++++++++++++++++++++++++++++++++++++++

* The Fuel upgrade procedure does not update packages
  that are part of the control plane rather than OpenStack.
  This includes the Fuel agent, mcollective agent, and the network checker.
  Not upgrading these components means
  that bugs fixed in those packages are not applied
  to environments that were previously deployed
  and introduces some limitations
  for the actions that can be added or modified
  to the Astute network checker.
  See `LP1343139 <https://bugs.launchpad.net/bugs/1343139>`_.
