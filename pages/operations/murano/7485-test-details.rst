
.. _murano-test-details:

Murano Platform Test Details
----------------------------

The Platform Tests run as part of the Fuel Health Test suite and
test Murano functionality
when Murano is installed in the OpenStack environment.
This document describes the actual tests that are run.

.. topic:: Murano environment with WordPress application deployment

  The test verifies that user can deploy WordPress application in Murano environment.

  Target component: Murano

  Scenario:

  1. Send request to create environment.
  2. Send request to create session for environment.
  3. Send request to create MySQL.
  4. Send request to create Linux-based service Apache.
  5. Send request to create WordPress.
  6. Request to deploy session.
  7. Checking environment status.
  8. Checking deployments status.
  9. Checking ports availability.
  10. Checking WordPress path.
  11. Send request to delete environment.

  For more information, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_

.. topic:: Murano environment with Linux Apache service deployment

  The test verifies that the Murano service can create and deploy the Linux Apache service.

  Target component: Murano

  Scenario:

  1. Check linux image with murano agent installed in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service Linux Apache.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status.
  8. Send request to delete environment.


  For more information, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_

