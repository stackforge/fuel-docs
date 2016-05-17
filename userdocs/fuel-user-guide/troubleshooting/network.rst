.. _ug-network:

Troubleshoot network
~~~~~~~~~~~~~~~~~~~~

This section describes network errors that Fuel displays in the Fuel web UI
or CLI.

-----

**New IP ranges for network 'public'(2) do not cover already allocated IPs**

.. list-table::
   :widths: 3 15

   * - **Description**
     - The error appears when you modify the **network IP ranges** of
       the deployed OpenStack environment and the new ranges do not cover
       the already allocated (during the previous deployment) virtual
       IP addresses or nodes' IP addresses.

   * - **Steps to resolve**

       #. Log in to the Fuel CLI.

       #. Obtain the allocated IP address:

          #. View the ``/etc/astute.yaml`` file.
          #. Get the IP address from the ``network_metadata[nodes]`` list.

       #. Alternatively, download the interfaces information:

          .. code-block:: console

             fuel --env <ENV_ID> network --download --dir <PATH>

       #. Proceed with one of the following:

          * Adjust the new network IP ranges to cover all allocated IP addresses.
          * Reset the OpenStack environment and update the network ranges.
          * If only a few nodes do not fit into the new network IP ranges:

            #. Delete the affected nodes from the environment.
            #. Update the network ranges.
            #. Re-add the deleted nodes.