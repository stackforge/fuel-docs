Dictionary of terms used in this document
=========================================

Astute
------
Fuel orchestration tool?

Block Storage technology
------------------------

Ceilometer
----------

Ceph
----
An open source technology that provides unified object, block, and file storage.
For more information, see the `Ceph documentation <http://ceph.com/docs/master/>`_

For information about deploying Ceph in Mirantis OpenStack,
see `<Storage Architecture <http://docs.mirantis.com/fuel/fuel-4.0/reference-architecture.html#storage-architecture>`_.

Cinder
------
Cinder is the code name for the OpenStack Block Storage project.
Cinder storage is fault-tolerant, scalable, and recoverable.
It was originally a Nova component but is now an independent project.
For more information, see the
`Cinder developer documentation <http://docs.openstack.org/developer/cinder/>`_.

Fuel supports Cinder
For information about deploying Cinder in Mirantis OpenStack,
see `<Storage Architecture <http://docs.mirantis.com/fuel/fuel-4.0/reference-architecture.html#storage-architecture>`_.

Corosync
------

DevStack
------
An OpenStack package that can be installed and deployed on your laptop
or inside a VM on a cloud or other machine for evaluation purposes.
DevStack runs in emulation mode so does not give the same performance
as OpenStack running on dedicated hardware.
See the `DevStack web page <http://devstack.org/>`_
for installation instructions.

fencing
------
Process of locking resources away from a node whose status is uncertain.
Ceph supports fencing but you must ensure
that no controllers host both the Ceph OSD and Ceph Mon rolls.

Galera Cluster for MySQL
------------------------
Galera is a synchronous multi-master cluster
for the MySQL database.
Mirantis OpenStack supports MySQL/Galeria for HA deployments;
see `<http://docs.mirantis.com/fuel/fuel-4.0/frequently-asked-questions.html#other-questions>`_
for more information.

Grizzly
-------
Code name for the seventh release of the OpenStack software.
For more information, see the
`Grizzly web site <http://www.openstack.org/software/grizzly/>`_.
The RHEL OpenStack distribution that is supported by Fuel 4.0
incorporates and supports the Grizzly code base.

Havana
------
Code name for the eighth release of the OpenStack software.
For more information, see the
`Havana web site <http://www.openstack.org/software/havana/>`_.
Mirantis OpenStack version 4.0 incorporates and supports the Havana code base.

Heat
----
Main project in the OpenStack Orchestration program. 
Heat uses a template that humans can read and write
and that can be maintained under source code control.
See the `Heat wiki <https://wiki.openstack.org/wiki/Heat>`_
for more information.

Inktank
-------
Company that supports and promotes Ceph.
See the `Inktank web page <http://www.inktank.com>`_.

Ironic
------
OpenStack project forked from the Nova project's Baremetal driver.
See the `Ironic wiki page <https://wiki.openstack.org/wiki/Ironic>`_.

Native VLAN
-----------
An untagged VLAN on a tagged port.

Fuel server
-----------
A server with the Mirantis Fuel application installed,
also commonly referred to as the Fuel Master Node

Node server
-----------
A server that used as a node (Controller, Compute, or Storage)
within an OpenStack environment.

L2 network
----------
A separate Layer 2 network (VLAN) as a single broadcast domain.

Mirantis OpenStack
------------------
Hardened OpenStack distribution plus additional services
for high availability deployed by Fuel.

mySQL
------

  See `Preparing MySQL for Pacemaker high availability` <http://docs.openstack.org/trunk/openstack-ops/content/security_groups.html`_.

Nailgun server
--------------
Fuel uses nailgun for ??

Note that this is not the Nailgun that provides
a JVM in which Java programs can be run without incurring
the standard JVM startup overhead. 
See the `Nailgun web page <http://www.martiansoftware.com/nailgun/>`_
for more information.

Neutron
-------
OpenStack Core project to provide networking as a service
between interface devices such as vNICS
that are managed by other OpenStack services such as Nova.
See the `Neutron web page <https://wiki.openstack.org/wiki/Neutron>`_
for more information.

Mirantis OpenStack includes Neutron;
see `Neutron Deployment <http://docs.mirantis.com/fuel/fuel-4.0/pre-install-guide.html#neutron>`_
for a description of the recommended network configuration parameters
for using the Neutron service.

NIC
---
Network Interface Card (physical Ethernet port)

Nova
----
OpenStack Core project used for compute nodes;
all major Nova components can be run on multiple servers
and use message queues for communication between components.
See the `Nova web page <http://docs.openstack.org/developer/nova/>`_
for more information.

Mirantis OpenStack includes the Nova-network deployment model
which offers the FlatDHCPManager and VLAN Manager options
for deploying private networks for tenants;
see `Nova-network Deployment Model` <http://docs.mirantis.com/fuel/fuel-4.0/pre-install-guide.html#nova-network>`_
for more information about using Nova-network in Mirantis OpenStack.

The Baremetal driver used for provisioning in Nova
has recently been forked into its own project; see "Ironic".

Object Storage technology
-------------------------
Provides a fully distributed, API-accessible storage platform
that can be integraed directly into applications
or used for backup, archiving, and data retention.
This is not a traditional file system
but rather a distributed storage system for static data
such as virtual machine images, photo storage, email storage,
backups, and archives.
Objects and files are written to multiple disk drives
spread across different servers in the data center;
the OpenStack software ensures data replication and integrity
across the cluster.

OpenStack
---------
Open source software that can be used
to deliver a massively scalable cloud operating system
that can be used for private and public clouds.
For more information, see the
`OpenStack web page <http://www.openstack.org/>`_ and
`OpenStack documentation <http://docs.openstack.org/>`_.

The Mirantis OpenStack distribution packages
a stable version of the open source pieces
into an installable package that deploys an operating system 
based on either Ubuntu or CentOS.
and adds Fuel to simplify the deployment and management tasks.
Fuel can also manage the Red Hat OpenStack distribution
that deploys the Red Hat Operating System on the OpenStack nodes.

OVS (Open vSwitch)
------------------
Production quality, multilayer virtual switch licensed under the open source
`Apache 2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>`__  license.

Pacemaker
---------
Master control process for OpenStack High Availability deployments.
Pacemaker is part of the Corosync services and is not specific to OpenStack.
See `The Pacemaker Cluster Stack` <http://docs.openstack.org/high-availability-guide/content/ch-pacemaker.html>`_
for information about how Pacemaker is used with OpenStack;
for more in-depth information about Pacemaker, see the
`Pacemaker web page <http://clusterlabs.org/doc/>`_.

Fuel uses Pacemaker to implement its Multi-Node-HA deployment.

Puppet
------
Puppet modules bring scalable and reliable IT automation
to OpenStack cloud deployments.
See the `Puppet web page <http://puppetlabs.com/solutions/cloud-automation/compute/openstack>`_ for more details.

Fuel uses Puppet as the configuration management system
that compiles a set of instructions
for a configurable, reproducible, and sharable installation process.

Security groups
---------------
Sets of IP filter rules that are applied to an instance's networking.
Most projects provide a "default" security group
that is applied to instances that have no security group defined.
See the `Security groups web page <http://docs.openstack.org/trunk/openstack-ops/content/security_groups.html>`_
for more information.

Note that Savanna does does not provide a default security group.
(xref info in https://review.openstack.org/#/c/71299/)
for information about defining a default security group for Savanna).

STP
---
Spanning Tree Protocol

Tagged port
-----------
802.1q frames from a switch to a server network card.
