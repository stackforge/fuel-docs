
.. _fuel-general.rst:

OpenStack Deployment Issues
===========================

[TBD]
Known Issues in 6.0
-------------------

Deploying new controllers causes services downtime
++++++++++++++++++++++++++++++++++++++++++++++++++

When :ref:`adding controllers<add-controller-ops>`
to an existing environment,
nova-api is unavailable for a few minutes,
which causes services to be unavailable.
See `LP1370067 <https://bugs.launchpad.net/fuel/+bug/1370067>`_.

File injection fails when an instance launches
++++++++++++++++++++++++++++++++++++++++++++++

Instances with file injection cannot be launched
after the OpenStack environment is launched.
Instances that do not require file injection can be launched.
As a workaround, execute the **update-guestfs-appliance** command
on each Compute node.
See `LP1335697 <https://bugs.launchpad.net/bugs/1335697>`_.
