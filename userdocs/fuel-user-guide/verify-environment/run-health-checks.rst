.. _run-health-checks:

Run a health check
------------------

We recommend that you run all health tests immediately after you
deploy your OpenStack environment, so you can promptly address any
issues with your environment configuration.

Each test contains information on its estimated and actual duration.
Information about test processing time is based on the tests
conducted in our lab. Therefore, actual time for
the test to complete may vary for different environments.

After a test is complete, the results appear in the
:guilabel:`Status` column. If a test fails, Fuel displays an
error message. To assist in troubleshooting, the test
scenario is displayed under the failure message and the failed step is
highlighted.

**To run a health check:**

#. In the Fuel web UI, click the :guilabel:`Health Check` tab.
#. Select the tests that you want to run.
#. Click :guilabel:`Run Tests`.

