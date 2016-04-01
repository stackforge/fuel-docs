.. _troubleshoot-health-checks:

Resolve a problem
-----------------

If a test fails, there are several ways to investigate the problem. You can
search for the information about the problem in the logs of each OpenStack
component, as well as in the test logs.

**To resolve a health check issue:**

#. Verify that all OpenStack services are up and running.

   * In the Fuel web UI:

     #. Click :guilabel:`Health Check`.
     #. Run the Sanity tests.

   * In the Fuel CLI:

     #. View the list of services:

        ::

          nova-manage service list

#. If any of the services have the *XXX* status, restart these
   services:

   ::

     service openstack-<service name> restart

#. Analyze error messages in :guilabel:`Dashboard`, :guilabel:`Networks`,
   and other tabs, if any.

   For example, a test may fail for the following reasons:

   * A quota has been exceeded
   * Network configuration is incorrect
   * A general lack of resources, such as memory or disk space.

#. Analyze the log files.

