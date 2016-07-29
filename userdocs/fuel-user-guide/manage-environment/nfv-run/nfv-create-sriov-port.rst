.. _nfv-create-sriov-port:

Create a network port for SR-IOV
--------------------------------

To use SR-IOV, create a network port in the ``admin_internal_net``.

**To creat a network port for SR-IOV:**

#. Log in to Horizon.
#. Click :guilabel:`Networks`.
#. Select the ``admin_internal_net`` network.
#. Click :guilabel:`Create Port`.
#. In the Create Port wizard, fill the following fields:

   * :guilabel:`Name` - for example: ``sriov-port``
   * :guilabel:`Admin State` - UP
   * :guilabel:`Binding: VNIC Type` - Direct

#. Click :guilabel:`Create Port`.
#. Proceed to :ref:`nfv-launch-vm`.
