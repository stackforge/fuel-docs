.. _plugins_overview:


Fuel plugins overview
=====================

Fuel provides plugins that you can use to extend the functionality
of your OpenStack environment and enable Fuel to work with various
third-party components and technologies.

Most of the Fuel plugins are developed by the OpenStack community
members, as well as by the companies, and distributed free of charge.

Fuel has the following categories of plugins:

* Networking plugins
  Neutron plugins such as Firewall-as-a-Service and VPN-as-a-Service,
  as well as plugins that enable Fuel to work with enterprise-grade
  SDN and virtual networking.

* Operations management plugins
  Enable Fuel to work with the third-party monitoring tools such as
  Zabbix and Grafana.

* Storage plugins
  Extend Fuel functionality by enabling OpenStack to use enterprise-class
  storage platforms as a Cinder backend.

You must install all Fuel plugins that you plan to use in your OpenStack
environment before you deploy your environment. You will not be able to
add plugins after deployment.

Fuel comprehensive SDK enables you to write virtually any plugin that you
need to meet your environment prerequisites.


.. seealso::

   - `Fuel Plugins SDK`_
   - `Fuel Plugins catalog`_

.. links
.. _`Fuel Plugins SDK`: https://wiki.openstack.org/wiki/Fuel/Plugins
.. _`Fuel Plugins catalog`: https://www.fuel-infra.org/plugins/catalog.html
