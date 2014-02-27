.. raw:: pdf

   PageBreak

.. index:: Advanced Network Configuration using OVS

Advanced Network Configuration using Open VSwitch
=================================================

The Neutron networking model uses Open VSwitch (OVS) bridges and the Linux
namespaces to create a flexible network setup and to isolate
tenants from each other on L2 and L3 layers. Mirantis OpenStack also
provides a flexible network setup model based on Open VSwitch primitives,
which you can use to customize your nodes. Its most popular feature is
link aggregation. While the FuelWeb UI uses a hardcoded
per-node network model, the Fuel CLI tool allows you to modify it in your own way.


Reference Network Model in Neutron
----------------------------------

The FuelWeb UI uses the following per-node network model:

* Create an OVS bridge for each NIC except for the NIC with Admin network
  (for example, **br-eth0** bridge for **eth0** NIC) and put NICs into their bridges
* Create a separate bridge for each OpenStack network:

  * **br-ex** for the Public network
  * **br-prv** for the Private network
  * **br-mgmt** for the Management network
  * **br-storage** for the Storage network

* Connect each network's bridge with an apropriate NIC bridge using an OVS patch with
  an apropriate VLAN tag.
* Assign network IP addresses to the corresponding bridges.

Note that the Admin network IP address is assigned to its NIC directly.

This network model allows the cluster administrator to manipulate cluster
network entities and NICs separately, easily, and on the fly during the cluster
life-cycle.


Adjust the Network Configuration via CLI
----------------------------------------

On a basic level, this network configuration is part of a data structure that provides
instructions to the Puppet modules to set up a network on the current node.
You can examine and modify this data using the Fuel CLI tool. Just download (then
modify and upload if needed) the environment's 'deployment default' configuration:

::

  [root@fuel ~]# fuel --env 1 deployment default
  directory /root/deployment_1 was created
  Created /root/deployment_1/compute_1.yaml
  Created /root/deployment_1/controller_2.yaml
  [root@fuel ~]# vi ./deployment_1/compute_1.yaml
  [root@fuel ~]# fuel --env 1 deployment --upload

.. note::

   Please, make sure you read :ref:`the Fuel CLI documentation <cli_usage>` carefully.

The part of this data structure that describes how to apply the network configuration
is the 'network_scheme' key in the top-level hash of the YAML file. Let's take a
closer look at this substructure. The value of the 'network_scheme' key is a hash with
the following keys:

* **interfaces** - A hash of NICs and their low-level/physical parameters.
  You can set an MTU and the 'VLAN splinters' feature here.
* **provider** - Set to 'ovs' for Neutron.
* **endpoints** - A hash of network ports (OVS ports or NICs) and their IP
  settings.
* **roles** - A hash that specifies the mappings between the endpoints and
  internally-used roles in Puppet manifests ('management', 'storage', and so on).
* **transformations** - An ordered list of OVS network primitives.


The "Transformations" Section
-----------------------------

You can use four OVS primitives:

* **add-br** - To add an OVS bridge to the system
* **add-port** - To add a port to an existent OVS bridge
* **add-bond** - To create a port in OVS bridge and add aggregated NICs to it
* **add-patch** - To create an OVS patch between two existing OVS bridges

The primitives will be applied in the order they are listed.

Here are the the available options:

::

  {
    "action": "add-br",         # type of primitive
    "name": "xxx"               # unique name of the new bridge
  },
  {
    "action": "add-port",       # type of primitive
    "name": "xxx-port",         # unique name of the new port
    "bridge": "xxx",            # name of the bridge where the port should be created
    "type": "internal",         # [optional; default: "internal"] a type of OVS interface
                                # for the port (see OVS documentation);
                                # possible values: "system", "internal", "tap", "gre", "null"
    "tag": 0,                   # [optional; default: 0] a 802.1q tag of traffic that
                                # should be captured from an OVS bridge;
                                # possible values: 0 (means port is a trunk),
                                # 1-4094 (means port is an access)
    "trunks": [],               # [optional; default: []] a set of 802.1q tags
                                # (integers from 0 to 4095) that are allowed to
                                # pass through if "tag" option equals 0;
                                # possible values: an empty list (all traffic passes),
                                # 0 (untagged traffic only), 1 (strange behaviour;
                                # shouldn't be used), 2-4095 (traffic with this
                                # tag passes); e.g. [0,10,20]
    "port_properties": [],      # [optional; default: []] a list of additional
                                # OVS port properties to modify them in OVS DB
    "interface_properties": [], # [optional; default: []] a list of additional
                                # OVS interface properties to modify them in OVS DB
    "vlan_splinters": false,    # [optional; default: false] enable 'vlan splinters'
                                # feature for this interface
  },
  {
    "action": "add-bond",       # type of primitive
    "name": "xxx-port",         # unique name of the new bond
    "interfaces": [],           # a set of two or more bonded interfaces' names;
                                # e.g. ['eth1','eth2']
    "bridge": "xxx",            # name of the bridge where the bond should be created
    "tag": 0,                   # [optional; default: 0] a 802.1q tag of traffic which
                                # should be catched from an OVS bridge;
                                # possible values: 0 (means port is a trunk),
                                # 1-4094 (means port is an access)
    "trunks": [],               # [optional; default: []] a set of 802.1q tags
                                # (integers from 0 to 4095) which are allowed to
                                # pass through if "tag" option equals 0;
                                # possible values: an empty list (all traffic passes),
                                # 0 (untagged traffic only), 1 (strange behaviour;
                                # shouldn't be used), 2-4095 (traffic with this
                                # tag passes); e.g. [0,10,20]
    "properties": [],           # [optional; default: []] a list of additional
                                # OVS bonded port properties to modify them in OVS DB;
                                # you can use it to set the aggregation mode and balancing
                                # strategy, to configure LACP, and so on (see the OVS documentation)
  },
  {
    "action": "add-patch",      # type of primitive
    "bridges": ["br0", "br1"],  # a pair of different bridges that will be connected
    "peers": ["p1", "p2"],      # [optional] abstract names for each end of the patch
    "tags": [0, 0] ,            # [optional; default: [0,0]] a pair of integers that
                                # represent an 802.1q tag of traffic that is
                                # captured from an appropriate OVS bridge; possible
                                # values: 0 (means port is a trunk), 1-4094 (means
                                # port is an access)
    "trunks": [],               # [optional; default: []] a set of 802.1q tags
                                # (integers from 0 to 4095) which are allowed to
                                # pass through each bridge if "tag" option equals 0;
                                # possible values: an empty list (all traffic passes),
                                # 0 (untagged traffic only), 1 (strange behavior;
                                # shouldn't be used), 2-4095 (traffic with this
                                # tag passes); e.g., [0,10,20]
  }

A combination of these primitives allows you to make custom and complex
network configurations.

NICs Aggregation
----------------

The NIC bonding allows you to aggregate multiple physical links to one link
to increase speed and provide fault tolerance.

**Types of Bonding**

The Linux kernel documentation about bonding can be found in [1].
Open VSwitch does support same bonding features as the Linux kernel.
Linux supports two types of bonding:
* IEEE 802.1AX (formerly known as 802.3ad) Link Aggregation Control Protocol (LACP) - it's an industry standart. Devices on both sides of links must communicate using LACP to set up an aggregated link. So both devices must support LACP, enable and configure it on these links.
* One side bonding does not require any special features support from the switch side. Linux handles it using a set of traffic balansing algorithms.

**One Side Bonding Policies**

* Balance-rr - Round-robin policy. This mode provides load balancing and fault tolerance.
* Active-backup - Active-backup policy: Only one slave in the bond is active.This mode provides fault tolerance.
* Balance-xor - XOR policy: Transmit based on the selected transmit hash policy. This mode provides load balancing and fault tolerance.
* Broadcast - Broadcast policy: transmits everything on all slave interfaces. This mode provides fault tolerance.
* balance-tlb - Adaptive transmit load balancing based on a current links' utilisation. This mode provides load balancing and fault tolerance.
* balance-alb - Adaptive transmit and receive load balancing based on a current links' utilisation. This mode provides load balancing and fault tolerance.
* balance-slb - It is a modification of balance-alb mode. SLB bonding allows a limited form of load balancing without the
  remote switch's knowledge or cooperation. SLB assigns each source MAC+VLAN pair to a link and transmits all packets from
  that MAC+VLAN through that link. Learning in the remote switch causes it to send packets to that MAC+VLAN through the same link.
* balance-tcp - Adaptive transmit load balancing among interfaces.

**LACP Policies**

* Layer2 - Uses XOR of hardware MAC addresses to generate the hash.
* Layer2+3 - This policy uses a combination of layer2 and layer3 protocol information to generate the hash.
* Layer3+4 - This policy uses upper layer protocol information, when available, to generate the hash.
* Encap2+3 - This policy uses the same formula as layer2+3 but it relies on skb_flow_dissect to obtain the header fields which might result in the use of inner headers if an encapsulation protocol is used. For example this will improve the performance for tunnel users because the packets will be distributed according to the encapsulated flows.
* Encap3+4 - Same as Encap2+3 but uses layer3+4.

**Policies supported by Fuel**

Now Fuel supports only following policies: Active-backup, balance-slb, LACP balance-tcp.


An Example of NIC Aggregation
-----------------------------

Suppose you have a node with 4 NICs and you want to bond two of them with LACP
enabled ("eth2" and "eth3" here) and then assign Private and Storage networks
to them. The Admin network uses a dedicated NIC ("eth0"). The Management and
Public networks use the last NIC ("eth1"). To achieve this goal, do the following:

* Create a separate OVS bridge "br-bond0" instead of "br-eth2" and "br-eth3".
* Connect "eth2" and "eth3" to "br-bond0" as a bonded port with property
  "lacp=active".
* Connect "br-prv" and "br-storage" bridges to "br-bond0" by OVS patches.
* Leave all of the other things unchanged.

Here is an example of "network_scheme" section in the node configuration:

::

  'network_scheme':
    'provider': 'ovs'
    'version': '1.0'
    'interfaces':
      'eth0': {}
      'eth1': {}
      'eth2': {}
      'eth3': {}
    'endpoints':
      'br-ex':
        'IP': ['172.16.0.2/24']
        'gateway': '172.16.0.1'
      'br-mgmt':
        'IP': ['192.168.0.2/24']
      'br-prv': {'IP': 'none'}
      'br-storage':
        'IP': ['192.168.1.2/24']
      'eth0':
        'IP': ['10.20.0.4/24']
    'roles':
      'ex': 'br-ex'
      'fw-admin': 'eth0'
      'management': 'br-mgmt'
      'private': 'br-prv'
      'storage': 'br-storage'
    'transformations':
    - 'action': 'add-br'
      'name': 'br-ex'
    - 'action': 'add-br'
      'name': 'br-mgmt'
    - 'action': 'add-br'
      'name': 'br-storage'
    - 'action': 'add-br'
      'name': 'br-prv'
    - 'action': 'add-br'
      'name': 'br-bond0'
    - 'action': 'add-br'
      'name': 'br-eth1'
    - 'action': 'add-bond'
      'bridge': 'br-bond0'
      'interfaces': ['eth2', 'eth3']
      'properties': ['lacp=active']
      'name': 'bond0'
    - 'action': 'add-port'
      'bridge': 'br-eth1'
      'name': 'eth1'
    - 'action': 'add-patch'
      'bridges': ['br-bond0', 'br-storage']
      'tags': [103, 0]
    - 'action': 'add-patch'
      'bridges': ['br-eth1', 'br-ex']
      'tags': [101, 0]
    - 'action': 'add-patch'
      'bridges': ['br-eth1', 'br-mgmt']
      'tags': [102, 0]
    - 'action': 'add-patch'
      'bridges': ['br-bond0', 'br-prv']


NIC Aggregation in UI
---------------------

All configuration of interfaces bonding is done using "Configure Interfaces" tab.

1. Select node(s) and click "Configure Interfaces".

.. image:: /_images/bonding-setup-in-ui-1.*
  :width: 45%
  :align: center

2. Select interfaces to be aggregated. All interfaces except Admin-PXE can be aggregated.

.. image:: /_images/bonding-setup-in-ui-2.*
  :width: 45%
  :align: center

3. Click "Bond interfaces".

.. image:: /_images/bonding-setup-in-ui-3.*
  :width: 45%
  :align: center

Now you can select appropriate bonding mode from drop-down list "Mode".

4. Reassign networks, create additional bonds, etc. You can do all required changes and
   click "Apply" after that.

.. image:: /_images/bonding-setup-in-ui-45.*
  :width: 90%
  :align: center

5. You can add an interface(s) to bond. Select one bond and interface(s) to add
   and click "Bond Interfaces".

.. image:: /_images/bonding-setup-in-ui-67.*
  :width: 90%
  :align: center

6. You can unbond interfaces or remove some inteface(s) from bond when bond has
   3 or more slave interfaces. To remove interface from bond click "Remove"
   at the left-bottom from interface icon.

.. image:: /_images/bonding-setup-in-ui-89.*
  :width: 90%
  :align: center

To unbond interfaces select bond and click "Unbond Interfaces".

.. image:: /_images/bonding-setup-in-ui-ab.*
  :width: 90%
  :align: center

Assign Admin Network to the OVS Bridge
--------------------------------------

.. warning::

   It's not a fully supported feature now. Use this guide carefully.

Mirantis OpenStack now has a restriction to use the Admin network on a dedicated
NIC. It is because we use Cobbler as the PXE boot server. Cobbler must know all of the node MAC
addresses during the provisioning stage. Also, it includes static ARP entries
in the ``/etc/ethers`` file. Further, bugs can occur if you simply assign an
Admin network IP from a NIC to an OVS bridge. But, if you really want to solve this
problem, here is a solution:

#. Install the ``patch`` program:

   ::

     [root@fuel ~]# yum install patch

#. Modify some custom Puppet provider using these commands:

   ::

     [root@fuel ~]# wget -O /tmp/ovs_pp.diff https://raw.github.com/stackforge/fuel-docs/master/_static/l2_ovs_bond_ovs_pp.diff
     [root@fuel ~]# patch -p0 < /tmp/ovs_pp.diff

#. Disable Cobbler's control of the ``/etc/ethers`` file:

   ::

     [root@fuel ~]# wget -O /tmp/dnsmasq_py.diff https://raw.github.com/stackforge/fuel-docs/master/_static/manage_dnsmasq_py.diff
     [root@fuel ~]# patch -p0 < /tmp/dnsmasq_py.diff
     [root@fuel ~]# service cobblerd restart

#. Design a good network scheme and apply it via the Fuel CLI tool.
   For example, suppose you have a node with 2 NICs. To create a single bridge 'br-core', bond
   both NICs to it and connect other bridges to it via patches. The Admin network
   role 'fw-admin' should use the 'br-core' bridge. Here is a part of the node config:

   ::

      'network_scheme':
        'provider': 'ovs'
        'version': '1.0'
        'endpoints':
          'br-core':
            'IP': ['10.20.0.4/24']
          'br-ex':
            'IP': ['172.16.0.2/24']
            'gateway': '172.16.0.1'
          'br-mgmt':
            'IP': ['192.168.0.2/24']
          'br-prv': {'IP': 'none'}
          'br-storage':
            'IP': ['192.168.1.2/24']
          'eth0': {'IP': 'none'}
          'eth1': {'IP': 'none'}
        'interfaces':
          'eth0': {}
          'eth1': {}
        'roles':
          'ex': 'br-ex'
          'fw-admin': 'br-core'
          'management': 'br-mgmt'
          'private': 'br-prv'
          'storage': 'br-storage'
        'transformations':
        - 'action': 'add-br'
          'name': 'br-ex'
        - 'action': 'add-br'
          'name': 'br-mgmt'
        - 'action': 'add-br'
          'name': 'br-storage'
        - 'action': 'add-br'
          'name': 'br-prv'
        - 'action': 'add-br'
          'name': 'br-core'
        - 'action': 'add-bond'
          'bridge': 'br-core'
          'interfaces': ['eth0', 'eth1']
          'name': 'bond0'
        - 'action': 'add-patch'
          'bridges': ['br-core', 'br-storage']
          'tags': [103, 0]
        - 'action': 'add-patch'
          'bridges': ['br-core', 'br-ex']
          'tags': [101, 0]
        - 'action': 'add-patch'
          'bridges': ['br-core', 'br-mgmt']
          'tags': [102, 0]
        - 'action': 'add-patch'
          'bridges': ['br-core', 'br-prv']

#. When the new network configuration is applied, nodes will be reported
   as offline by Fuel. This is expected behavior in this case.
