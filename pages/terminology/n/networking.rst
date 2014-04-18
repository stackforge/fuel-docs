
.. _networking-term:

Networking
----------

The nodes in the OpenStack environment
communicate with each other over using one of the network topologies:

  * With `neutron` networking, GRE tunnels or VLANs can be used for network
    segmentation.

  * With `nova-network`, FlatDHCP and VLAN modes are available.

The following documents provide information:

* For a list of the types of networks used in OpenStack
  (Public, Storage, Administrative, and so forth), see
  `Network Configuration Options <http://docs.mirantis.com/fuel/fuel-4.1/pre-install-guide.html#network-configuration-options>`_

* For diagrams, detailed discussions, and instructions for deploying
  the different networking models, see
  `Network Deployment Models <http://docs.mirantis.com/fuel/fuel-4.1/pre-install-guide.html#network-deployment-models>`_,
  `Understanding and Configuring the Network <http://docs.mirantis.com/fuel/fuel-4.1/install-guide.html#understanding-and-configuring-the-network>`_, and
  `Fuel Deployment Schema <http://docs.mirantis.com/fuel/fuel-4.1/install-guide.html#fuel-deployment-schema>`_

* For information about calculating the hardware required for your deployment, see
  `Calculating Network <http://docs.mirantis.com/fuel/fuel-4.1/install-guide.html#calculating-network>`_.

* `Installing Fuel Master Node <http://docs.mirantis.com/fuel/fuel-4.1/install-guide.html#installing-fuel-master-node>`_
  includes instructions for changing network parameters
  during and after installation.

* `Advanced Network Configuration Using VSwitch <http://docs.mirantis.com/fuel/fuel-4.1/reference-architecture.html#advanced-network-configuration-using-open-vswitch>`_
  describes Open VSwitch and includes instructions for adjusting the network configuration
  by editing configuration files and using the command-line tools.

* `Network Architecture <http://docs.mirantis.com/fuel/fuel-4.1/reference-architecture.html#network-architecture>`_
