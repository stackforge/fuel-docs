
.. _task-conditions:

Conditions for plugin tasks
---------------------------

You can restrict plugin tasks from running, depending on whether some specific
settings in the Fuel web UI are enabled or not. The syntax slightly differs
from the one for the settings restriction as in the case of the task you
provide the opposite to the restriction -- a condition that must be true for
the task to run, but the net result is the same -- restricting the task from
running if the condition is not true. 

Here is an example.

``deployment_tasks.yaml``:

.. code-block:: ini

   - id: upload_cirros
     type: shell
     role: ['primary-controller']
     condition: "settings:swiftstack.upload_cirros_test.value == true"

In this example, the default task ``upload_cirros`` will only run when
a specific setting for it is enabled in the Fuel web UI. The setting
itself can be defined as:

``environment_config.yaml``:

.. code-block:: ini

   upload_cirros_test:
    weight: 20
    type: "checkbox"
    value: true
    label: "Enable upload test"
    description: "Upload cirros base image when the deployment is done"

.. note:: Conditions can only use settings and cluster contexts of the
          Fuel API.