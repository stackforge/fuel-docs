.. _nfv-configure-sriov-nic:

Configure SR-IOV network interface
----------------------------------

When configuring network for SR-IOV, you must place private network
on a separate interface from the interface on which you enable SR-IOV.
This enables VLAN network traffic to flow to Open vSwitch while having
SR-IOV enabled.

**To configure SR-IOV network interface:**

#. Log in to the Fuel web UI.
#. Click :guilabel:`Nodes`.
#. Select the node on which you enable SR-IOV.
#. Click :guilabel:`Configure Interfaces`.
#. Drag and drop the Private network to a network interface.
#. On a separate network interface, enable SR-IOV by clicking
   :guilabel:`Disabled` next to :guilabel:`SR-IOV`.
#. Select the :guilabel:`Enabled` checkbox.
#. Type the number of virtual functions that do not exceed the number
   provided by Fuel.
#. Optionally, adjust the name of the physical network.
#. Click :guilabel:`Apply`.
#. Configure the rest of the environment settings as required and deploy
   the environment as described in :ref:`deploy-env`.

.. seealso::

   - :ref:`nfv-run-vm`
