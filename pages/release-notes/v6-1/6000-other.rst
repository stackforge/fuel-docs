
.. _other-rn:

Issues in OpenStack Components
==============================

* Glance may create unjustified CPU load on a standby cluster.
  The issue is with the multiple concurrent actions with the
  cloud (e.g. various CRUD operations) performed by users.
  Each new action may create a heavier load on the CPU.
  The workaround is to restart the affected service, which will
  drop the CPU consumption by the service back to almost zero.
  See `LP1463522 <https://bugs.launchpad.net/fuel/+bug/1463522>`_.

* An attempt to create a Glance image with incorrect checksum
  results in a 500 error.
  See `LP1452712 <https://bugs.launchpad.net/fuel/+bug/1452712>`_.

* Rebooting more than one controller may cause nova-compute services to
  stop reporting their status. This is an issue with the oslo.messaging
  queuing.
  See `LP1465757 <https://bugs.launchpad.net/fuel/+bug/1465757>`_
  and `LP1463440 <https://bugs.launchpad.net/fuel/+bug/1463440>`_.

* Disk partitioning on controllers does not automatically reset back
  to the default state if a Glance backend is changed.
  See `LP1450100 <https://bugs.launchpad.net/fuel/+bug/1450100>`_.

* Keystone is currently limited to ~150 requests per second which
  may produce a heavy load and slow down the performance in
  large environments.
  See `LP1313662 <https://bugs.launchpad.net/fuel/+bug/1313662>`_.

* If nova-network is selected for an OpenStack installation with Fuel,
  it is impossible to install Murano at same time.
  Murano can be installed manually on a deployed OpenStack environment,
  and will work with nova-network.
  See `LP1462341 <https://bugs.launchpad.net/fuel/+bug/1462341>`_.

* Murano does not delete stack after a failed deployment
  of a Kubernetes cluster.
  See `LP1461564 <https://bugs.launchpad.net/fuel/+bug/1461564>`_.

.. include:: /pages/release-notes/v6-1/other/2010-general.rst
.. include:: /pages/release-notes/v6-1/other/4010-horizon.rst
.. include:: /pages/release-notes/v6-1/other/6040-murano.rst
.. include:: /pages/release-notes/v6-1/other/4020-keystone.rst
.. include:: /pages/release-notes/v6-1/other/5010-ceilometer-mongodb.rst
.. include:: /pages/release-notes/v6-1/other/2020-glance.rst
