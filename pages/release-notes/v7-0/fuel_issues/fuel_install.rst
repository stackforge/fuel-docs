
.. _fuel_install.rst:

Fuel Installation and Deployment
--------------------------------

Known issues
++++++++++++

* Relict bootstraped nodes (not rebooted) from a previous
  environment are recognized by a new environment, but
  provisioning and deploying fail due to `mco_pass` mismatch.
  See `LP1422819`_.

* Full MySQL and RabbitMQ clusters reassemble may take up
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

* The default libvirt network was removed due to possible
  conflicts with the same network as a VM's subnet in a
  production cluster. See `LP1437410`_.

.. Links
.. _`LP1491725`: https://bugs.launchpad.net/fuel/+bug/1491725
.. _`LP1437410`: https://bugs.launchpad.net/fuel/7.0.x/+bug/1437410
.. _`LP1422819`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1422819
.. _`LP1432603`: https://bugs.launchpad.net/fuel/+bug/1432603
.. _`LP1477903`: https://bugs.launchpad.net/fuel/+bug/1477903
