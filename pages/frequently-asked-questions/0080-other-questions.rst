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
   Additionally, we keep updated or customized versions of some Linux 
   components, of those we know their particular versions has blocker issues, 
   preventing some OpenStack components from normal operation.

   The advantage of this approach is that you can install any OpenStack version 
   you want (with possible custom big fixes). Even if you are running Essex, 
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
   have only a single active node to receive writes and serve reads, and uses the
   remaining cluster nodes as standby slaves.
   It is important to note, however, that unlike regular MySQL,
   these standby slaves do not have "slave lag", as Galera employs synchronous
   replication and ensures each cluster node is identical.
   Previous Fuel versions used HAProxy as a MySQL management solution,
   but version 3.0 and later of Mirantis OpenStack uses Pacemaker and HAProxy
   to manage MySQL+Galera. Pacemaker provides a Virtual IP address (VIP) for the
   MySQL+Galera cluster and multi-master writes are not used because most OpenStack
   projects cannot be configured to query more than one database IP.
   HAProxy makes one of the nodes an 'active' and the other nodes are 'backup'
   (there is no "slave lag", though).
   There is no single master node in Galera cluster, though there are nodes with the most
   recent data replica and nodes which still have to sync with this recent replica.

   The Workflow is simple: One node tied to the VIP serves new data updates and
   increases its GTID number. The rest of the Galera cluster must then synchronize the
   data from the nodes with global transaction ID (GTID) greater than their current
   value. If the status falls too far behind, an entire replica is distributed to any
   nodes that fall too far behind the Galera cache.

   note:: For RHOS, MySQL with Galera has been replaced with native replication in a
   Master/Slave configuration. MySQL master is elected via Corosync and master and
   slave status is managed via Pacemaker.

3. **[Q]** Is Ceph-MON on controllers an active/active HA?

   **[A]** Yes, CEPH monitors also work in master-master mode. As soon as any of the
   monitor nodes receive a cluster map change request that is not an ordinary data store
   request, it becomes a leader. So the leader is the node what has the most
   recent cluster map replica. Other monitor nodes must sync their cluster maps with the
   current leader. Every monitor node that has already synced with the leader becomes
   a provider. The leader knows which nodes are currently providers. The leader also
   tells the other nodes which provider to use for data exchange.
   The CEPH monitor synchronization algorithm works in a similar way to Galera.
   CEPH nodes can be either monitor nodes or data storage nodes. This is contrary to
   Galera, which runs the same service set on each member.
   
   note:: Galera also defines voting and donor node roles that Fuel does not use.

   CEPH monitor nodes manage where the data should actually be stored and maintain
   data consistency between data storage nodes that actually store the data.

4. **[Q]** Is Neutron an active/standy HA? I got this understanding from the docs
   and I want to understand why. I was told that Grizzly and Havanna support multiple
   L3 agents but Mirantis OpenStack only supports a single L3 agent.

   **[A]** Neutron partly functions as a network router. If one of the L3 agents fail,
   it loses data about the VM instances for which it manages traffic. This has been
   worked around to some extent, but still operates with a single L3 agent.
