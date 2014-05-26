Other Enhancements
==================

The CentOS 6.5 operating system is included
-------------------------------------------

Mirantis OpenStack 5.0 includes CentOS 6.5,
which can be used as the operating system for the Fuel Master Node
or the Host Operating System for OpenStack nodes.

CentOS 6.5 is protected against the "Heartbleed" defect in OpenSSL
------------------------------------------------------------------

Mirantis OpenStack 5.0 packages of OpenSSL
have been updated with the patched 1.0.1g version
and thus are protected against the "Heartbleed" vulnerability
in OpenSSL.

Ubuntu 12.04.4 operating system is included
-------------------------------------------

Mirantis OpenStack 5.0 includes Ubuntu 12.04.4,
which can be used as the Host operating system
for OpenStack nodes.

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

* Basic application catalog functionality

  * Application Publishing

  * Application Sharing

  * Application Deletion

  * Application Search

  * Adding Applications to an environment

  * A billing feature pilot with:

    * Application deployment uptime
    * Instance Count / Total uptime

* A new metadata DSL and execution engine

* Repository enhancements:

  * A new Repository API
  * The murano-repository has been moved to a database storage backend

* UI enhancements

  * A new Search / Browse Catalog UI
  * Updated "configure application" forms

Addition of "Live Migrate" option in Horizon
--------------------------------------------

The Icehouse version of Horizon that is included in Mirantis OpenStack 5.0
includes a "Live Migrate" option.
This solves some issues that occurred in earlier versions
when migrating instances using Horizon.
See `LP1284193 <https://bugs.launchpad.net/fuel/+bug/1284193>`_.

