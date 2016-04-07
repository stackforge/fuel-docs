.. _deploy-env:

===============================
Deploy an OpenStack environment
===============================

After finishing configuration, you can provision and deploy your
OpenStack environment.

In large OpenStack environments, we recommend that you run a separate nodes
provisioning task as described in :ref:`provision-environment` before you
deploy the OpenStack environment. The performance of separate provisioning
tasks provides you with the full control over the scope of the configuration
changes being made and reduces the time for the OpenStack environment
verification.

After you successfully provision the environment nodes, run a separate
deployment as described in :ref:`deploy-changes`. Such deployment
affects all on-line provisioned and not yet deployed OpenStack environment
nodes. Nodes with the ``error`` status and ``deploy`` error type are also
considered as not deployed.

.. toctree::
   :maxdepth: 3

   deploy-environment/provision-environment.rst
   deploy-environment/deploy-changes.rst
   deploy-environment/stop-deploy-ui.rst
   deploy-environment/reset-environment.rst