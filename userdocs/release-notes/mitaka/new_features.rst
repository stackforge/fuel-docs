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
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/graceful-stop-restart-deployment>`__.

* Improved deployment orchestration to reduce deployment time and minimize
  technical and architectural efforts through task-based deployment with Astute.

* All Fuel tasks are now idempotent. This makes Fuel lifecycle-manageable.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/granular-task-lcm-readiness>`__.

* Fuel can now deploy UCA packages.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/deploy-with-uca-packages>`__.

* Operators can now change deployment settings on the :guilabel:`Settings` tab
  of the Fuel web UI after deploying an OpenStack environment.
  The new settings can then be redeployed for an existing environment.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/granular-task-lcm-readiness>`__.

* Fuel API now allows to manually set virtual IP address to any valid
  IP address.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/allow-any-vip>`__.

* The node roles panel on the Fuel web UI has been redesigned to accommodate
  for the standard screen estate.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/redesign-of-node-roles-panel>`__.

* Enabled separate node deployment and operating system provisioning in the
  Fuel web UI.
  See `blueprint <https://blueprints.launchpad.net/fuel/+spec/allow-choosing-nodes-for-provisioning-and-deployment>`__.