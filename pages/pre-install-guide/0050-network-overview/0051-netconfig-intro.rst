.. index:: Network Configuration Options

.. _NetworkConfiguration:

Network Configuration Options
=============================

This section describes how to configure network settings depending on
your environment requirements and prerequisites.

Networks used by OpenStack
--------------------------

**Public network** is used for communication between a cluster and external
networks (the Internet, corporate network, end users).

**Floating network** is used for communication from external networks to
VMs. A Floating network IP address can be assigned to a single VM.

**Storage network** is part of cluster’s internal network. It is used
to separate storage traffic (Swift, Ceph, iSCSI, and so on) from other types of
cluster’s internal communications.

**Management network** is also part of a cluster’s internal network. It serves
all other internal communications, including DB queries, AMQP messaging,
high availability services, and so on.

**Private network** is an internal network used for VM’s communications between
tenants (also called Fixed network).

**Administrative network** is a network shared between the Fuel master node
and all clusters deployed by the Fuel master node. It’s used for
administrative purposes and network-based installation of Node servers.

**OVS**  is an abbreviation for Open vSwitch, a production quality, multilayer
virtual switch licensed under the open source `Apache
2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>`_  license.

For more information about networks,  see
:ref:`Reference Architecture<ref-arch>`.

