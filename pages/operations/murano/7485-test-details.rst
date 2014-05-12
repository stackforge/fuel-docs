
.. _murano-test-details:

Murano Platform Test Details
----------------------------

The Platform Tests run as part of the Fuel Health Test suite and
test Murano functionality
when Murano is installed in the OpenStack environment.
This document describes the actual tests that are run.

.. topic:: Murano environment with Linux Telnet service deployment

  The test verifies that the Murano service can create and deploy the Linux Telnet service.

  Target component: Murano

  Scenario:

  1. Check linux image with murano agent installed in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service Linux Telnet.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status.
  8. Send request to delete environment.

  For more infromation, see:
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


  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_

