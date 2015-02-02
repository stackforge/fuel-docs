.. _Monitoring-Ost-horizon:

Horizon
-------

Health checks
`````````````

HTTP server *Apache* run the OpenStack dashboard throught HTTP and HTTPS, these must be checked.

Test also a login/logout.

Metrics
```````
It's interesting to follow these metrics which can be extracted from Apache logs:

- Login response time
- number of logins
- number of login errors

.. note:: Logs dont include Tenant-id/User-id information for login operations
