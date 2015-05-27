
.. _horizon-rn:

OpenStack Dashboard (Horizon)
-----------------------------

Resolved Horizon Issues
+++++++++++++++++++++++


Known Horizon Issues
++++++++++++++++++++

* If one of two Neutron options are chosen in the :guilabel:`Network`
  configuration section during the environment deployment, the
  :guilabel:`Disassociate Floating IP` option disappears for an
  instance with an associated floating IP in the
  :menuselection:`Project > Compute > Instances` table (though it
  works when :guilabel:`Nova Network` option is chosen during
  deployment). You can still find (and use) this option in the
  :menuselection:`Project > Access & Security > Floating IPs` table.
  See `LP1325575`_.


.. Links
.. _`LP1325575`: https://bugs.launchpad.net/mos/6.1.x/+bug/1325575
