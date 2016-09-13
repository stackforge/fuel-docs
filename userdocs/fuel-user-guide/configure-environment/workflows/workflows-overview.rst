.. _workflow-overview:

Overview of the deployment workflows
------------------------------------

You can modify the following OpenStack environment deployment stages
using custom deployment workflows:

* **Deletion** - if you deploy a brand new environment, Fuel
  skips this step. If you make changes to the existing environment, Fuel
  deletes nodes that were marked for deletion.

* **Network verification** - Fuel verifies network configuration
  of the OpenStack environment.

* **Provisioning** - Fuel provisions the OpenStack nodes.

* **Deployment** - Fuel deploys the OpenStack environment.

An OpenStack environment has the following level of deployment workflows:

* ``release`` - describes the default OpenStack environment workflows.
  We do not recommend to make any changes in the release workflow. Apply
  all changes to the release workflow by creating and modifying the plugin
  and cluster workflows.

* ``plugin`` - describes plugin deployment workflow. During the deployment,
  Fuel merges the configuration described in the plugin workflows with
  the release workflow and applies a unified deployment graph. Typically,
  plugin's source code includes the descriptions of deployment workflow in
  ``deployment_tasks.yaml``. By default, Fuel includes an empty plugin
  workflow. If you want to make changes in an OpenStack environment,
  modifying the plugin workflow is the preferred way.

* ``cluster`` - describes the changes that will be applied to the release
  workflow of this OpenStack environment. If you want to modify a release
  workflow, create a plugin workflow rather than a cluster workflow. 
