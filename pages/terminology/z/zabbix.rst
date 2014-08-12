
.. _zabbix-term:

Zabbix
------

Zabbix is an open source cluster monitoring package.
It is included as an Experimental package in Mirantis OpenStack 5.1;
Fuel can install Zabbix in your OpenStack environment
when the Experimental package is enabled.
After deploying your environment with Zabbix enabled,
you can access the dashboard using the link
that is displayed on the Fuel dashboard.

For Release 5.1, Zabbix can monitor the following:

- Core OpenStack services: :ref:`nova-term`, :ref:`keystone-term`,
  :ref:`cinder-term`, :ref:`glance-term`, and :ref:`neutron-term`.

- Core infrastructure components: :ref:`mysql-term`,
  :ref:`rabbitmq-term`, :ref:`haproxy-term`,
  memchached, and libvirtd.

- Operating system statistics: Disk I/O, CPU load, free RAM, et cetera.

For more information, see

- :ref:`zabbix-plan` contains information about
  planning for Zabbix.
- :ref:`zabbix-arch` describes how Zabbix is implemented
  in Mirantis OpenStack.
- :ref:`assign-roles-ug` discusses the Fuel screen used
  to enable the Zabbix server.
- :ref:`zabbix-ops` introduces the Zabbix dashboard.
- `Zabbix documentation <https://www.zabbix.com/documentation/2.2/manual/concepts>`_.


