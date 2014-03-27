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
