==========================
OpenStack services logging
==========================

Depending on your needs, use the following logging locations for the OpenStack
services:

* On the Fuel Master node, the log files of all OpenStack services are located
  in ``/var/log/remote/<NODE_HOSTNAME_OR_IP>/SERVICE_NAME.log``.

* On each node of your environment, the log files are located in the
  ``/var/log/<SERVICE_NAME>-all.log`` file and the ``/var/log/<SERVICE_NAME>/``
  folder. Some OpenStack services, for example, Horizon and Ironic, have only
  a log folder in ``/var/log/<SERVICE_NAME>/`` and do not have a
  ``/var/log/<SERVICE_NAME>-all.log`` file.

Some OpenStack services have additional logging locations. The following table
lists these locations:

.. list-table::
   :widths: 10 25
   :header-rows: 1

   * - Service name
     - Log files location
   * - Corosync/Pacemaker
     - Fuel Master node:

       * /var/log/remote/<NODE_HOSTNAME_OR_IP>/attrd.log
       * /var/log/remote/<NODE_HOSTNAME_OR_IP>/crmd.log
       * /var/log/remote/<NODE_HOSTNAME_OR_IP>/cib.log
       * /var/log/remote/<NODE_HOSTNAME_OR_IP>/lrmd.log
       * /var/log/remote/<NODE_HOSTNAME_OR_IP>/pengine.log
   * - Horizon
     - Controller node:

       * /var/log/apache2/horizon_access.log
       * /var/log/apache2/horizon_error.log
   * - Keystone
     - Controller node:

       Since the Keystone service is available through the Apache server,
       the Apache logs contain the Keystone logs:

       * /var/log/apache2/error.log
       * /var/log/apache2/access.log
       * /var/log/apache2/keystone_wsgi_admin_access.log
       * /var/log/apache2/keystone_wsgi_admin_error.log
       * /var/log/apache2/keystone_wsgi_main_access.log
       * /var/log/apache2/keystone_wsgi_main_error.log
   * - MySQL
     - Controller node:

       * /var/log/syslog
   * - Neutron
     - Controller node:

       * /var/log/openvswitch
