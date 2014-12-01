.. _fuel-plugin-dev-ui:

Fuel plug-in UI elements
------------------------

Here is an example of the *environment_config.yaml* file that
contains all possible Fuel web UI elements:

.. code-block:: yaml

    attributes:

      # Text field
      fuel_plugin_name_text:
        type: "text"
        weight: 10
        value: "Default text"
        label: "Text field label"
        description: "Field description"
        regex:
          source: '\S'
          error: "Error field cannot be empty"

      # Dropdown
      fuel_plugin_name_dropdown:
        type: "dropdown"
        weight: 20
        value: "value2"
        label: "Dropdown label"
        description: "Dropdown description"
        values:
          - data: "value1"
            label: "Value 1 label"
          - data: "value2"
            label: "Value 2 label"
          - data: "value3"
            label: "Value 3 label"

      # Checkbox
      fuel_plugin_name_checkbox:
        type: "checkbox"
        weight: 30
        value: false
        label: "Checkbox label"
        description: "Checkbox description"

      # Radio button
      fuel_plugin_name_radio:
        type: "radio"
        weight: 40
        value: "disabled"
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

After plug-in is installed, additional elements appear on the *Settings* tab of the Fuel web UI:

.. image:: /_images/fuel_plugin_dev_ui_elements.png


When the user runs deployment, the plug-in deployment script can get the data
from the */etc/astute.yaml* file; in this example, plug-in-specific data look like:

.. code-block:: yaml

    ...
    fuel_plugin_name:
      fuel_plugin_name_checkbox: false
      fuel_plugin_name_dropdown: value2
      fuel_plugin_name_radio: disabled
      fuel_plugin_name_text: Default text
    ...
