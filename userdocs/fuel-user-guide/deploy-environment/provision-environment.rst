.. _provision-environment:

==================================
Provision an OpenStack environment
==================================

Fuel enables you to provision all your OpenStack environment nodes or
a particular set of nodes before you deploy an OpenStack environment.
You can start a separate provisioning task for on-line discovered (not
provisioned and not deployed) environment nodes.

After you successfully provision the environment nodes, run a separate
deployment as described in :ref:`deploy-changes`. Such deployment
affects all on-line provisioned and not yet deployed OpenStack environment
nodes. Nodes with the ``error`` status are also considered as not deployed.

**To provision an OpenStack environment:**

#. In the Fuel web UI, click the :guilabel:`Dashboard` tab.
#. Verify you have added nodes to your OpenStack environment as described
   in :ref:`add-nodes-ug`.
#. Set the :guilabel:`Deployment mode` to :guilabel:`Provisioning Only`.
#. Proceed with one of the following options to start the provisioning:

   * If you want to provision all nodes, click :guilabel:`Provision Nodes`.
   * If you want to provision specific nodes:

     #. Unfold :guilabel:`Choose nodes for provisioning` and
        select nodes.
        For example, controller, compute, or other nodes.
     #. Click :guilabel:`Provision Nodes`.