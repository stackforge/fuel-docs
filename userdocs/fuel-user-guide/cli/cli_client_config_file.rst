.. _cli-client-config-file:

Fuel client configuration file
------------------------------

Fuel client uses the ``fuel_client.yaml`` file as a source for default
settings. If ``$XDG_CONFIG_HOME`` is not set, the default ``~/.config/``
directory stores the ``fuel_client.yaml`` file.

For custom settings, use any YAML-formatted file specifying its path through
the ``$FUELCLIENT_CUSTOM_SETTINGS`` environment variable. Custom settings
override the default ones. Top-level values may also be set as environment
variables, for example, ``export SERVER_PORT=8080``. These values have the
highest priority.