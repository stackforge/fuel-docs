
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

  #. Send request to create environment.
  #. Send request to create session for environment.
  #. Send request to create Linux-based service Apache.
  #. Request to deploy session.
  #. Checking environment status.
  #. Checking deployments status
  #. Checking ports
  #. Send request to delete environment.

.. topic:: Murano environment with WordPress service deployment

  The test verifies that the Murano service can create and deploy the MySQL and WordPress service.

  Target component: Murano

  Scenario:

  #. Send request to create environment.
  #. Send request to create session for environment.
  #. Send request to create Linux-based service Apache.
  #. Send request to create MySQL.
  #. Send request to create WordPress.
  #. Request to deploy session.
  #. Checking environment status.
  #. Checking deployments status.
  #. Checking WordPress path.
  #. Send request to delete environment.

.. topic:: Murano environment with WordPress service deployment

  The test verifies that user can deploy application in Murano environment

  Target component: Murano

  Scenario:

  #. Prepare test app.
  #. Upload test app.
  #. Send request to create environment.
  #. Send request to create session for environment.
  #. Send request to create test service.
  #. Send request to deploy session.
  #. Checking environment status.
  #. Checking deployment status.
  #. Send request to delete environment.
  #. Send request to delete package.

For more information, see:
`Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_
