Other Enhancements
==================

Murano has been updated to the latest version
---------------------------------------------

Mirantis OpenStack 4.1 includes version 0.4.1 of Murano,
an application catalog and data services lifecycle management addition for OpenStack.
This maintenance release of Murano includes several bug fixes
and the following enhancements:

Key-pair for Linux Services
+++++++++++++++++++++++++++

For Murano 0.4.1, the workflow for creating Linux-based services
with key-pairs has been improved.
It is now possible to create a Linux service either with a key-pair or without one.
In the Murano UI, a "Key Pair" field is included on the Linux-services creation form;
use this to set the key-pair with which you will connect to the instance.

Per-tenant isolation
++++++++++++++++++++

In this version of Murano, service definitions can only be modified inside  a tenant.
Per-tenant repositories with service definitions are completely isolated from each other.
These are created on demand,
at the moment when the first user of the given tenant attempts to use Murano for the first time.

Floating IP auto-assignment
+++++++++++++++++++++++++++

In this release, auto-assignment of VIP and Floating IP is introduced.
You can assign a Floating IP to your application during the deployment,
which allows a user to connect to any application built with Murano from an external network.
For web-farm services that use routers in their network topology,
Floating IP addresses are assigned to the instance with a load-balancer.
If you have deployed Neutron LBaaS manually, it is detected automatically;
you do not need to specify the location in your configuration.

For detailed information, please refer to the
`Release Notes for Murano version 0.4.1 <https://wiki.openstack.org/wiki/Murano/ReleaseNotes_v0.4.1>`_.

Savanna includes the Intel Distribution for Apache Hadoop plugin
----------------------------------------------------------------

The Savanna project provided with Mirantis OpenStack 4.1
includes the Intel Distribution for Apache Hadoop version 2.5.1.
This plug-in enables features such as:

*  Installation and provisioning of Intel Hadoop Manager and Intel Hadoop
*  The ability to attach Cinder volumes to VMs with Intel Hadoop
*  Manual cluster scaling
*  Swift integration
*  Cluster configuration using the same configuration methods as “vanilla” Hadoop
*  Configuration validation in a manner similar to “vanilla” Hadoop.

More information about this integration is available in the
`blueprint <https://blueprints.launchpad.net/savanna/+spec/idh-savanna-plugin>`_.
Additional information about Savanna can be found on the
`Savanna project home page <https://wiki.openstack.org/wiki/Savanna>`_.
Information about Intel Hadoop can be found at the
`Intel Distribution for Apache Hadoop web page <https://hadoop.intel.com/>_.
