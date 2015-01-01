
.. _fuel-general.rst:

OpenStack Deployment Issues
===========================

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

* File injection no longer fails when an instance launches
  See `LP1335697 <https://bugs.launchpad.net/bugs/1335697>`_.

* Nova floating range now waits for both Keystone backends.
  See `LP1381982 <https://bugs.launchpad.net/bugs/1381982>`_.

* Previously, default Neutron networks were created
  with admin tenant name, even if a custom name was applied
  in the cluster settings. This problem is now fixed.
  See `LP1376515 <https://bugs.launchpad.net/bugs/1376515>`_.

* Rsyslogd restart no longer causes services to hang.
  See `LP1363102 <https://bugs.launchpad.net/bugs/1363102>`_.

* Applying iptables rules during large scale deployments
  is now faster.
  See `LP1399168 <https://bugs.launchpad.net/bugs/1399168>`_.

* Enabling Murano on CentOS will no longer break redeployment of a
  controller node.
  See `LP1401503 <https://bugs.launchpad.net/bugs/1401503>`_.

Known Issues in 6.0
-------------------

Deploying new controllers causes services downtime
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When :ref:`adding controllers<add-controller-ops>`
to an existing environment,
nova-api is unavailable for a few minutes,
which causes services to be unavailable.
See `LP1370067 <https://bugs.launchpad.net/fuel/+bug/1370067>`_.

An instance may hang after live migration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An instance may hang with a kernel panic
after a live migration operation completes successfully.
The root cause is not yet known,
but is probably related to qemu-kvm/libvirt issues.
Using offline migration of instances is recommended
until this issue is resolved.
See `LP1371130 <https://bugs.launchpad.net/mos/+bug/1371130>`_

