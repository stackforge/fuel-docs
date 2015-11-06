.. _upgrade_uninstall_plugin:

Uninstall a plugin
==================

To uninstall a plugin, do the following:

#. Create an ``uninstall.sh`` script with the following contents::

      #!/bin/bash
      set -eux
      echo uninstall > /tmp/myplugin_uninstall

  where ``myplugin`` is the name of your plugin.

#. Put the ``uninstall.sh`` script in your plugin folder.
#. Issue the following command::

     fuel plugins --remove myplugin
