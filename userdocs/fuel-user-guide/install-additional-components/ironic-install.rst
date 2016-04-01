.. _ironic-install:

Install the OpenStack Bare Metal service
----------------------------------------

Before you install the OpenStack Bare Metal service (Ironic) verify that your
environment meets *Prerequisites for physical machines* and *Bare Metal
service limitations* in the
*Fuel Installation Guide*.

You install the OpenStack Bare Metal service when you deploy an OpenStack
environment. Follow the steps described in :ref:`create-env-ug` and
:ref:`configure-env-ug` to configure other components and settings of your
OpenStack environment. Then, follow the steps described in this section to
configure Ironic in the deployment wizard.

**To install the OpenStack Bare Metal service:**

#. Configure the new environment as described in :ref:`create-env-ug`.

   For Ironic you must select:

   * In :guilabel:`Networking Setup` - :guilabel:`Neutron with VLAN
     segmentation`.
   * In :guilabel:`Additional Services` - :guilabel:`Install Ironic`.

#. In the :guilabel:`Dashboard`, click :guilabel:`Add nodes`.
#. In the :guilabel:`Nodes` tab, add nodes with the *Ironic* role.

   We recommend that you assign separate nodes for the Ironic program and do
   not combine the *Ironic* role with any other roles. However, if you do not
   have sufficient hardware, you can combine the *Ironic* and *Controller* roles
   in one node.
#. Add all other nodes required for your environment as described in
   :ref:`configure-env-ug`.
#. Select nodes with the *Ironic* and *Controller* roles.
#. Click :guilabel:`Configure Interfaces`.
#. Assign network interfaces that will be used for *baremetal* network by
   dragging the *baremetal* network to the required NIC.

   **Example:**

   .. image:: /_images/deliverables/scr_ironic_baremetal_nic_example.png
      :width: 100%

#. In the :guilabel:`Network` tab, configure the :guilabel:`Baremetal
   network`.

   * For the OpenStack nodes:

     #. Click :guilabel:`Neutron L2`.
     #. Specify CIDR of the *baremetal* network.
     #. Type the IP range that will be assigned to OpenStack service nodes
        in the *baremetal* network.
     #. Specify whether to use VLAN tagging or not.

   * For the bare-metal nodes:

     #. Click :guilabel:`Neutron L3`.
     #. Specify an IP range for the nodes on which you will deploy physical
        machines.

        Assign the IP range from the CIDR you configured for of the
        *baremetal* network in the previous step.

     #. Assign a gateway IP address.

#. Configure other settings for your OpenStack environment as described in
   :ref:`configure-env-ug`.
#. Proceed to :ref:`Configure the Bare Metal service <ironic-configure>`.
