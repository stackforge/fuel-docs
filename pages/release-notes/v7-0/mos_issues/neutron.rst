
.. _neutron_rn_7.0:

Neutron
-------

Resolved issues
+++++++++++++++

* Previously, restart of OVS agent resulted in brief connectivity
  interruption because OVS agent used to flush OVS traffic rules upon
  the agent start. Now, when OVS agent restarts, it re-creates flows
  and drops only the old ones that are not connected with anything.
  See `LP1383674`_.

.. Links
.. _`LP1383674`: https://bugs.launchpad.net/neutron/+bug/1383674
