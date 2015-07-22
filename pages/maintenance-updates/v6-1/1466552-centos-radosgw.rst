CentOS radosgw doesn't start after reboot
=========================================
.. _mos61mu-1466552:

CentOS ``radosgw`` fails to start after reboot. The patch ensures
that the ``radosgw`` service is enabled on boot. See `LP1466552 <https://bugs.launchpad.net/bugs/1466552>`_.

Affected packages
-----------------
* **Centos/@6.1:** fuel-library6.1=6.1.0-6750.1.git2e7a08a

Fixed packages
--------------
* **Centos/@6.1:** fuel-library6.1=6.1.0-6755.1

Patching scenario - CentOS
--------------------------

#. Run the following commands on Fuel master node::

       yum clean expire-cache
       yum -y update fuel-*
       fuel rel --sync-deployment-tasks --dir /etc/puppet

#. Run the following commands on OpenStack controller nodes::

       chkconfig ceph-radosgw on
       /etc/init.d/ceph-radosgw start

