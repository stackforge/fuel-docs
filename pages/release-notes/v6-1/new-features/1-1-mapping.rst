.. _1-1-mapping:

Nova-compute and vSphere clusters mapping
-----------------------------------------

In earlier Fuel releases, 1-N mapping between nova-compute service
and vSphere cluster (cluster that is formed from ESXi hosts by vCenter server) was used.
In most cases, a single nova-compute service instance uses many vSphere clusters, managed by a single
vCenter.
Beginning with Fuel 6.1, this behaviour was changed to 1-1 mapping, so that a single nova-compute
service instance 'nonteracts' with a single vSphere cluster.
For more information, see TBD