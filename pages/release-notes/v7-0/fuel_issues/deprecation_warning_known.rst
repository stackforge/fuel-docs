* Each time you use the fuel client on Fuel Master node, the following
  warning message appears in console::

    DEPRECATION WARNING: /etc/fuel/client/config.yaml exists and will be used
    as the source for settings. This behavior is deprecated. Please specify
    the path to your custom settings file in the FUELCLIENT_CUSTOM_SETTINGS
    environment variable.

  Workaround is to manually remove the file with deprecated configurations
  by running::

    rm -rf /etc/fuel/client/config.yaml

  See `LP1458361`_.

.. Links
.. _`LP1458361`: https://bugs.launchpad.net/fuel/7.0.x/+bug/1458361
