.. raw:: pdf

   PageBreak

.. index:: Fuel UI: Post-Deployment Check

.. _Post-Deployment-Check:

Post-Deployment Check
=====================

.. contents :local:

On occasion, even a successful deployment may result in some OpenStack
components not working correctly. If this happens, Fuel offers the ability
to perform post-deployment checks to verify operations. Part of Fuel's goal
is to provide easily accessible status information about the most commonly
used components and the most recently performed actions. To perform these
checks you will use Sanity and Functional checks, as described below:

**Sanity Checks**
  Reveal whether the overall system is functional.
  If these tests fail, you probably need to restart some services to operate OpenStack.

**Functional Checks**
  Dive in a little deeper and reveal networking, system-requirements,
  functionality issues.

Sanity Checks will likely be the point on which the success of your
deployment pivots, but it is critical to pay close attention to all
information collected from theses tests. Another way to look at these tests
is by their names.
