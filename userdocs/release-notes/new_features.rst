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

* Fuel plugins can now be managed on a deployed cloud through the Fuel web UI
  in :guilabel:`Unlocked Settings Tab`:

  * You can install plugins through the Fuel web UI.
  * Plugins can insert tasks in deployment graphs.
  * You can now change the settings of a plugin if supported. Consult with
    the plugin developer if not sure.

* Fuel now stores detailed information about all deployments. You can download
  the actual cluster settings, network configuration, and serialized cluster
  data.
  See :ref:`deployment-history` and :ref:`deployment-information`.

* You can now execute a particular deployment graph with the ability to merge
  it with the existing deployment graphs of the upstream master release.
  This allows you to implement complex orchestrated workflows -- bugfixes
  application, reference architecture altering, or even upgrades.

  See :ref:`custom-graph`.

* Fuel now supports lifecycle management tasks based on the history of
  cluster states. This data-driven feature allows the deployment engineers
  and plugin developers that use Fuel library deployment tasks to introduce
  expressions that can be computed within the context of cluster configuration.
  You can now control the tasks assignment and execution depending on the
  configuration or changes in the configuration.

  See :ref:`data-driven`.

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

* Enabled control groups management. OpenStack operators can configure
  resource utilization thresholds for the OpenStack services and underlying
  software components using ``cgroups``. Specifying optimal values helps
  to increase performance and reliability of your cloud.
  See :ref:`cgroups-intro`.
