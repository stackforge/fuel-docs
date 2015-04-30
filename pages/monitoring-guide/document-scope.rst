.. _mg-document-scope:

Document Scope
==============

This guide is about how to monitor an OpenStack cloud from the perspective
of the operations staff with a focus on the infrastructure. As a result,
this guide is not directly intended to serve the monitoring needs of a
cloud user whether it has access to the administrator role or not because
as a cloud user you do not have root access to the servers and host
operating systems. The scope therefore includes some hardware monitoring
through IPMI, monitoring of the host operating system, monitoring of the
cloud management system and processes that are part of its ecosystem.

The processes supporting the cloud management system are roughly of two kind:

* The OpenStack service API endpoints, like *nova-api*, which receive the user
  requests.
* The OpenStack service workers connected to the AMQP bus, like *nova-scheduler*,
  which process the user requests.

The OpenStack services depend on a number of additional programs that are
not part of the OpenStack code base itself but which nonetheless are
critically important to monitor as we will see below. This includes but is
not limited to Libvirt, :ref:`MySQL<mysql-term>`, :ref:`RabbitMQ<rabbitmq-term>`,
:ref:`Memcached<memcached-term>`, :ref:`HAProxy<haproxy-term>`, :ref:`Corosync<corosync-term>`
and :ref:`Pacemaker<pacemaker-term>`.

The scope also includes the host operating systems, the servers and devices such
as the disks and network interface cards. Some amount of hardware health
checks via IPMI are performed to monitor the status of equipments such as the
fans and CPU temperature in an attempt to help with anticipating hardware
failures.

The scope of this document does not include the monitoring of the end-user
applications as well as the monitoring of the hardware equipments that are
vendor-specific or too complex to be practically addressed in this document.
This includes but is not limited to the following equipment categories.

The network gears
  The monitoring of the network gears such as switches and routers is
  vendor-specific and too large to be addressed here.

The storage gears
  The monitoring of the storage gears like SANs and NASs is vendor-specific
  and too large to be addressed here.
