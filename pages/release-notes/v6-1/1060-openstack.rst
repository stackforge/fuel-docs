
.. _fuel-general.rst:

OpenStack Deployment Issues
===========================

Resolved deployment issues
--------------------------

Known deployment issues
-----------------------

* During OpenStack deployment, a spurious critical error may appear
  in the ``openvswitch-agent.log`` file. The error is misleading;
  no actual malfunction occurs. See `LP1347612`_.

* There is a minor issue with modules for Puppet which may cause
  the deployment fail with MySQL deadlock errors because of
  concurrent Puppet run at controllers. The workaround is to
  repeat the failed deploy action again. See `LP1330875`_.

.. Links
.. _`LP1347612`: https://bugs.launchpad.net/mos/6.1.x/+bug/1347612
.. _`LP1330875`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1330875
