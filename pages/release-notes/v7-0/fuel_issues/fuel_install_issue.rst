* The bootstrapped nodes, which were not rebooted,
  from a deleted environment can be recognized in a
  new environment. However, provisioning and deploying
  of these nodes fails due to the `mco_pass` mismatch.
  See `LP1422819`_.

* A custom repository named ``rabbitmq`` will not appear on
  nodes after deployment. To avoid this, please do not use
  the ``rabbitmq`` name for new repositories in Fuel UI.
  See `LP1477903`_.


.. Links
.. _`LP1422819`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1422819
.. _`LP1477903`: https://bugs.launchpad.net/fuel/+bug/1477903
