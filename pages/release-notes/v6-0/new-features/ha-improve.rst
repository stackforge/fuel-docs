
HA stability and scalability improvements
-----------------------------------------

Mirantis OpenStack 6.0 includes a number of internal enhancements to improve
the stability and scalability of the deployed environment:

* The :ref:`Pacemaker<pacemaker-term>` deployment configuration has been
  improved to support a larger number of OpenStack Controller nodes.

* Debug handling of OCF scripts is now unified, OCF resources have been renamed
  and no longer include the "__old" string. Previously, debugging OCF scripts
  required significant manual intervention by the cloud operator.

* The OCF service provider has been refactored to disable creating the same
  service under systemd/upstart/sysvinit.

* Diff operations against Corosync CIB can now save data to memory rather than
  a file, speeding up the shutting down of Corosync services.

* OCF scripts were improved to cover more complex HA scenarios.

* If the public NIC on the primary controller becomes unavailable,
  the public VIP now migrates to another controller.

