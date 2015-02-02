.. _Monitoring-Ost-keystone:

Keystone
--------

Keystone is a central piece since all services rely on it for users' authorization.

Health checks
`````````````

+------------------+----------------+---------------+---------------------------+--------------------------+
| processes        | TCP port       | location      | logs                      | links                    |
+==================+================+===============+===========================+==========================+
| keystone-all     | 5000 public    | controllers   | ceph/ceph.log             | db, memcache             |
|                  |                |               |                           |                          |
|                  | 35357 admin    |               |                           |                          |
+------------------+----------------+---------------+---------------------------+--------------------------+


Check the proper functioning of main operations through API:

- authenticate and revoke a token frequently (5 minutes)

Metrics
```````
- Number of tokens in database:

 ::

   select count(*) from token

.. note:: This only applies when using the SQL backend for storing tokens

- Number of users
- Number of tenants

It's interesting to monitor these operations :

- responses time and rate of operations:
   - authenticate
   - token validation
   - tenant CRUD
   - user CRUD
   - extension specific operations

Operations rate can be gathered by enabling `Keystone notifications`_,
except for tokens which require to find the information in logs, for example:

    ::

     GET /v3/auth/tokens
     POST /v2.0/tokens

Sadly, Response time are not retrievable easily. This require to patch
Keystone to add this information in logs or use instrumentation
mechanisum (aka monkey patching).

Errors are in logs.

.. _Keystone notifications: http://docs.openstack.org/developer/keystone/event_notifications.html
