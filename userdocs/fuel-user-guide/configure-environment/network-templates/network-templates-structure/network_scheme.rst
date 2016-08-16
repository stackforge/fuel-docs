.. _network-scheme:

network_scheme
--------------

**Description**

Defines the name of the network template as well as the following
parameters that are applied to each network that needs to be
configured:

* ``priority`` - defines the order in which the network templates will
  be applied to a node. The values range 0 to 64000.
  For example, you can set ``100``, ``200``, ``300`` with ``100``
  being the highest priority template.

* ``transformations`` - a sequence of actions that builds the required
  network configuration. For example: ``add-br`` - add a network
  bridge, ``add-port`` - add a network port. The Puppet L23network
  module creates network objects described in the ``transformations``
  section that connect physical interfaces with logical endpoints. Order
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

    #. Create a Linux bridge. Since an OVS bridge cannot directly connect
       to a physical interface, a Linux bridge is required.

    #. Create a patch that connects Linux and OVS bridges.

    #. Create a network port that connects the Linux bridge and the
       physical network interface.

  You can specify the following commands in the ``transformation``
  section:

  * ``add-bridge`` - creates a bridge. By default, creates a Linux
    bridge. You can specify the following parameters for this command:

    * ``name`` - name of the network bridge. For example, ``br-admin``.

    * ``provider`` - a network technology such as Open vSwitch (OVS) or
      Linux Bridge, that connects physical interface with
      the OpenStack Networking service. Default provider is Linux
      Bridge. The options are: ``linux``, ``ovs``.

    * ``mtu`` - (optional) enables you to specify MTU for this network bridge.

  * ``add-port`` - create a port that connects a Linux bridge with a
    physical network interface. You can specify the following parameters
    for this command:

    * ``name`` - name of the network port.

    * ``bridge`` - name of the bridge for which the port is created.

    * ``type`` - (optional) A type of the OVS interface for the port.
      Default value is ``internal``. Available options include:
      ``internal``, ``system``, ``tap``, ``gre``, ``null``.
      See the OVS documentation for more details. Specify

    * ``trunks`` - (optional) a set of 802.1q tags in the form of integers
      from 0 to 4095) that are allowed to pass through if the "tag"
      option equals 0. Available options include:

      * Empty list - all traffic passes
      * 0 - untagged traffic only.
      * 2-4095 - traffic with the specified tag passes.
        For example, 10,10,20.

    * ``port_properties`` - (optional) a list of additional OVS port
      properties to modify them in OVS database.

    * ``interface_properties`` (optional) a list of additional OVS interface
      properties to modify them in OVS database.

  * ``add-patch`` - connects network bridges. Available parameters include:

    * ``bridges`` - a pair of bridges to connect. You can specify either
      bridges of the same type or of different types.

    * ``peers`` - (optional) abstract names for each end of the patch.

    * ``tags`` - (optional) a pair of integers that represent an
      802.1q tag of traffic that is captured from a corresponding
      OVS bridge. Available values include:

      * 0 - only the untagged traffic passes through
      * 1-4094 - the bond allows only the traffic with the specific tag.
        Specify the tags in the ``trunks`` parameter.

    * ``trunks`` - (optional) a set of 802.1q tags in a form of
      integers from 2 to 4095 which are allowed to pass through if the
      ``tag`` parameter is set to ``0``. Available values include:

      * Empty list - all traffic passes (default)
      * 0 - untagged traffic only
      * 2-4095 - traffic with the specified tag passes). For example, 0,10,20.

  * ``add-bond`` - combines two or more network interfaces for redundancy
    and creates a network object called bond. You can specify
    the following parameters for this command:

    * ``name`` - name of the network port.

    * ``interfaces`` - a set of two or more network interfaces that you
      want to bind. For example, ``eth1, eth2``.

    * ``bridge`` - name of the bridge on which the bond must be created.

    * ``tag`` - (optional) a 802.1q tag of traffic which
      received from an OVS bridge. Available values include:

      * 0 - the bond ignores the tag and allows all traffic to pass
        through.

      * 1 - 4094 - the bond allows only the traffic with the specific tag.
        Specify the tags in the ``trunks`` parameter.

    * ``trunks`` - (optional) a set of 802.1q tags in a form of
      integers from 2 to 4095 which are allowed to pass through if the
      ``tag`` parameter is set to ``0``. Available values include:

      * Empty list - all traffic passes (default)
      * 0 - untagged traffic only
      * 2-4095 - traffic with the specified tag passes). For example, 0,10,20.

    * ``properties`` - (optional) a list of additional OVS bonded port
      properties to modify them in the OVS database. Use this parameter
      to set the aggregation mode and balancing strategy, to configure LACP,
      and so on. For more informations, see the OVS documentation.

* ``endpoints`` - lists logical interfaces or bridges
  with assigned IP addresses to which you can map one or more network
  roles. 

* ``roles`` - mapping of a network traffic to a logical endpoint. When you
  apply multiple templates to one node, verify that this parameter
  in one template does not contradict this parameter in other templates.
  The list of supported network traffics (network roles) is available in the
  ``openstack.yaml`` file on the Fuel Master node. If you have Fuel plugins
  installed in your environment, you can also map network traffic related
  to the plugin. For the list of types of network traffic related to the
  plugin, see the corresponding ``network_roles.yaml`` file in the plugin
  repository.
  The ``roles`` section cannot be empty. If you do not want to specify any
  mappings, you must create one fake mapping. For example:

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
