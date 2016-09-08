.. _how-plugins-work:

About Fuel plugins
==================

You can extended the functionality of your OpenStack environment through Fuel
plugins. Some Fuel plugins eliminate the need to install drivers and patches
manually after Fuel deploys an OpenStack environment, while others
enable users to configure additional capabilities, such as additional storage
types and networking functionality. For example, the
`Load Balancing as a Service (LBaaS) <https://github.com/openstack/fuel-plugin-neutron-lbaas>`_
plugin allows you to add network load balancing functionality to your cloud,
so that incoming traffic can be spread across multiple nodes. The
`Nova NFS plugin <https://github.com/openstack/fuel-plugin-nova-nfs>`_
so that you can use `NFS <https://ru.wikipedia.org/wiki/Network_File_System>`_
as a storage backend for Nova ephemeral volumes. There is a number of Fuel
plugins available to download for free
in `DriverLog <http://stackalytics.com/report/driverlog?project_id=openstack/fuel>`_.

In addition, Fuel offers an open source framework that enables developers to
create their own plugins and extend their environment functionalities as
required. For example, hardware vendors can benefit from using the plugin
framework by creating plugins that deploy custom drivers and enable OpenStack
to run on custom hardware.