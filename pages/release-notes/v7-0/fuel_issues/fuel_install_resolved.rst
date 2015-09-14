* Previously, deployment might fail with an error::

   "<class 'cobbler.cexceptions.CX'>:'MAC address duplicated"

  That behavior was caused by mass nodes removing from Cobbler
  ans some of them can remain. As Cobbler is not designed
  to be scalable, it stores all data in plain text files
  and manipulates them quite slowly.

  The fix checks if there are no nodes in
  Cobbler with the same MAC addresses. Otherwise Cobbler
  throws MAC address duplication error.
  See `LP1491725`_.

* The fix removes the default libvirt network due to possible
  conflicts with a VM subnetwork in a production cluster.
  See `LP1437410`_.

* The fix adds the upstream DNS servers to ``dnsmasq.conf``
  to fix subdomain resolving. See `LP1491583`_.

.. Links
.. _`LP1491725`: https://bugs.launchpad.net/fuel/+bug/1491725
.. _`LP1437410`: https://bugs.launchpad.net/fuel/7.0.x/+bug/1437410
.. _`LP1491583`: https://bugs.launchpad.net/fuel/+bug/1491583
