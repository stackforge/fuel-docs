
.. _stateless-and-stateful-services-term:

Stateless and Stateful services
-------------------------------

A stateless service provides a response to your request
and then requires no further attention.
To make a stateless service highly available,
you need redundant instances that are load balanced.
OpenStack services that are stateless include
nova-api, nova-conductor, glance-api, keystone-api,
neutron-api and nova-scheduler.

A stateful service is one where subsequent requests to the service
depend on the results of each previous request.
Stateful services are more difficult to manage
because a single action typically involves multiple requests,
so simply providing addiitonal instances and load balancing
does not solve the problem.
For example, if the Horizon user interface reset itself
every time you went to a new page,
it would not be very useful.
OpenStack services that are stateful
include the OpenStack database and message queue.
Implementing high availability for a stateful service
depends on whether you choose
an active/passive or active/active configuration.
