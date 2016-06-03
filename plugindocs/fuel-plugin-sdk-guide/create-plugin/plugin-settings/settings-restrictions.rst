
.. _settings-restrictions:

Settings restrictions
---------------------

Plugin functionality can depend on some core features of Fuel or on the
features of other plugins. You can provide only some subset of the
functionality when some core feature is disabled and, vice versa, the
full functionality. You can also provide different functions depending
on what kind of hypervisor the user selects. Settings restrictions provide
a way to dynamically change the settings provided by a plugin. The general
information on the settings restrictions is in 
*Developer Guide* -> *Extending OpenStack Settings* -> *Restrictions*.

Settings restrictions are defined in ``environment_config.yaml`` and can be
applied not only to any specific setting but also for a plugin as a whole.
In this case, the restrictions should be applied to plugin metadata.

This is an example of using restrictions in `Fuel Xenserver plugin <https://github.com/openstack/fuel-plugin-xenserver/blob/8.0/environment_config.yaml>`_:

.. code-block:: ini

   attributes:
    metadata:
     restrictions:
       - "settings:common.libvirt_type.value == 'kvm'"
       - "settings:storage.volumes_ceph.value == true"
       - "settings:storage.images_ceph.value == true"
       - "settings:storage.ephemeral_ceph.value == true"
       - "settings:storage.objects_ceph.value == true"
       - "settings:additional_components.sahara.value == true"
       - "settings:additional_components.murano.value == true"
       - "settings:additional_components.ceilometer.value == true"
       - "settings:additional_components.mongo.value == true"
       - "settings:additional_components.ironic.value == true"

If any of the listed settings are enabled, then the user cannot enable the
plugin. The restrictions are bidirectional, i.e. if you enable the plugin,
you cannot enable any of the listed settings without disabling the plugin
first.

You can use other entry points to the Fuel API besides ``settings`` as
context. Some of the valid contexts are ``networking_parameters``,
``version``, and ``cluster``. Settings restrictions are used extensively
for the core Fuel settings.
To examine them, use the command
:command:`fuel --env 38 settings --default` to download the default settings
from one of the existing environments and look for the substring
``restrictions`` in the resulting file.