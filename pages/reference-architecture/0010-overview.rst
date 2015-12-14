.. raw:: pdf

   PageBreak



.. _nodes-roles-arch:

OpenStack Environment Architecture
==================================

.. contents :local:

Fuel deploys an OpenStack Environment with nodes that provide a
specific set of functionality. In Fuel, you can deploy
an environment with a single controller node and then add extra
ones.

Even if you deploy a cluster with one controller only, Pacemaker will
handle all the necessary resources that run simultaneously (like in a
multi-controller deployment). If you decide to add extra controllers
to this cluster, Pacemaker will use the OCF scripts to
migrate services to the new controller nodes.

The OpenStack environment consists of multiple physical server nodes
(or an equivalent VM),
each of which is one of the following node types:

**Controller:**
  The :ref:`Controller<controller-node-term>` manages all activities in the environment.
  The `nova-controller` maintains the life cycle of the :ref:`OpenStack<openstack-term>` controller.

  .. note:: :ref:`HA<ha-term>` environment must consist of at least 3 controllers in order
    to achieve HA for :ref:`MySQL/Galera<galera-cluster-term>` cluster.
    And while two controllers could be enough for most of cases,
    such as HA for highly available OpenStack API services or reliable
    :ref:`RabbitMQ AMQP<rabbitmq-term>` messaging or resilient virtual
    IP addresses and load balancing, a third controller is required for
    quorum-based clusters, such as MySQL/Galera or :ref:`Corosync/Pacemaker<pacemaker-term>`.
    The configuration for stateless and statefull services in HA differs
    a lot. HA environments also contain active/active and active/passive
    components. Please, see
    `HA-guide <http://docs.openstack.org/high-availability-guide/content/ch-intro.html>`_
    for more details.
    Fuel configures all stateless OpenStack API services and RabbitMQ
    HA cluster as active/active. The MySQL/Galera cluster is configured
    as active/passive. For database clusters, active/active is sometimes referred
    to as multi-master environments. Such environments should be able to successfully
    handle multi-node writing conflicts. But OpenStack support for
    multi-node writing to MySQL/Galera nodes is
    `not production ready yet <http://lists.openstack.org/pipermail/openstack-operators/2014-September/005166.html>`_.
    "The simplest way to overcome this issue from the operator’s point of view is
    to use only one writer node for these types of transactions". That is why Fuel
    configures :ref:`HAProxy<haproxy-term>` frontend for MySQL/Galera to use only
    one active node, while the other nodes in the cluster are retained standby (passive) state.
    :ref:`Mongo<mongodb-term>` DB backend for :ref:`Ceilometer<ceilometer-term>`
    is also configured as active/passive.
    Note that it is possible to configure MySQL/Galera HA with
    two controller nodes and a lightweight arbitrator service running at
    some other node, but this deployment layout is not supported in Fuel.

  For more information about how Fuel deploys HA controllers,
  see :ref:`Multi-node_HA`.

**Compute:**
  Compute servers are the workhorses of your installation;
  they are the servers on which your users' virtual machines are created.
  `nova-compute` controls the life cycle of these VMs;
  Neutron Agent and Ceilometer Compute Agent may also run on Compute nodes.

**Storage:**
  OpenStack requires block and object storage to be provisioned.
  These can be provisioned as Storage nodes
  or as roles that run on Compute nodes.
  Fuel provides the following storage options out of the box:

  * Cinder LVM provides persistent block storage to virtual machines
    over iSCSI protocol.  The Cinder Storage node runs a Cinder Volume.

  * Swift object store can be used by Glance to store VM images and snapshots;
    it may also be used directly by applications
    Swift is the default storage provider that is provisioned
    if another storage option is not chosen when the environment is deployed.

  * Ceph combines object and block storage and can replace either one or
    both of the above.
    The Ceph Storage node runs Ceph OSD.

The key principle is that your controller(s) are separate from
the compute servers on which your user's VMs run.
