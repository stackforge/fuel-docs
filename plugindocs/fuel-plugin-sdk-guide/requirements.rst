.. _plugin-requirements:

Requirements
============

* Plugin code must be idempotent.
* Do not copy modules from fuel-library. Add the module path
  into task description instead and use fuel-library as framework:
  ``puppet_modules: "puppet/modules:/etc/puppet/modules"``
* If you use plugin pre-deployment scripts that somehow change the state of
  the Fuel Master node -- for example, changes to Nailgun database --
  ensure that all these changes are removed in the post-deployment script.
* See :ref:`code-style` and 
  `Fuel contribution guidelines <https://wiki.openstack.org/wiki/Fuel/How_to_contribute>`_
* recommendation on pre_build_hook