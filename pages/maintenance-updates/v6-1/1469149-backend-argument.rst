.. _mos61mu-1469149:

backend_argument containing a password leaked in logs
=====================================================

The keystone.conf file has an option backend_argument to set various options for the caching backend.
As documented, some of the values in this option can contain a password. 
Therefore, the option is marked as confidential to avoid leakage into the logs.
See `LP1469149 <https://bugs.launchpad.net/bugs/1469149>`_, `CVE2015-3646 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=2015-3646>`_.

Affected packages
-----------------
* Centos@6.1: openstack-keystone=2014.2.2-fuel6.1.mira17
* Centos@6.1: python-keystone=2014.2.2-fuel6.1.mira17
* Ubuntu@6.1: keystone=2014.2.2-1~u14.04+mos17
* Ubuntu@6.1: python-keystone=2014.2.2-1~u14.04+mos17

Fixed packages
--------------
* Centos@6.1: openstack-keystone=2014.2.2-fuel6.1.mira18
* Centos@6.1: python-keystone=2014.2.2-fuel6.1.mira18
* Ubuntu@6.1: keystone=2014.2.2-1~u14.04+mos18
* Ubuntu@6.1: python-keystone=2014.2.2-1~u14.04+mos18

Patching scenario - CentOS
--------------------------

Run the following commands on OpenStack controller nodes:
::

    yum clean expire-cache
    yum -y update python-keystone*
    yum -y update openstack-keystone*
    service openstack-keystone restart

Patching scenario - Ubuntu
--------------------------

Run the following commands on OpenStack controller nodes:
::

    apt-get update
    apt-get install --only-upgrade -y python-keystone*
    apt-get install --only-upgrade -y keystone*
    initctl restart openstack-keystone
