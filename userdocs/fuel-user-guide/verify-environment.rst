.. _verify-environment:

Verify your OpenStack environment
=================================

After you have successfully deployed your OpenStack environment, run
the build-in health tests to ensure your environment is
fully operational.

Health tests have the following advantages:

* Using post-deployment checks helps you identify potential issues which may
  impact the health of a deployed system.
* All post-deployment checks provide detailed descriptions about failed
  operations and tell you which component or components are not working
  properly.
* Performing these checks manually would consumed a great deal of time, but it
  only take a few minutes to run the full suite of tests from the Fuel console.
* Aside from verifying that everything is working correctly, the process also
  determines how quickly your system works.
* Post-deployment checks continue to be useful after you initially deploy your
  environment. For example, after sizable changes are made in the environment,
  you can use the checks to determine if any new failure points have been
  introduced.

This section includes the following topics:

.. toctree::
   :maxdepth: 3

   verify-environment/intro-health-checks.rst
   verify-environment/run-health-checks.rst
   verify-environment/troubleshoot-health-checks.rst
   verify-environment/murano-test-prepare.rst
   verify-environment/murano-test-details.rst
   verify-environment/sahara-test-prepare.rst
   verify-environment/sahara-test-details.rst
   verify-environment/heat-test-details.rst
