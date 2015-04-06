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


#. Update DB. Set *in_use* to 1 to trigger quota usage refresh:

   ::

      # mysql
      > use nova;
      > UPDATE quota_usages SET until_refresh = 1;
      > quit


How to enable modifying nova quota limits in Horizon
----------------------------------------------------

You can enable modifying nova quota limits
in Horizon only in Fuel 6.0 and higher.

To do that, follow these steps:

#. On controller nodes, add the following code to the end
   of the `` /usr/share/openstack-dashboard/openstack_dashboard/settings.py`` file:

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
