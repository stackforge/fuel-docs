.. _mg-keystone:

Keystone
--------

Keystone is an OpenStack service that provides identity, token,
catalog, and policy services to users and to other OpenStack
services. As such, the availability of all the OpenStack services
depends on the availability of Keystone.

**Process Checks**

.. list-table::
   :header-rows: 1
   :widths: 20 20 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role
     - Dependencies
     - HA mode

   * - keystone-all
     - HTTP
       5000 (public) and
       35357 (admin)
     - controller
     - db, memcached, Apache
     - active/active

**API checks**

Check the proper functioning of an authenticate and token revocation
operations:

* POST /v2.0/tokens
* DELETE /v2.0/tokens/{token-id} or DELETE /v3/auth/tokens

|

**Collected Metrics**

.. list-table::
   :header-rows: 1
   :widths: 20 40 40
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Source
     - Purpose

   * - authentication errors
     - log:

       POST /v2.0/tokens HTTP/1.1" 401 330 0.205647

       401 error code indicates an authentication error
     - alert:

       When a sudden spike of errors is detected. A high
       authentication errors rate can be the symptom of a
       brute-force attack.

   * - authentication response time
     - log:

       POST /v2.0/tokens HTTP/1.1" 200 4199 0.092479

       where 0.092479 is the response time in seconds
     - alert:

       When the value is beyond standard deviation or top
       percentiles threshold depending on the data-points
       distribution.

   * - token validation errors
     - logs

       GET /v3/auth/tokens HTTP/1.1" 404 7317 0.071319

       #404 indicates a token validation error
     - alert:

       When a sudden spike of errors is detected

   * - token validation response time
     - logs:

       GET /v3/auth/tokens HTTP/1.1" 200 7317 0.071319

       # 0.071319 is the response time in seconds
     - alert:

       When the value is beyond standard deviation or top
       percentiles threshold depending on the data-points
       distribution.

   * - number of users
     - poll API:

       GET /v2.0/users
     - diag

   * - number of tenants
     - poll API:

       GET /v2.0/tenants
     - diag

   * - API errors
     - Logs:

       all entries with HTTP 500 error code
     - alert:

       When a sudden spike of errors is detected.
