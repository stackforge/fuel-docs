
.. _murano-test-details:

Murano Platform Test Details
----------------------------

The Platform Tests run as part of the Fuel Health Test suite and
test Murano functionality
when Murano is installed in the OpenStack environment.
This document describes the actual tests that are run.

.. topic:: Murano environment with Linux Apache service deployment

  The test verifies that the Murano service can create and deploy the Linux Apache service.

  Target component: Murano

  Scenario:
 
  1. Send request to create environment.
  2. Send request to create session for environment.
  3. Send request to create Linux-based service Apache.
  4. Request to deploy session.
  5. Checking environment status.
  6. Checking deployments status
  7. Checking ports
  8. Send request to delete environment.

.. topic:: Murano environment with WordPress service deployment

  The test verifies that the Murano service can create and deploy the MySQL and WordPress service.

  Target component: Murano

  Scenario:

  1. Send request to create environment.
  2. Send request to create session for environment.
  3. Send request to create Linux-based service Apache.
  4. Send request to create MySQL.
  5. Send request to create WordPress.
  6. Request to deploy session.
  7. Checking environment status.
  8. Checking deployments status.
  9. Checking WordPress path.
  10. Send request to delete environment.

.. topic:: Murano environment with WordPress service deployment

  The test verifies that user can deploy application in Murano environment             

  Target component: Murano

  Scenario:

  1. Prepare test app.
  2. Upload test app.
  3. Send request to create environment.
  4. Send request to create session for environment.
  5. Send request to create test service.
  6. Send request to deploy session.
  7. Checking environment status.
  8. Checking deployment status.
  9. Send request to delete environment.
  10. Send request to delete package.

For more information, see:
`Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_


