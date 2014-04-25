
.. _murano-test-details:

Murano Platform Test Details
----------------------------

The Platform Tests run as part of the Fuel Health Test suite
tests Murano functionality
when Murano is installed in the OpenStack environment.
This document describes the actual tests that are run.

.. topic:: Murano environment with AD service deployment

  The test verifies that the Murano service can create and deploy the Active Directory service.

  Target component: Murano

  Scenario:

  1. Check Windows Server 2012 image in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service AD.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status
  8. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_

.. topic:: Murano environment with ASP.NET application service deployment

  The test verifies that the Murano service can create and deploy the ASP.NET service.

  Target component: Murano

  Scenario:

  1. Check Windows Server 2012 image in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service ASPNet.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status
  8. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_

.. topic:: Murano environment with IIS service deployment

  The test verifies that the Murano service can create and deploy the IIS service.

  Target component: Murano

  Scenario:

  1. Check Windows Server 2012 image in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service IIS.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status
  8. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_

.. topic:: Murano environment with SQL service deployment

  The test verifies that the Murano service can create and deploy the SQL service.

  Target component: Murano

  Scenario:

  1. Check Windows Server 2012 image in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service SQL.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status
  8. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_

.. topic:: Murano environment with SQL Cluster service deployment

  The test verifies that the Murano service can create and deploy the SQL Cluster service.

  Target component: Murano

  Scenario:

  1. Check Windows Server 2012 image in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service AD.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status.
  8. Send request to create session for environment.
  9. Send request to create service SQL cluster.
  10. Request to deploy session..
  11. Checking environment status.
  12. Checking deployments status.
  13. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`

.. topic:: Murano environment with Demo service deployment

  The test verifies that the Murano service can create and deploy the Demo service.

  Target component: Murano

  Scenario:

  1. Check image for Demo service in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service Demo.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status.
  8. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`

.. topic:: Murano environment with Linux Telnet service deployment

  The test verifies that the Murano service can create and deploy the Linux Telnet service.

  Target component: Murano

  Scenario:

  1. Check image for Linux Telnet service in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service Linux Telnet.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status.
  8. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`

.. topic:: Murano environment with Linux Apache service deployment

  The test verifies that the Murano service can create and deploy the Linux Apache service.

  Target component: Murano

  Scenario:

  1. Check image for Linux Apache service in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service Linux Apache.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status.
  8. Send request to delete environment.


  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_

