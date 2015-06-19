
.. _streamlined-patching-ref:

Mirantis OpenStack streamlined patching
=======================================

The streamlined patching feature introduced in Mirantis OpenStack 6.1
is the process of delivering product updates to users.

.. note::
   The streamlined patching feature is introduced in
   Mirantis OpenStack 6.1 and will not work in older releases.

Streamlined patching consists of the following four parts:

* Packaging of Fuel and Mirantis OpenStack components
* Patching Continuous Integration (CI)
* Errata portal
* User notification system

Packaging of Fuel and Mirantis OpenStack components
---------------------------------------------------

All components are built on per case basis and are installed from RPM
packages.
Packages are versioned according to the following scheme:
`[package-name]-[version]-[number of commits]`.

Patching CI
-----------

Patching CI runs on internal Mirantis servers and contains jobs
that perform the following tasks:

* Tests that both CentOS and Ubuntu packages are built correctly for
  a given patch.
* Tests that each patch references a task in the Mirantis tracking system,
  and that each task references an errata item (explained below).
* Tests that each patch is applied successfully to a clean environment
  deployed from the release ISO.
* Tests that each patch deploys successfully.

Errata portal
-------------

`The errata portal <http://errata.mirantis.com/>`_ can be accessed by any
user of the product. Every patch listed at the errata portal
contains the following items:

* Issue statement and description of the fix
* Link to CVE (if applicable)
* List of affected packages (before the fix)
* List of updated packages (containing the fix)
* Patching scenario
* Verification scenario

User notification system
------------------------

All users registered at the `official Mirantis website <https://www.mirantis.com/>`_
receive notifications of when there are new patches available in
an aggregate form.

Streamlined patching how-to
---------------------------

For your user experience and how-to see :ref:`Applying streamlined patching<streamlined-patching-ops>`.
