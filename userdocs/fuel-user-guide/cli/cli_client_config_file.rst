.. _cli-client-config-file:

The Fuel CLI configuration file
-------------------------------

The Fuel CLI uses the ``fuel_client.yaml`` file as a source for default
settings. By default, Fuel stores the ``fuel_client.yaml`` file in the
``~/.config/`` directory.

**To change the default directory:**

#. Log in to the Fuel CLI.
#. Set the required directory path:

   ::

     $ export XDG_CONFIG_HOME=/path/to/fuel_client.yaml/

   where ``XDG_CONFIG_HOME`` points to the ``fuel_client.yaml`` file directory.

**To specify custom settings:**

#. Log in to the Fuel CLI.
#. Edit the ``fuel_client.yaml`` file.

Alternatively, create a new YAML-formatted file:

#. Log in to the Fuel CLI.
#. Create a YAML-formatted file with the required settings.
#. Export the ``FUELCLIENT_CUSTOM_SETTINGS`` variable:

   ::

     $ export FUELCLIENT_CUSTOM_SETTINGS="~/custom.conf"

   where ``"~/custom.conf"`` is the path to the new configuration file.

#. Optional. Add the export to your ``.bashrc`` file:

   ::

     $ echo 'export FUELCLIENT_CUSTOM_SETTINGS="~/custom.conf"' >> ~/.bashrc

.. note::

   Custom settings override the default ones. Top-level values may also be set
   as environment variables.

   **Example:**

   ::

     $ export SERVER_PORT=8080