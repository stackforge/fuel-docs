.. _mg-horizon:

Horizon
-------

Horizon is a canonical implementation of the OpenStack dashboard,
which provides a web-based user interface to OpenStack services
including Nova, Swift, Keystone, and others. Horizon is often the
main, if not the only, interface to the OpenStack services, and it is
critical to ensure that it is always available and responsive to
users.

The *Apache* HTTP server hosts the Horizon dashboard that is
implemented as a WSGI application. The HTTP server running the
Horizon dashboard is deployed behind the HAProxy load balancer which
distributes the load across the controller nodes cluster. This
application does not use the OpenStack database. It is simply a web
interface facade for the OpenStack services API endpoints.

**Process checks**

.. list-table::
   :header-rows: 1
   :widths: 28 20 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role
     - Dependencies
     - HA mode

   * - apache2 or httpd
     - HTTP 80
     - controller
     - n/a
     - active/active

**Interface checks**

* A synthetic HTTP transaction process performing login/logout
  sequences against the Horizon’s VIP should be executed on a regular
  basis to ensure it is responding properly to user requests.

**Collected Horizon Metrics**

Horizon metrics should be extracted from the Apache server(s) logs in
order to detect errors.

.. list-table::
   :header-rows: 1
   :widths: 20 30 30
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Source
     - Purpose

   * - number of logins
     - logs:

       `dashboard-openstack_auth.forms: INFO Login successful for user
       "admin"`.
     - alert:

       The absence of logins during a certain period may indicate
       that users do not have access to Horizon anymore.

   * - login errors
     - logs:

       `dashboard-openstack_auth.forms: WARNING Login failed for user
       "xxx"`.
     - alert:

       When a sudden spike of errors is detected. Could indicate of a
       brute force attack situation.

**Collected Apache Metrics**

Apache server should be sized and configured accordingly to the
expected load. Here are some metrics we suggest you to collect:

.. list-table::
   :header-rows: 1
   :widths: 20 30 30
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Source
     - Purpose

   * - number of requests/sec
     - server-status
     - diag

   * - number of bytes served/sec
     - server-status
     - diag

   * - number of busy workers
     - server-status
     - diag

   * - number of idle workers
     - server-status
     - alert:

       The continuous observation of zero idle workers may be the
       symptom of a server that is too busy or improperly configured.

.. note::
   `Server-status`_ must be enabled in the Apache’s configuration to
   provide information on the server’s activity and performance.

.. Links
.. _`Server-status`: http://httpd.apache.org/docs/2.2/mod/mod_status.html

