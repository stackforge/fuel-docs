
.. _add-compute-storage-ops:

Add a Compute, Storage, MongoDB, or Operating System node
---------------------------------------------------------

Compute, Storage, MongoDB, and Operating System nodes can be added
to your OpenStack environment.

To add a Compute, Storage, MongoDB, or Operating System node to your environment,
follow these steps:

#. Physically configure the node into your hardware environment.

#. Wait for the new node to show up as an "Unallocated Node"
   on your Fuel dashboard.

#. Click the "Add Node" button;
   on the screen described in :ref:`assign-roles-ug`;
   the unallocated node will be displayed.
   Assign the role or roles to the node that you want.

#. Click the "Deploy Changes" button
   and wait for the node to be deployed.

   The cluster must be redeployed to update the configuration files.
   Most of the services that are running are not affected
   but the redeployment process restarts HAProxy and a few other services.


