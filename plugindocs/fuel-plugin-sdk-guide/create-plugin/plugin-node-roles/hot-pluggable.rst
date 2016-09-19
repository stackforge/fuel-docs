
.. _plugin-hotpluggable:

Hot-pluggable plugins
---------------------

The hot-pluggable plugins do not affect the core deployment and can be
installed on existing environments. Another term for hot-pluggable plugins
is application-level plugins.

The following are characteristics of a hot-pluggable plugin:

* Provides new applications.
* Installs applications on a new node.
* Does not affect existing services or applications.
* Does not override existing tasks.

Example of hot-pluggable plugins:

* `Dynatrace <https://github.com/ruxit/fuel-plugin-dynatrace>`_
* `LMA Collector <https://github.com/openstack/fuel-plugin-lma-collector>`_

Compare these to the plugins that affect Fuel core functionality, such as SDN
or storage plugins. These plugins can only be installed before deploying an
environment.

Defining tasks for exisiting roles in a hot-pluggalbe plugin executes these
tasks with the corresponding roles if these nodes are installed after the
plugin is enabled. This option, however, is error-prone, as you cannot
differentiate between the nodes deployed before and after the plugin is
enabled. In this case, nodes have the same role but different fucntionality.

The recommended use case for a hot-pluggable plugin is to add a node with a
plugin-specific role to an already existing environment.

An application-level plugin must have the ``is_hotpluggable`` attribute
set to ``true`` in the :ref:`metadata.yaml` file:

.. code-block:: ini

   is_hotpluggable: true