.. _metadata.yaml:

=============
metadata.yaml
=============

The file :ref:`metadata.yaml` contains a various metadata related to a plugin:

Example:

.. code-block:: ini

	# Plugin name
	name: elasticsearch_kibana
	# Human-readable name for your plugin
	title: The StackLight Elasticsearch-Kibana Server Plugin
	# Plugin version
	version: '1.0.0'
	# Description
	description: Deploy Elasticsearch and the Kibana web interface.
	# Required fuel version
	fuel_version: ['8.0', '9.0']
	# Licences
	licenses: ['Apache License Version 2.0']
	# Specify author or company name
	authors: ['Mirantis Inc.']
	# A link to the plugin homepage
	homepage: 'https://github.com/openstack/fuel-plugin-elasticsearch-kibana'
	groups: ['monitoring']
	is_hotpluggable: true

	# The plugin is compatible with releases in the list
	releases:
		- os: ubuntu
			version: liberty-8.0
			mode: ['ha']
			deployment_scripts_path: deployment_scripts/
			repository_path: repositories/ubuntu
		- os: ubuntu
			version: liberty-9.0
			mode: ['ha']
			deployment_scripts_path: deployment_scripts/
			repository_path: repositories/ubuntu
		- os: ubuntu
			version: mitaka-9.0
			mode: ['ha']
			deployment_scripts_path: deployment_scripts/
			repository_path: repositories/ubuntu

	# Version of plugin package
	package_version: '4.0.0'

Fields:


   * ``name`` -- Name of the plugin that will be in the plugin's RPM file name.
     The allowed name characters are lowercase letters, dash ``-``, and
     underscore ``_``.
   * ``title`` -- Human-readable plugin name displayed on the Fuel web UI.
   * ``version`` -- Plugin version. For guidelines, see
     `Semantic Versioning 2.0.0 <http://semver.org/>`_.
   * ``fuel_version`` -- The Fuel version that your plugin is compatible with.
     Currently, the builder verifies ``fuel_version`` only against
     ``package_version``. The ``package_version`` field must be supported
     by the Fuel versions listed at the bottom of this section.
     Leaving this field empty will skip the check. For format guidelines,
     see `_ClassType StrictVersion <http://epydoc.sourceforge.net/stdlib/distutils.version.StrictVersion-class.html>`_.
   * ``licenses`` -- List the licenses under which your plugin can be
     distributed.
   * ``authors`` -- Name of the plugin author. A company or an individual.
   * ``homepage`` -- A link to page with your plugin. This can be your plugin's
     GitHub repository page.
   * ``is_hotpluggable`` -- State if the plugin is hot-pluggable.
     See :ref:`plugin-hotpluggable`.
   * ``groups`` -- A group to which your plugin belongs in the Fuel web UI.
   * ``releases`` --  A list of OpenStack releases compatible with the plugin.

     * ``releases: os`` -- A compatible Linux distribution for the plugin.
       The supported values are ``ubuntu`` and ``centos``. Fuel 8.0 supports
       only Ubuntu.
     * ``releases: version`` -- A compatible OpenStack release version.
       Fuel Plugin Builder does not validate the ``releases: version``
       field; but if there is no OpenStack release with the same version
       on the Fuel Master, the user cannot enable the plugin. See also a
       note in :ref:`install-plugin-builder`.
     * ``releases: mode`` -- A list of compatible cluster deployment modes.
       Fuel 8.0 supports only the ``haz`` value.
     * ``releases: deployment_scripts_path`` -- A path in your plugin directory
       where all the deployment scripts for the release are. The path is
       relative to the plugin root.
     * ``releases: repository_path`` -- A path in your plugin directory where
       all the packages for the release are. Relative to the plugin root.

   * ``package_version`` -- A version of the compatible plugin format.
     To build your plugin, the Fuel Plugin Builder version must be the same
     as the version of the compatible plugin format or newer. Each new plugin
     format version introduces new features and, possibly, deprecates some of
     the old ones. The Fuel master node must support the specific
     ``package_version``, otherwise, you cannot install the plugin.

