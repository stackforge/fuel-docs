.. _Monitoring-Ost-keystone:

Keystone
--------

Keystone is a central piece since users and all services rely on it for authentification.

Health checks
`````````````

+------------------+----------------+---------------+---------------------------+--------------------------+
| processes        | TCP port       | location      | logs                      | links                    |
+==================+================+===============+===========================+==========================+
| keystone-all     | 5000 (public)  | controllers   | /var/log/keystone-all.log | db, memcached            |
|                  | and 35357      |               |                           |                          |
|                  | (admin)        |               |                           |                          |
+------------------+----------------+---------------+---------------------------+--------------------------+

Check the proper functioning of main operations through API

+----------------------+-----------+
| Operation            | Frequency |
+======================+===========+
| authenticate and     | 5 minutes |
| revoke token         |           |
+----------------------+-----------+


Metrics
```````

Retrieve number of resources periodically:

+-------------------+------------------+---------------------------------+-----------------+
| Metric            | Source           | Details                         | Purpose         |
+===================+==================+=================================+=================+
| number of tokens  | SQL or Memcached | SQL: select count(*) from token | trend and       |
|                   |                  |                                 | detect high     |
|                   |                  |                                 | number          |
+-------------------+------------------+---------------------------------+-----------------+
| number of users   | API              |                                 | trend           |
+-------------------+------------------+---------------------------------+-----------------+
| number of tenants | API              |                                 | trend           |
+-------------------+------------------+---------------------------------+-----------------+

It's interesting to monitor *response times* and *rate* of these operations:

+-------------------------------+--------------+
| Metric                        | Source       |
+===============================+==============+
| authentication                | logs         |
+-------------------------------+--------------+
| token validation              | logs         |
+-------------------------------+--------------+
| tenant CRUD                   | notification |
+-------------------------------+--------------+
| user CRUD                     | notification |
+-------------------------------+--------------+
| specific operations extension | notification |
+-------------------------------+--------------+

Operations rate can be gathered by enabling `Keystone notifications`_,
except for tokens which require to find the information natively in logs,
for example:

    ::

     GET /v3/auth/tokens HTTP/1.1" 200 7317 0.071319
     POST /v2.0/tokens HTTP/1.1" 200 4199 0.092479

     # where 0.071319 and 0.071319 are response times


.. _Keystone notifications: http://docs.openstack.org/developer/keystone/event_notifications.html
