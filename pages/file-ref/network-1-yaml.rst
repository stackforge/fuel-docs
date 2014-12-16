
.. raw:: pdf

   PageBreak


.. _network-1-yaml-ref:

network_1.yaml
--------------

Fuel Master Node:
**/root/network_1.yaml**

The *network_1.yaml* file contains the configuration information
for all Node Groups in the environment.
By default, it defines a single default
:ref:`Node Group<node-group-term>.
To implement a :ref:`Multiple Cluster Network<mcn-term>`,
follow the instructions in :ref:`mcn-ops`
to create additional Node Groups,
then upload this file and configure the new Node Group(s).

Usage
~~~~~

#. Dump provisioning information using this
   :ref:`fuel CLI<fuel-cli-config>` command::

       fuel --env 1 network --download

   where ``--env 1`` points to the specific environment
   (id=1 in this example).


#. Edit file and add information about the new Network Group(s).


#. Upload the modified file:
   ::

     fuel --env-1 network --upload


File Format
~~~~~~~~~~~

The default file contains the following information:

.. note:: *network_1.yaml* is dumped in dictionary order
   so the sections may appear in a different order than
   documented here.

::

   management_vip: 10.108.37.2
   networking_parameters:
     base_mac: fa:16:3e:00:00:00
     dns_nameservers:
     - 8.8.4.4
     - 8.8.8.8
     floating_ranges:
     - - 10.108.36.128
       - 10.108.36.254
     gre_id_range:
     - 2
     - 65535
     internal_cidr: 192.168.111.0/24
     internal_gateway: 192.168.111.1
     net_l23_provider: ovs
     segmentation_type: gre
     vlan_range:
     - 1000
     - 1030
   networks:
   - cidr: 10.108.36.0/24
     gateway: 10.108.36.1
     group_id: 1
     id: 2
     ip_ranges:
     - - 10.108.36.2
       - 10.108.36.127
     meta:
       assign_vip: true
       cidr: 172.16.0.0/24
       configurable: true
       floating_range_var: floating_ranges
       ip_range:
       - 172.16.0.2
       - 172.16.0.126
       map_priority: 1
       name: public
       notation: ip_ranges
       render_addr_mask: public
       render_type: null
       use_gateway: true
       vlan_start: null
     name: public
     vlan_start: pull
   - cidr: 10.108.37.0/24
     gateway: 10.108.37.1
     group_id: 1
     id: 3
   ip_ranges:
     - - 10.108.37.2
       - 10.108.37.254
     meta:
       assign_vip: true
       cidr: 192.168.0.0/24
       configurable: true
       map_priority: 2
       name: management
       notation: cidr
       render_addr_mask: internal
       render_type: cidr
       use_gateway: false
       vlan_start: 101
     name: management
     vlan_start: null
   - cidr: 10.108.39.0/24
     gateway: 10.108.39.1
   - cidr: 10.108.35.0/24
     gateway: null
     group_id: null
     id: 1
     ip_ranges:
     - - 10.108.35.3
       - 10.108.35.254
   meta:
       assign_vip: false
       configurable: false
       map_priority: 0
       notation: ip_ranges
       render_addr_mask: null
       render_type: null
       unmovable: true
       use_gateway: true
     name: fuelweb_admin
     vlan_start: null
   public_vip: 10.108.36.2

The **group_id:null** indicates that the default admin network
is not tied to a group
because it is used by all clusters.
Each other network is per-cluster
and so has a numerical **group_id**.
which uses the network that is configured by Fuel Menu
and is used for environments that do not implement MCN
and for nodes that are not assigned to another Node Group.

To define an additional Network Group,
define a **group_id** to the group
and populate it with subsections
that are tagged **id: 1**, **id:  2**, and so forth;
each **id** number must be unique for this Network Group.
You must define a subsection for each of the
:ref:`logical networks<logical-networks-arch>`:
public, management, storage, and fuelweb_admin.

The general shape of the added material is:

::

     group_id:  <x>
     id: <y>
           <network definitions for public logical network>
     group_id:  <x>
     id: <y+1>
           <network definitions for management logical network>
     group_id:  <x>
     id: <y+2>
           <network definitions for storage logical network>
     group_id:  <x>
     id: <y+3>
           <network definitions for fuelweb_admin logical network>

A sample definition for a new Network group is:

::

     group_id: 1
     id: 4
     ip_ranges:
     - - 10.108.39.2
       - 10.108.39.254
     meta:
       assign_vip: false
       cidr: 192.168.1.0/24
       configurable: true
       map_priority: 2
       name: storage
       notation: cidr
       render_addr_mask: storage
       render_type: cidr
       use_gateway: false
       vlan_start: 102
     name: storage
     vlan_start: null
   - cidr: 10.108.41.0/24
     gateway: 10.108.41.1
     group_id: 2
     id: 5
     ip_ranges:
     - - 10.108.41.2
       - 10.108.41.127
     meta:
       assign_vip: true
       cidr: 172.16.0.0/24
       configurable: true
       floating_range_var: floating_ranges
       ip_range:
       - 172.16.0.2
       - 172.16.0.126
       map_priority: 1
       name: public
       notation: ip_ranges
       render_addr_mask: public
       render_type: null
       use_gateway: true
       vlan_start: null
     name: public
     vlan_start: null
   - cidr: 10.108.40.0/24
     gateway: 10.108.40.2
     group_id: 2
     id: 8
     ip_ranges:
     - - 10.108.40.3
       - 10.108.40.127
     meta:
       assign_vip: false
       configurable: false
       map_priority: 0
       notation: ip_ranges
       render_addr_mask: null
       render_type: null
       unmovable: true
       use_gateway: true
     name: fuelweb_admin
     vlan_start: null
   - cidr: 10.108.42.0/24
     gateway: 10.108.42.1
     group_id: 2
   id: 6
     ip_ranges:
     - - 10.108.42.2
       - 10.108.42.254
     meta:
       assign_vip: true
       cidr: 192.168.0.0/24
       configurable: true
       map_priority: 2
       name: management
       notation: cidr
       render_addr_mask: internal
       render_type: cidr
       use_gateway: false
       vlan_start: 101
     name: management
     vlan_start: null
   - cidr: 10.108.44.0/24
     gateway: 10.108.44.1
     group_id: 2
     id: 7
     ip_ranges:
     - - 10.108.44.2
       - 10.108.44.254
     meta:
       assign_vip: false
       cidr: 192.168.1.0/24
       configurable: true
       map_priority: 2
       name: storage
       notation: cidr
       render_addr_mask: storage
       render_type: cidr
       use_gateway: false
       vlan_start: 102
     name: storage
     vlan_start: null


See also
~~~~~~~~

- :ref:`mcn-ops`

- :ref:`mcn-arch`



