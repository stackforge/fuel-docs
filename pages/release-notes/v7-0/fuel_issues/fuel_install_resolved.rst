* In earlier versions of Fuel, Fuel installation could fail
  with the following error message::

   "<class 'cobbler.cexceptions.CX'>:'MAC address duplicated"

  The failure to install Fuel occurred when a significant number
  of nodes were removed from Cobbler, but some remained in
  Cobbler. The reason of this issue is that Cobbler being
  not scalable by design stores all data in plain text files,
  and manipulates the files slowly.

  The fix verifies that Cobbler does not contain any nodes
  with the same MAC address. Otherwise, Cobbler
  throws a MAC address duplication error.
  See `LP1491725`_.

* The fix removes the default libvirt network due to possible
  conflicts with a VM subnetwork in a production cluster.
  See `LP1437410`_.

* The fix repairs the subdomain resolving by adding the upstream
  DNS servers to ``dnsmasq.conf``. See `LP1491583`_.

.. Links
.. _`LP1491725`: https://bugs.launchpad.net/fuel/+bug/1491725
.. _`LP1437410`: https://bugs.launchpad.net/fuel/7.0.x/+bug/1437410
.. _`LP1491583`: https://bugs.launchpad.net/fuel/+bug/1491583
