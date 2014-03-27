Running Post-Deployment Checks
------------------------------

Now, let`s take a closer look on what should be done to execute the tests and
to understand if something is wrong with your OpenStack environment.

.. image::  /_images/001-health-check-tab.jpg
  :align: center
  :width: 100%

As you can see on the image above, the Fuel UI now contains a ``Health Check``
tab, indicated by the Heart icon.

All of the post-deployment checks are displayed on this tab. If your
deployment was successful, you will see a list of tests this show a green
Thumbs Up in the last column. The Thumb indicates the status of the
component. If you see a detailed message and a Thumbs Down, that
component has failed in some manner, and the details will indicate where the
failure was detected. All tests can be run on different environments, which
you select on main page of Fuel UI. You can run checks in parallel on
different environments.

Each test contains information on its estimated and actual duration. There is
information included about test processing time from in-house testing and
indicate this in each test. Note that average times are listed from the slowest
to the fastest systems tested, so your results may vary.

Once a test is complete, the results will appear in the Status column. If
there was an error during the test, the you will see the error message
below the test name. To assist in troubleshooting, the test
scenario is displayed under the failure message and the failed step is
highlighted. You will find more detailed information on these tests later in
this section.

An actual test run looks like this:

.. image::  /_images/002-health-check-results.jpg
  :align: center
  :width: 100%
