
.. _fuel-general.rst:

General issues
==============

Known Issues in 5.1
-------------------

Controller cluster may fail if one MySQL instance fails
+++++++++++++++++++++++++++++++++++++++++++++++++++++++

If the MySQL instance on one Controller node fails,
the entire Controller cluster may be inaccessible
whereas it should just disable the Controller node where MySQL failed
and continue to run with the remaining Controller nodes.
See `LP1326829 <https://bugs.launchpad.net/bugs/1326829>`_.


Horizon and other services may be unavailable if a controller fails
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

If the public NIC on the primary controller becomes unavailable,
the public VIP does not migrate to another controller.
This does not break your OpenStack environment
but services such as Horizon that use the Public VIP
become unavailable.
Bringing the affected bridge interface back online
restores access to these services.
See `LP1370510 <https://bugs.launchpad.net/fuel/+bug/1370510>`_.

Deploying new controllers causes services downtime
++++++++++++++++++++++++++++++++++++++++++++++++++

When :ref:`adding controllers<add-controller-ops>`
to an existing environment,
nova-api is unavailable for a few minutes
which causes services to be unavailable.
See `LP1370067 <https://bugs.launchpad.net/fuel/+bug/1370067>`_.

Shotgun does not check available disk space before taking a diagnostic snapshot
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Shotgun does not ensure that adequate disk space is available
for the diagnostic snapshot.
Users should manually verify the disk space
before taking a diagnostic snapshot.
See `LP1328879 <https://bugs.launchpad.net/bugs/1328879>`_.

During traceback, an interface with an IP address on admin subnet is not found
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

When traceback is in process,
an interface with an IP address
that belongs to administrator's subnet, can not be found.
This happens because the configuration was updated in the base
and the node still has out-of-date configuration.
See `LP1355237 <https://bugs.launchpad.net/bugs/1355237>`_.

File injection fails when an instance launches
++++++++++++++++++++++++++++++++++++++++++++++

Instances with file injection cannot be launched
after the OpenStack environment is launched.
Instances that do not require file injection can be launched.
As a workaround, execute the **update-guestfs-appliance** command
on each Compute node.
See `LP1335697 <https://bugs.launchpad.net/bugs/1335697>`_.


