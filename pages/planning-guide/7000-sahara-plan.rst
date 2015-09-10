
.. _sahara-plan:

Planning a Sahara Deployment
============================

:ref:`Sahara<sahara-term>` enables users
to easily provision and manage Apache Hadoop clusters
in an OpenStack environment.
Sahara supports only 2.x Release of Hadoop.

The Sahara control processes run on the Controller node.
The entire Hadoop cluster runs in VMs
that run on Compute Nodes.
A typical set-up is:

- One VM that runs management and monitoring processes (Apache Ambari,
  Cloudera Manager, Ganglia, Nagios)
- One VM that serves as the Hadoop master node
  to run ResourceManager and NameNode.
- Many VMs that serve as Hadoop worker nodes,
  each of which runs NodeManager and DataNodes.

You must have exactly one instance of each management and master processes
running in the environment. Other than that,
you are free to use other configurations.
For example, you can run the NodeManager and DataNodes
in the same VM that runs ResourceManager and NameNode;
such a configuration may not produce performance levels
that are acceptable for a production environment
but it works for evaluation and demonstration purposes.
You could also run DataNodes and TaskTrackers in separate VMs.

Sahara can use either :ref:`swift-object-storage-term` or :ref:`ceph-term`
for object storage.

Note, if Swift public URL configured with SSL, Sahara will work only with
prepared :ref:`images<sahara-images-ops>`.

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

Sometimes it is impossible to provide access to all nodes (because of limited
number of floating IPs or security policies). In these cases access can be
gained using other nodes of the cluster as proxy gateways. To enable this you
should set **is_proxy_gateway** parameter to true for the node group you want
to use as proxy. Sahara will communicate with all other cluster instances
through the instances of this node group.

Note, if **use_floating_ips** is set to true and the cluster contains a node
group with **is_proxy_gateway=True**, the requirement to have
**floating_ip_pool** specified is applied only to the proxy node group.
Other instances will be accessed through proxy instances using the standard
private network.

Note, the Cloudera Hadoop plugin doesn't support access to the Cloudera manager
through a proxy node. This means that for CDH clusters only nodes with
the Cloudera manager can be designated as proxy gateway nodes.

**Security Groups**

Sahara can create and configure security groups separately for each cluster
depending on a provisioning plugin and Hadoop version.
:ref:`Security Groups<security-groups-term>`

**VM Flavor Requirements**

Hadoop requires at least 1Gb of RAM to run.
That means you must use flavors that have
at least 1Gb of memory for Hadoop cluster nodes.

**Hardware-assisted virtualization**

In order for Sahara to work properly, hardware-assisted virtualization
must be enabled for the hypervisor used by OpenStack. Its absence leads
to frequent random errors during Hadoop deployment, because in that case
VMs are too 'weak' to run such a heavywight application. To ensure that
Sahara will work properly, you should do two things:

- While deploying OpenStack environment via Fuel UI, select hypervisor
  other than QEMU.
- Make sure that CPUs on compute nodes support
  hardware-assisted virtualization. To check that, run
  the following command on deployed compute nodes:

  ::

      cat /proc/cpuinfo  | grep --color "vmx\|svm"

While most modern x86 CPUs support hardware-assisted virtualization,
its support still might be absent on compute nodes if they are themselves
running as virtual machines. In that case hypervisor running compute
nodes must support passing through hardware-assisted virtualization to
nested VMs and have it enabled. VirtualBox does not have that feature,
and as a result environments deployed as described in the :ref:`QuickStart 
Guide <quickstart-guide>` will have Sahara working poorly.

**Communication between virtual machines**

Be sure that communication between virtual machines is not blocked.

**Default templates**

Sahara bundles default templates that define simple clusters for the supported
plugins. These templates are already added to the sahara database so you don't
have to worry about their creation.

There is an overview of the supported default templates for each plugin:

For Vanilla Apache Hadoop 2.6.0:

There are 2 node groups created for this plugin. First one is named
vanilla-2-master and contains all management Hadoop components - NameNode,
HistoryServer and ResourceManager. It also includes Oozie server required to
run Hadoop jobs. Second one is named vanilla-2-worker and contains components
required for data storage and processing - NodeManager and DataNode.

The cluster template is also represented for this plugin. It's named vanilla-2
and contains 1 master and 3 worker nodes.

For Cloudera Hadoop Distribution (CDH) 5.4.0:

There are 3 node groups created for this plugin. First one is named
cdh-5-master and contains all management Hadoop components - NameNode,
HistoryServer and ResourceManager. It also includes Oozie server required to
run Hadoop jobs. Second one is named cdh-5-manager and contains Cloudera
Management component that provides UI to manage Hadoop cluster. Third one is
named cdh-5-worker and contains components required for data storage and
processing - NodeManager and DataNode.

The cluster template is also represented for this plugin. It's named cdh-5
and contains 1 manager, 1 master and 3 worker nodes.

For Hortonworks Data Platform (HDP) 2.2:

There are also 2 node groups created for this plugin. First one named
hdp-2-2-master and contains all management Hadoop components - Ambari,
NameNode, MapReduce HistoryServer, ResourceManager, YARN Timeline Server,
ZooKeeper. It also includes Oozie server required to run Hadoop jobs.
Second one named hdp-2-2-worker and contains components required for data
storage and processing - NodeManager and DataNode.

The cluster template is also represented for this plugin. It's named hdp-2-2
and contains 1 master and 4 worker nodes.


For additional information about using Sahara to run
Apache Hadoop, see the
`Sahara documentation <http://docs.openstack.org/developer/sahara/overview.html>`_.
