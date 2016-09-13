.. _workflow-intro:

Modify the deployment workflow
==============================

A deployment workflow, or deployment graph, is an hierarchy of
deployment tasks with dependencies that Fuel executes to deploy
an OpenStack environment.
A deployment graph enables you to execute complex orchestrated workflows,
such as bugfixes application, reference architecture altering, or upgrades
in a particular order. For example, you can enable specific
network verification tasks for a Fuel plugin or change the default image
delivering protocol (HTTP), and so on.

.. warning::
   This section describes advanced usage and requires the user to deeply
   understand Fuel internals. Do not modify deployment workflows if you are
   deploying an OpenStack environment for the first time.

This section includes the following topics:

.. toctree::
   :maxdepth: 1

   workflows/workflows-overview.rst
   workflows/workflows-create.rst
   workflows/workflows-run.rst
   workflows/workflows-data-driven.rst
.. seealso::

   - :ref:`cli-graphs`
