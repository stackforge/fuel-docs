.. raw:: pdf

   PageBreak

.. index Reference Architectures

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
  The Controller manages all activities in the environment.
  `nova-controller` maintains the life cycle of the Controller.
  along with RabbitMQ, HAProxy, MySQL/Galera,
  the Pacemaker Cluster (Corosync and Pacemaker),
  Keystone, Glance, and Cinder.
  Other services that may optionally run on the Controller include
  Heat, Neutron, Swift, Ceph Monitor, Ceilometer,
  Sahara, and Murano.

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
