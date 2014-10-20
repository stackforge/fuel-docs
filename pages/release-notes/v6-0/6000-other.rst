
.. _other-rn:

Issues in other components
==========================

.. include:: /pages/release-notes/v6-0/other/4010-horizon.rst
.. include:: /pages/release-notes/v6-0/other/6040-murano.rst
.. include:: /pages/release-notes/v6-0/other/4020-keystone.rst
.. include:: /pages/release-notes/v6-0/other/5010-ceilometer-mongodb.rst
.. include:: /pages/release-notes/v6-0/other/5030-zabbix.rst


Known issues for 6.0
--------------------

Development issues
++++++++++++++++++

* Fuel ISO build system is unable to pick up base packages
  from EXTRA_DEB_REPOS.
  See `LP1381672 <https://bugs.launchpad.net/fuel/+bug/1381672>`_.

* Make iso command fails in the "Create chroot for Ubuntu"
  step with   no clear error
  message. See `LP1383216 <https://bugs.launchpad.net/fuel/+bug/1383216>`_.

UI issues
+++++++++

* Some of OpenStack logs (e.g. sahara-api and nova) are not displayed in Fuel UI.
  See `LP1381545 <https://bugs.launchpad.net/fuel/+bug/1381545>`_.

* If 'Image' provisioning is selected at the Settings tab,
  the progress bar does not work.
  See `LP1383748 <https://bugs.launchpad.net/fuel/+bug/1383748>`_.

* If you do not choose any new role for the added node
  after deployment, "Deploy Changes" button becomes enabled.
  See `LP1383330 <https://bugs.launchpad.net/fuel/+bug/1383330>`_.

Other
+++++

* KVM module did not not load during compute nodes deployment.
  See `LP1383800 <https://bugs.launchpad.net/fuel/+bug/1383800>`_.

* A deployment fails by timeout with errors in Puppet log.
  See `LP1378834 <https://bugs.launchpad.net/fuel/+bug/1378834>`_.

* Deployment fails at MongoDB with timeout error.
  See `LP1382694 <https://bugs.launchpad.net/fuel/+bug/1382694>`_.

* Provisioning does not succeed after cluster reset.
  See `LP1378700 <https://bugs.launchpad.net/fuel/+bug/1378700>`_.

* RabbitMQ does not keep non-default users after failover.
  See `LP1383258 <https://bugs.launchpad.net/fuel/+bug/1383258>`_.

* Heat-engine service is stopped after successful deployment
  and OSTF tests. See `LP1382413 <https://bugs.launchpad.net/fuel/+bug/1382413>`_.

* When more than 50 nodes are deployed on CentOS, one node may
  hang with 'waiting hardware to initialize' message.
  See `LP1381059 <https://bugs.launchpad.net/fuel/+bug/1381059>`_.




