.. index:: Network Configuration Options

.. _NetworkConfiguration:

Network Configuration Options
=============================

This section describes how to configure network settings depending on
your environment requirements and prerequisites.

Networks used by OpenStack
--------------------------

**Public network** is used for communication between a cluster and external
networks (the Internet, corporate network, end users).

**Floating network** is used for communication from external networks to
VMs. A Floating network IP address can be assigned to a single VM.

**Storage network** is part of cluster’s internal network. It is used 
to separate storage traffic (Swift, Ceph, iSCSI, and so on) from other types of
cluster’s internal communications.

**Management network** is also part of a cluster’s internal network. It serves 
all other internal communications, including DB queries, AMQP messaging,
high availability services, and so on.

**Private network** is an internal network used for VM’s communications between
tenants (also called Fixed network).

**Administrative network** is a network shared between the Fuel master node
and all clusters deployed by the Fuel master node. It’s used for
administrative purposes and network-based installation of Node servers.

**OVS**  is an abbreviation for Open vSwitch, a production quality, multilayer 
virtual switch licensed under the open source `Apache
2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>`_  license.

For more information about networks,  see
:ref:`Reference Architecture<ref-arch>`.

Public and Floating IP address requirements
===========================================

This section describes the OpenStack requirements for available IP addresses
in Public and Floating ranges by network type.

Nova-Network general requirements
---------------------------------

It is recommended to define both Public and Floating IP ranges inside the
same network segment (CIDR), otherwise additional routing settings between
these ranges required on your hardware router to connect both.

Public and Floating IP ranges must not intersect!

Public range with Nova-Network requirements:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Every deployed node require one IP address from Public IP range.

* For HA environments - one extra IP address required for cluster Virtual IP.

Floating range with Nova-Network requirements:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Every VM (instance) connected to external network require one IP address from
  Floating IP range. These IP addresses assigned on demand and may be released
  from VM and returned back to the pool of non-assigned Floating IP addresses.

Neutron (with both VLAN and GRE segmentation) general requirements
------------------------------------------------------------------

It is mandatory to define both Public and Floating IP ranges inside the 
same network segment (CIDR)! There is no external routing possible with Neutron.

Public and Floating IP ranges must not intersect!

Public range with Neutron requirements:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Every deployed node require one IP address from Public network.
  This IP goes to node virtual router.

* For HA environments - one extra IP address required for cluster Virtual IP.

Floating range with Neutron requirements:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Every defined tenant, including Admin tenant requires one IP from Floating range.
  This IP goes to tenant virtual router. So, one Floating IP will be assigned
  to Admin tenant automatically in scope of OpenStack deployment process.

* Every VM (instance) connected to external network require one IP address from
  Floating IP range. These IP addresses assigned on demand and may be released
  from VM and returned back to the pool of non-assigned Floating IP addresses.

Network Deployment Models
=========================

This section describes the following network deployment models:

* :ref:`Nova-network <novanetwork>`
* :ref:`Neutron <neutron>`

.. _novanetwork:

Nova-network
------------

Nova-network offers two options for deploying  private network for tenants:

* FlatDHCP Manager
* VLAN Manager

FlatDHCP Manager Network Diagram
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following diagram describes network configuration when you use 
Nova-network with FlatDHCP Manager:

.. image:: /_images/preinstall_d_flat_dhcp.jpg
   :align: center
   :width: 75%

For more information about FlatDHCP Manager, see :ref:`Reference Architecture<ref-arch>`.

VLAN Manager Network Diagram
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following diagram describes network configuration when you use
Nova-network with VLAN Manager:

.. image:: /_images/preinstall_d_vlan.jpg
   :align: center
   :width: 75%


Assigning OpenStack Networks to Network Interfaces
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You must associate each OpenStack network with a server NIC.

To assign OpenStack networks to server NICs, using Fuel UI:

1. Click  **Add Nodes**.
2. Select the role for this host.
3. Click **Apply Changes**.
4. Select the role you want to modify, and click **Configure Interfaces**.
5. Drag and drop the appropriate networks onto the physical interfaces.

Network Planning Examples
~~~~~~~~~~~~~~~~~~~~~~~~~

FlatDHCP
^^^^^^^^

Depending on the number of NICs you have in your node servers, you can use the 
following examples to plan your NIC assignment: 

1 NIC deployment

-  eth0 - VLAN tagged port for networks: Storage, Public/Floating,
   Private, Management and Administrative (untagged)

2 NIC deployment

-  eth0 - Management network (tagged), Storage network (tagged) and
   Administrative network  (untagged)  
-  eth1 - VLAN tagged port with VLANs for networks: Public/Floating,
   Private

3 NIC deployment

-  eth0 - untagged port for Administrative network
-  eth1 - VLAN tagged port with VLANs for networks: Public/Floating,
   Private, Management 

-  eth2 - untagged port for Storage network

4 NIC deployment

-  eth0 - untagged port for Administrative network

-  eth1 - tagged port for networks: Public/Floating, Management
-  eth2 - untagged port for Private network
-  eth3 - untagged port for Storage network

Routing recommendations

-  Use the default routing via a router in the Public network
-  Use the the management network to access to your management
   infrastructure (L3 connectivity if necessary)
-  The administrative network or only the Fuel server (via dedicated
   NIC) should have Internet access
-  The Storage and Private network (VLANs) should be configured without
   access to other networks (no L3 connectivity)


VLAN Manager
^^^^^^^^^^^^

Depending on the number of NICs you have in your node servers, you can use the
following examples to plan your NIC assignment:

1 NIC deployment

-  eth0 - VLAN tagged port for networks: Storage, Public/Floating,
   Private  (where the number of VLANs depends on the number of tenant
   networks with a continuous range), Management and Administrative
   network (untagged)

2 NIC deployment

-  eth0 - Management network (tagged), Storage network (tagged) and
   Administrative network  (untagged)  
-  eth1 - VLAN tagged port with minimum two VLANs for networks:
   Public/Floating, Private (where number of VLANs depend on number of
   tenant networks - continuous range)

3 NIC deployment

-  eth0 - untagged port for Administrative network
-  eth1 - VLAN tagged port with two VLANs for networks: Public/Floating,
   Management Private (where the number of VLANs depends on the number
   of tenant networks with a continuous range)
-  eth2 - untagged port for Storage network

4 NIC deployment

-  eth0 - untagged port for Administrative network
-  eth1 - tagged port for networks: Public/Floating, Management
-  eth2 - VLAN tagged port for Private network, with defined VLAN range
   IDs - continuous range
-  eth3 - untagged port for Storage network

Routing recommendations

-  Use the default routing via a router in the Public network
-  Use the the management network to access to your management
   infrastructure (L3 connectivity if necessary)
-  The administrative network or only the Fuel server (via dedicated
   NIC) should have Internet access
-  The Storage and Private network (VLANs) should be configured without
   access to other networks (no L3 connectivity)

.. _neutron:

Neutron
-------

This section describes recommended parameters for network configuration
using the Neutron service.

VLAN Segmentation
~~~~~~~~~~~~~~~~~

The following diagram shows the network isolation using Open vSwitches and
VLANs:

.. image:: /_images/preinstall_d_vlan_segm.jpg
   :align: center
   :width: 75%

.. note:: You must have at least three network interfaces for this
          configuration

GRE Segmentation
~~~~~~~~~~~~~~~~

The following diagram shows the network segmentation using Open vSwitch
and GRE tunneling.

.. image:: /_images/preinstall_d_gre_segm.jpg
   :align: center
   :width: 75%

Open vSwitch (OVS) GRE tunnels are provided through Management Network.

.. note:: This setup does not include physical Private network.

Network Planing Examples
~~~~~~~~~~~~~~~~~~~~~~~~

VLAN Segmentation
^^^^^^^^^^^^^^^^^

Depending on the number of NICs you have in your node servers, you can use the
following examples to plan your NIC assignment:

3 NIC deployment

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management,
   Storage
-  eth2 (br-eth2) - port for Private network (where the number of VLANs
   depends on the number of tenant networks with a continuous range)

.. image:: /_images/preinstall_d_vlan_3nics.png
   :align: center
   :width: 50%

4 NIC deployment

-  eth0 - port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management
-  eth2 (br-eth2) - port for Private network, with defined VLAN range
   IDs
-  eth3 (br-eth1) - port for Storage network

.. image:: /_images/preinstall_d_vlan_4nics.png
   :align: center
   :width: 50%

Routing recommendations

-  Use the default routing via a router in the Public network
-  Use the the management network to access to your management
   infrastructure (L3 connectivity if necessary)
-  The administrative network or only the Fuel server (via dedicated
   NIC) should have Internet access
-  The Storage and Private network (VLANs) should be configured without
   access to other networks (no L3 connectivity)


GRE Segmentation
^^^^^^^^^^^^^^^^

Depending on the number of NICs you have in your node servers, you can use the
following examples to plan your NIC assignment:

2  NIC deployment 

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management,
   Storage

.. image:: /_images/preinstall_d_gre_2nics.png
   :align: center
   :width: 50%

3  NIC deployment 

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management
-  eth2 (br-eth2) - port for Storage network

.. image:: /_images/preinstall_d_gre_3nics.png
   :align: center
   :width: 50%

4  NIC deployment 

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for Management network
-  eth2 (br-eth2) - port for Public/Floating network
-  eth3 (br-eth3) - port for Storage network

.. image:: /_images/preinstall_d_gre_4nics.png
   :align: center
   :width: 50%

Routing recommendations

-  Default routing via router in the Public network
-  The management network access to your management infrastructure (L3
   connectivity if necessary)
-  Administrative network or only Fuel server (via dedicated NIC) should
   have Internet access
-  Storage and Private network (VLANs) without access to other networks
   (no L3 connectivity)

Routing recommendations
^^^^^^^^^^^^^^^^^^^^^^^

Consider the following routing recommendations when you configure your 
network:

-  Use the default routing via a router in the Public network
-  Use the the management network to access to your management
   infrastructure (L3 connectivity if necessary)
-  The Storage and VM networks should be configured without access to
   other networks (no L3 connectivity)

.. image:: /_images/fuel-network-scheme.jpg
   :align: center
.. image:: /_images/grub-screen.png
   :align: center
.. image:: /_images/grub-cmdline.png
   :align: center
.. image:: /_images/fuel-wizard.png
   :align: center
.. image:: /_images/fuel-network-settings.png
   :align: center
.. image:: /_images/fuel-settings.png
   :align: center
.. image:: /_images/fuel-nodes.png
   :align: center
.. image:: /_images/fuel-nodes-selected.png
   :align: center
.. image:: /_images/fuel-node-network.png
   :align: center
