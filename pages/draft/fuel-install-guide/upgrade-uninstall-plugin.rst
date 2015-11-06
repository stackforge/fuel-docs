.. _upgrade_uninstall_plugin:

Uninstall a plugin
~~~~~~~~~~~~~~~~~~

Fuel does not support upgrades for plugins. The old plugin versions
may not be compatible with the new version of Fuel. Therefore, you must
uninstall the Fuel plugins before upgrading Fuel.

**To uninstall a plugin:**

#. Log in to the Fuel Master node CLI.
#. Create an ``uninstall.sh`` script with the following content::

      #!/bin/bash
      set -eux
      echo uninstall > /tmp/myplugin_uninstall

  where ``myplugin`` is the name of your plugin.

#. Put the ``uninstall.sh`` script in your plugin folder.
#. Type::

     fuel plugins --remove myplugin

.. seealso::

     - `Fuel Plugin Wiki <https://wiki.openstack.org/wiki/Fuel/Plugins>`_
