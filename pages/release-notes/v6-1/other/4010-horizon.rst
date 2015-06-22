
.. _horizon-rn:

OpenStack dashboard (Horizon)
-----------------------------

Resolved Horizon issues
+++++++++++++++++++++++


Known Horizon issues
++++++++++++++++++++

* If one of the two Neutron options is chosen during the
  :guilabel:`Network Setup` of the :guilabel:`Create a New
  OpenStack environment` wizard, the :guilabel:`Disassociate Floating IP`
  option disappears for an instance with an associated floating IP on
  the :menuselection:`Project > Compute > Instances` table within
  Horizon. This is NOT an issue if the :guilabel:`Nova Network` is chosen
  during the :guilabel:`Network Setup`. You can work around this issue
  by using the :guilabel:`Disassociate Floating IP` located in the
  :menuselection:`Project > Access & Security > Floating IPs` table
  within Horizon. See `LP1325575`_.

* When changing tenants, the current region (Keystone service region)
  may change unexpectedly. After logging in or changing tenants, a
  user should select their desired region to ensure they are working
  with the correct one. See `LP1452722`_.

.. Links
.. _`LP1325575`: https://bugs.launchpad.net/mos/6.1.x/+bug/1325575
.. _`LP1452722`: https://bugs.launchpad.net/mos/+bug/1452722
