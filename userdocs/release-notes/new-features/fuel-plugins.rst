=====================
Fuel plugins features
=====================

Fuel Newton includes a number of enhancements related to Fuel
plugins.

Consumption of Fuel plugins from a public YUM repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Implemented a mechanism enabling plugins to bring their own scenarios
that can prepare a deployed Mirantis OpenStack environment for plugins
updates.

See :ref:`plugins_update_userguide`

Definition of Fuel release through the plugin framework
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Introduced a capability to express a Fuel release as a Fuel plugin.
The new functionality enables the user to define, maintain, and deploy
various flavors of customized OpenStack deployments. For example, the user
can deploy OpenStack Kilo using Fuel Mitaka or deploy a standalone Ceph
environment specifying a particular Ceph-only release.

See :ref:`describe-plugin` | `spec <https://specs.openstack.org/openstack/fuel-specs/specs/10.0/release-as-a-plugin.html>`__