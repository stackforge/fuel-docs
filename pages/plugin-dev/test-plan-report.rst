.. _test-plan-report:


Plug-in Test Plan
+++++++++++++++++

.. note:: Fuel plug-ins are certified for the specific Mirantis OpenStack
   release series.

Test Plan for the Fuel plug-in must contain the following information:

#. Common plug-in description

#. Requirements, limitations and prerequisites for plug-in installation

#. Developer's specification (see `the template <https://github.com/stackforge/fuel-specs/blob/master/specs/template.rst>`_)

#. Functional testing results (it is recommended to provide
   scripts for checking a specific functionality)

#. Non-functional testing results for performance and security.
   Fuel QA team runs security testing, but OpenStack base system
   testing results should be provided

#. The Fuel Master node upgrade testing. Since plug-ins
   are certified for the whole release series, the Fuel Master node
   must also be verified for successful upgrade

#. Instructions on deploying a specific environment (if required)

#. Instructions on accessing the developer's lab (if a plug-in
   is hardware-specific)

When a Non-Certified plug-in candidate is checked,
Fuel QA team reviews developer's specification to understand
if the Test Plan covers all the functionality.

When a Certified plug-in candidate is checked,
Fuel QA team runs test cases from the Test Plan and compares
the obtained results with the ones described in the Test Report.



