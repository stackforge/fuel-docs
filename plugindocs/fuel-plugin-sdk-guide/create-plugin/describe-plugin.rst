
.. _describe-plugin:

Describe your plugin
--------------------

The Fuel Plugin Builder generates three files:

* LICENSE -- free-form information file.
* README.md -- free-form information file.
* :ref:`metadata.yaml` -- mandatory file in YAML format. Your plugin cannot
  build without :ref:`metadata.yaml`.

.. note:: You can put any files -- even the ones not directly related to
   Fuel Plugin Builder -- in the plugin directory. Fuel Plugin Builder
   will add all the files to the plugin package.

**To describe your plugin**

#. Edit the ``LICENSE`` file so that it contains the license, under which
   your plugin can be redistributed. You may want to use the
   `Apache 2.0 <http://www.apache.org/licenses/LICENSE-2.0>`_ license.
   All plugin files that provide intellectual property must have a respective
   copyright.

#. Edit the ``README.md`` file -- put some free-form description of the plugin
   here. Describe the purpose of your plugin and give instructions on the
   installation. If you publish the code of your plugin on GitHub, the contents
   of this file will be on the main page of the repository. You can use
   MarkDown formatting in the file. For more information see
   `Getting started with writing on GitHub <https://help.github.com/articles/getting-started-with-writing-and-formatting-on-github/>`_. Good examples of plugin description:
   `Mellanox <https://github.com/openstack/fuel-plugin-mellanox/blob/stable/3.0.0/README.md>`_
   and `LMA Collector <https://github.com/openstack/fuel-plugin-lma-collector>`_.

#. Edit the :ref:`metadata.yaml` file with the list of required parameters.

   See the `metadata.yaml example <https://github.com/openstack/fuel-plugin-openbook/blob/master/metadata.yaml>`_.

We recommend that you create a directory ``doc`` in your plugin root
directory and put extensive documentation there.

You can find more information about preparing documentation for Fuel plugins
on `GitHub <https://github.com/Mirantis/fuel-plugin-docs>`_.

Plugin format: Fuel versions mapping
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The table below shows the existing plugin format versions and the versions of
Fuel starting from which they are supported:

+---------------+-------+-------+-------+-------+-------+
| Plugin format | 1.0.0 | 2.0.0 | 3.0.0 | 4.0.0 | 5.0.0 |
+---------------+-------+-------+-------+-------+-------+
| Fuel          | 6.0   | 6.1   | 7.0   | 8.0   | 9.0   |
+---------------+-------+-------+-------+-------+-------+

