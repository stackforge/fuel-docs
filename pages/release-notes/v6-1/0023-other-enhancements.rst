Other Enhancements
==================

* OpenStack nodes no longer lose DNS and NTP
  on Fuel Master node outage.
  See `LP1347718 <https://bugs.launchpad.net/bugs/1347718>`_ and
  the `Support External DNS and NTP <https://blueprints.launchpad.net/fuel/+spec/external-dns-ntp-support>`_ blueprint.

* In an environment with more than 60 tenant networks, rescheduling a Neutron
  agent to a different controller no longer times out and leaves behind orphaned
  networks and dnsmasq processes.
  See `LP1405477 <https://bugs.launchpad.net/bugs/1405477>`_.

* admin_token* is no longer used. Now OSTF and Nailgun use
  their users to validate Keystone tokens instead of admin_token.
  See `LP1385343 <https://bugs.launchpad.net/bugs/1385343>`_.

* /root/openrc* is not used for OpenStack component scripts
  anymore. Instead, use component specific credentials (Nova, Neutron, Glance
  and so on). See `LP1396594 <https://bugs.launchpad.net/bugs/1396594>`_.

.. include:: /pages/release-notes/v6-1/new-features/bios-dev-network.rst
.. include:: /pages/release-notes/v6-1/new-features/atop.rst

.. include:: /pages/release-notes/v6-1/new-features/image-provision.rst
.. include:: /pages/release-notes/v6-1/new-features/mongodb-external.rst

