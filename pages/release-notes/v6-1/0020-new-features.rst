What's New in Mirantis OpenStack 6.1
====================================

Mirantis is pleased to make Mirantis OpenStack 6.1
available to our customers, partners and the community.

New Features Included in Mirantis OpenStack 6.1
-----------------------------------------------

Support for the latest OpenStack Juno release
+++++++++++++++++++++++++++++++++++++++++++++

The OpenStack core projects in
the Mirantis OpenStack hardened packages support
the `OpenStack Juno 2014.2
<https://wiki.openstack.org/wiki/ReleaseNotes/Juno>`_ release.
Fuel 6.1 deploys this version of OpenStack on either CentOS or Ubuntu.

The Fuel Master Node can be upgraded from 5.1.x or 6.0 to 6.1 GA
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

If you are running a Mirantis OpenStack 5.1, 5.1.1, or 6.0 environment,
you can upgrade your Fuel Master Node to Fuel 6.1
and keep your current Mirantis OpenStack environments in place
without requiring a redeployment.
After the upgrade, the Fuel Master Node can deploy a new Mirantis OpenStack 6.1
environment and manage environments that were deployed with an earlier Fuel
version, performing operational functions such as adding and deleting nodes,
viewing logs, and running Health Checks.

See :ref:`upgrade-ug` for instructions.

Upgrading the Fuel Master Node does not update the OpenStack environment. See
below for information about updating OpenStack environments.

.. include:: /pages/release-notes/v6-1/new-features/ubuntu-14-04.rst
.. include:: /pages/release-notes/v6-1/new-features/ubuntu-downloadable.rst
.. include:: /pages/release-notes/v6-1/new-features/ha-improve.rst
.. include:: /pages/release-notes/v6-1/new-features/200-nodes.rst
.. include:: /pages/release-notes/v6-1/new-features/granular-deploy.rst
.. include:: /pages/release-notes/v6-1/new-features/remove-node-inventory.rst
.. include:: /pages/release-notes/v6-1/new-features/verify-net.rst
.. include:: /pages/release-notes/v6-1/new-features/base-os-role.rst
.. include:: /pages/release-notes/v6-1/new-features/mos-separate-from-fuel.rst
.. include:: /pages/release-notes/v6-1/new-features/patch-openstack.rst
.. include:: /pages/release-notes/v6-1/new-features/external-dns-ntp.rst
.. include:: /pages/release-notes/v6-1/new-features/linux-bonds.rst
.. include:: /pages/release-notes/v6-1/new-features/virtual-router.rst
.. include:: /pages/release-notes/v6-1/new-features/neutron-agents.rst
.. include:: /pages/release-notes/v6-1/new-features/isoUSB.rst
.. include:: /pages/release-notes/v6-1/new-features/1-1-mapping.rst
.. include:: /pages/release-notes/v6-1/new-features/dual-hyperv-support.rst
.. include:: /pages/release-notes/v6-1/new-features/multiple-cinder-vcenter.rst
.. include:: /pages/release-notes/v6-1/new-features/vmware-ui-settings-tab.rst
.. include:: /pages/release-notes/v6-1/new-features/ceilometer-vcenter.rst
.. include:: /pages/release-notes/v6-1/new-features/mellanox-support.rst
.. include:: /pages/release-notes/v6-1/new-features/role-operations.rst

.. include:: /pages/release-notes/v6-1/new-features/plugins.rst

.. include:: /pages/release-notes/v6-1/new-features/neutron.rst
.. include:: /pages/release-notes/v6-1/new-features/nova.rst
.. include:: /pages/release-notes/v6-1/new-features/heat.rst
.. include:: /pages/release-notes/v6-1/new-features/horizon.rst
.. include:: /pages/release-notes/v6-1/new-features/cinder.rst
.. include:: /pages/release-notes/v6-1/new-features/glance.rst
.. include:: /pages/release-notes/v6-1/new-features/ceilometer.rst
.. include:: /pages/release-notes/v6-1/new-features/keystone.rst
.. include:: /pages/release-notes/v6-1/new-features/sahara.rst

.. include:: /pages/release-notes/v6-1/new-features/0000-exp-features.rst

.. include:: /pages/release-notes/v6-1/0023-other-enhancements.rst


Additional Information
----------------------

For information about Issues and Blueprints for Mirantis OpenStack 6.1,
see the `Fuel for OpenStack 6.1 Milestone
<https://launchpad.net/fuel/+milestone/6.1>`_ page.
