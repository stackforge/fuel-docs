.. _deploy-changes:

==============
Deploy changes
==============

When you have completed configuration as described in :ref:`create-env-ug`,
and :ref:`configure-env-ug`, you can deploy your OpenStack environment.

Depending on the environment configuration, deployment may take from fifteen
minutes to an hour.

.. warning::
   After you deploy an OpenStack environment, you will not be able to
   modify many of the OpenStack parameters, such as network topology,
   disk partitioning, and so on. Verify that you have applied correct
   settings.

**To run a regular deployment of the entire OpenStack environment:**

#. In the Fuel web UI, select the :guilabel:`Dashboard` tab.
#. Set the :guilabel:`Deployment mode` to :guilabel:`Regular deployment`.
#. Click :guilabel:`Deploy Changes` to run both provisioning
   and deployment for the entire environment. Such deployment affects
   the OpenStack environment nodes as follows:

   * Not provisioned discovered nodes are provisioned and deployed.
   * Provisioned and not deployed nodes are deployed.
   * Already deployed nodes are re-deployed.

**To run a separate deployment for the OpenStack environment nodes:**

#. In the Fuel web UI, select the :guilabel:`Dashboard` tab.
#. Set the :guilabel:`Deployment mode` to :guilabel:`Advanced deployment`.
#. Click :guilabel:`Deploy changes`.