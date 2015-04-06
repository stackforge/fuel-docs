.. _how-to-enable-nova-quota:

How to enable nova quota in the deployed cluster
================================================

This section provides steps for enabling nova quota,
if the cluster was deployed without selecting **Nova quotas** checkbox
on the *Settings* tab of Fuel web UI.

#. Deploy a cluster without nova quota enabled in the Fuel web UI.

#. Enable quota in *nova.conf* file (quota_driver=nova.quota.DbQuotaDriver).

#. Restart nova-api on the Controller node.

#. Restart /etc/init.d/openstack-nova-api

#. Create a tenant with quotas and a user for it.

#. As a tenant admin, create a network and a router.

#. Create 2 instances and delete 2 instances:quotas were not updated.

#. To start the quota update,
   you need to restart nova-conductor on all Controller nodes
# /etc/init.d/openstack-nova-conductor restart

Сlearing all quotas usage
-------------------------

#. Get the list of tenants:

   ::

      # keystone tenant-list

#. Get the tenant details to ensure it is the right tenant:

   ::

      # keystone tenant-get <tenant>

#. Update DB:

   ::

      # mysql 
      > use nova; 
      > UPDATE quota_usages SET in_use=0 WHERE project_id='<tenant ID>'; 
      > quit


Updating quota usage
--------------------

# mysql 
> use nova; 
> update quota_usages, (select user_id, project_id, COUNT(*) as sum from instances where project_id='<tenant ID>' and deleted!=id group by user_id, project_id) as r set quota_usages.in_use=r.sum where quota_usages.user_id=r.user_id and quota_usages.project_id = '<tenant ID>' and resource='instances';

> update quota_usages, (select user_id, project_id, SUM(memory_mb) as sum from instances where project_id='<tenant ID>' and deleted!=id group by user_id, project_id) as r set quota_usages.in_use=r.sum where quota_usages.user_id=r.user_id and quota_usages.project_id='<tenant ID>' and resource='ram';

> update quota_usages, (select user_id, project_id, SUM(vcpus) as sum from instances where project_id='<tenant ID>' and deleted!=id group by user_id, project_id) as r set quota_usages.in_use=r.sum where quota_usages.user_id=r.user_id and quota_usages.project_id='<tenant ID>' and resource='cores';


3. Please do it for all tenants.




