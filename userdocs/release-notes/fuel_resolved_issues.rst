===============
Resolved Issues
===============

This section lists a number of resolved issues. For a
complete list, see the
`Fuel for OpenStack <https://bugs.launchpad.net/fuel>`__ Launchpad
project.

* Added possibility to control restries count for Puppet-based
  tasks. See `example <https://review.openstack.org/#/c/222149/4/fuel_plugin_example_v3/tasks.yaml>`__.
  See `LP1457794 <https://bugs.launchpad.net/fuel/+bug/1457794>`__.

* Fixed the formula for the placement groups count in Ceph. See
  `LP1464656 <https://bugs.launchpad.net/fuel/+bug/1464656>`_.

* You can now create and manage vitual IP addresses through Nailgun
  and fuel client.
  See `LP1482399 <https://bugs.launchpad.net/fuel/+bug/1482399>`__.

* Fixed the issue with MySQL server going down because of the incorrect
  processing of the ``ignore-db-dir`` option.
  See `LP1484552 <https://bugs.launchpad.net/fuel/+bug/1484552>`_.

* Added an ability to connect to virtual machines in an OpenStack environment
  integrated with VMware vSphere through the VNC client.
  See `LP1511422 <https://bugs.launchpad.net/fuel/+bug/1511422>`__.

* Added support for the be2net-dkms kernel module on the
  HP ProLiant BL460c server on Ubuntu 14.04. See
  `LP1533501 <https://bugs.launchpad.net/fuel/+bug/1533501>`_.

* Fixed the rabbitmqctl issue that caused atom table overflow in Erlang VM.
  See `LP1534519 <https://bugs.launchpad.net/fuel/+bug/1534519>`_.

* Enabled the user to specify the disk on which to install
  the Fuel Master node and whether to format the disk before
  the installation or not by passing the ``installdrive`` and
  ``forceformat`` parameters to the kernel using the grub command
  line in the Fuel installation menu. See
  `LP1535712 <https://bugs.launchpad.net/fuel/+bug/1535712>`__.

* Enabled deployment of the OpenStack environments without controller nodes.
  Thereby, the user can replace controller roles with custom roles using
  Fuel plugins.
  See `LP1538233 <https://bugs.launchpad.net/fuel/+bug/1538233>`__.

* Fixed the issue for Swift/v1 endpoint containing an IP address instead of a
  FQDN in cases when Ceph was deployed with RadosGW.
  See `LP1540133 <https://bugs.launchpad.net/fuel/+bug/1540133>`_.

 * Introduced a feature that allows specifying the order of network
   templates execution for a deployment. See
   `LP1540374 <https://bugs.launchpad.net/fuel/+bug/1540374>`_.

* Added the capability to forcefully update the settings and the
  attributes of an environment in the operational state by
  implementing an optional ``--force`` flag to the following commands:

  .. code-block:: console

   fuel settings --env <env_id> --upload --force
   fuel env --env <env_id> --attributes --upload --force

  See `LP1540434 <https://bugs.launchpad.net/fuel/+bug/1540434>`_.

  Also implemented the ``fuel redeploy-changes`` and ``fuel2 redeploy``
  commands to apply the changes to an environment in the operational state.

  .. code-block:: console

   fuel redeploy-changes --env <env_id>
   fuel2 env redeploy <env_id>

  See `LP1540558 <https://bugs.launchpad.net/fuel/+bug/1540558>`_.

* Enabled ``compute-vmware`` and ``cinder-vmware`` roles combination
  for the same node.
  See `LP1540756 <https://bugs.launchpad.net/fuel/+bug/1540756>`__.

* Now, ``network_scheme`` contains information about the network gateway if it
  is defined in ``network-groups``.
  See `LP1549034 <https://bugs.launchpad.net/fuel/+bug/1549034>`_.

* You can now allow removing the default gateway by overriding it
  as an empty string.
  See `LP1549550 <https://bugs.launchpad.net/fuel/+bug/1549550>`__.

* Nodes do not enter the ``error`` state when running :command:`puppet apply`
  and detecting other Puppet instances.
  See `LP1552805 <https://bugs.launchpad.net/fuel/+bug/1552805>`__.

* Previously, during the upload of a new network YAML file, an error might
  appear pointing to the type of networks with the wrong configuration.
  Having many networks, it was difficult to determine which network had
  issues. Now, the error message contains network IDs.
  See `LP1554106 <https://bugs.launchpad.net/fuel/+bug/1554106>`_.

* Added the capability to override the ``primary-controller``,
  ``controller``, and ``compute`` node roles through Hiera
  for the ``openstack-network`` manifests. See
  `LP1554796 <https://bugs.launchpad.net/fuel/+bug/1554796>`_.

* Changed the Fuel serialization process to fix the Nailgun behavior
  in VLAN network environments with multiple node groups
  and network templates. Previously, it was impossible to deploy such
  a configuration due to a broken serialization module.
  See `LP1556917 <https://bugs.launchpad.net/fuel/+bug/1556917>`_.

* Previously, when specifying ``heartbeat`` and ``handshake_timeout``
  parameters in ``rabbitmq.config``, the default parameters disappeared. Now,
  ``rabbit.* ``configuration options can be handled by
  ``rabbit_config_variables`` in Hiera.
  See `LP1560687 <https://bugs.launchpad.net/fuel/+bug/1560687>`_.

* The order of tasks in the YAML file in ``/openstack-network/`` is
  now strict to avoid incorrect functioning when introducting new
  elements.
  See `LP1561648 <https://bugs.launchpad.net/fuel/+bug/1561648>`__.

* Added an ability for plugin deployment tasks to depend on the settings
  of another plugin even if the latter is not installed.
  See `LP1564131 <https://bugs.launchpad.net/fuel/+bug/1564131>`__.