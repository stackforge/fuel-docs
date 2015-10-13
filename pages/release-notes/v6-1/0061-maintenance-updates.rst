Maintenance Updates
===================

This section contains a list of available maintenance updates for
Mirantis OpenStack 6.1.
For detailed information on a specific update, please refer to the
information below. For general considerations on applying
updates, see :ref:`patching-ops`.

.. warning:: The instructions below are part of Mirantis OpenStack
   Maintenance Updates. Applying Mirantis OpenStack Maintenance
   Updates may cause a downtime of entire OpenStack cluster or
   specific OpenStack services.
   Please schedule maintenance window and notify cloud users in
   advance.

.. note:: Applying Mirantis OpenStack Maintenance Updates may
   override manually applied custom patches.

   It’s recommended to back up your deployment and test updates on
   your staging environment before applying updates to production.
   Please consult Mirantis Support if you have any questions or
   concerns.

Security updates
----------------

There are no urgent security updates available at the moment.


Published updates
-----------------

Maintenance Update 1:
+++++++++++++++++++++

* :ref:`#1463802 <mos61mu-1463802>` RPC clients cannot find a reply
  queue after the last RabbitMQ server restarts in the cluster

* :ref:`#1466490 <mos61mu-1466490>` Neutron L2 agent performs a DoS
  because of incorrectly allowed address pairs

* :ref:`#1462991 <mos61mu-1462991>` [libvirt] Handle empty context
  on _hard_reboot

* :ref:`#1466552 <mos61mu-1466552>` CentOS radosgw doesn't start
  after reboot

* :ref:`#1469149 <mos61mu-1469149>` backend_argument containing a
  password leaked in logs

Maintenance Update 2:
+++++++++++++++++++++

* :ref:`#1486907 <mos61mu-1486907>` Cumulative OpenStack update (7 fixes)

* :ref:`#1467671 <mos61mu-1467671>` Node with Broadcast NetXtreme II NIC
  failed to reboot

Proposed updates
----------------

* :ref:`#1504916 <mos61mu-1504916>` Cumulative OpenStack update (14 fixes)

* :ref:`#1452389 <mos61mu-1452389>` logrotate is rotating already rotated atop's logs

* :ref:`#1487517 <mos61mu-1487517>` Status of alarms and queues is silently ignored in RabbitMQ monitoring OCF
