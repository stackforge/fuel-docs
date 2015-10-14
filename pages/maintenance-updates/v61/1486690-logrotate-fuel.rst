.. _mos61mu-1486690:

[logrotate] The sharedscripts option conflicts with delaycompress option
========================================================================

Currently, both ``delaycompress`` and ``sharedscripts`` options are enabled.
The first one causes logrotate to rename matching files and compress them on
the next rotation, and the sharedscripts option executes the postrotate script
on all affected files. However, the sharedscripts option precedes
the delaycompress option. Therefore, logrotate includes the renamed
uncompressed files to the rotation list and eventually fails due to
the filenames conflict which breaks the entire rotation. The fix deletes 
``sharedscripts`` from the logrotate configuration files.
See `LP1486690 <https://bugs.launchpad.net/bugs/1486690>`_.

Affected packages
-----------------

* **CentOS/@6.1:** fuel-library6.1=6.1.0-6757.1

Fixed packages
-----------------

* **CentOS/@6.1:** fuel-library6.1=6.1.0-6757.2

Patching scenario - Fuel Master node
------------------------------------

#. Delete the ``sharedscripts`` option from the `/etc/logrotate.d/fuel.nodaily` file.

#. Run the following commands on the Fuel Master node::

        yum clean expire-cache
        yum -y update fuel-library
