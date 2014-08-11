
.. _mellanox-adapters:

Mellanox ConnectX-3 network adapters
------------------------------------

Beginning with version 5.1,
Fuel can configure Mellanox ConnectX-3 network adapters
to accelerate the performance of compute and storage traffic.
For additional details on the Mellanox ConnectX-adapter family, see the
`product page <http://www.mellanox.com/page/products_dyn
?product_family=119&mtag=connectx_3_vpi>`_.

This implements the following performance enhancements:

- Compute nodes use :ref:`sr-iov-term` based networking.
- Cinder nodes use :ref:`iser-term` block storage as the iSCSI transport
  rather than the default iSCSI over TCP.

These features
reduce CPU overhead, boost throughput, reduce latency,
and enable network traffic
to bypass the software switch layer (e.g. Open vSwitch).

The Mellanox ConnectX-3 adapters family supports up to 40/56GbE.
To reach 56 GbE speed in your network,
you must use Mellanox Ethernet switches (e.g. SX1036)
with the additional 56GbE license.
The switch ports should be configured specifically to use 56GbE speed.
Once the switch is running 56GbE,
no additional configuration is required on the adapter side.
For additional information about how to run in 56GbE speed,
see `HowTo Configure 56GbE Link on Mellanox Adapters and Switches
<http://community.mellanox.com/docs/DOC-1460>`_.

