.. _how-to-enable-nova-quota:

How to enable nova quota in the deployed cluster
================================================

This section provides steps for enabling nova quota,
if the cluster was deployed without selecting **Nova quotas** checkbox
on the *Settings* tab of Fuel web UI.

#. Enable quota in ``nova.conf`` file (``quota_driver=nova.quota.DbQuotaDriver``).
   Set ``max_age`` and ``until_refresh`` options (otherwise, quota usage values
   will get out of sync). It is recommended that you use default values like:
   ``max_age=3600``, ``until_refresh=20`` (triggers quota refresh every 3600 seconds
   or once per 20 VMs booted).

#. Restart both nova-api and nova-conductor at all Controllers.

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
      > UPDATE quota_usages SET until_refresh = 1
      > quit


How to enable nova quotas in Horizon
------------------------------------

To enable nova quotas in Horizon,
follow these steps:

#. Enable quota in ``nova.conf`` file on controller nodes.
   Set ``max_age=86400`` and ``util_refresh=50`` options to make sure
   quota usage values are refreshed once a day or once per 50 VMs launched.

#. On controller nodes, set ``quota_driver=nova.quota.DbQuotaDriver`` option
   in ``nova.conf`` file to enable quotas in Nova.

#. Restart nova services on controller nodes:

   * For CentOS, run:

     ::

        service openstack-nova-api restart
        service openstack-nova-conductor restart

   * For Ubuntu, run:

     ::

         service nova-api restart
         service nova-conductor restart


#. On controller nodes, add the following code
   into ``/usr/share/openstack-dashboard/settings.py`` file:

   ::

       ENABLED_QUOTA_GROUPS = {
              'nova': True,
       }


#. Restart Horizon:

   * On CentOS:

     ::

       service httpd reload

   * On Ubuntu:

    ::

        service apache2 reload
 

