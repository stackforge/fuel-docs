
.. _next-steps-ug:

Next Steps
==========

After you successfully deploy your OpenStack environment,
you must verify that your environment is operational, as well as configure
additional components. After completing the verification, log in to the
Horizon dashboard or the OpenStack CLI to operate your environment.

Configure and verify the following:

#. If you have installed additional OpenStack components, such as the
   OpenStack application catalog (Murano), the Telemetry service (Ceilometer),
   the Bare Metal Service (Ironic), or the Hadoop cluster (Sahara), complete
   the tasks described in the corresponding sub-section in
   :ref:`configure-additional-components`.

#. Set up shell access to Fuel Master and Fuel Salve nodes to use OpenStack
   CLI.

#. Verify that the deployed environment is operational by running the following
   tests:

   - Network configuration test in the :guilabel:`Networks` tab.

     Although you may have already run this test before you deployed
     the OpenStack environment, you may want to verify the network
     configuration once again.

   - Environment health checks described in :ref:`verify-environment`

   - Additional components verification. If you have installed any
     additional components, prepare and run the corresponding tests:

     - :ref:`sahara-test-prepare`
     - :ref:`murano-test-prepare`

   - Ceph configuration test:

     - If you have deployed Ceph as a storage back end,
       follow the `Verifying the deployment
       <https://github.com/openstack/fuel-library/tree/master/deployment/puppet/ceph>`_
       instructions to verify the Ceph configuration.

#. Create a backup of your environment and store it in a safe location.
#. Log in to the Horizon dashboard by clicking :guilabel:`Go to Horizon`
   or to the command-line interface to manage  your OpenStack environment.

   .. note::
       After you deploy an OpenStack environment, manage the environment
       from the Horizon dashboard. Use Fuel UI for testing, managing OpenStack
       nodes, and troubleshooting.

.. seealso::

   - `Network Troubleshooting
     <http://docs.openstack.org/openstack-ops/content/network_troubleshooting.html>`_
   - `OpenStack User Guide
     <http://docs.openstack.org/user-guide/dashboard.html>`_
   - `Managing Projects and Users
     <http://docs.openstack.org/openstack-ops/content/projects_users.html>`_
