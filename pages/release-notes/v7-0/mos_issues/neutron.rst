
.. _neutron_rn_7.0:

Neutron
-------

Resolved issues
+++++++++++++++

* Previously, due to restart of OVS agent all the existing
  flows were dropped. That broke all networking until the flows
  were re-created. Now, when the OVS agent restarts, it re-creates
  flows and drops only the old ones that are not connected with
  anything. See `LP1383674`_.

.. Links
.. _`LP1383674`: https://bugs.launchpad.net/neutron/+bug/1383674
