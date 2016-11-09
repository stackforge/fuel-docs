============
New features
============

This section describes a set of features and enhancements introduced
in the Newton release.

.. note:: Fuel Newton uses Ubuntu 16.04 as a host operating system
          for OpenStack nodes.

Fuel Master node backup and restore
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Added support for the backup and restore of the Fuel Master node features.
You can use the backup archives to restore the Fuel Master node in case
of a hardware failure or other system malfunction.

See the Fuel User guide:

* :ref:`back-up-fuel`
* :ref:`restore-fuel`

Fuel web UI features
~~~~~~~~~~~~~~~~~~~~

Fuel Newton includes a number of enhancements related to the Fuel web UI.

Custom deployment workflows management
--------------------------------------

Extended the Fuel web UI with an ability to manage custom deployment
workflows. Now, you can list, remove, upload, download, and execute custom
deployment workflows in the :guilabel:`Dashboard` and :guilabel:`Workflows`
tabs on the :guilabel:`Environments` page.

See :ref:`workflows_manage` | `blueprint <https://blueprints.launchpad.net/fuel/+spec/ui-custom-graph>`__

Deployment details overview
---------------------------

Enabled the capability to view details about deployments for specific
OpenStack environments and their nodes in the Fuel web UI:

* To view a deployment task in progress, click :guilabel:`Show Details`
  under the deployment progress bar on the :guilabel:`Dashboard` tab.
* To view information about a deployed OpenStack environment, go to
  the :guilabel:`History` tab and select the required deployment.

See :ref:`view_history` | `blueprint <https://blueprints.launchpad.net/fuel/+spec/ui-deployment-history>`__

Fuel CLI versions consolidation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Consolidated two versions of the Fuel CLI ``fuel`` and ``fuel2``. The ``fuel2``
entry point now provides a complete set of features as well as contains
advanced capabilities and a better structured syntax of commands. The old
Fuel CLI will be deprecated in one of the future releases.

See :ref:`cli_comparison_matrix` | `blueprint <https://blueprints.launchpad.net/fuel/+spec/re-thinking-fuel-client>`__

Fuel plugins features
~~~~~~~~~~~~~~~~~~~~~

Fuel Newton includes a number of enhancements related to Fuel
plugins.

Consumption of Fuel plugins from a public YUM repository
--------------------------------------------------------

Extended the Fuel plugins distribution model by installing and updating
plugins from YUM repositories.

The advantages of such approach are as follows:

* Installation of a plugin on the Fuel Master node using
  the :command:`yum install <PLUGIN_NAME>` command.

* Updating a plugin on the Fuel Master node using
  the :command:`yum update <PLUGIN_NAME>` command.

* Ability to pre-populate a plugin YUM repository into Fuel Master node
  settings based on the Fuel Master node version.

See :ref:`plugins_install_userguide`

Deployment of plugins updates on a running environment
------------------------------------------------------

Implemented a mechanism enabling plugins to bring their own scenarios
that can prepare a deployed Mirantis OpenStack environment for plugins
updates.

See :ref:`plugins_update_userguide`

Definition of Fuel release through the plugin framework
-------------------------------------------------------

Introduced a capability to express a Fuel release as a Fuel plugin.
The new functionality enables the user to define, maintain, and deploy
various flavors of customized OpenStack deployments. For example, the user
can deploy OpenStack Kilo using Fuel Mitaka or deploy a standalone Ceph
environment specifying a particular Ceph-only release.

See :ref:`describe-plugin` | `spec <https://specs.openstack.org/openstack/fuel-specs/specs/10.0/release-as-a-plugin.html>`__

Data-driven task graphs for basic environment actions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In addition to a node deployment task graph, introduced a capability
to execute task graphs for the following basic actions in an environment:

* Node provisioning
* Node deletion
* Environment verification, that is network configuration check

See :ref:`workflow-intro` | `blueprint <https://blueprints.launchpad.net/fuel/+spec/graph-concept-extension>`__

Verification of the VMware vCenter server certificate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Added a capability to specify a Certificate Authority (CA) bundle file
to use for verifying the VMware vCenter server certificate for
the OpenStack Compute service, OpenStack Block Storage service, and
OpenStack Image service.

Depending on the needs of your environment, you can configure the VMware
vCenter server certificate verification on the :guilabel:`VMware` tab in
the Fuel web UI:

* If you plan to deploy an environment for testing purposes or want
  to speed up the deployment process, you can disable the certificate
  verification by checking
  :guilabel:`Bypass vCenter certificate verification`.

* If VMware vCenter is using a self-signed certificate, upload a CA
  certificate in the :guilabel:`CA file` field.
  Leave :guilabel:`Bypass vCenter certificate verification` unchecked.

* If a VMware vCenter server certificate is emitted by a known CA,
  for example, GeoTrust, leave the :guilabel:`CA file` field empty
  and :guilabel:`Bypass vCenter certificate verification` unchecked.

See :ref:`configure-vmware-vcenter-settings`

SSH brute force protection
~~~~~~~~~~~~~~~~~~~~~~~~~~

Implemented the possibility to add SSH brute force protection
for your OpenStack environment.

To activate SSH brute force protection:

#. Log in to the Fuel web UI.
#. Open the :guilabel:`Settings` tab.
#. Expand :guilabel:`Security` section.
#. In the :guilabel:`SSH Security` section, select
   :guilabel:`Restrict SSH service on network` check box.
#. Optionally, add secure networks.
#. Select :guilabel:`Brute force protection` check box.

See :ref:`settings-ug` | `LP1563721 <https://bugs.launchpad.net/fuel/+bug/1563721>`__

Creation of targeted diagnostic snapshots with Timmy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Replaced Shotgun with Timmy, a diagnostic utility for OpenStack environments
that simplifies and optimizes OpenStack troubleshooting.

Timmy enables you to create a diagnostic snapshot of your OpenStack
environment through CLI depending on your needs:

* Gather logging information from a single node or a subset of nodes
  filtered by an assigned role or a service running on the node.
* Designate the time frame which logging information should cover.
* Specify services, the logging information of which to be included into
  a snapshot.
* Specify a folder or a list of folders from where logging information
  should be retrieved, filter the logging files included in that folders
  by date and time, and include this logging information into the diagnostic
  snapshot.

See :ref:`create-snapshot` | `blueprint <https://blueprints.launchpad.net/fuel/+spec/shotgun-retirement>`__

S3 API authentication through Keystone
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Implemented the possibility to enable Keystone to authenticate queries
to S3 API on RadosGW using the Fuel CLI and Fuel web UI.

.. note::

   Enablement of the Keystone authentication for S3 API increases the load
   on the Keystone service. Consult with documentation and Mirantis support
   on mitigating the risks related with the high load of the Keystone service.

See `LP1540426`_ | `spec`_

.. _`LP1540426`: https://bugs.launchpad.net/mos/+bug/1540426
.. _`spec`: https://specs.openstack.org/openstack/fuel-specs/specs/10.0/s3-keystone-integration.html

Basic DMZ enablement
~~~~~~~~~~~~~~~~~~~~

Implemented the possibility to place public API endpoints and
OpenStack Dashboard into a separate secured network segment
usually called demilitarized zone (DMZ).

See `blueprint <https://blueprints.launchpad.net/fuel/+spec/separate-public-floating>`__

User documentation
~~~~~~~~~~~~~~~~~~

Fuel Newton includes a number of major user documentation updates:

* :ref:`upgrade_intro`
* :ref:`cli_comparison_matrix`
* :ref:`workflow-intro`
* :ref:`workflows_manage`
* :ref:`create-snapshot`
* :ref:`ug-troubleshooting`
