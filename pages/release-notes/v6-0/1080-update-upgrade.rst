
.. _update-upgrade-rn:

Update and Upgrade Issues
=========================

[TBD]
Known Issues in 6.0
-------------------

Fuel upgrade fails if custom python modules are installed as eggs
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Installing additional python modules on the Fuel Master node
using pip or easy_install
may cause the Fuel upgrade script to fail.
See `LP1341564 <https://bugs.launchpad.net/fuel/+bug/1341564>`_.

Some components are omitted when upgrading to Release 5.0.2
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* Some packages are not updated on nodes after Fuel upgrade.
  See `LP1364586 <https://bugs.launchpad.net/bugs/1364586>`_.

* The upgrade procedure does not update packages
  that are part of the control plane rather than OpenStack.
  This includes the Fuel agent, mcollective agent, and the network checker.
  Not upgrading these components means
  that bugs fixed in those packages are not applied
  to environments that were previously deployed
  and introduces some limitations
  for the actions that can be added or modified
  to the Astute network checker.
  See `LP1343139 <https://bugs.launchpad.net/bugs/1343139>`_.

* Docker is not updated by the OpenStack update procedure.
  This results in a number of issues; see
  LP1360161 <https://bugs.launchpad.net/fuel/+bug/1360161>`_


Timeout errors may occur when updating your environment from 5.0 to 5.0.2
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

When updating the environment from 5.0 to 5.0.2,
a "timeout exceeded" error may occur.
See `LP1367796 <https://bugs.launchpad.net/bugs/1367796>`_.

Other issues
++++++++++++

* Rollback is impossible due to package conflicts.
  See `LP1364068 <https://bugs.launchpad.net/bugs/1364068>`_.


