.. _plugin-limitations:

Limitations
===========

* Core-functionality Fuel plugins can only be installed before configuring
  and deploying the environment. Otherwise, you will have to redeploy the
  environment to enable the core plugin. Application-level plugins can be
  installed later on top of the already deployed environments.
* Fuel plugins cannot be upgraded from one major to another major version.
* Fuel plugins for SDN solutions cannot create a new networking option in
  the Fuel web UI wizard.
* `Known Fuel Plugin Builder issues <https://bugs.launchpad.net/fuel/+bug/1594949>`_.
* `Plugin tasks in the main deployment stage do not have the *groups* keyword <https://bugs.launchpad.net/fuel/+bug/1596949>`_.
* `No CLI option to retrieve the Fuel Plugin Builder version <https://bugs.launchpad.net/fuel/+bug/1594946>`_.
