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

2. **[Q]** MySQL with Galera - is it an active/active HA? Does it support
   multi-master writes? I was told/tend to think "yes", but want to understand
   it better. A simple workflow example would help.

   **[A]** Yes, MySQL+Galera is true master-master solution. While it is possible
   and, in case of 6+ nodes even recommended, to set 1-2 Galera nodes as
   slaves - for additional data consistency.
   Previous Fuel versions used HAProxy as MySQL managing solution.
   In case of Mirantis OpenStack (starting from 3.0 or 3.1) MySQL+Galera
   cluster is managed by Pacemaker and HAProxy which provides aVirtual IP address
   (VIP) for MySQL backend, thus multi-master writes are not supported as well
   as Openstack configuration (connection=...) does not support it yet. HAProxy
   provides 1 node as an 'active' one and others as a 'backup'.
   There is no single master node in Galera cluster though - there are nodes
   with most recent data replica and nodes which still have to sync with this
   recent replica.
   Workflow is simple. Node serves new data changing request via its VIP and
   increases its UUID number. And the rest of the nodes must synchronize the data
   from the nodes with UUID greater than current.

3. **[Q]** Ceph-MON on controllers - is it an active/active HA?

   **[A]** Yes, CEPH monitors are also master-master.  One of them is
   periodically becomes a leader. Leader is the node, which got the most
   recent cluster map replica first. Other monitor nodes must sync they
   cluster map with current leader. Every monitor node already synced with
   leader becomes provider and leader knows which nodes are currently
   providers. So, leader also tells the other nodes which provider each of
   them should use to get data from.
   CEPH monitor synchronization algorithm works similar way as Galera, but
   CEPH nodes are parted by functionality to monitor nodes and data storage
   nodes. In turn, every Galera node has all the same service set on each node.
   So, CEPH monitor nodes only manage where the data should be actually
   stored and maintain data consistency between OSD nodes.

4. **[Q]** Neutron - is it in active/standy HA? I got this understanding from docs
   and want to understand why. I was told that Grizzly and Havanna support multiple
   l3 agents, but we don't leverage it on some reason in Fuel.

   **[A]** Additionally to the previous answerers it should be added that Neutron is
   a router among the other functionality. It is the reason why there is a single
   entry point. 
