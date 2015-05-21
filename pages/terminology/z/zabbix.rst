
.. _zabbix-term:

Zabbix
------

Zabbix is an open source infrastructure monitoring utility.
It is included as an :ref:`Experimental package<experimental-features-term>`
in Mirantis OpenStack 5.1;
Fuel can install Zabbix with your OpenStack environment
when the Experimental package is enabled.
After deploying your environment with Zabbix enabled,
you can access the dashboard using the link
that is displayed on the Fuel dashboard.

For Release 5.1, Zabbix can monitor the following:

- Core OpenStack services: :ref:`nova-term`, :ref:`keystone-term`,
  :ref:`neutron-term`, :ref:`ceilometer-term`, :ref:`horizon-term`,
  :ref:`cinder-term`, :ref:`glance-term`, :ref:`swift-object-storage-term`,
  and :ref:`ovs-term`.

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
- `Zabbix documentation <https://www.zabbix.com/documentation/2.2/manual>`_.

In 6.1 release, Zabbix is implemented as a plugin for Fuel.
You can read the documentation, download and configure
Zabbix plugin using
`Fuel Plugins Catalog <https://www.mirantis.com/products/openstack-drivers-and-plugins/fuel-plugins/>`_.

