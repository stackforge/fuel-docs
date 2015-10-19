.. _mos61mu-1452389:

logrotate is rotating already rotated atop's logs
=================================================

The existing logrotate configuration improperly rotates the log
file which is not necessary due to the daily restart of atop. The
binary retention is now handled via a new atop retention cron.
The fix removes the atop logrotate configuration.
See `LP1452389 <https://bugs.launchpad.net/bugs/1452389>`_.

Affected packages
-----------------
* **CentOS/@6.1:** fuel-library6.1=6.1.0-6757.1

Fixed packages
--------------
* **CentOS/@6.1:** fuel-library6.1=6.1.0-6757.2

Patching scenario
-----------------

Run the following commands on the Fuel Master node::

        yum clean expire-cache
        yum -y update fuel-library

.. note:: After updating fuel-library package on the Fuel Master node, only
   newly created environments are deployed with the fixed behavior of logrotate.
   In order to fix the existing environments, execute the commands below.

Do the following actions on all the slave nodes in the deployed environment:

#. Create a file named `atop_retention` in the `/etc/cron.daily`
   directory with the following contents::

    #!/bin/bash
    PATH=/sbin:/bin:/usr/sbin:/usr/bin
    find /var/log/atop -type f -name 'atop_*' -mtime +7 -delete
    ln -f -s /var/log/atop/atop_$(date +%Y%m%d) /var/log/atop/atop_current

#. Delete the file `/etc/logrotate.d/atop`.
