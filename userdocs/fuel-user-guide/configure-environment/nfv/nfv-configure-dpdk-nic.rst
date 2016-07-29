.. _nfv-configure-dpdk-nic:

Configure DPDK network interface
--------------------------------

When configuring network for DPDK, you must place private network
on the same interface on which you enable DPDK. For better network
performance and redundancy, you can bind two network interfaces in one.

**To configure DPDK network interface:**

#. Log in to the Fuel web UI.
#. Click :guilabel:`Nodes`.
#. Select the node on which you enabled DPDK.
#. Click :guilabel:`Configure Interfaces`.
#. Optionally, bond network interfaces.
#. On the required network interface, enable DPDK by clicking
   :guilabel:`Disabled` next to :guilabel:`DPDK`.
#. Drag and drop the **Private** network to the DPDK-enabled network
   interface.
#. Optionally, adjust the name of the physical network.
#. Click :guilabel:`Apply`.
#. Configure the rest of the environment settings as required and deploy
   the environment as described in :ref:`deploy-env`.

.. seealso::

   - :ref:`nfv-run-vm`
