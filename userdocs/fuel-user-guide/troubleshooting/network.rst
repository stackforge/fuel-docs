.. _ug-network:

====================
Troubleshoot network
====================

This section describes network errors that Fuel displays in the Fuel web UI
or CLI.

-----

**New IP ranges for network 'public'(2) do not cover already allocated IPs**

.. list-table::
   :widths: 3 15

   * - **Description**
     - Appears when you modify the **network IP ranges** of the deployed
       OpenStack environment and the new ranges do not cover the already
       allocated (during the previous deployment) virtual IP addresses or
       nodes' IP addresses.

   * - **Steps to resolve**

     - #. Check the allocated IP addresses using one of the following options:

          * View ``/etc/astute.yaml``:

            #. SSH to a Fuel Slave node.
            #. View the ``/etc/astute.yaml`` file.
            #. Get the node's IP address from the ``network_metadata[nodes]``
               list.
            #. Repeat this sequence of steps for every node in the environment.

          * Download the interfaces information using the Fuel CLI:

            .. code-block:: console

               fuel node --node-id 1,2 --network --download --dir <PATH>

       #. Resolve the issue proceeding with one of the following options:

          * Adjust the new network IP ranges to cover all allocated IP addresses.
          * Reset the OpenStack environment and update the network ranges.
          * If only a few nodes do not fit into the new network IP ranges:

            #. Delete the affected nodes from the environment.
            #. Update the network ranges.
            #. Re-add the deleted nodes.