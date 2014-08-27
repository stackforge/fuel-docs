Issues Resolved in Mirantis OpenStack 5.1
===============================================

Fuel now enforces need for three MongoDB roles
----------------------------------------------

Fuel 5.0.1 installs :ref:`mongodb-term`
as a backend for :ref:`ceilometer-term`.
When installing OpenStack in HA mode,
at least three MongoDB roles must be configured;
Fuel 5.1 enforces this.
See `LP1338486 <https://bugs.launchpad.net/bugs/1338486>`_.

Upgrade now puts a new fuelclient on Master Node
------------------------------------------------

The Fuel upgrade procedure now correctly puts
a new fuelclient on the Master Node.
See `LP1346247 <https://bugs.launchpad.net/fuel/+bug/1346247>`_.

Update process now updates Murano database tables correctly
-----------------------------------------------------------

Murano now uses Alembic migration rather than SQLAlchemy Migration,
which resolves problems
migrating Murano database tables.
See `LP1349377 <https://bugs.launchpad.net/fuel/+bug/1349377>`_.


Fuel properly enforces quorum on Controller clusters
----------------------------------------------------

Fuel now resets the **no-quorum-policy="ignore"** property
in the :ref:`crm<crm-term>` configuration
after the environment is deployed.
This property is required to incrementally add Controllers into the cluster
but not resetting it after deployment
meant that restarting the Management network
resulted in no L3 agents running on any of the nodes in the cluster.
See `LP1348548 <https://bugs.launchpad.net/fuel/+bug/1348548>`_.

Diagnostic Snapshot now includes all appropriate logs
-----------------------------------------------------

The diagnostic snapshot has been modified
to capture logs in */var/log* that are only symbolic links
as well as the logs that are present in that directory.
See `LP1323436 <https://bugs.launchpad.net/bugs/1323436>`_
and `LP1318514 <https://bugs.launchpad.net/bugs/1318514>`_.

New Compute node can be deployed with CLI
-----------------------------------------

In earlier releases,
using the Fuel CLI to add a new Compute node to an environment
caused Puppet to run on all nodes in the environment.
Configuration information is now stored per node rather than per cluster
so that clusters can be managed seemlessly
using either the Fuel UI or the Fuel CLI.
See `LP1280318 <https://bugs.launchpad.net/fuel/+bug/1280318>`_.


The unsupported_hardware option is now supported
------------------------------------------------

The CentOS distribution used with Fuel does not support some recent CPUs
such as the latest Ultra Low Voltage (ULV) line by Intel
(Core iX-4xxxU, Haswell);
newer ultralite Ultrabooks are usually equipped with such CPUs.
As a result, the Fuel Master node
(which always runs the CentOS distribution)
could not be deployed on these systems.
Controller, Compute, and Storage nodes can use these systems
but they must use the Ubuntu distribution.

Fuel 5.1 now provides the **unsupported_hardware** command line option
that disables the warning that blocked Fuel installation.
You can also use a virtualization manager,
such as QEMU or KVM, to emulate an older CPU on such systems.
Note that VirtualBox has no CPU model emulation feature.
See `LP1322502 <https://bugs.launchpad.net/fuel/+bug/1322502>`_.

CentOS issues booting on some servers
-------------------------------------

Fuel can now deploy an environment on hardware
that is affected by a CentOS bug
(see `CentOS6492 <http://bugs.centos.org/view.php?id=6492>`_).
Cobbler now applies appropriate kernel parameters to the deployment
to avoid these boot issues.
See `LP1312671 <https://bugs.launchpad.net/fuel/+bug/1312671>`_.

Brocade and Broadcom 10gig NICs can now be configured from the Fuel UI
----------------------------------------------------------------------

Packages have been added so that the bootstrap process
can detect Brocade and Broadcom 10gig NICs,
which allows them to be configured from the Fuel UI.
In earlier releases,
brocade NICS to be included in the environment
these NICS had to be configured using the Fuel CLI.
See `LP1260492 <https://bugs.launchpad.net/fuel/+bug/1260492>`_.


MySQL is available after full restart of environment
----------------------------------------------------

Older versions of Galera
(which manages MySQL in an OpenStack environment)
sometimes failed if the Controllers in an HA environment
come back online in a different order than Galera expected.
Release 5.1 includes a new RA (resource agent)
for Galera and Pacemaker
that supports a cluster bootstrap
that can reboot the whole cluster or any node in the cluster.
It uses Galera GTID (Global Transaction ID)
to determine which node has the latest database version
and uses this node as the Galera PC (Primary Component).
The administrator can manually choose a different node
to serve as the PC.
This fixes this issue.
See `LP1297355 <https://bugs.launchpad.net/fuel/+bug/1297355>`_.


Management network now restarts correctly
-----------------------------------------

The interface state is now checked when restarting
the Management logical network.
This solves the problems that sometime occured
when br-mgmt (the bridge for the Management logical network
on the Neutron topology) was shut down from the main Controller node,
making the Controller cluster was unreachable
See `LP1323277 <https://bugs.launchpad.net/fuel/+bug/1323277>`_.

Controllers can be deployed in parallel
---------------------------------------

Multiple controllers can now be deployed in parallel rather than sequentially.
This decreases the deployment time.
See `LP1310494 <https://bugs.launchpad.net/fuel/+bug/1310494>`_.

Glance properly sends notifications to Ceilometer
-------------------------------------------------

Modifications have been made to the notification driver
and strategy values
so that Glance now sends notifications to Ceilometer.
This means that  notifications such as "image.update" and "image.upload"
are now reported in the "ceilometer meter-list" output.
See `LP1314196 <https://bugs.launchpad.net/fuel/+bug/1314196>`_.

