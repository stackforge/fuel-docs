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

Here is an example of a "network_scheme" section in a node's configuration, showing how
to change MTU parameters:

::

  network_scheme:
   endpoints:
     br-ex:
       IP:
       - 172.16.0.7/24
       gateway: 172.16.0.1
     br-fw-admin:
       IP:
       - 10.20.0.7/24
     br-mgmt:
       IP:
       - 192.168.0.7/24
     br-prv:
       IP: none
     br-storage:
       IP:
       - 192.168.1.6/24
   interfaces:
     eth0:
       mtu: 1234
       L2:
         vlan_splinters: 'off'
     eth1:
       mtu: 4321
       L2:
         vlan_splinters: 'off'
     eth2:
       L2:
         vlan_splinters: 'off'


