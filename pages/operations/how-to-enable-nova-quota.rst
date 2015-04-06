.. _how-to-enable-nova-quota:

How to enable nova quota in the deployed cluster
================================================

This section provides steps for enabling nova quota,
if the cluster was deployed without selecting **Nova quotas** checkbox
on the *Settings* tab of Fuel web UI.

#. Enable quota in *nova.conf* file (quota_driver=nova.quota.DbQuotaDriver).
   Set set *max_age* and *until_refresh* options (otherwise, quota usage values
   will get out of sync).

#. Restart nova-api on all Controllers in the cluster.

#. Restart both nova-api and service-conductor.

   * For CentOS, run:

     ::

       service openstack-nova-api restart
       service openstack-nova-conductor restart

   * For Ubuntu, run:

     ::

      service nova-api restart
      service nova-conductor restart


Сlearing all quotas usage
-------------------------

#. Get the list of tenants:

   ::

      $ keystone tenant-list

#. Get the tenant details to ensure it is the right tenant:

   ::

      $ keystone tenant-get <tenant>

#. Update DB. Set *in_use* to -1 to trigger quota usage refresh:

   ::

      # mysql 
      > use nova; 
      > UPDATE quota_usages SET in_use=-1
      > quit




