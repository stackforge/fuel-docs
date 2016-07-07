
.. _create-auto-plugin:

Create an automatically generated plugin
----------------------------------------

The automatically generated plugin is a template for your plugin.

The automatically generated plugin does the following:

#. Creates the file ``/tmp/plugin.all`` on all nodes in the environment.
#. Runs the ``deployment_scripts/deploy.sh`` script. This creates the
   ``/tmp/fuel-plugin-example file`` on the controllers.
#. Creates a new role ``fuel-plugin-example_role``.

**To create an automatically generated plugin**

#. Log into the Fuel Master node.
#. Run:

   .. code-block:: console

      fpb --create fuel-plugin-example

 This will generate the following files:

 +----------------------------------------------+--------------------------------------------------+
 | File                                         | Descrption                                       |
 +==============================================+==================================================+
 |``components.yaml``                           |Fuel web UI components                            |
 +----------------------------------------------+--------------------------------------------------+
 |``deployment_scripts``                        |Directory for the plugin tasks code               |
 +----------------------------------------------+--------------------------------------------------+
 |``deployment_scripts/deploy.sh``              |Shell script sample                               |
 +----------------------------------------------+--------------------------------------------------+
 |``deployment_tasks.yaml``                     |Definition of plugin tasks                        |
 +----------------------------------------------+--------------------------------------------------+
 |``environment_config.yaml``                   |Fuel web UI plugin parameters                     |
 +----------------------------------------------+--------------------------------------------------+
 |``fuel-plugin-example-1.0-1.0.0-1.noarch.rpm``|A plugin package created after you build a plugin |
 +----------------------------------------------+--------------------------------------------------+
 |``LICENSE``                                   |Standard Apache 2.0 license file                  |
 +----------------------------------------------+--------------------------------------------------+
 |``metadata.yaml``                             |Plugin information                                |
 +----------------------------------------------+--------------------------------------------------+
 |``network_roles.yaml``                        |Network roles data                                |
 +----------------------------------------------+--------------------------------------------------+
 |``node_roles.yaml``                           |Definition of new node roles created by the plugin|
 +----------------------------------------------+--------------------------------------------------+
 |``pre_build_hook``                            |Actions to run on plugin build                    |
 +----------------------------------------------+--------------------------------------------------+
 |``README.md``                                 |Free-form description of plugin                   |
 +----------------------------------------------+--------------------------------------------------+
 |``repositories``                              |Directory for plugin specific packages            |
 +----------------------------------------------+--------------------------------------------------+
 |``repositories/centos``                       |Directory for plugin CentOS packages              |
 +----------------------------------------------+--------------------------------------------------+
 |``repositories/ubuntu``                       |Directory for plugin Ubuntu packages              |
 +----------------------------------------------+--------------------------------------------------+
 |``tasks.yaml``                                |Deprecated, use ``deployment_tasks.yaml`` instead |
 +----------------------------------------------+--------------------------------------------------+
 |``volumes.yaml``                              |Mapping between node roles and volume allocation. |
 |                                              |You can also define new volumesand map them to the|
 |                                              |new or existing nodes.                            |
 +----------------------------------------------+--------------------------------------------------+

#. Build the automatically generated plugin:

   .. code-block:: console

      fpb --build fuel-plugin-example

#. Copy the plugin to the Fuel Master node.

#. Deploy a new environment.

#. Install the plugin:

   .. code-block:: console

      fuel plugins --install fuel-plugin-example/fuel-plugin-example-1.0-1.0.0-1.noarch.rpm

   The resulting RPM file is what you need to redistribute to the end user.

.. note:: The RPM file resulting from the :command:`fpb --build` command is
          usually all you need to redistribute the plugin to the end user.
          But, despite the plugin's package being a standard RPM package, the
          user must not install it directly using the RPM CLI tool, because
          the nailgun database cannot be updated with the plugin information
          this way. The correct method to install Fuel plugins is by using
          the :command:`fuel plugins` coomand. The benefit distributing in
          RPM format is the ability to automatically upgrade plugins using
          YUM. Keep in mind that currently Fuel does not support plugin
          upgrades from one major version to another.

After installing the plugin, you can view it in the Fuel web UI on the
:guilabel:`Plugins` tab.

You can also verify the plugin installation using Fuel CLI:

.. code-block:: console

   # fuel plugins --list
   id | name                | version | package_version
   ---|---------------------|---------|----------------
   1  | fuel-plugin-example | 1.0.0   | 4.0.0

**To enable the installed plugin**

#. In the Fuel web UI, click :guilabel:`Other`, then :guilabel:`Settings`.
#. Check the plugin box.

.. note:: If you can see your plugin in the ``fuel plugins --list`` output,
          but not in the Fuel web UI, then your plugin does not support the
          installed version of Fuel. Specifically, the plugin does not have
          the version of the Fuel Master node in its ``metadata.yaml``.

.. tip:: By default, all plugin settings are under the group 'Other'. To place
         your plugin settings to a different group, specify it
         ``in environment_config.yaml``.

.. tip:: Tip: Although after you install the plugin, you see the plugin
         settings in the deployed environment, you cannot enable the plugin.
         Enabling a plugin after deployment makes sense only in one case:
         when this adds a new node role and a node with this role can be
         added after the environment is deployed. In this case use the keyword
         ``is_hotppluggable`` in ``metadata.yaml``