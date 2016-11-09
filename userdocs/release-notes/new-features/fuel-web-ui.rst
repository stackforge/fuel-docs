====================
Fuel web UI features
====================

Fuel Newton includes a number of enhancements related to the Fuel web UI.

Custom deployment workflows management
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Extended the Fuel web UI with an ability to manage custom deployment
workflows. Now, you can list, remove, upload, download, and execute custom
deployment workflows in the :guilabel:`Dashboard` and :guilabel:`Workflows`
tabs on the :guilabel:`Environments` page.

See :ref:`workflows_manage` | `blueprint <https://blueprints.launchpad.net/fuel/+spec/ui-custom-graph>`__

Deployment details overview
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Enabled the capability to view details about deployments for specific
OpenStack environments and their nodes in the Fuel web UI:

* To view a deployment task in progress, click :guilabel:`Show Details`
  under the deployment progress bar on the :guilabel:`Dashboard` tab.
* To view information about a deployed OpenStack environment, go to
  the :guilabel:`History` tab and select the required deployment.

See :ref:`view_history` | `blueprint <https://blueprints.launchpad.net/fuel/+spec/ui-deployment-history>`__