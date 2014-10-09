
.. next-steps-ug:

Next Steps
==========

After you successfully deploy your OpenStack environment,
you should do the following:

- Set up :ref:`shell access<shell-ops>`
  to the Fuel Master and target nodes.
  You will need to use some shell commands
  to manage your environment.

- Run some tests to ensure that the deployed environment is sound:

  - Run :ref:`Verify Networks<verify-networks-ug>`.
    Even though you ran this before you deployed the environment,
    it is wise to run it again on the deployed network.
    `Network Troubleshooting
    <http://docs.openstack.org/openstack-ops/content/network_troubleshooting.html>`_
    may be useful.

  - Run the :ref:`Post-Deployment Check<Post-Deployment-Check-run>`
    tests, including the "Additional Checks" listed.

  - Run the Post-Deployment checks for other services
    if you included them in your environment:

    - :ref:`Sahara<sahara_test_prepare>`
    - :ref:`Murano<murano-test-prepare>`

  - Check other components:

    - If you implemented Ceph as your storage back-end,
      follow the `Verifying the deployment
      <https://github.com/stackforge/fuel-library/tree/master/deployment/puppet/ceph>`_
      instructions to check the deployment.
      If you find problems, `Troubleshooting Ceph
      <http://docs.ceph.com/docs/v0.80.5/radosgw/troubleshooting/>`_
      may help you resolve them.

- Run a :ref:`backup<Backup_and_restore_Fuel_Master>`
  and store the backup in an appropriate location.

- Manage your environment using the Horizon dashboard
  (click on the link on your Fuel Dashboard)
  and command-line tools:

  - For more information about using the Horizon dashboard,
    see the `OpenStack User Guide
    <http://docs.openstack.org/user-guide/content/log_in_dashboard.html>`_.

  - Create projects/tenants and users;
    `Managing Projects and Users
    <http://docs.openstack.org/openstack-ops/content/projects_users.html>`_.

  - If you deployed an OpenStack environment
    that is integrated with the vCenter server,
    see :ref:`vcenter-operate` for information about managing the environment.
