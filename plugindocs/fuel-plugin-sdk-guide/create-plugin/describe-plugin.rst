
.. _describe-plugin:

Describe your plugin
--------------------

The Fuel Plugin Builder generates three files:

* LICENSE -- free-form information file.
* README.md -- free-form information file.
* ``metadata.yaml`` -- mandatory file in YAML format. Your plugin cannot
  build without ``metadata.yaml``.

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

   * ``name`` -- Name of the plugin that will be in the plugin's RPM filename.
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
   * ``is_hotpluggable`` -- State if the plugin is hotpluggable.
     See :ref:`plugin-hotpluggable`.
   * ``groups`` -- A group to which your plugin belongs on the Fuel web UI.
   * ``releases`` --  A list of OpenStack releases compatible with the plugin.

     * ``releases: os`` -- A compatible Linux distribution for the plugin.
       The supported values are ``ubuntu`` and ``centos``. Fuel 8.0 supports
       only Ubuntu.
     * ``releases: version`` -- A compatible OpenStack release version.
       Fuel Plugin Builder does not validate the ``releases: version``
       field; but if there is no OpenStack release with the same version
       on the Fuel master, the user cannot enable the plugin. See also a
       note in :ref:`install-plugin-builder`.
     * ``releases: mode`` -- A list of compatible cluster deployment modes.
       Fuel 8.0 supports only the ``haz`` value.
     * ``releases: deployment_scripts_path`` -- A path in your plugin directory
       where all the deployment scripts for the release are. The path is
       relative to the plugin root.
     * ``releases: repository_path`` -- A path in your plugin directory where
       all the packages for the release are. Relative to the the plugin root.

   * ``package_version`` -- A version of the compatible plugin format.
     To build your plugin, the Fuel Plugin Builder version must be the same
     as the version of the compatible plugin format or newer. Each new plugin
     format version introduces new features and, possibly, deprecates some of
     the old ones. The Fuel master node must support the specific
     ``package_version``, otherwise you cannot install the plugin.

   See the `metadata.yaml example <https://github.com/openstack/fuel-plugin-openbook/blob/master/metadata.yaml>`_.

It is recommended that you create a directory ``doc`` in your plugin root
directory and put extensive documentation there.

You can find more information about preparing documentation for Fuel plugins
on `GitHub <https://github.com/Mirantis/fuel-plugin-docs>`_.

Plugin format: Fuel versions mapping
------------------------------------

The table below shows the existing plugin format versions and the versions of
Fuel starting from which they are supported:

+---------------+-------+-------+-------+-------+-------+
| Plugin format | 1.0.0 | 2.0.0 | 3.0.0 | 4.0.0 | 5.0.0 |
+---------------+-------+-------+-------+-------+-------+
| Fuel          | 6.0   | 6.1   | 7.0   | 8.0   | 9.0   |
+---------------+-------+-------+-------+-------+-------+

