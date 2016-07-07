
.. _add-settings:

Add plugin settings to the Fuel web UI
--------------------------------------

You can add your plugin settings to the Fuel web UI.

**To add plugin settings to the Fuel web UI**

To place plugin specific settings to the Fuel web UI on the
:guilabel:`Settings` tab, you must edit the ``environment_config.yaml`` file.

An automatically generated plugin contains only one example text field setting
in the group :guilabel:`Other`:

.. code-block:: ini

   attributes:
    metadata:
     # Settings group can be one of "general", "security", "compute",
       "network",
     # "storage", "logging", "openstack_services" and "other".
     group: 'other'
    fuel-plugin-example_text:
     value: 'Set default value'
     label: 'Text field'
     description: 'Description for text field'
     weight: 25
     type: "text"

Change the file to include more UI elements definitions:

.. code-block:: ini

   attributes:

   # Text field
   fuel_plugin_example_text:
     type: "text"
     weight: 10
     value: "default value"
     label: "Text field label"
     description: "Field description"
     regex:
       source: '\S'
       error: "Error field cannot be empty"

   # Select
   fuel_plugin_example_select:
     type: "select"
     weight: 20
     value: "value2"
     label: "Select label"
     description: "Select description"
     values:
       - data: "value1"
         label: "Value 1 label"
       - data: "value2"
         label: "Value 2 label"
       - data: "value3"
         label: "Value 3 label"

   # Checkbox
   fuel_plugin_example_checkbox:
     type: "checkbox"
     weight: 30
     value: true
     label: "Checkbox label"
     description: "Checkbox description"

   # Radio button
   fuel_plugin_example_radio:
     type: "radio"
     weight: 40
     value: "data1"
     label: "Radio buttons label"
     values:
       - data: "data1"
         label: "Label data1"
         description: "Description data1"
       - data: "data2"
         label: "Label data2"
         description: "Description data2"
       - data: "data3"
         label: "Label data3"
         description: "Description data3"

.. note:: There is no ``group`` for plugin settings in this example, so the
          settings for the plugin are under the default group
          :guilabel:`Other` in the :guilabel:`Settings` tab of the Fuel web
          UI. You can specify one of the values  ``general``, ``security``,
          ``compute``, ``network``, ``storage``, ``logging``,
          ``openstack_services``, ``other`` as the group to place plugin
          settings in. All of the groups with the exception of ``network``
          will be placed in the :guilabel:`Settings` tab, settings in the
          ``network`` group will be put in the :guilabel:`Networks` tab.
          Currently it is not possible to spread the settings for one plugin
          between multiple groups.

**Debug the Fuel web UI settings**

Changes in ``environment_config.yaml`` affect only the environments which you
create after the changes, even if you use :command:`fuel plugins --sync`.
The Nailgun database stores each piece of the environment settings at the time
of the environment creation. During this time the synchronisation process does
not update the settings.

To debug the Fuel web UI settings, use one of the following approaches:

* Create a new environment after changing the settings definition. This might
  be tedious, but you can speed up the process by using the command like this
  from Fuel CLI:

  .. code-block:: console

     # fuel env create --name settings-test --rel 2 ; read -p 'Press
     any key to delete test env...' key;  fuel env --delete --env
     `fuel env | grep settings-test | cut -d\| -f1`
     Environment 'test2' with id=20 was created!
     Press any key to delete test env...
     Environment with id=20 was deleted

  This command creates an environment with the name ```settings-test``, waits
  while you press any key, then deletes it. Unfortunately, you cannot just
  reload the web page with the UI settings after using this command, as the
  URL contains the environment ID, which is new for each created environment.

* Download the settings for the existing environment with the command
  :command:`fuel --env <env-id> settings --download`, find your settings by
  searching for the substring with the name of your plugin in the downloaded
  file -- named ``settings_<env-id>.yaml`` -- and then upload the file back
  with the command :command:`fuel --env <env-id> settings --upload`. The plugin
  must be enabled in the environment for this method to work.

Ensure that your browser does not use a stale page cache. In many browsers you
can use the shortcut SHIFT-F5 (CMD-R in Mac OS) to reload the page skipping
browser's cache.

.. note:: This is also true for minor version updates. If the new minor
          version has new UI settings, they will not be present on the
          :guilabel:`Settings` tab for an existing environments after
          the update. This is crucial for hot-pluggable plugins, as they
          are should work on the already deployed environments.
          To resolve this, do the following:

          #. Create a new environment with the new version of the plugin.
          #. Download the new plugin's UI settings and the settings
             for the environment that you update.
          #. Copy the downloaded settings of the plugin to the existing
             environment and upload edited settings back to the existing
             environment.

.. note:: This is always a good idea to ensure that your browser bypasses
          cache before trying to debug issues with the Fuel web UI.

Before the deployment starts, Astute uploads all settings to the the
``/etc/astute.yaml`` file on each of the target nodes. This file contains
the section for the plugin:

.. code-block:: ini

   fuel-plugin-example:
    fuel_plugin_name_checkbox: true
    fuel_plugin_name_radio: data1
    fuel_plugin_name_select: value2
    fuel_plugin_name_text: default value
    metadata:
     always_editable: false
     class: plugin
     enabled: true
     label: Title for fuel-plugin-example plugin
     plugin_id: 1
     plugin_version: 1.0.0
     toggleable: true
     weight: 70

The metadata fields, which are not defined explicitly in
``environment_config.yaml``, receive default values, while each of the UI
elements sets a corresponding parameter in ``astute.yaml``.

One of the core tasks named ``hiera`` configures hiera so that ``astute.yaml``
becomes one of the sources of information for it. Using ``hiera`` to get the
values for the settings as opposed to manual parsing of ``astute.yaml`` is
strongly recommended.

Examples of ``hiera`` lookups:

Bash:

.. code-block:: ini

   STR=$(hiera “str”)
   HASH=$(hiera -h “hash_name”)
   ARRAY=$(hiera -a “array_name”)

Puppet:

.. code-block:: ini

   $str = hiera(‘str’, ‘’)
   $arr = hiera_array(‘arr_name’, [])
   $hash = hiera_hash(‘hash_name’, {})

Ruby:

.. code-block:: ini

   #!/usr/bin/env ruby
   require 'hiera'
   ENV['LANG'] = 'C'
   hiera = Hiera.new(:config => '/etc/hiera.yaml')
   glanced = hiera.lookup 'glance', {} , {}, nil, :hash
   nodes_array = hiera.lookup 'nodes', [], {}, nil, :array

Use :command:`hiera <plugin name>` to verify all of the plugin settings
from the shell prompt on a target node:

.. code-block:: console

   # hiera fuel-plugin-example
   {"fuel_plugin_name_select"=>"value2",
    "fuel_plugin_name_checkbox"=>true,
    "fuel_plugin_name_radio"=>"data1",
    "fuel_plugin_name_text"=>"default value 1",
    "metadata"=>
     {"plugin_version"=>"1.0.1",
      "group"=>"other",
      "always_editable"=>false,
      "weight"=>70,
      "enabled"=>true,
      "label"=>"Title for fuel-plugin-example plugin",
      "toggleable"=>true,
      "plugin_id"=>1,
      "class"=>"plugin"}}

Use the plugin settings to generalize the *iotop* task, so it will install
the packages from the list specified in the UI settings. Currently it is not
possible to dynamically add settings to the Fuel web UI, so use the
``textarea field``, which contains the names of the packages that you want
to install on the target node, one per line.

.. note:: You can dynamically add setting starting with Fuel 9.0.
          See the `blueprint <https://blueprints.launchpad.net/fuel/+spec/dynamic-fields>`_.

``environment_config.yaml``:

.. code-block:: ini

   attributes:

    fuel_plugin_example_packages:
     description: Field description
     label: Text field label
     type: textarea
     value: default value

Update the Puppet manifest, so it will install all the packages in the
variable ``fuel_plugin_example_packages``, which it will get from hiera:

``deployment_scripts/puppet/manifests/install_iotop.pp``:

.. code-block:: ini

   notice('MODULAR: fuel-plugin-example/iotop')

   $fuel_plugin_example = hiera(fuel-plugin-example, {})
   $packages = split($fuel_plugin_example['fuel_plugin_
   example_packages'], '\n')

   package { $packages:
     ensure => 'installed',
   }

.. note:: If you do not want to provide Fuel web UI settings for your plugin,
          except for the :guilabel:`Enable plugin` checkbox, you still need to
          fill the ``environment_config.yaml`` with metadata for that checkbox.