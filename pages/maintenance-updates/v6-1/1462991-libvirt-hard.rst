.. _mos61mu-1462991:

[libvirt] Handle empty context on _hard_reboot
==============================================

If an instance is created from a multi-part image (separate kernel and ramdisk files), 
and resume_guests_state_on_host_boot=True, the resulting _hard_reboot fails and puts the instance into an error state. 
The fix ensures that the attempts to get access to the images are possible when the context is available.
See `LP1462991 <https://bugs.launchpad.net/bugs/1462991>`_.

Affected packages
-----------------
* Centos@6.1: openstack-nova-compute=2014.2.2-fuel6.1.mira27
* Ubuntu@6.1: nova-compute-libvirt=2014.2.2-1~u14.04+mos30

Fixed packages
--------------
* Centos@6.1: openstack-nova-compute=2014.2.2-fuel6.1.mira28
* Ubuntu@6.1: nova-compute-libvirt=2014.2.2-1~u14.04+mos31

Patching scenario - CentOS
--------------------------

Run the following commands on OpenStack compute nodes:
::

    yum clean expire-cache
    yum -y update openstack-nova-compute*
    service openstack-nova-compute restart

Patching scenario - Ubuntu
--------------------------

Run the following commands on OpenStack compute nodes:
::

    apt-get update
    apt-get install --only-upgrade -y nova-compute*
    initctl restart nova-compute
