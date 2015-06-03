.. _mg-neutron:

Neutron
+++++++

Neutron is the OpenStack service providing network connectivity as a
service between network interfaces (vNICs) managed by other OpenStack services like Nova.

.. note::
   Neutron plugins *load balancer*, *firewall*, and *ipsec monitoring*
   are not covered in this version of the document.

**Process Checks**

.. list-table::
   :header-rows: 1
   :widths: 30 15 15 15 25
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role
     - Dependencies
     - HA mode

   * - neutron-server
     - HTTP 9696
     - controller
     - db, amqp
     - active/active

   * - neutron-dhcp-agent
     - RPC
     - active controller
     - amqp, dnsmasq
     - active/passive

   * - neutron-l3-agent
     - RPC
     - active controller
     - db, iptables
     - active/passive

   * - neutron-metadata-agent
     - RPC
     - compute
     - amqp, db
     - active/active

   * - neutron-ns-metadata-proxy
     - RPC
     - controller
     - amqp, db
     - active/passive

   * - neutron-openvswitch-agent
     - RPC
     - all nodes
     - amqp, ovs
     - active/passive

   * - dnsmasq
     - UDP port 67
     - controller
     - 
     - active/passive, see DHCP agent below

|

**API checks**

Check the proper functioning of the API with a read operation.
Example:

* list subnets

  * GET  /v2.0/subnets

|

**Collected Metrics**

.. list-table::
   :header-rows: 1
   :widths: 25 45 30
   :stub-columns: 0
   :class: borderless

   * - Metric
     - Source
     - Purpose

   * - Number of networks
     - poll API

       GET /v2.0/networks
     - Alert:

       Too few active networks could be the symptom of a deeper
       problem.

   * - Number of subnets
     - poll API

       GET /v2.0/subnets
     - diag

   * - Number of routers
     - poll API

       GET /v2.0/routers
     - diag

   * - Number of ports
     - poll API

       GET /v2.0/ports
     - diag

   * - API errors
     - Logs:

       All entries with HTTP 500 error code

       INFO neutron.wsgi [{req-id} None] 192.168.0.1 - - [11/Mar/2015
       19:17:22] "POST /v2.0/networks.json HTTP/1.1" 500 324 0.178729

       # where 500 indicates an error
     - Alert:

       When a sudden spike of errors is detected.
