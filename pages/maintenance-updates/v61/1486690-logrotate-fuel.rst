.. _mos61mu-1486690:

[logrotate] Sharedscripts option conflicts with delaycompress option
====================================================================

Currently, both ``delaycompress`` and ``sharedscripts`` options are enabled.
The first one causes logrotate to just rename matching files and
compress them on next rotation, and the latter is supposed to make
postrotate script run just once for all affected files. In practice,
``sharedscripts`` prevails over ``delaycompress``, causing logrotate
to include renamed uncompressed files to rotation list and eventually
to fail due to filenames conflict, breaking entire rotation. The fix
deletes ``sharedscripts`` from our logrotate configuration files. See `LP1486690 <https://bugs.launchpad.net/bugs/1486690>`_.

Affected packages
-----------------

* **CentOS/@6.1:** fuel-library6.1=6.1.0-6757.1

Fixed packages
-----------------

* **CentOS/@6.1:** fuel-library6.1=6.1.0-6757.2

Patching scenario - Fuel Master node
------------------------------------

#. Delete the ``sharedscripts`` option from the `/etc/logrotate.d/fuel.nodaily` file.

#. Run the following commands on Fuel Master node::

        yum clean expire-cache
        yum -y update fuel-library
