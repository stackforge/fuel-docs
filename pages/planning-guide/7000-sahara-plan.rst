
.. _sahara-plan:

Planning a Sahara Deployment
============================

:ref:`Sahara<sahara-term>` enables users
to easily provision and manage Apache Hadoop clusters
in an OpenStack environment.
Sahara works with either Release 1.x or 2.x of Hadoop.

The Sahara control processes run on the Controller node.
The entire Hadoop cluster runs in VMs
that run on Compute Nodes.
A typical set-up is:

- One VM that runs management and monitoring processes (Apache Ambari,
  Cloudera Manager, Ganglia, Nagios)
- One VM that serves as the Hadoop master node
  to run JobTracker (ResourceManager for Hadoop Release 2.x) and NameNode.
- Many VMs that serve as Hadoop worker nodes,
  each of which runs TaskTracker (NodeManager for Hadoop Release 2.x)
  and DataNodes.

You must have exactly one instance of each management and master processes
running in the environment. Other than that,
you are free to use other configurations.
For example, you can run the TaskTracker/NodeManager and DataNodes
in the same VM that runs JobTracker/ResourceManager and NameNode;
such a configuration may not produce performance levels
that are acceptable for a production environment
but it works for evaluation and demonstration purposes.
You could also run DataNodes and TaskTrackers in separate VMs.

Sahara can use either :ref:`swift-object-storage-term` or :ref:`ceph-term`
for object storage.
Special steps are required to implement data locality for Swift;
see `Data-locality <http://docs.openstack.org/developer/sahara/userdoc/features.html#data-locality>`_
for details.
Data locality is not available for Ceph storage backend.

Plan the size and number of nodes for your environment
based on the information in :ref:`nodes-roles-plan`.

When deploying an OpenStack Environment
that includes Sahara for running Hadoop
you need to consider a few special conditions.

**Floating IPs**

Fuel configures Sahara to use floating IPs to manage the VMs.
This means that you must provide a Floating IP pool
in each Node Group Template you define.
See :ref:`public-floating-ips-arch` for general information
about floating IPs.

A special case is if you are using Nova-Network
and you have set the **auto_assign_floating_ip** parameter to true
by checking the appropriate box on the Fuel UI.
In this case, a floating IP is automatically assigned to each VM
and the "floating ip pool" dropdown menu
is hidden in the OpenStack Dashboard.

In either case, Sahara assigns a floating IP to each VM it spawns
so be sure to allocate enough floating IPs.

**Security Groups**

Sahara can create and configure security groups separately for each cluster
depending on a provisioning plugin and Hadoop version.
:ref:`Security Groups<security-groups-term>`

**VM Flavor Requirements**

Hadoop requires at least 1Gb of RAM to run.
That means you must use flavors that have
at least 1Gb of memory for Hadoop cluster nodes.

**Communication between virtual machines**

Be sure that communication between virtual machines is not blocked.

For additional information about using Sahara to run
Apache Hadoop, see the
`Sahara documentation <http://docs.openstack.org/developer/sahara/overview.html>`_.
