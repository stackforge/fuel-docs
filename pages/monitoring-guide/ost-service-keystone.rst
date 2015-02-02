.. _Monitoring-Ost-keystone:

Keystone
--------

Keystone is a central piece since all services relies on to authorize for all users operations.

Health checks
`````````````

TCP ports **5000** (public endpoint) and **35357** (admin endpoint) must be open.

check the existence of process **keystone-all** on *controller* node.

Check the proper functioning of mains operations through API:

- authenticate and revoke a token frequently

Metrics
```````
Number of tokens in database

 ::

   select count(*) from token



It's interresting to monitor these operations :

- responses time and rate of operations:
   - authenticate
   - token validation
   - tenant CRUD
   - user CRUD
   - extension specific operations
- errors

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
