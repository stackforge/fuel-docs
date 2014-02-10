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
   multi-master writes? A simple workflow example would helpful.

   **[A]** Yes, MySQL+Galera is a true master-master solution. But it's possible
   and in case of 6+ nodes even recommended to setup 1-2 Galera nodes as slaves
   for additional data consistency.
   Previous Fuel versions used HAProxy as a MySQL managing solution.
   Starting from 3.0 or 3.1 version Mirantis OpenStack uses Pacemaker and HAProxy
   to manage MySQL+Galera. It provides the Virtual IP address (VIP) for MySQL backend
   and multi-master writes are not used and Openstack configuration does not support it
   and can only work with a single connection. HAProxy makes one of the node an 'active'
   and the other nodes a 'backup'.
   There is no single master node in Galera cluster though there are nodes with the most
   recent data replica and the nodes which still have to sync with this recent replica.
   Workflow is simple. A node serves new data changing request made via VIP and
   increases its UUID number. And the rest of the nodes must then synchronize the data
   from the nodes with UUID greater than their current.

3. **[Q]** Is Ceph-MON on controllers an active/active HA?

   **[A]** Yes, CEPH monitors are also work in master-master mode. One of them
   periodically becomes the leader. The leader is the node which have got the most
   recent cluster map replica first. Other monitor nodes must sync their
   cluster map with the current leader. Every monitor node that have already synced with
   the leader becomes provider and the leader knows which nodes are currently
   providers. The leader also tells the other nodes which provider each of
   them should use to get the data from.
   CEPH monitor synchronization algorithm works in a similar way as Galera.
   CEPH nodes can be either monitor nodes or data storage nodes. On the contrary
   every Galera node has the same service set on each system. CEPH monitor nodes
   manage where the data should actually be stored and maintain data consistency
   between data storage nodes that actually store the data.

4. **[Q]** Is Neutron an active/standy HA? I got this understanding from the docs
   and I want to understand why. I was told that Grizzly and Havanna support multiple
   l3 agents but we don't support it in Fuel on some reason.

   **[A]** Among the other functionality Neutron is a router. If one of L3 agents fail
   it looses all data about the nodes it serves. We worked that around but for only for
   a single L3. It's the reason why there is only a single entry point.
