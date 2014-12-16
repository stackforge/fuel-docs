
.. _l2-multiple-ops:

Configuring multiple L2 networks
================================

Multiple L2 networks are configured
using shell commands issued on the
Compute nodes where VMs run and the Fuel Master node.
[at what stage?]
For background information about how the multiple L2 networks feature is implemented,
see :ref:`l2-multiple-arch`.

Requirements for an environment that runs multiple L2 networks are:

- Must use the :ref:`Neutron GRE<neutron-gre-ovs-arch>` topology.

- Each deployed node must have an IP address
  set on a :ref:`router<router-plan>` to all other nodes and their networks.
  Isolated networks (which are the default for the Management and Storage networks)
  do not work.

- A gateway must be defined for each :ref:`logical networks<logical-networks-arch>`
  when the cluster has multiple Node Groups.

- All controllers must be members of the same Node Group;
  if they are not, the :ref:`HAProxy<haproxy-term>` VIP does not work.


To configure multiple L2 networks,
do the following.
These instructions set up two environments
named `alpha` and `beta`:

#. Configure routing on each Compute node that runs VMs:

   .. code-block:: sh

      export FORWARD_DEFAULT=route
      export ADMIN_FORWARD=nat
      export PUBLIC_FORWARD=nat  # Provides Internet connection to target nodes
      export ENV_NAME=alpha
      nosetests fuelweb_test.tests.base_test_case:SetupEnvironment.setup_master
      export ENV_NAME=beta
      nosetests fuelweb_test.tests.base_test_case:SetupEnvironment.setup_master

#. If the Admin logical network is under "nat',
   load the following kernel modules on each target node
   to enable TFTP:

   .. code-block:: sh

      sudo modprobe ip_nat_tftp
      sudo modprobe ip_conntrack_tftp

   .. note:: If you export `FORWARD_DEFAULT=<route>`
             without defining the `ADMIN_FORWARD` environment variable,
             TFTP traffic is not masqueraded
             so you can boot over the PXE network
             without these modules.

#. Kill the default **dnsmasq(8)** process on the Fuel Master node:

   .. code-block:: sh

      ps axu | sudo awk '/dnsmasq\/beta_admin.conf/{system("kill "$2)} \
	/dnsmasq\/default.conf/{system("kill "$2)}'

#. Start a **dhcp-helper** or **dhcprelay(8)** process:

   .. code-block:: sh

      dhcp-helper -s <IP-addr-of-alpha_admin network> -i <virtual-IP-of-beta_admin-network>

#.  Add each DHCP network into the
    :ref:`dnsmasq.template<dnsmasq-template-ref>` file.

#. Bootstrap the nodes for all environments.

#. Add a second NetworkNodeGroup to the Fuel Master node.
   [needs clarification]
