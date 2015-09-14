* The bootstrapped nodes from a deleted environment,
  which were not rebooted, can be recognized in a
  new environment. However, provisioning and deploying
  of these nodes fails due to the `mco_pass` mismatch.
  See `LP1422819`_.

* If you create a custom repository called ``rabbitmq``,
  it will not appear on nodes after you deploy environment.
  Therefore, do not use the ``rabbitmq`` name
  for new repositories in Fuel UI.
  See `LP1477903`_.

* Currently, the Fuel agent has very rudimentary decommissioning
  capabilities.
  If provisioning is failed with the following error message::

     'mdadm: Cannot get exclusive access to /dev/mdXYZ:Perhaps a
     running process, mounted filesystem or active volume group?\n'

  Then you can remove that ``md`` device by hand:

  #. Reboot failed node into bootstrap again.

  #. Check that ``/dev/mdXYZ`` is still presented.

  #. Check that ``/dev/mdXYZ`` has not been mounted. Unmount it.

  #. Check that ``/dev/mdXYZ`` has not been added to any active
     volume group. Remove it from the volume group.
     See https://www.centos.org/docs/5/html/Cluster_Logical_Volume_Manager/PV_remove.html

  #. Proceed with the removal of ``/dev/mdXYZ``.
     See https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/5/html/Deployment_Guide/s2-raid-manage-removing.html

  #. Re-deploy node.

  See `LP1456276`_.

* New disk volumes do not appear when added and saved to a node.
  Workaround: delete a node from a cluster and add it again.
  See `LP1450268`_.

* Do not use initialization service scripts for the services
  managed by Pacemaker. See `LP1427378`_.

.. Links
.. _`LP1422819`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1422819
.. _`LP1477903`: https://bugs.launchpad.net/fuel/+bug/1477903
.. _`LP1456276`: https://bugs.launchpad.net/fuel/7.0.x/+bug/1456276
.. _`LP1450268`: https://bugs.launchpad.net/fuel/7.0.x/+bug/1450268
.. _`LP1427378`: https://bugs.launchpad.net/fuel/+bug/1427378
