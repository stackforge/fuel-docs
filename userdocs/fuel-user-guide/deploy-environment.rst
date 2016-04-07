.. _deploy-env:

===============================
Deploy an OpenStack environment
===============================

After you finish configuring, you can deploy your OpenStack environment.

In large OpenStack deployments (e.g. 50 compute nodes or more),
we recommend that you provision the OpenStack nodes before you
deploy an OpenStack environment.

Fuel provides the following options to deploy an OpenStack environment:

* Standard deployment
  Provision all OpenStack nodes during the deployment.

* Advanced deployment
  Pre-provision specific OpenStack nodes and then deploy the OpenStack
  environment.

This section includes the following topics:

.. toctree::
   :maxdepth: 3

   deploy-environment/provision-environment.rst
   deploy-environment/deploy-changes.rst
   deploy-environment/stop-deploy-ui.rst
   deploy-environment/reset-environment.rst