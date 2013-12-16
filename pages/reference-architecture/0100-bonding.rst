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
-----------------------------------------------

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
                                # you can use it to set aggregation mode and balansing
                                # strategy, to configure LACP and so on (see OVS documentation)
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


An Example of NIC Aggregation
-----------------------------

Suppose you have a node with 4 NICs and you want to bond two of them ("eth2" and
"eth3" here) and then assign Private and Storage networks to them. The Admin network
use a dedicated NIC ("eth0"). The Management and Public networks use the last
NIC ("eth1"). To achieve this goal, do the following:

* Create a separate OVS bridge "br-bond0" instead of "br-eth2" and "br-eth3".
* Connect "eth2" and "eth3" to "br-bond0" as a bonded port.
* Connect "br-prv" and "br-storage" bridges to "br-bond0" by OVS patches.
* Leave all of the other things unchanged.

Here is a example of "network_scheme" section in the node configuration:

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
      'bridges': ['br-core', 'br-prv']


Assign Admin Network to the OVS Bridge
--------------------------------------

Mirantis OpenStack now has a restriction to use an Admin network on a dedicated
NIC. It is because we use Cobbler as the PXE boot server. Cobbler must know all of the node MAC
addresses during the provisioning stage. Also, it includes static ARP entries
in the ``/etc/ethers`` file. Further, bugs can occur if you simply assign an
Admin network IP from a NIC to an OVS bridge. But, if you really want to solve this
problem, here is a solution:

* Go to the ``/etc/puppet/modules/l23network`` directory and modify the ``L2_ovs_bond``
  custom Puppet provider (``https://github.com/alexeyklimenok/fuel/commit/0e012cc5578446c0c14459d1c8874e19d3499f38``)
* Disable Cobbler's control of the ``/etc/ethers`` file. A simple way to do that is to
  replace the body of the ``regen_ethers`` method in ``/usr/lib/python2.6/site-packages/cobbler/modules/manage_dnsmasq.py``
  file with a pass statement.
* Design a good network scheme and apply it via the Fuel CLI tool.
  For example, suppose you have a node with 2 NICs. To create a single bringe 'br-core', bond
  both NICs to it and connect other bridges to it via patches. The Admin network
  'fw-admin' should use 'br-core'. Here is a part of the node config:

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
