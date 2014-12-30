.. _plugin-cert:


Fuel plug-ins certification
===========================

Certified and Non-Certified plug-ins
------------------------------------

Plug-ins come into two categories: Certified and Non-Certified.

For information on Certified and Non-Certified plug-ins certification requirements,
see :ref:`Plug-in certification requirements<plug-in-cert>`.

For instructions on creating your own plug-in, see :ref:`020-fuel-plugin-dev`.
For instructions on installing a plug-in, see :ref:`040-install-plugin`.
For instructions on building your plug-in, see :ref:`How To Build your Plug-in<create-build-plugin>`.

.. _plugins-storage:

Plug-ins storage
----------------

Plug-ins are kept in a special file storage, so that
you can download them from `<https://software.mirantis.com/fuel-plugins>`_
and install.

Plug-ins development requirements
---------------------------------

Plug-ins must meet a set of development requirements.
Once a provided plug-in does not satisfy any of them,
Mirantis cannot accept it and publish into the Catalog.

When you plan to develop a plug-in for Fuel,
take the following requirements into consideration:

* Plug-in should be written on Python.

* Deb and rpm packages must contain their dependencies.
  For instructions on creating packages, see
  `Fedora project wiki <https://fedoraproject.org/wiki/How_to_create_an_RPM_package>`_
  and `Ubuntu Packaging Guide <http://packaging.ubuntu.com/html/>`_.

* Puppet manifests should be written
  according to the
  `Official OpenStack documentation <https://wiki.openstack.org/wiki/Puppet-openstack#Developer_documentation>`_.
  For good code examples and workflow,
  see `Puppet in OpenStack <https://wiki.openstack.org/wiki/Puppet-openstack>`_.

* It is strongly not recommended to use bash scripts.

.. _plug-in-cert:

Plug-ins certification requirements
-----------------------------------

Certified and Non-Certified plug-ins have a set of requirements.

.. _non-certified:

Non-Certified
+++++++++++++

Non-Certified plug-in should satisfy the following requirements:

* Built plug-in or download link is provided

* Plug-in purpose is specified: for example,
  Compute, Storage, Network, Operations

* Basic description of plug-in functionality (specification) is provided

* Plug-in developer contact information (company, support contacts) is provided

Non-Certified plug-in must also have the following set of documentation:

* Plug-in Installation Guide in .pdf format

* Plug-in User Guide in .pdf format (for templates, see :ref:`plugin-doc-template`)

* Test Plan and Test Report in .pdf format (for templates, see :ref:`test-plan-report`)


.. _certified:

Certified
+++++++++

Certified plug-ins are those that passed :ref:`Non-Certified<non-certified>` phase.

The main difference between Non-Certified and Certified plug-ins is that
the latter are tested by the Fuel QA team more thoroughly to verify
that plug-in can be enabled in Fuel without any harm.

If a Non-Certified plug-in susccessfully passes all tests,
it is moved to the appropriate directory
of the :ref:`Plug-ins storage<plugins-storage>` and signed by
Mirantis `GPG <https://www.gnupg.org/index.html>`_ key.

.. include:: /pages/plugin-dev/plugin-doc-template.rst
.. include:: /pages/plugin-dev/test-plan-report.rst

.. _how-to-push:

How to upload your plug-in into Mirantis OpenStack Catalog
==========================================================

It is not important where to host the plug-in code.
Nevertheless, to enable CI tests it is recommended to
publish plug-ins into separate repositories of the
`Stackforge <https://github.com/stackforge>`_
project.

Currently, plug-ins created by Mirantis developers are kept
in the following repos:

* `Stackforge plug-ins <https://github.com/stackforge/fuel-plugins>`_ - used for plug-ins developed by Fuel Core team.

* `Mirantis plug-ins <https://github.com/mirantis/fuel-plugins>`_ - used for plug-ins developed by Partner Integrations and MOS teams.

Note that the plug-ins will also be moved to separate repos in Stackforge.

A contributor should only build the plug-in as described in :ref:`instructions on building a plug-in<create-build-plugin>` and
send it to *fuel-plugin@mirantis.com*.

The email should contain the following information:

 * Type of the plug-in

 * Set of required documents, described in
   :ref:`Non-Certified<non-certified>` and :ref:`Certified<certified>` sections.

After receiving the email, Partner Integration team starts
:ref:`Plug-in acceptance workflow<plug-in-accept-workflow>`.

.. _plug-in-accept-workflow:

Plug-in acceptance workflow
---------------------------

.. _non-certified-plug-in-workflow:

Non-Certified plug-in acceptance workflow
+++++++++++++++++++++++++++++++++++++++++

The workflow for Non-Certified plug-ins consists of the following steps:

#. Plug-in that satisfies :ref:`Non-Certified<non-certified>`
   plug-ins certification requirements,
   goes through a set of tests. Fuel QA team confirms it.

#. Fuel Documentation team verifies that all necessary documents are provided
   according to :ref:`Documentation template<plugin-doc-template>`.

#. After Fuel QA and Documentation teams provide their confirmation,
   responsible person from Partner Integration team adds or replaces the plug-in
   with its User Guide into Non-Certified plug-ins directory of the :ref:`Plug-ins storage<plugins-storage>`.

.. _certified-plug-in-workflow:

Certified plug-ins acceptance workflow
++++++++++++++++++++++++++++++++++++++

The workflow for plug-ins certification consists of the following steps:

#. A plug-in should pass :ref:`Non-Certified plug-in acceptance workflow<non-certified-plug-in-workflow>`.

#. Fuel Core, PI and MOS teams developers review the code,
   try to check architecture, security and performance issues of the provided plug-in.

#. Fuel QA team tests plug-in according to the extended test cases.
   Additional test cases should be provided in the contributor's testing
   instruction.

#. After Fuel QA, Core, MOS and Documentation teams confirm that plug-in
   can be moved to Verified, responsible person from Partner Integration team pushes
   the plug-in with its documentation into the Certified directory of the :ref:`Plug-ins storage<plugins-storage>`.

.. include:: /pages/plugin-dev/050-support.rst
