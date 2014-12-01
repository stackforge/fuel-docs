.. _test-plan-report:


Template for Test Plan
++++++++++++++++++++++

Test Plan for the Fuel plug-in must contain the following information:

#. Full plug-in name with the description and functionality (specification)

#. Requirements, limitations and prerequisites for plug-in installation

#. Compatibility with specific Mirantis OpenStack releases

#. Configuration instructions

#. Specific test cases (for example, if you provide a plug-in
   for HA environment, then this issue should be verified properly
   with destructive scenarios). It is recommended to provide
   performance and functional test results

#. Instructions on accessing plug-in developer's test lab
   (if required)

Fuel QA team then runs test cases from the Test Plan and compares
the obtained results with the ones described in the Test Report.

When a Certified plug-in candidate is verified, it is also checked for
different security issues.

.. note:: Fuel plug-ins are certified for the whole Mirantis OpenStack
   release series. You should also take into consideration that plug-ins
   release can be independent from the Mirantis OpenStack releases.
