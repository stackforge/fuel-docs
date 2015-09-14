* The bootstrapped nodes from a deleted environment,
  which were not rebooted, can be recognized in a
  new environment. However, provisioning and deploying
  of these nodes fails due to the `mco_pass` mismatch.
  See `LP1422819`_.

* If you create a custom repository called ``rabbitmq``,
  it will not appear on nodes after you deploy an environment.
  Therefore, do not use the ``rabbitmq`` name
  for new repositories in Fuel UI.
  See `LP1477903`_.

* If provisioning is failed on one of the nodes with the
  following error message::

     'mdadm: Cannot get exclusive access to /dev/mdXYZ:Perhaps a
     running process, mounted filesystem or active volume group?'

  Then you can remove that ``md`` device manually:

  #. Reboot the failed node into bootstrap again.

  #. Check that the ``/dev/mdXYZ`` volume is still present.

  #. Check that the ``/dev/mdXYZ`` volume is not mounted.

  #. Check that the ``/dev/mdXYZ`` volume has not been added to any active
     volume group.

  #. Remove it from the volume group.
     See https://www.centos.org/docs/5/html/Cluster_Logical_Volume_Manager/PV_remove.html

  #. Proceed with the removal of ``/dev/mdXYZ``.
     See https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/5/html/Deployment_Guide/s2-raid-manage-removing.html

  #. Re-deploy the node.

  See `LP1456276`_.

* Do not use initialization service scripts for the services
  managed by Pacemaker. See `LP1427378`_.

.. Links
.. _`LP1422819`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1422819
.. _`LP1477903`: https://bugs.launchpad.net/fuel/+bug/1477903
.. _`LP1456276`: https://bugs.launchpad.net/fuel/7.0.x/+bug/1456276
.. _`LP1427378`: https://bugs.launchpad.net/fuel/+bug/1427378
