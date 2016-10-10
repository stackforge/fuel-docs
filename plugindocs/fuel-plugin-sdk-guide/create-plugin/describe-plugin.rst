
.. _describe-plugin:

Describe your plugin
--------------------

The Fuel Plugin Builder generates three files:

* LICENSE -- free-form information file.
* README.md -- free-form information file.
* :ref:`metadata.yaml` -- mandatory file in YAML format. Your plugin cannot
  build without :ref:`metadata.yaml`.

.. note:: You can put any files -- even the ones not directly related to
   Fuel Plugin Builder -- in the plugin directory. Fuel Plugin Builder
   will add all the files to the plugin package.

**To describe your plugin**

#. Edit the ``LICENSE`` file so that it contains the license, under which
   your plugin can be redistributed. You may want to use the
   `Apache 2.0 <http://www.apache.org/licenses/LICENSE-2.0>`_ license.
   All plugin files that provide intellectual property must have a respective
   copyright.

#. Edit the ``README.md`` file -- put some free-form description of the plugin
   here. Describe the purpose of your plugin and give instructions on the
   installation. If you publish the code of your plugin on GitHub, the contents
   of this file will be on the main page of the repository. You can use
   MarkDown formatting in the file. For more information see
   `Getting started with writing on GitHub <https://help.github.com/articles/getting-started-with-writing-and-formatting-on-github/>`_. Good examples of plugin description:
   `Mellanox <https://github.com/openstack/fuel-plugin-mellanox/blob/stable/3.0.0/README.md>`_
   and `LMA Collector <https://github.com/openstack/fuel-plugin-lma-collector>`_.

#. Edit the ``metadata.yaml`` file with the list of required parameters:

   * ``name`` -- Name of the plugin that will be in the plugin's RPM file name.
     The allowed name characters are lowercase letters, dash ``-``, and
     underscore ``_``.
   * ``title`` -- Human-readable plugin name displayed on the Fuel web UI.
   * ``version`` -- Plugin version. For guidelines, see :ref:`plugin_versioning_system`.
   * ``licenses`` -- List the licenses under which your plugin can be
     distributed.
   * ``authors`` -- Name of the plugin author. A company or an individual.
   * ``homepage`` -- A link to page with your plugin. This can be your plugin's
     GitHub repository page.
   * ``is_hotpluggable`` -- State if the plugin is hot-pluggable.
     See :ref:`plugin-hotpluggable`.
   * ``groups`` -- A group to which your plugin belongs in the Fuel web UI.
   * ``releases`` --  A list of OpenStack releases compatible with the plugin.

     * ``release_name:`` -- Name of the release.
     * ``description:`` -- Description of the release.
     * ``releases: os`` -- A compatible Linux distribution for the plugin.
       The supported values are ``ubuntu`` and ``centos``. Fuel 8.0 supports
       only Ubuntu.
     * ``version`` -- A compatible OpenStack release version.
     * ``is_release:`` -- Must be set to ``true`` for plugins that define
       releases: ``is_release: true``.
     * ``releases: mode`` -- A list of compatible cluster deployment modes.
       Fuel 8.0 supports only the ``haz`` value.
     * ``releases: deployment_scripts_path`` -- A path in your plugin directory
       where all the deployment scripts for the release are. The path is
       relative to the plugin root.
     * ``releases: repository_path`` -- A path in your plugin directory where
       all the packages for the release are. Relative to the plugin root.
     * ``base_release_path`` -- Defines the template from which to inherit
        the data tree by overriding keys.
     * ``networks_path`` -- Path to the ``networks.yaml`` file.
     * ``volumes_path`` -- Path to the ``volumes.yaml`` file.
     * ``roles_path`` -- Path to the ``roles.yaml`` file.
     * ``network_roles_path`` -- Path to the ``network_roles.yaml`` file.
     * ``components_path`` -- Path to the ``components.yaml`` file.
     * ``attributes_path`` -- Path to the ``attributes.yaml`` file.
     * ``vmware_attributes_path`` -- Path to the ``vmware.yaml`` file.
     * ``node_attributes_path`` -- Path to the ``node.yaml`` file.
     * ``nic_attributes_path`` -- Path to the ``nic.yaml`` file.
     * ``bond_attributes_path`` -- Path to the ``bond.yaml`` file.
     * ``graphs`` -- Graph types:

       * ``type: default`` and ``tasks_path`` -- Path to the
         ``deployment_graph.yaml`` file.
       * ``type: provisioning`` and ``tasks_path`` -- Path to
         the ``provisioning_graph.yaml`` file.
       * ``type: deletion`` and ``tasks_path`` -- Path to the
         ``deletion_graph.yaml`` file.
       * ``type: network_verification`` and ``tasks_path`` --
         Path to the ``network_verification_graph.yaml`` file.
       * ``deployment_scripts_path`` -- Path to the deployment scripts for the
         release.
       * ``repository_path`` -- Path to the repositories.

   * ``package_version`` -- A version of the compatible plugin format.
     To build your plugin, the Fuel Plugin Builder version must be the same
     as the version of the compatible plugin format or newer. Each new plugin
     format version introduces new features and, possibly, deprecates some of
     the old ones. The Fuel master node must support the specific
     ``package_version``, otherwise, you cannot install the plugin.
   * ``build_version`` -- A version of the build that allows to iterate the
     package version without updating the plugin version. You can specify
     a value in any format, such as timestamp and so on. If the value is empty,
    fpb adds "1" at the end of the plugin's output file name. For example,
    ``plugin-x.x-x.x.x-1.rpm``.

   See the `metadata.yaml example <https://github.com/openstack/fuel-plugin-openbook/blob/master/metadata.yaml>`_.

We recommend that you create a directory ``doc`` in your plugin root
directory and put extensive documentation there.

You can find more information about preparing documentation for Fuel plugins
on `GitHub <https://github.com/Mirantis/fuel-plugin-docs>`_.
