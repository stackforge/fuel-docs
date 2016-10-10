
.. _plugin_versioning_system:

Plugin versioning system
------------------------

When new functionality, minor updates or security fixes should be delivered, 
plugin developer creates a new version of the plugin; this can be major or 
minor one:

* major - changes in API, functionality, major OpenStack release introduced.
* minor - security fixes only.


In 6.0, plugins had .fp format only. It’s deprecated now. In 6.1 and higher,
only RPM plugins are used. Their versioning is performed as follows: 

+-----+-----------------------+---------------------+-----------------+---------+---------+
|     | **Plugin file format**|**fuel-plugin value**|**metadata.yaml**|**major**|**minor**|
+-----+-----------------------+---------------------+-----------------+---------+---------+
| RPM | fuel-plugin-1.0-1.0.0 | 1.0                 | 1.0.1           |1.0.0    | 1.0.1   |
+-----+-----------------------+---------------------+-----------------+---------+---------+

Here is the **example:** Let's suppose that a plugin has 1.0.1 version in the
metadata.yaml file. The plugin file should then have a different format: plugin-1.0-1.0.1-N.rpm,
where N:

* equal 1 by default settings of `Fuel plugin builder <https://github.com/openstack/fuel-plugins/tree/master/fuel_plugin_builder/>`_
* could be equal to any value (e.g. timestamp) defined by *build_version* 
  variable at :ref:`metadata.yaml`, that allows to iterate pkg version without
  updating plugin version. This could be done by the next `patch <https://github.com/openstack/fuel-plugins/commit/dd03155047f88035ee88bdc21acdb8c04b08fd33/>`_
  (so fpb should be checkouted to this commit).

Update procedure
""""""""""""""""""""""""

+-----+----------+-------------------------------------------------------------------------------------+
|     |**Update**|**Limitations**                                                                      |
+-----+----------+-------------------------------------------------------------------------------------+
| fp  |  No      | 1.0                                                                                 | 
+-----+----------+-------------------------------------------------------------------------------------+
| RPM |  Yes     | Can be updated to minor version only with *fuel plugins --update <fuel-plugin-file>*|
|     |          | command. To get a major one, user has to download it from `Fuel Plugins Catalog     |
|     |          | <https://www.mirantis.com/validated-solution-integrations/fuel-plugins/>`_ and      | 
|     |          | create a new environment from scratch.                                              |
+-----+----------+-------------------------------------------------------------------------------------+


Versioning scheme
""""""""""""""""""""""""

* for .fp plugins versioning is not supported at all. That means, user has to
  download&install the plugin from scratch.
* for RPM plugins, it looks as follows:

.. image:: /_images/deliverables/scr_plugin_versioning.png
   :width: 70%
   :align: center

.. note::
     Please, consider changing the versioning scheme for customized packages to
     have clear indicator which package is installed - the ones that enter 
     Mirantis OpenStack or customized ones. Otherwise, there is need to check 
     python files to understand which package is actually installed. 
