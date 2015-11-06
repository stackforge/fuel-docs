.. _upgrade_uninstall_plugin:

Uninstall a plugin
==================

Plugins cannot be upgraded.

You can uninstall a plugin with a script.

**To uninstall a plugin:**

#. Create an ``uninstall.sh`` script with the following contents::

      #!/bin/bash
      set -eux
      echo uninstall > /tmp/myplugin_uninstall

  where ``myplugin`` is the name of your plugin.

#. Put the ``uninstall.sh`` script in your plugin folder.
#. Issue the following command::

     fuel plugins --remove myplugin

.. seealso::

     - `Fuel Plugin Wiki <https://wiki.openstack.org/wiki/Fuel/Plugins>`_
