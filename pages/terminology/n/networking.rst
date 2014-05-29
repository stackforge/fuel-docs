
.. _networking-term:

Networking
----------

The nodes in the OpenStack environment
communicate with each other over using one of the network topologies:

  * With :ref:`neutron-term` networking,
    GRE tunnels or VLANs can be used for network segmentation.

  * With :ref:`nova-network-term`, FlatDHCP and VLAN modes are available.

The following documents provide information:

* For general information to help you select the best network topology
  for your environment, see :ref:`net-topology-plan`.
* For a list of the logical networks used in OpenStack
  (Public, Storage, Administrative, and so forth), see
  :ref:`logical-networks-arch`.

* For diagrams, detailed discussions, and instructions for deploying
  the different networking models, see
  :ref:`neutron-topologies-arch` and :ref:`nova-topologies-arch`.

* For information about calculating
  the hardware required for your deployment,
  see :ref:`network-hardware-sizing`.

* :ref:`configure-env-ug`
  includes instructions for using the Fuel UI
  to change network parameters during and after installation.

* :ref:`nic-bonding-ui` gives instructions for using the Fuel UI
  to set up :ref:`bonding-term`.

* :ref:`ovs-arch` describes :ref:`ovs-term`
  and includes instructions for adjusting the network configuration
  by editing configuration files and using the command-line tools.

