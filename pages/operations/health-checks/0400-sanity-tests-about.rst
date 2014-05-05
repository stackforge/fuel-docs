Sanity Tests Description
------------------------

Sanity checks work by sending a query to all OpenStack components to get a
response back from them. Many of these tests are simple in that they ask
each service for a list of its associated objects and then waits for a
response. The response can be something, nothing, an error, or a timeout,
so there are several ways to determine if a service is up. The following list
includes the suite of sanity tests implemented:

* Instance list availability
* Images list availability
* Volume list availability
* Snapshots list availability
* Flavor list availability
* Limits list availability
* Services list availability
* User list availability
* Stack list availability
* Check all the services execute normally
* Check Internet connectivity from a compute
* Check DNS resolution on a compute
* Murano environment and service creation, listing and deletion
* Networks availability

