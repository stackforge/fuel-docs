
.. raw:: pdf

   PageBreak


.. _network-1-yaml-ref:

network_1.yaml
--------------

Fuel Master Node:
**/root/network_1.yaml**

The *network_1.yaml* file contains the configuration information
for all Network Groups in the environment.
By default, it describes a single default Network Group;
if you do not configure :ref:`Multiple Cluster Networks<mcn-term>`,
this is used for all L2 networking in your environment.

To implement a :ref:`Multiple Cluster Network<mcn-term>`,
follow the instructions in :ref:`mcn-ops`
to create additional Node Groups,
then download this file and configure the new Network Group(s).

Usage
~~~~~

#. Dump network information using this
   :ref:`fuel CLI<fuel-cli-config>` command::

       fuel --env 1 network --download

   where ``--env 1`` points to the specific environment
   (id=1 in this example).


#. Edit file and add information about the new Network Group(s).


#. Upload the modified file:
   ::

     fuel --env-1 network --upload

If you make a mistake when populating this file,
it will appear to upload normally
but no network data changes are applied
and all the modifications you made to the file are wiped clean.
To protect yourself,
we recommend the following process:

- After you edit the file but before you upload it,
  make a copy in another location.
- Upload the file.
- Download the file again.
- Compare the current file to the one you saved.
  If they match, you successfully configured your networks.

If you configure your networking by editing this file,
you should create and configure the rest of your environment
using the Fuel CLI rather than the Web UI.
Especially do not attempt to configure your networking
using the Web UI screens.

File Format
~~~~~~~~~~~

The *network_1.yaml* file contains:

- Global settings
  (most are at the beginning of the file
  but one (**public_vip**) is at the end of the file,
- The **network** section
  that contains the configurations of
  each of the Network Groups that have been created
  and each of the four logical networks
  that are assigned to that Node Group.

.. note:: *network_1.yaml* is dumped in dictionary order
   so the sections may appear in a different order than
   documented here.

The following file snippet shows the organization of the file:

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
     id: 1
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
     <group_id: 1, id: 2 - definitions for management logical network>
     <group_id: 1, id: 3 - definitions for management logical network>
     <group_id: 1, id: 4 - definitions for management logical network>
       - 10.108.35.254
     vlan_start: null
   public_vip: 10.108.36.2

The **group_id:null** indicates that the default admin network
is not tied to a group
because it is used by all clusters.
Each other network is per-cluster
and so has a numerical **group_id**.

To configure a new Network Group:

- Set values for the global **management_vip**,
  *floating_ranges**, and **public_vip** parameters.

- Set values for the **cidr**, **gateway**,
  and **ip_ranges** parameters
  for each of the networks in each Node Group.


See also
~~~~~~~~

- :ref:`mcn-ops`

- :ref:`mcn-arch`



