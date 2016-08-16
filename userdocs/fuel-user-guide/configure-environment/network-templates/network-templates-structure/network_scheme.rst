.. _network-scheme:

network_scheme
--------------

**Description**

Defines the name of the network template as well as the following
parameters that are applied to each network that needs to be
configured:

* ``priority`` - defines the order in which network templates will
  be applied to a node. The values range 0 to 64000.
  For example, you can set ``100``, ``200``, ``300`` with ``100``
  being the highest priority template.

* ``transformations`` - a sequence of actions that builds the required
  network configuration. For example: ``add-br`` - add a network
  bridge, ``add-port`` - add a network port. The Puppet L23network
  module transforms a physical interface to logical endpoints. Order
  of commands specified in this section is significant.

  The sequence of commands that create network configuration must
  be reflected in the transformation section:

  * For service networks:

    #. Create a Linux bridge. By default, if you do not specify a
       provider a Linux bridge is created.¬
    #. Create a network port that connects the Linux bridge and the
       physical network interface.

  * For workload networks:

    #. Create an OVS bridge as a first point of connection between
       the OpenStack Networking service and the physical network
       interface.

    #. Create a Linux bridge. Since OVS bridge cannot directly connect
       to physical interface, a Linux bridge is required.

    #. Create a patch that connects Linux and OVS bridges.

    #. Create a network port that connects the Linux bridge and the
       physical network interface.

  You can specify the following commands in the ``transformation``
  section:

  * ``add-bridge`` - creates a bridge. By default, creates a Linux
    bridge. You can specify the following parameters for this command:

    * ``provider`` - a network technology such as Open vSwitch (OVS) or
      Linux Bridge, that connects physical interface with
      the OpenStack Networking service. Default provider is Linux
      Bridge. The options are: ``ovs``.

    * ``mtu`` - enables you to specify MTU for this network bridge.

  * ``add-port`` - create a port that connects a Linux bridge with a
    physical network interface.

  * ``add-patch`` - adds connection between a Linux bridge and OVS. You can
    specify same parameters as for the Linux bridge.

* ``endpoints`` - lists L3 logical or physical interfaces or bridges
         with assigned IP addresses to which you can map one or more network
         roles.

* ``roles`` - mapping of a network workload to a logical endpoint. When you
  apply multiple templates to one node, verify that this parameter
  in one template does not contradict this parameter in other template.
  The list of supported network workloads is available in the
  ``openstack.yaml`` file on the Fuel Master node. If you have Fuel plugins
  installed in your environment, you can also map network workloads related
  to the plugin. For the list of network workloads related to the plugin,
  see the corresponding ``.yaml`` file in the plugin repository.
  The ``roles`` section cannot be empty. If you do not want to specify any
  mappings, you must create one fake mapping.

  **Example:**

  ::

    roles:
      fake/ext: br-pub-ext


**Example**

::

  network_scheme:
    storage: <template name>
        priority:
            ...
        transformations:
            ...
        endpoints:
            ...
        roles:
            ...
    private: <template name>
        priority:
            ...
        transformations:
            ...
        endpoints:
            ...
        roles:
            ...

.. seealso::

   - `Network template spec
     <https://specs.openstack.org/openstack/fuel-specs/specs/7.0/networking-templates.html>`_
   - `Virtual IP reservation for Fuel plugins
     <https://wiki.openstack.org/wiki/Fuel/Plugins#Virtual_IP_reservation_via_Fuel_Plugin.27s_metadata>`_
