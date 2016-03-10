.. _plugins_overview:

Fuel plugins overview
---------------------

Fuel provides plugins that you can use to extend the functionality
of your OpenStack environment and enable Fuel to work with various
third-party components and technologies.

Most of the Fuel plugins are developed by the OpenStack community
members, as well as by the companies who support OpenStack.
The Fuel plugins are distributed free of charge.

Fuel currently has the following plugins:

* Networking plugins
  Fuel plugins such as Firewall-as-a-Service and VPN-as-a-Service,
  as well as plugins that enable Fuel to work with enterprise-grade
  SDN and virtual networking.

* Operations management plugins
  Enable Fuel to work with the third-party monitoring tools such as
  Zabbix and Grafana.

* Storage plugins
  Extend Fuel functionality by enabling OpenStack to use enterprise-class
  storage platforms as a Cinder backend.

* Compute plugins
  Extend the Fuel compute functionality. For example, the XenServer plugin
  enables you to use the XenServer hypervisor as a compute provider.

.. note::

    You must install all Fuel plugins that affect core Fuel functionality,
    such as ML2 drivers, SDN, or storage plugins, before you deploy an
    OpenStack environment. Application-level plugins, such as LMA, Zabbix,
    and so on can be installed later.

`Fuel Plugins SDK <https://wiki.openstack.org/wiki/Fuel/Plugins>`__ enables
you to develop virtually any plugin that you need to meet your environment
prerequisites.


.. see::

   - `Fuel Plugins catalog <http://stackalytics.com/report/driverlog?project_id=openstack%2Ffuel>`__
