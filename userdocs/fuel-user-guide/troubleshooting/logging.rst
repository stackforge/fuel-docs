==========================
OpenStack services logging
==========================

Depending on your needs, use the following logging locations for the OpenStack
services:

* On the Fuel Master node, the log files of all OpenStack services are located
  in ``/var/log/remote/<NODE_HOSTNAME_OR_IP>/SERVICE_NAME.log``.

* On controller nodes, the log files are located in the
  ``/var/log/<SERVICE_NAME>-all.log`` file and ``/var/log/<SERVICE_NAME>/``
  folder. Some OpenStack services, for example, Horizon and Ironic, have only
  a log folder in ``/var/log/<SERVICE_NAME>/``.

* On the nodes dedicated for a specific service or role, for example, Cinder
  or Ironic, the ``/var/log`` directory contains logs for these
  specific services.

Some OpenStack services have additional logging locations. The following table
lists these locations:

.. list-table::
   :widths: 10 25
   :header-rows: 1

   * - Service name
     - Log files location on a controller node
   * - Corosync/Pacemaker
     - Fuel Master node:

       * /var/log/remote/<NODE_HOSTNAME_OR_IP>/attrd.log
       * /var/log/remote/<NODE_HOSTNAME_OR_IP>/crmd.log
       * /var/log/remote/<NODE_HOSTNAME_OR_IP>/cib.log
       * /var/log/remote/<NODE_HOSTNAME_OR_IP>/lrmd.log
       * /var/log/remote/<NODE_HOSTNAME_OR_IP>/pengine.log
   * - Horizon
     - * /var/log/apache2/horizon_access.log
       * /var/log/apache2/horizon_error.log
   * - Keystone
     - Apache logs:

       * /var/log/apache2/error.log
       * /var/log/apache2/access.log
       * /var/log/apache2/keystone_wsgi_admin_access.log
       * /var/log/apache2/keystone_wsgi_admin_error.log
       * /var/log/apache2/keystone_wsgi_main_access.log
       * /var/log/apache2/keystone_wsgi_main_error.log
   * - MySQL
     - * /var/log/syslog
   * - Neutron
     - * /var/log/openvswitch
