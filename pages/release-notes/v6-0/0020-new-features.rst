What's New in Mirantis OpenStack 6.0 Technical Preview
======================================================

Mirantis is pleased to make the Mirantis OpenStack 6.0 Technical Preview
available to our customers, partners and the community.

You can download the Technical Preview from the `Juno Technical Preview
<http://software.mirantis.com/6.0-openstack-juno-tech-preview/>`_ web site.

Your feedback is important to us and we want to hear from you - please file bug
reports, find us on IRC, submit blueprints, ask questions and let us know how
to improve. See the `How to contribute
<https://wiki.openstack.org/wiki/Fuel/How_to_contribute#How_and_where_to_get_help>`_
Wiki page for details on how to get in touch with us.

A number of features that are planned for the 6.0 release are still under
development at the time of the Technical Preview release. We describe these
features below, with links to blueprints and specifications for each feature.
Please do not expect that every feature described here will be included in the
final 6.0 product exactly as described here.

This document also includes preliminary information about
Resolved Issues and Known Issues for the 6.0 release.

Technical Preview Limitations
-----------------------------

The following limitations apply to
the Mirantis OpenStack 6.0 Technical Preview:

- We are providing this technical preview to get feedback.
  Do not use it in production.
- No upgrade/update path from earlier releases is provided.
- No upgrade/update path will be provided
  from the technical preview to the GA release.

New Features included in Mirantis OpenStack 6.0 Technical Preview
=================================================================

Support for the latest OpenStack Juno release
---------------------------------------------

The OpenStack core projects in the Mirantis OpenStack hardened packages support
the `OpenStack Juno 2014.2
<https://wiki.openstack.org/wiki/ReleaseNotes/Juno>`_ release. Fuel 6.0 deploys
this version of OpenStack on either CentOS or Ubuntu.

.. include:: /pages/release-notes/v6-0/new-features/ml2.rst
.. include:: /pages/release-notes/v6-0/new-features/l3-multiple-agents.rst
.. include:: /pages/release-notes/v6-0/new-features/glance-vmdk.rst
.. include:: /pages/release-notes/v6-0/new-features/vlan-for-vcenter.rst
.. include:: /pages/release-notes/v6-0/new-features/1-1-instance-vsphere-map.rst
.. include:: /pages/release-notes/v6-0/new-features/statistics.rst


New Features Under Development for Mirantis OpenStack 6.0
=========================================================

The following features are under development for Mirantis OpenStack 6.0 but are
not completed for the Technical Preview.

.. include:: /pages/release-notes/v6-0/new-features/ha-improve.rst
.. include:: /pages/release-notes/v6-0/new-features/plugin-arch.rst
.. include:: /pages/release-notes/v6-0/new-features/image-provision.rst
.. include:: /pages/release-notes/v6-0/new-features/100-node.rst
.. include:: /pages/release-notes/v6-0/new-features/l2-multiple.rst
.. include:: /pages/release-notes/v6-0/new-features/DNS-NTP-external.rst
.. include:: /pages/release-notes/v6-0/new-features/mongodb-external.rst
.. include:: /pages/release-notes/v6-0/new-features/ceilometer-vcenter.rst
.. include:: /pages/release-notes/v6-0/new-features/nsx.rst
.. include:: /pages/release-notes/v6-0/new-features/sahara-vcenter.rst
.. include:: /pages/release-notes/v6-0/new-features/fuel-upgrade.rst
.. include:: /pages/release-notes/v6-0/new-features/openstack-update.rst

Improvements for Fuel Contributors
==================================

Fuel can build ISO with upstream vanilla OpenStack code
-------------------------------------------------------

A Fuel ISO can now be built from the stable/juno branch of the upstream
OpenStack repositories and we are working on the ability to build a Fuel ISO
from the upstream master branch. This will provide community developers a way
to deploy recent modifications that have been made to OpenStack using Fuel, and
to build OpenStack packages and Fuel ISO images that include these
modifications. See the `Install openstack from upstream source repositories
<https://blueprints.launchpad.net/fuel/+spec/openstack-from-master>`_ blueprint
for implementation details.

Public CI environment is available to contributors
--------------------------------------------------

The Fuel team now maintains a public CI infrastructure that contributors can
use to build, test and publish rpm and deb packages for Fuel dependencies,
which are not part of stackforge (for instance, MCollective).
Code and package build scripts (rpm specs and deb rules) are stored in
Git+Gerrit with Launchpad authorization. Any Launchpad user can propose a
commit for review in this system.

CI process is provided by Jenkins with the Gerrit-trigger plugin. It tracks the
code reviews and runs the unit tests in a prepared environment, reporting the
results back to the Gerrit review. Users can access the Jenkins job logs for
more detailed information about the test results.

When unit tests pass, Jenkins sends the code to the build service for packaging, which is performed in a clean environment using the Open Build
Service. Users can view Jenkins job artifacts to see what information about
building was passed to Jenkins.

After a successful build, Jenkins uploads the package to a public repository,
and then performs basic functional tests on the package in a specially prepared
OpenStack environment. See the `OSCI infrastructure to public
<https://blueprints.launchpad.net/fuel/+spec/osci-to-public>`_ blueprint for
implementation details.

Additional Information
----------------------

For current information about Issues and Blueprints for Mirantis OpenStack 6.0,
see the `Fuel for OpenStack 6.0 Milestone
<https://launchpad.net/fuel/+milestone/6.0>`_ page.

