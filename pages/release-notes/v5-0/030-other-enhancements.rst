Other Enhancements
==================

The CentOS 6.5 operating system is included
-------------------------------------------

Mirantis OpenStack 5.0 includes CentOS 6.5,
which can be used as the operating system for the Fuel Master Node
or the Host Operating System for OpenStack nodes.

The Ubuntu 12.04.4 operating system is included
-----------------------------------------------

Mirantis OpenStack 5.0 includes Ubuntu 12.04.4,
which can be used as the Host operating system
for OpenStack nodes.

The supplied operating systems are protected against the “Heartbleed” defect in OpenSSL
---------------------------------------------------------------------------------------

While the standard distribution of CentOS 6.5 and Ubuntu 12.04.4 were
vulnerable to the Heartbleed defect in OpenSSL, the Mirantis OpenStack 5.0
packages have been updated with the patched 1.0.1g version and are thus
protected against the vulnerability.

Filter Scheduler improves how compute requests are dispatched
-------------------------------------------------------------

The Filter Scheduler is enabled by default for the nova-compute service.
The scheduler determines how to allocate
new VM instances among the configured Compute Nodes.
The Filter Scheduler uses filtering and weighting
to make better decisions
than the older scheduler.
Users can, however, select the traditional ("naive") scheduler
from the Fuel "Settings" page.
This is discussed more in the :ref:`scheduler-term` article.
See `Some improvements in Nova Scheduler config
<https://blueprints.launchpad.net/fuel/+spec/scheduler-config-improvements>`_.

Overcommit ratio allows better resource allocation
--------------------------------------------------

The overcommit ratio allows you to assign more
CPU, memory, and disk resources to allocated instances
than is physically available on the Compute nodes.
This allows you to better utilize the available resources
because most instances are not fully active at the same time.

See :ref:`overcommit-term` for information about
modifying the overcommit ratio for your environment
by manually editing a configuration file.
The overcommit ratio is not configurable from the Fuel UI; see
`LP1333436 <https://bugs.launchpad.net/fuel/+bug/1333436>`_.

Sahara (Savanna) has been updated to the latest Icehouse version
----------------------------------------------------------------

The Sahara project provided with Mirantis OpenStack 5.0
has been updated to the Icehouse version.
This major release of Sahara includes several bug fixes
and the following enhancements:

* Adds support for Hadoop 2.x
* Introduces the python-saharaclient CLI
* Enhances the User Interface and User Experience

Sahara has been elevated to incubated status in Icehouse
and will become an integrated project in Juno.

Note that what was previously known as the Savanna project
is now called the Sahara project;
this resolves a trademark infringement issue.

Additional information about Sahara can be found on the
`Sahara project web page <https://wiki.openstack.org/wiki/Sahara>`_.

Murano has been updated to the latest Icehouse version
------------------------------------------------------

Mirantis OpenStack 5.0 includes
`version 0.5 <https://launchpad.net/murano/+milestone/0.5>`_
of `Murano <https://wiki.openstack.org/wiki/Murano>`_,
an application catalog and data services lifecycle management addition
for OpenStack.
This minor release of Murano includes several bug fixes
and the following enhancements:

- Introductory application catalog functionality for OpenStack
- A new metadata
  `language <http://murano-api.readthedocs.org/en/latest/articles/murano_pl.html>`_
  for application definition
- Improved syntax for Dynamic UI definitions
- An improved UI
- Application statistics that can be used for billing purposes

For detailed information, please refer to the `Release Notes for Murano 
version 0.5 <https://wiki.openstack.org/wiki/Murano/ReleaseNotes_v0.5>`_.

Addition of "Live Migrate" option in Horizon
--------------------------------------------

The Icehouse version of Horizon that is included in Mirantis OpenStack 5.0
includes a "Live Migrate" option.
This solves some issues that occurred in earlier versions
when migrating instances using Horizon.
See `LP1284193 <https://bugs.launchpad.net/fuel/+bug/1284193>`_.

