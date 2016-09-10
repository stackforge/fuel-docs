.. _modify-ui:

=====================================
Modify the Components registry wizard
=====================================

The Fuel web UI provides the ability to quickly choose which components
to enable for a new environment.

Fuel has a `significant number of predefined components <https://github.com/openstack/fuel-web/blob/master/nailgun/nailgun/fixtures/openstack.yaml#L1678>`_.
Plugins add their own plugin-specific components.

Each of the components can be marked as compatible, incompatible, or required
in relation to any other component. This allows a user to choose a high-level
set of enabled features for a new cloud without worrying about incompatibility
issues.

A plugin defines relationship between its own and any arbitrary components
by specifying them in the file ``components.yaml``. The automatically
generated plugin contains only a very basic ``components.yaml`` that
describes one component without defining any inter-component relationships:

.. code-block:: ini

   - name: additional_service:fuel-plugin-example
     compatible: []
     requires: []
     incompatible: []
     label: "Plugin label, that will be shown on UI"
     description: "Component description (optional)"

A new component appears on the :guilabel:`Additional Services` tab with
a tooltip that displays information if the component was tested with the
components selected previously.

By default, the only effect of enabling any component associated with a
plugin is that the plugin will be enabled in the environment settings
after the Fuel web UI wizard completion.

**To change ``components.yaml``**

#. Modify the ``components.yaml`` file.
#. Synchronise with the :command:`fuel plugins --sync` command.
#. Create a new environment to test the Fuel web UI wizard.

Example of an edited ``components.yaml`` file:

.. code-block:: ini

   - name: additional_service:fuel-plugin-example
     bind: !!pairs
       - settings:common.use_cow_images.value: false
       - settings:storage.osd_pool_size.value: 2
     compatible:
       - name: hypervisor:qemu
       - name: storage:block:ceph
       - name: storage:ephemeral:ceph
     requires:
       - name: storage:block:ceph
         message: "Example component requires Ceph as a storage
                   backend"
       - name: storage:ephemeral:ceph
         message: "Example component requires Ceph as an
                   ephemeral storage backend"
     incompatible:
       - name: network:neutron:ml2:vlan
         message: "Example component is incompatible with VLAN segmentation"
     label: "Example plugin component"
     description: "Just an example of a plugin component"

The property ``weight`` defines a relative placement of the component in the
wizard, which is the same with roles and settings definitions. This example
ensures that the component shows at the top of the list. See
`weight examples <https://github.com/openstack/fuel-web/blob/master/nailgun/nailgun/fixtures/openstack.yaml#L1678>`_.

The property ``bind`` defines the settings that must be set if the component
is enabled. To set specific values, do not use the form ``bind: !!pairs`` as
in the example.
The example ensures that enabling the component uses raw format for the images
instead of qcow and cepho object replication factor setting to ``2``, while
the default is ``3``.

The property ``compatible`` has the list of components tested with the plugin.
If some of the components do not specify any other component as compatible,
then both will have a warning icon next to them in the Fuel web UI, and a
tooltip will provide a list of components with an unspecified compatibility
status on a mouseover.

The property ``requires`` specifies components that must be enabled for this
one to be available. In the example, the user will not be able to select
the component without enabling Ceph for block and ephemeral storage.

You should always provide an appropriate value for ``message`` so that the
user can troubleshoot component enabling with proper tooltip message.

The property ``incompatible`` is the opposite of ``incompatible``. This property
defines the components that cannot be enabled with this component.
In the example, the incompatible component is ``VLAN segmentation``.

The properties ``label`` and ``description`` are self-explanatory.

.. note:: Currently, there is no association between the settings bound
          to incompatible or required components and the settings that
          restrict each other using the mechanism described in
          :ref:`settings-restrictions`. This means that the user can manually
          choose some settings that enable features of an incompatible
          component after the wizard is finished. Plugin developers should not
          only specify incompatible components but also provide appropriate
          restrictions for the incompatible settings.

See `components.yaml <https://github.com/openstack/fuel-plugin-xenserver/blob/master/components.yaml>`_
and `environment_config.yaml <https://github.com/openstack/fuel-plugin-xenserver/blob/master/environment_config.yaml>`_
from the Fuel XenServer plugin as an example.
