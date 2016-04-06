
.. raw:: pdf

  PageBreak

.. _network-settings-ug:

Configure network settings
--------------------------

After you select a network topology in the deployment
wizard, you can further configure Neutron L2 and L3 settings,
as well as modify the node network group configuration.

Fuel creates the *default* node network group that includes the Public,
Storage, Management, Private, and Baremetal networks if you installed
the OpenStack Bare Metal service. The ``default`` node group also uses
the shared Admin network. You can modify parameters of the
Admin network for all other node network groups, if any, except the ``default``
node network group.

.. note::

   When you deploy an environment using Fuel, you can exclude
   specific IP addresses so that Fuel does not assign them.
   This helps to avoid network conflicts in
   case these IP addresses were previously reserved by other
   network entities.

   To prevent IP address collisions, set the IP address
   range to be used by Fuel. For example,
   for nodes and VIPs, excluding the reserved IPs.
   In addition, you can specify multiple
   IP address ranges. If you have an IP address in use in the middle
   of the network IP address range, you can split the range to exclude
   the IP addresses in use.

Gateway will be set for all the networks when using multiple
node network groups.

Additionally, Fuel provides a capability to configure networks using network templates.
You can add or remove a network from a node network group
through API when using network templates. A set of networks
for a particular node network group on the Fuel web UI will be
changed accordingly.

The :menuselection:`Networks` tab also contains the network verification section
to perform the following checks:

* L2 connectivity checks between every node in the environment.
* DHCP discovery check on all nodes.
* Packages repository connectivity check from the Fuel Master node.
* Packages repository connectivity check from Fuel Slave nodes
  through Public and Admin (PXE) networks.

**To configure network settings:**

#. In the Fuel web UI, click the :guilabel:`Network` tab.
#. Select a setting and modify as needed.

.. note::

   You can find IP addresses assigned to nodes in the Public and Management networks
   in the :guilabel:`Management IP` and :guilabel:`Public IP` fields in the summary
   section of a node details pop-up.

.. seealso::

   - :ref:`nic-bonding-ui`
   - :ref:`selectable-offload`
   - :ref:`map-logical-to-physical`
