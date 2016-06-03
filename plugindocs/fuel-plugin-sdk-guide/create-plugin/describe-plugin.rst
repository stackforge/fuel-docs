
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
   * ``title`` -- Human-readable plugin name.
   * ``version`` -- Plugin version.
   * ``description`` -- A short description of the plugin purpose. This will
     be displayed in the Fuel web UI, once the environment with the plugin is
     deployed.
   * ``fuel_version`` -- The Fuel version that your plugin is compatible with.
   * ``licenses`` -- List the licenses under which your plugin can be
     distributed.
   * ``authors`` -- Name of the plugin author. A company or an individual.
   * ``homepage`` -- A link to page with your plugin. This can be your plugin's
     GitHub repository page.
   * ``groups`` -- A group to which your plugin belongs on the Fuel web UI.
   * ``releases: os`` -- A compatible operating system for the plugin.
   * ``releases: version`` -- A compatible OpenStack version.
   * ``releases: mode`` -- Plugin mode.
   * ``releases: deployment_scripts_path`` -- A path for the deployment script.
   * ``releases: repository_path`` -- A path for the compatible operating system.
   * ``package_version`` -- Version of the plugin package.

   See the `metadata.yaml example <https://github.com/openstack/fuel-plugin-openbook/blob/master/metadata.yaml>`_.