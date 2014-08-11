
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
