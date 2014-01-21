.. index:: Restart Services 

.. _RestartSvc:

Restart the services
====================

Once the files are patched, restart all appropriate OpenStack services.
If you patch nova, for example, restart all nova services running on a
given host with the following commands::

  $ service openstack-nova-api restart
  $ service openstack-nova-scheduler restart
  $ service openstack-nova-conductor restart

At this point, all of your services should be back up and running. You
can now perform your sanity or functional tests against the patched
environment to confirm that it is working as expected.