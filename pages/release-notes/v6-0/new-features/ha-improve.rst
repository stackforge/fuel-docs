
HA stability improvements
-------------------------

Mirantis OpenStack 6.0 includes a number of internal enhancements
that continue to improve the stability of the deployed environment:

* The :ref:`Pacemaker<pacemaker-term>` deployment configuration
  can support a larger number of OpenStack Controller nodes
  than in previous releases.

* Debug handling of OCF scripts is now unified.
  OCF resources have been renamed
  and no longer include the "__old" string.
  Previously, significant manual intervention by the operator
  was required to debug OCF scripts.

* The OCF service provider has been refactored
  to disable creating the same service under *systemd/upstart/sysvinit*.

* If the public NIC on the primary controller becomes unavailable,
  the public VIP now migrates to another controller.

