.. _ceph-mon-arch:

Ceph Monitors
-------------

Ceph monitors (MON) manage various maps like MON map, CRUSH map, and others.
The CRUSH map is used by clients
to deterministically select the storage devices (OSDs)
to receive copies of the data.
Ceph monitor nodes  manage where the data should be stored
and maintain data consistency with the Ceph OSD nodes
that store the actual data.

Fuel assigns one Ceph monitor to each configured Controller node.
High availability is implemented for Ceph monitors
using a master-master model:

- One Ceph monitor node is designated the "leader."
  This is the node that first received
  the most recent cluster map replica.
- Each other monitor node must sync its cluster map with the current leader.
- Each monitor node that is already sync'ed with the leader becomes a provider;
  the leader knows which nodes are currently providers.
  The leader tells the other nodes which provider
  they should use to sync their data.

Ceph Monitors use the Paxos algorithm
to determine all updates to the data they manage.
All monitors that are in quorum
have consistent up-to-date data because of this.

You can read more in `Ceph Architecture
<http://ceph.com/docs/master/architecture>`_.

