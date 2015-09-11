
.. _fuel_install.rst:

Fuel Installation and Deployment
--------------------------------

Known issues
++++++++++++

* The bootstrapped nodes, which were not rebooted,
  from a deleted environment can be recognized in a
  new environment. However, provisioning and deploying
  of these nodes fails due to the `mco_pass` mismatch.
  See `LP1422819`_.

* A complete MySQL and RabbitMQ clusters rebuilding may take up
  to 20 minutes. See `LP1432603`_.

* A custom repository named ``rabbitmq`` will not appear on
  nodes after deployment. To avoid this, please do not use
  the ``rabbitmq`` name for new repositories in Fuel UI.
  See `LP1477903`_.


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

* The fix removes the default libvirt network due to possible
  conflicts with a VM subnetwork in a production cluster.
  See `LP1437410`_.

.. Links
.. _`LP1491725`: https://bugs.launchpad.net/fuel/+bug/1491725
.. _`LP1437410`: https://bugs.launchpad.net/fuel/7.0.x/+bug/1437410
.. _`LP1422819`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1422819
.. _`LP1432603`: https://bugs.launchpad.net/fuel/+bug/1432603
.. _`LP1477903`: https://bugs.launchpad.net/fuel/+bug/1477903
