.. _how-plugins-work:

How plugins work
================

Beginning with version 6.0, Fuel features the ability to install plugins along
with your environment. Fuel plugins are downloadable software components that
enable you to add new capabilities to your environments in a flexible,
repeatable and reliable manner. There is no need to install drivers and patches
manually after Fuel deploys your cloud – plugins do this for you.

Fuel plugins enable you to install and configure additional capabilities fo
r your cloud, such as additional storage types and networking functionality.
For example, a `Load Balancing as a Service (LBaaS)
<https://github.com/openstack/fuel-plugin-neutron-lbaas>`_
plugin allows you to add network load balancing functionality to your cloud
so that incoming traffic can be spread across multiple nodes. Or you might
want to use a
`Nova NFS plugin <https://github.com/openstack/fuel-plugin-nova-nfs>`_
so that you can use `NFS <https://ru.wikipedia.org/wiki/Network_File_System>`_
as a storage backend for Nova ephemeral volumes.

Fuel offers an open source framework for creating these plugins, so there’s a
wide range of capabilities that you can enable Fuel to add to your OpenStack
clouds. If you’re a hardware vendor that has created drivers that enable
OpenStack to work with your product, you can create a plugin so Fuel can
deploy those drivers when it’s standing up new clouds. Or you might simply
want to enable OpenStack functionality that’s not readily available in Fuel.
Because Fuel includes a pluggable framework, you’re not limited to what’s
provided “out of the box”.

You are also free to use 
`DriverLog <http://stackalytics.com/report/driverlog?project_id=openstack/fuel>`_
as the single registry for all Fuel Plugins.
