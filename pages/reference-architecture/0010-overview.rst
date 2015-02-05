.. raw:: pdf

   PageBreak



.. _nodes-roles-arch:

OpenStack Environment Architecture
==================================

.. contents :local:

Fuel deploys an OpenStack Environment
with nodes that provide a specific set of functionality.
Beginning with Fuel 5.0,
a single architecture model can support HA (High Availability)
and non-HA deployments;
you can deploy a non-HA environment
and then add additional nodes to implement HA
rather than needing to redeploy the environment from scratch.

The OpenStack environment consists of multiple physical server nodes
(or an equivalent VM),
each of which is one of the following node types:

**Controller:**
  The :ref:`Controller<controller-node-term>` manages all activities in the environment.
  `nova-controller` maintains the life cycle of the :ref:`Openstack<openstack-term>` controller.

  .. note:: :ref:`HA<ha-term>` environment must consist of at least 3 controllers in order
    to achieve HA for :ref:`MySQL/Galera<galera-cluster-term>` cluster. And while two controllers could
    be enough for the most of cases, such as HA for highly available
    Openstack API services or reliable :ref:`RabbitMQ AMQP<rabbitmq-term>` messaging or resilient virtual
    IP addresses and load balancing, third controller is required for
    quorum based clusters, such as MySQL/Galera or :ref:`Corosync/Pacemaker<pacemaker-term>`.
    The configuration for stateless and statefull services in HA differs
    a lot. HA environment also contains active/active and active/passive
    components. Please see `HA-guide <http://docs.openstack.org/high-availability-guide/content/ch-intro.html>`_ for more details.
    Fuel configures all stateless Openstack API services and RabbitMQ
    HA cluster as active/active. The MySQL/Galera cluster is configured as
    active/passive as multi-master write operations in Openstack components
    are not production ready yet. :ref:`Mongo<mongodb-term>` DB backend for :ref:`Ceilometer<ceilometer-term>` is also
    configured as active/passive with no sharding enabled. Please also
    note that it is possible to make MySQL/Galera HA with two nodes and a
    lightweight arbitrator service but this deployment layout is not
    supported for now.

  For more information about how Fuel deploys HA controllers,
  see :ref:`Multi-node_HA`.

**Compute:**
  Compute servers are the workhorses of your installation;
  they are the servers on which your users' virtual machines are created.
  `nova-compute` controls the life cycle of these VMs;
  Neutron Agent and Ceilometer Compute Agent may also run on Compute nodes.

  .. note::  In environments that Fuel deploys
     using vCenter as the hypervisor,
     the  :ref:`Nova-compute<nova-term>` service
     can run only on Controller nodes.
     Because of this, Fuel does not allow you
     to :ref:`assign<assign-roles-vcenter-ug>`
     the "Compute" role to any node
     when using vCenter.

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
