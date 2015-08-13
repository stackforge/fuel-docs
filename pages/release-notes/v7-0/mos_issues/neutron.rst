
.. _neutron_rn_7.0:

Neutron
-------

Resolved issues
+++++++++++++++

* In previous versions of Neutron, when the Open vSwitch(OVS) agent
  restarts, it results in brief connectivity interruption between
  VMs.
  New version of Neutron eliminates this issue. When the OVS agent
  restarts, it automatically re-creates the network flows and drops
  only the old ones. See `LP1383674`_.

.. Links
.. _`LP1383674`: https://bugs.launchpad.net/neutron/+bug/1383674