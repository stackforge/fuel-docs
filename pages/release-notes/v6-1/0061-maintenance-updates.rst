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

* :doc:`1463802-rpc-clients` RPC clients cannot find a reply
  queue after the last RabbitMQ server restarts in the cluster

* :doc:`1466490-neutron-l2` Neutron L2 agent performs a DoS
  because of incorrectly allowed address pairs

* :doc:`1462991-libvirt-hard` [libvirt] Handle empty context
  on _hard_reboot

* :doc:`1466552-centos-radosgw` CentOS radosgw doesn't start
  after reboot

* :doc:`1469149-backend-argument` backend_argument containing a
  password leaked in logs


Proposed updates
----------------

There are no proposed updates available at the moment.

