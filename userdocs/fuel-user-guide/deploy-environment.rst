.. _deploy-env:

===============================
Deploy an OpenStack environment
===============================

After finishing configuration, you can deploy your OpenStack environment.

In OpenStack deployments that include 100 compute nodes and more,
we recommend that you provision the OpenStack nodes before you
deploy an OpenStack environment. Node provisioning provides you
with the full control over the scope of the applied configuration
changes and reduces the time of the OpenStack environment verification.

Fuel provides the following options to deploy an OpenStack environment:

* Standard deployment
  Provision all OpenStack nodes during the deployment. This is a deployed
  and preferred option for most deployments.

* Advanced deployment
  Pre-provision specific OpenStack nodes and then deploy the OpenStack
  environment. Typically, you may want to run an advanced deployment for
  large deployments that include 100 compute nodes or more.

This section includes the following topics:

.. toctree::
   :maxdepth: 3

   deploy-environment/provision-environment.rst
   deploy-environment/deploy-changes.rst
   deploy-environment/stop-deploy-ui.rst
   deploy-environment/reset-environment.rst