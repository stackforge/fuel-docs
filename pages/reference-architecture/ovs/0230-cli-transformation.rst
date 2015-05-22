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
    "type": "internal",         # [optional; default: "internal"] a type of OVS
                                # interface # for the port (see OVS documentation);
                                # possible values:
                                # "system", "internal", "tap", "gre", "null"
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
                                # should be cached from an OVS bridge;
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
                                # you can use it to set the aggregation mode and
                                # balancing # strategy, to configure LACP, and so on
                                # (see the OVS documentation)
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

