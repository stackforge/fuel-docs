.. _plugin-cert:


Fuel plug-ins certification
===========================

Certified and Non-Certified plug-ins
------------------------------------

Plug-ins fall into two categories: Certified and Non-Certified.

For information on Certified and Non-Certified plug-ins certification requirements,
see :ref:`Plug-in certification requirements<plug-in-cert>`.

For instructions on creating your own plug-in, see :ref:`020-fuel-plugin-dev`.
For instructions on installing a plug-in, see :ref:`040-install-plugin`.

TODO:TUTORIAL
(irina): let's move NFS plug-in tutorial to plug-in examples (in the guide).
I only need a link to this tutorial.
.. _nfs plugin tutorial: TODO(akislitsky)_add_link_to_doc

Plugin building instruction can be found at build plugins instruction.
As tutorial you can use: nfs plugin tutorial

.. _plugins-storage:

Plug-ins storage
----------------

TODO(akislitsky)_add_link_to_plugins_storage_ui
Plug-ins are stored in a special file storage <link>.
You can download plug-ins from this storage and install them.

Every plug-in should have installation instructions, available in the plug-ins storage.

Since plug-ins fall into two categories, they are kept in different directories of the storage.

Plug-in storage should have web UI.
For the first version, it will look like an index of the storage directories.

.. _plug-in-cert:

Plug-in certification requirements
----------------------------------

Since two plug-ins types are enabled, they should meet different certification requirements.

.. _non-certified:

Non-Certified
+++++++++++++

Non-Certified plug-in should satisfy the following requirements:

* Built plug-in or download link is provided

* Defined plug-in purpose: compute, storage, network, operations, etc.

* Provided basic description of plug-in functionality

* Plug-in developer information is provided (company, person, e.t.c.)

* Installation instruction

* Plug-in User Guide in .pdf format with the following information:

  - Plug-in description and functions

  - API usage examples (if required)

  - UI configuration (if required)

* Plug-in should pass a set of :ref:`Automated tests<automated-tests>`.


.. _certified:

Certified
+++++++++

Certified plug-ins are those that passed :ref:`Non-Certified<non-certified>` phase.

These plug-ins should meet not only :ref:`Non-Certified<non-certified>` plug-ins requirements,
but also the following:

* Developer Guide in .pdf format should be provided. It must
  contain:

  - Instructions for testing the plug-in.
    Fuel QA team must be able to reproduce these test conditions in their test lab.

  - Hardware requirements (if necessary).

  - Access to the contributor test lab (if it impossible
     to test plug-in in Fuel QA team test environment).

* Individual automated tests should be created (if required).

* Manual tests should be added into the test plan (if required).

As the result, if a Non-Certified plug-in satisfies all conditions
described above, it is moved to the appropriate directory
of the :ref:`Plug-ins storage<plugins-storage>` and signed by
Mirantis `GPG <https://www.gnupg.org/index.html>`_ key.

.. _automated-tests:

Automated tests
---------------

TODO(aurlapova + akislitsky). We should define minimal automated test sets
for plugins. For example we install plugin, enable it and run system tests
to make sure plugin is not crush basic functions.

.. _how-to-push:

How to upload your plug-in into Mirantis OpenStack catalog
==========================================================

It is not important where to host the plug-in code.
A contributor should only build the plug-in as described in build plugins instruction and
send it to the special email address, for example, to plugins@mirantis.com.

The email should contain the following information:

 * Type of the plugin.

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
   plug-ins certification requirements and
   goes through a set of :ref:`Automated tests<automated-tests>` and Fuel QA team confirms it.

#. Fuel Documentation team verifies that all necessary documents are provided.

#. After Fuel QA and Documentation teams provide their confirmation,
   responsible person from Partner Integration team adds or replaces the plug-in
   with its User Guide into Non-Certified plug-ins directory of the :ref:`Plug-ins storage<plugins-storage>`.

.. _certified-plug-in-workflow:

Certified plug-ins acceptance workflow
++++++++++++++++++++++++++++++++++++++

The workflow for plug-ins certification consists of the following steps:

#. A plug-in should pass :ref:`Non-Certified plug-in acceptance workflow<non-certified-plug-in-workflow>`.

#. Fuel Core and MOS teams developers verify security
   issues of the provided plugin.

#. Fuel QA team tests plug-in according to the extended test cases.
   Additional test cases should be provided in the contributor's testing
   instruction.

#. After Fuel QA, Core, MOS and Documentation teams confirm that plug-in
   can be moved to Verified, responsible person from Partner Integration team pushes
   the plug-in with its documentation into the Certified directory of the :ref:`Plug-ins storage<plugins-storage>`.

Internal Mirantis plug-ins repositories
---------------------------------------

Currently, two plug-ins repos are used by Mirantis:

* `Stackforge plug-ins <https://github.com/stackforge/fuel-plugins>`_ - used for plug-ins developed by Fuel Core team.

* `Mirantis plug-ins <https://github.com/mirantis/fuel-plugins>`_ - used for plug-ins developed by Partner Integrations and MOS teams.