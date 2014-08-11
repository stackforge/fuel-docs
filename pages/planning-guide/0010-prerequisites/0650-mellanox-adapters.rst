
.. _mellanox-adapters:

Mellanox connectX-3 network adapters
------------------------------------

Beginning with version 5.1, Fuel can configure Mellanox ConnectX-3 network
adapters to accelerate the performance of compute and storage traffic.

This implements the following performance enhancements:

- Compute nodes use :ref:`sr-iov-term` based networking.
- Cinder nodes use :ref:`iser-term` block storage as the iSCSI transport
  rather than the default iSCSI over TCP.

These features enables network traffic to bypass the software switch layer
(e.g. OVS switch), reduce CPU overhead, boost throughput, and reduce latency.

Mellanox ConnectX-3 adapters family support up to 40/56GbE.
To reach 56 GbE speed in your network, it requires to use Mellanox Ethernet
switches (e.g. SX1036) with 56GbE additional license.
Nothing special should be configured in the adapter side in order to work with
56GbE, once the switch is running 56GbE.
The switch ports should be configured specifically to use 56GbE speed.
For additional information about how to run in 56GbE speed, check the
following `post <http://community.mellanox.com/docs/DOC-1460>`_.

For additional details on Mellanox ConnectX-adapter family, click
`here <http://www.mellanox.com/page/products_dyn
?product_family=119&mtag=connectx_3_vpi>`_.
