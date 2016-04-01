
.. raw:: pdf

  PageBreak

.. _selectable-offload:

Edit the offloading mode
------------------------

Fuel assigns the default offloading mode to all network interfaces
automatically. You may want to modify this setting to meet your
network requirements. The number of available offloading types
depends on network hardware and the kernel version that you use.

Fuel automatically detects offloading modes for any physical network
interface.

**To edit the offloading mode using Fuel web UI:**

#. Log in to the Fuel web UI.
#. Click :guilabel:`Nodes`.
#. Select a node.
#. Click :guilabel:`Interface configuration`.
#. Click :guilabel:`Offloading Modes: Default` to disable offloading.

**To edit the offloading mode using CLI:**

#. Log in to the Fuel Master node CLI.
#. Verify the node ID:

   .. code-block:: console

      fuel nodes

#. Download the information about network interfaces:

   .. code-block:: console

      fuel node --node <NODE_ID> --network --download

#. Open the ``/root/node_<NODE_ID>/interfaces.yaml`` file for editing.
#. Disable or leave the default value next to the ``state`` field:

   * true - enable offloading modes
   * false - disable offloading modes
   * null - default offloading modes

#. Upload the modified file:

   .. code-block:: console

      fuel node --node <NODE_ID> --network --upload
