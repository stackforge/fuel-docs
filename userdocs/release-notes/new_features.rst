============
New Features
============

Fuel Mitaka is the release of new features and bug fixes for
the leading purpose-built open source deployment and management tool
for OpenStack.

Fuel Mitaka introduces a set of new features and enhancements.
This section lists these improvements:

* Plugin developers can now dynamically add configuration fields to their
  plugins.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/dynamic-fields>`__.

* Added ability to stop and restart environment deployment without resetting
  the deployment process. See the :ref:`stop_deployment` section in the Fuel
  User Guide.
  This allows users to fix deployment errors and resume the deployment process
  without having to start it over completely.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/graceful-stop-restart-deployment>`__.

* Improved deployment orchestration to reduce deployment time and minimize
  technical and architectural efforts through task-based deployment with Astute.
  This further enables Fuel to provide the lifecycle management features such
  as :guilabel:`Unlocked Settings Tab`.

* All deployment tasks that Fuel uses when configuring OpenStack are now
  idempotent. This enables the lifecycle management features that require
  re-running of deployment tasks with the updated input data in the
  post-deployment stage of cloud lifecycle.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/granular-task-lcm-readiness>`__.

* Fuel can now deploy UCA packages.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/deploy-with-uca-packages>`__.

* Operators can now change OpenStack settings on the :guilabel:`Settings`
  tab in Fuel web UI for the cloud that is already deployed and apply the
  settings.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/granular-task-lcm-readiness>`__.

* Fuel API now allows to manually set virtual IP address to any valid
  IP address.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/allow-any-vip>`__.

* The node roles panel on the Fuel web UI has been redesigned to accommodate
  for the standard screen estate.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/redesign-of-node-roles-panel>`__.

* Enabled separate node deployment and operating system provisioning in the
  Fuel web UI.
  This allows users to adjust configuration and fix errors on a specific node
  or a subset of nodes without having to re-deploy or re-provision the entire
  cloud environment.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/allow-choosing-nodes-for-provisioning-and-deployment>`__.

* Enabled control groups management. OpenStack operators can now configure
  resource utilization thresholds for the OpenStack services and underlying
  software components using ``cgroups``. Specifying optimal values
  significantly increases performance and reliability of your cloud.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/cgroups>`__
