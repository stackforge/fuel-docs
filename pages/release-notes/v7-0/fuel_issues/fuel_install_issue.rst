* The bootstrapped nodes from a deleted environment,
  which were not rebooted, can be recognized in a
  new environment. However, provisioning and deploying
  of these nodes fails due to the `mco_pass` mismatch.
  See `LP1422819`_.

* If you create a custom repository called ``rabbitmq``,
  will not appear on nodes after you deploy environment.
  Therefore, do not use the ``rabbitmq`` name
  for new repositories in Fuel UI.
  See `LP1477903`_.


.. Links
.. _`LP1422819`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1422819
.. _`LP1477903`: https://bugs.launchpad.net/fuel/+bug/1477903
