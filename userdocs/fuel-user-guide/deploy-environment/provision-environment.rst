.. _provision-environment:

===================================
Provision the OpenStack environment
===================================

Fuel enables you to provision all your OpenStack environment nodes or
a particular set of nodes before you deploy the OpenStack environment.
You can start a separate provisioning task for on-line discovered (not
provisioned and not deployed) environment nodes.

**To provision OpenStack environment nodes:**

#. In the Fuel web UI, click the :guilabel:`Dashboard` tab.
#. Verify you have added nodes to your OpenStack environment as described
   in :ref:`add-nodes-ug`.
#. Set the :guilabel:`Deployment mode` to :guilabel:`Advanced provisioning`.
#. Proceed with one of the following options to start the provisioning
   depending on which nodes you want to provision:

   * Click the :guilabel:`Provision nodes` button to start the provisioning
     of all nodes.
   * Unfold the :guilabel:`Select nodes for provisioning` area to select
     a particular set of nodes to provision, for example, controller,
     compute, or other nodes. Click :guilabel:`Start provisioning`.