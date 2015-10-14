.. _mos61mu-1482121:

[vcenter] After a failover nova-compute searches for images in a new directory
==============================================================================

When vCenter is configured as a hypervisor, nova-compute uses vCenter datastores for the image cache.
By default, the image cache directory is configured with a ``$my_ip_base`` value.
When nova-compute is moved to another Controller node (if a manual service restart
with ``pcs resource disable ..`` or a failover occurs), a new empty cache directory
appears in the datastore. VMs boot much slower, because Nova starts downloading an
image to cache before it can actually start a VM. The fix adds a new configuration
option ``cache_prefix`` to denote which cache directory should be used by a particular nova-compute instance.
See `LP1482121 <https://bugs.launchpad.net/bugs/1482121>`_.

Affected packages
-----------------
* **CentOS/@6.1:** python-nova=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova-api=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova-cells=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova-cert=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova-common=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova-compute=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova-conductor=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova-console=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova-doc=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova-network=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova-novncproxy=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova-objectstore=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** openstack-nova-scheduler=2014.2.2-fuel6.1.mira32
* **CentOS/@6.1:** fuel-library6.1=6.1.0-6763.1
* **Ubuntu/@6.1:** nova-ajax-console-proxy=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-api-ec2=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-api-metadata=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-api-os-compute=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-api-os-volume=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-api=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-baremetal=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-cells=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-cert=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-common=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-compute-kvm=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-compute-libvirt=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-compute-lxc=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-compute-qemu=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-compute-vmware=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-compute-xen=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-compute=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-conductor=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-console=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-consoleauth=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-doc=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-network=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-novncproxy=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-objectstore=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-scheduler=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-spiceproxy=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-volume=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** nova-xvpvncproxy=2014.2.2-1~u14.04+mos32
* **Ubuntu/@6.1:** python-nova=2014.2.2-1~u14.04+mos32

Fixed packages
--------------
* **CentOS/@6.1:** python-nova=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova-api=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova-cells=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova-cert=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova-common=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova-compute=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova-conductor=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova-console=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova-doc=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova-network=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova-novncproxy=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova-objectstore=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** openstack-nova-scheduler=2014.2.2-fuel6.1.mira34
* **CentOS/@6.1:** fuel-library6.1=6.1.0-6764.1
* **Ubuntu/@6.1:** nova-ajax-console-proxy=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-api-ec2=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-api-metadata=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-api-os-compute=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-api-os-volume=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-api=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-baremetal=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-cells=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-cert=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-common=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-compute-kvm=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-compute-libvirt=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-compute-lxc=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-compute-qemu=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-compute-vmware=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-compute-xen=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-compute=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-conductor=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-console=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-consoleauth=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-doc=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-network=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-novncproxy=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-objectstore=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-scheduler=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-spiceproxy=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-volume=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** nova-xvpvncproxy=2014.2.2-1~u14.04+mos34
* **Ubuntu/@6.1:** python-nova=2014.2.2-1~u14.04+mos34

Patching scenario - Fuel Master node
------------------------------------

Run the following commands on the Fuel Master node::

        yum clean expire-cache
        yum -y update fuel-library

Patching scenario - Ubuntu
--------------------------

#. Run the following commands on the OpenStack Controller nodes::

        apt-get update
        apt-get install --only-upgrade -y nova-*

#. Add the following line to the ``[vmware]`` section of the `/etc/nova/nova-compute.conf` file::

        cache_prefix=$host

#. Restart nova-compute process.

Patching scenario - CentOS
--------------------------

#. Run the following commands on the OpenStack Controller nodes::

        yum clean expire-cache
        yum -y update openstack-nova-*

#. Add the following line to the ``[vmware]`` section of the `/etc/nova/nova-compute.conf` file::

        cache_prefix=$host

#. Restart nova-compute process.

