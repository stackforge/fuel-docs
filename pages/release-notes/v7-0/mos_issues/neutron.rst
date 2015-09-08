.. _neutron_rn_7.0:

Neutron
-------

Resolved issues
+++++++++++++++

* In previous versions of Neutron, when the Open vSwitch (OVS) agent
  restarts, it results in brief connectivity interruption between
  VMs.
  New version of Neutron eliminates this issue. When the OVS agent
  restarts, it automatically re-creates the network flows and drops
  only the old ones. The ``drop_flows_on_start`` option is disabled by default
  to support graceful OVS agent restart. See `LP1383674`_ and `LP1483253`_.

* The logging of Neutron agent heartbeats is now available to
  troubleshoot problems with a cluster if any. See `LP1453978`_.

* A reload operation is added to Neutron L3 agent resource to prevent
  external connectivity interruption while disabling or enabling the
  agent (using ``pcs resource enable/disable p_neutron-*-agent``).
  Also, the patch updates the DHCP agent resource to keep consistency.
  See `LP1464817`_.

* Neutron now supports an automatic cleanup of empty L3/DHCP namespaces
  after you remove resources. This option is enabled by default.
  See `LP1458633`_.

Known issues
++++++++++++

* Instances' metadata on CentOS 6.6 cloud images with cloud-init 0.7.5
  packages may be unset in Neutron environments. When an environment
  is deployed with one of the Neutron topologies and CentOS 6.6 cloud
  images are used, instances may be unreachable via SSH due to a
  cloud-init failure. It happens because users' keypairs and the rest
  of configuration data may not be set correctly. See `LP1406286`_.

* Now you can access a VM via a floating IP from an external
  network. VMs could not access the Internet due to an improper
  configuration of network interfaces on Compute nodes.
  See `LP1492138`_.

.. Links
.. _`LP1383674`: https://bugs.launchpad.net/neutron/+bug/1383674
.. _`LP1483253`: https://bugs.launchpad.net/fuel/+bug/1483253
.. _`LP1453978`: https://bugs.launchpad.net/mos/7.0.x/+bug/1453978
.. _`LP1464817`: https://bugs.launchpad.net/fuel/+bug/1464817
.. _`LP1458633`: https://bugs.launchpad.net/mos/7.0.x/+bug/1458633
.. _`LP1406286`: https://bugs.launchpad.net/mos/7.0.x/+bug/1406286
.. _`LP1492138`: https://bugs.launchpad.net/fuel/+bug/1492138
