
.. _fuel_install.rst:

Fuel Installation and Deployment
--------------------------------

Resolved issues
+++++++++++++++

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

* Anaconda failures no longer affect the deployment, since
  image based provisioning is used starting with Fuel 6.1.
  See `LP1321790`_.

.. Links
.. _`LP1491725`: https://bugs.launchpad.net/fuel/+bug/1491725
.. _`LP1321790`: https://bugs.launchpad.net/bugs/1321790

