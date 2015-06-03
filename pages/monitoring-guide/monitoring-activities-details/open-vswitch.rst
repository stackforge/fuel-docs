.. _mg-open-vswitch:

Open vSwitch
++++++++++++

*Open vSwitch* is a central component of tenant networking. You
should check that the following processes are up and running.

.. list-table::
   :header-rows: 1
   :widths: 30 20 50
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Role
     - HA mode

   * - ovsdb-server
     - all nodes
     - not available

   * - ovs-vswitchd
     - all nodes
     - not available

Also, a good practice for diagnosis is to collect the number of
dropped packets and packets in the error state per interface. We
recommend, however, not to consider those errors as critical ones
since they do not necessarily represent a service failure.

.. code::

   # ovs-vsctl get Interface br-tun statistics
   {collisions=0,
   rx_bytes=648,
   rx_crc_err=0,
   rx_dropped=0,
   rx_errors=0,
   rx_frame_err=0,
   rx_over_err=0,
   rx_packets=8,
   tx_bytes=0,
   tx_dropped=0,
   tx_errors=0,
   tx_packets=0}

The Open vSwitch logs are stored in the ``/var/log/openvswitch/``
directory.
