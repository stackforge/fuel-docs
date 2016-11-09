===============
Resolved issues
===============

This section lists a number of resolved issues. For a
complete list, see the
`Fuel for OpenStack <https://bugs.launchpad.net/fuel>`__ Launchpad
project.

* Added the partition alignment option that enables
  alignment modes: none, cylinder, minimal, and optimal.
  ``fuel-agent`` may mistakenly assume that partition can not
  fit the specified boundaries throwing the ``WrongPartitionSchemeError``
  error. This happens when the end of a particular partition crosses 1 M
  boundary and because of partition boundaries are rounded up. To resolve the
  issue, change the default partition alignment mode from ``optimal`` to
  ``minimal`` in the ``/etc/fuel-agent/fuel-agent.conf`` configuration file
  in the bootstrap image. `LP1584804`_

* Improved performance of the tasks serialization process in case when
  an environment contains many nodes by making the serialization
  process work in parallel. `LP1587278`_

* Fixed the ``keystone-manage db_sync`` failure because of the temporary
  unavailability of the database. `LP1592819`_ | `LP1592401`_

* Fixed the issue that prevented a user from logging in to an environment node
  using the :command:`ssh node-<SLAVE_NODE_ID>` command. `LP1567957`_

* Fixed the DHCP checker issue that resulted in the following error:
  ``Spawning listener for <NIC> failed. <NIC>: That device is not up``.
  `LP1569325`_

* Fixed the issue with swapping incorrectly plugged network interfaces.
  `LP1593190`_

* Fixed the issue with the :command:`fuel2 task history` command showing
  irrelevant tasks.
  `LP1590872`_

* Fixed the issue with Mirantis OpenStack occasionally failing to install from
  virtual media.
  `LP1605740`_

* Fixed the issue with Nailgun becoming unresponsive when attempting
  to deploy 200 nodes.
  `LP1569859`_

* Fixed the issue with provisioning of approximately 200 nodes failing due to
  the Astute and Cobbler timeouts. `LP1608700`_

* Updated ``mysql-wsrep`` to v5.6.33 to avoid failures in connecting
  to MySQL during an environment deployment. `LP1607793`_

* Replaced the ``merge_yaml_settings`` resource with an advanced
  ``merge_yaml`` module that contains additional options to control the
  behavior of merging the YAML configuration. The fix eliminates the
  idempotency issues when several instances require a modification of the
  same file, and, as a result, arrays are merged incorrectly. `LP1614279`_

* Fixed the issue with the DHCP checker failing on bootstrap nodes with the
  following error message: *Spawning listener for <NIC> failed. <NIC>: That
  device is not up*. `LP1569325`_

* Now, the hardcoded ``['controller', 'primary-controller']`` roles names
  of the NTP server can be overridden. `LP1563465`_

.. _`LP1584804`: https://bugs.launchpad.net/fuel/+bug/1584804
.. _`LP1587278`: https://bugs.launchpad.net/fuel/+bug/1587278
.. _`LP1592819`: https://bugs.launchpad.net/fuel/+bug/1592819
.. _`LP1592401`: https://bugs.launchpad.net/fuel/+bug/1592401
.. _`LP1567957`: https://bugs.launchpad.net/fuel/+bug/1567957
.. _`LP1569325`: https://bugs.launchpad.net/fuel/+bug/1569325
.. _`LP1593190`: https://bugs.launchpad.net/fuel/+bug/1593190
.. _`LP1590872`: https://bugs.launchpad.net/fuel/+bug/1590872
.. _`LP1605740`: https://bugs.launchpad.net/fuel/+bug/1605740
.. _`LP1603084`: https://bugs.launchpad.net/fuel/+bug/1603084
.. _`LP1569859`: https://bugs.launchpad.net/fuel/+bug/1569859
.. _`LP1608700`: https://bugs.launchpad.net/fuel/+bug/1608700
.. _`LP1607793`: https://bugs.launchpad.net/fuel/+bug/1607793
.. _`LP1614279`: https://bugs.launchpad.net/fuel/+bug/1614279
.. _`LP1569325`: https://bugs.launchpad.net/fuel/+bug/1569325
.. _`LP1563465`: https://bugs.launchpad.net/fuel/+bug/1563465
