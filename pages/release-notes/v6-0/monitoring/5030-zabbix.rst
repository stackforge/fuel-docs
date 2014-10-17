
.. _zabbix-rn:

Monitoring System Server (Zabbix)
---------------------------------


New Features and Resolved Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Known Issues in Mirantis OpenStack 5.1
++++++++++++++++++++++++++++++++++++++

Phase I of Zabbix is included as an
:ref:`Experimental<experimental-features-term>` feature
in Mirantis OpenStack 5.1.
This version has the following known issues:

- A CentOS environment cannot be configured to run Zabbix.
  `A patch <https://review.openstack.org/121588>`_ is available and has to be
  :ref:`applied manually<apply-patch-ops>` to work around this issue.
  See `LP1368151 <https://bugs.launchpad.net/bugs/1368151>`_.
- The Zabbix-server role must be installed on a dedicated node;
  it cannot be combined with any other role.
- Phase I does not support Ceilometer, Savanna, Murano, Heat, or Ceph.
- Zabbix agents cannot be configured to report
  to a remote (outside the current environment) Zabbix server
- Zabbix agents cannot be configured to report
  to multiple Zabbix servers.
- There are false Zabbix issues after deploying with Nova-network.
  This can be resolved via attaching "Template App OpenStack Nova Network" to compute nodes
  instead of controller nodes. See `LP1365171 <https://bugs.launchpad.net/fuel/+bug/1365171>`_.
- List of "Zabbix monitoring items" is different from "Zabbix overview" list.
  See `LP1352319 <https://bugs.launchpad.net/bugs/1352319>`_.

See :ref:`zabbix-plan` for more information.


Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

