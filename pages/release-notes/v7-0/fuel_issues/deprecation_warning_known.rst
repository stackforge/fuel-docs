* Each time you use the fuel client on Fuel Master node, the following
  warning message appears in console::

    DEPRECATION WARNING: /etc/fuel/client/config.yaml exists and will be used
    as the source for settings. This behavior is deprecated. Please specify
    the path to your custom settings file in the FUELCLIENT_CUSTOM_SETTINGS
    environment variable.

  You can fix the issue manually by creating a custom configuration file
  and exporting the ``FUELCLIENT_CUSTOM_SETTINGS`` variable. To do this,
  proceed with the following steps:

  #. Remove the file with deprecated configurations by running::

      rm -rf /etc/fuel/client/config.yaml

  #. Create a `custom.conf` file with the following settings:

     .. code-block:: ini

        SERVER_ADDRESS: "10.20.0.2"
        SERVER_PORT: "8000"
        KEYSTONE_USER: "admin"
        KEYSTONE_PASS: "admin"
        KEYSTONE_PORT: "5000"

  #. Export the ``FUELCLIENT_CUSTOM_SETTINGS`` variable::

      export FUELCLIENT_CUSTOM_SETTINGS="~/custom.conf"

     where ``"~/custom.conf"`` is the path to the new configuration file.

  #. Add the export to your `.bashrc` file with by running::

      echo 'export FUELCLIENT_CUSTOM_SETTINGS="~/custom.conf"' >> ~/.bashrc

  See `LP1458361`_.

.. Links
.. _`LP1458361`: https://bugs.launchpad.net/fuel/7.0.x/+bug/1458361
