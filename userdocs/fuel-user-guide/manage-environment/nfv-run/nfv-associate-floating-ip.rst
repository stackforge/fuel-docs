.. _nfv-associate-floating-ip:

Allocate a floating IP address to a virtual machine
------------------------------------------------------

You can associate or change a floating IP address of a virtual machine
any time after virtual machine creation. Although, Mirantis OpenStack
automatically assigns a private IP address to a VM at the moment of creation,
you may want to assign a floating IP address, so that the VM can communicate
with external networks.

**To allocate a floating IP address with a virtual machine:**

#. Log in to Horizon.
#. Click :menuselection:`Project --> Compute --> Instances`.
#. Click the arrow in the :guilabel:`Actions` column.
#. Select :guilabel:`Associate Floating IP`.

   The Manage Floating IP Associations wizard starts.

#. In the IP Address field, click :guilabel:`+`.
#. Click :guilabel:`Allocate IP`.
#. Click :guilabel:`Associate`.
