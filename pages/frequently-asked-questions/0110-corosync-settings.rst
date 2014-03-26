.. index:: Corosync Settings

Corosync Settings
-----------------

Corosync uses Totem protocol, which is an implementation of Virtual Synchrony
protocol. It uses it in order to provide connectivity between cluster nodes,
decide if cluster is quorate to provide services, to provide data layer for
services that want to use features of Virtual Synchrony.

Corosync fuctions in Fuel as the communication and quorum service via Pacemaker
cluster resource manager (`crm`). It's main configuration file is located in
``/etc/corosync/corosync.conf``.

The main Corosync section is the ``totem`` section which describes how cluster nodes
should communicate::

  totem {
    version:                             2
    token:                               3000
    token_retransmits_before_loss_const: 10
    join:                                60
    consensus:                           3600
    vsftype:                             none
    max_messages:                        20
    clear_node_high_bit:                 yes
    rrp_mode:                            none
    secauth:                             off
    threads:                             0
    interface {
      ringnumber:  0
      bindnetaddr: 10.107.0.8
      mcastaddr:   239.1.1.2
      mcastport:   5405
    }
  }

Corosync usually uses multicast UDP transport and sets up a "redundant ring"
for communication. Currently Fuel deploys controllers with one redundant ring.
Each ring has it’s own multicast address and bind net address that specifies on
which interface Corosync should join corresponding multicast group. Fuel uses
default Corosync configuration, which can also be altered in Fuel manifests.

.. seealso:: ``man corosync.conf`` or Corosync documentation at
  http://clusterlabs.org/doc/ if you want to know how to tune installation
  completely

