.. _plugin-limitations:

Limitations
===========

* You must install and configure Fuel plugins that affect core functionality
  before deploying an OpenStack environment. Otherwise, you will have to
  redeploy the environment to enable the core plugin. Application-level
  plugins can be installed later on top of the already deployed environments.
* Fuel plugins cannot be upgraded from one major to another major version.
* Fuel plugins for SDN solutions cannot create a new networking option in
  the Fuel web UI wizard.