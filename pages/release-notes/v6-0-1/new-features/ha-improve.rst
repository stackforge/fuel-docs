
HA stability and scalability improvements
-----------------------------------------

Mirantis OpenStack 6.0 includes a number of internal enhancements to improve
the stability and scalability of the deployed environment:

* The :ref:`Pacemaker<pacemaker-term>` deployment configuration has been
  improved to support a larger number of OpenStack Controller nodes.

* Debug handling of OCF scripts is now unified, OCF resources have been renamed
  and no longer include the "__old" string. Previously, debugging OCF scripts
  required significant manual intervention by the cloud operator.

* Pacemaker service provider has been refactored to disable creating the
  same service under systemd/upstart/sysvinit.

* Idempotency was fixed in Pacemaker provider. Puppet will not create
  duplicate objects in Corosync CIB anymore.

* Pacemaker provider doesn't use 'crm' or 'pcs' tools anymore. All operations
  are performed using native corosync tools. This allows to use provider with
  CentOS 7 and Ubuntu 14.04 as well as the currently supported OSes.

* OCF scripts were improved to cover more complex HA scenarios.

* If the public NIC on the primary controller becomes unavailable,
  the public VIP now migrates to another controller.
