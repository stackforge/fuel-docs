.. _deploy-changes:

==============
Deploy changes
==============

When you have completed configuration as described in :ref:`create-env-ug`,
and :ref:`configure-env-ug`, you can deploy your OpenStack environment.

Depending on the environment configuration, deployment may take from thirty
minutes to an hour.

**To run a standard deployment of the entire OpenStack environment:**

#. In the Fuel web UI, select the :guilabel:`Dashboard` tab.
#. Set the :guilabel:`Deployment mode` to :guilabel:`Provisioning + Deployment`.
#. Click :guilabel:`Deploy Changes` to run both provisioning
   and deployment for the entire environment. Such deployment affects
   the OpenStack environment nodes as follows:

   * Not provisioned discovered nodes are provisioned and deployed.
   * Provisioned and not deployed nodes are deployed.
   * Already deployed nodes are re-deployed.

**To run a separate deployment for the OpenStack environment nodes:**

#. In the Fuel web UI, select the :guilabel:`Dashboard` tab.
#. Set the :guilabel:`Deployment mode` to :guilabel:`Deployment Only`.

   * If you want to deploy all nodes, click :guilabel:`Deploy Nodes`.
   * If you want to deploy specific nodes:

     #. Unfold :guilabel:`Choose nodes for deployment` and
        select nodes.
     #. Click :guilabel:`Deploy Nodes`.

**To view the deployment details in the Fuel web UI:**

* To view a deployment task in progress:

  #. Select the :guilabel:`Dashboard` tab.
  #. Click :guilabel:`Show Details` under the deployment progress bar.

* To view information about a deployed OpenStack environment:

  #. Select the :guilabel:`History` tab.
  #. Select the required deployment.