.. raw:: pdf

   PageBreak

Other Questions
===============

.. TODO(mihgen): Provide more clear and reflecting reality answer

1. **[Q]** Why did you decide to provide OpenStack packages through your own
   repository?

   **[A]** We are fully committed to providing our customers with working and
   stable bits and pieces in order to make successful OpenStack deployments.
   Please note that we do not distribute our own version of OpenStack; we rather
   provide a plain vanilla distribution. Put simply, there is no vendor lock-in
   with Fuel. For your convenience, we maintain repositories containing a
   history of OpenStack packages certified to work with our Puppet manifests.

   We also ship patched or upgraded versions of some upstream packages. This is
   necessary to incorporate fixes for known issues and performance improvements.
   Sometimes these updates add features that are needed by OpenStack.

   The advantage of this approach is that you can install any OpenStack version
   you want (with possible custom bug fixes). Even if you are running Essex,
   just use the Puppet manifests which reference OpenStack packages for Essex
   from our repository. With each new release we add new OpenStack packages to
   our repository and create a new branch with Puppet manifests (which, in
   turn, reference these packages) corresponding to each release. With EPEL
   this would not be possible, as that repository only keeps the latest version
   for OpenStack packages.

2. **[Q]** Is MySQL with Galera an active/active HA? Does it support
   multi-master writes? A simple workflow example would be helpful.

   **[A]** Yes, MySQL+Galera is a true multi-master solution. Although MySQL+Galera
   supports multi-master topology, Mirantis OpenStack configures MySQL+Galera to
   have only a single active node (via HAProxy) to receive writes and serve
   reads, and uses the remaining cluster nodes as standby masters.
   It is important to note, however, that unlike regular MySQL master/slave
   topologies, these standby masters do not have "slave lag", as Galera employs
   synchronous replication and ensures each cluster node is identical.
   Previous Fuel versions used only HAProxy as a MySQL management solution,
   but version 3.0 and later of Mirantis OpenStack uses Pacemaker and HAProxy
   to manage MySQL+Galera.

   Pacemaker manages the individual MySQL+Galera nodes, HAProxy, and the
   Virtual IP Address (VIP). HAProxy manages connections between MySQL+Galera
   active master, backup masters, and the MySQL Clients connecting to the VIP.
   Only one MySQL+Galera master is active in the VIP as the single direction
   synchronous replication performs better in most cases.

   The Workflow is simple: One node tied to the VIP serves new data updates and
   increases its global transaction ID number (GTID). The rest of the Galera
   cluster must then synchronize the data from the nodes with GTID greater than
   their current value. If the status of any node falls too far behind the
   Galera cache, an entire replica is distributed to that node. This will cause
   a master to switch to the Donor role allowing an out-of-sync node to catch
   up.

3. **[Q]** Are the Ceph monitors on the controllers in active/active HA?

   **[A]** Yes, the Ceph Monitors (MON) use the Paxos algorithm to determine
   all updates to the data they manage. All monitors that are in quorum will
   have consistant up-to-date data because of this.

   Ceph monitors manage various maps like MON map, CRUSH map, and others. The
   CRUSH map is used by clients to deterministically select the storage devices (OSDs)
   to receive copies of the data.

   You can read  .. _more about ceph: http://ceph.com/docs/master/architecture

4. **[Q]** Is Neutron an active/standy HA? I got this understanding from the docs
   and I want to understand why. I was told that Grizzly and Havanna support multiple
   L3 agents but Mirantis OpenStack only supports a single L3 agent.

   **[A]** Neutron partly functions as a network router. If one of the L3 agents fail,
   it loses data about the VM instances for which it manages traffic. This has been
   worked around to some extent, but still operates with a single L3 agent.
