.. _mos61mu-1486907:

MOS 6.1 Maintenance Update 2 - OpenStack fixes
==============================================

This is cumulative maintenance update for Mirantis OpenStack 6.1
containing fixes to the following issues:

* [OSSA 2015-009] [CVE-2015-3988] Multiple cross-site scripting (XSS) 
  vulnerabilities in OpenStack Dashboard (Horizon) 2015.1.0 allow remote 
  authenticated users to inject arbitrary web script or HTML via the 
  metadata to a Glance image, Nova flavor or Host Aggregate. 
  See `LP1468744 <https://bugs.launchpad.net/bugs/1468744>`_,
  `CVE2015-3988 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-3988>`_.

* When using the '--nic port-id' option for nova boot to bind a server 
  to an existing port, nova deletes the preexisting port on server terminate
  (delete). This behavior is not correct since the user has preallocated 
  the port object and will expect it to only be unbound from the server 
  on delete. See `LP1486727 <https://bugs.launchpad.net/bugs/1486727>`_.

* Now it is possible to change the default permissions for files created 
  by Swift in order to restrict access to these files.
  See `LP1459703 <https://bugs.launchpad.net/bugs/1459703>`_.

* When Cinder connects to Ceph cluster it spawned new thread which imports
  another Python module. Under some conditions that could lead to a deadlock
  (this is known Python issue). The issue was fixed by connecting to Ceph
  cluster in the same thread (spawning new thread was removed).
  See `LP1459781 <https://bugs.launchpad.net/bugs/1459781>`_.

* Currently Glance is deployed as WSGI application which allows persistent
  connections. Hence, the WSGI server does not close the client's socket 
  connection after the response is sent to the client. These sockets have
  associated threads which are not released and create permanent CPU load
  even on standby cluster. The issue was fixed by introducing new configuration 
  options: http_keepalive and client_socket_timeout.
  See `LP1463522 <https://bugs.launchpad.net/bugs/1463522>`_. 

* Vanilla Hadoop plugin used incorrect config parameter for cinder/ephemeral
  volumes to store HDFS data.
  See `LP1473320 <https://bugs.launchpad.net/bugs/1473320>`_. 

* The creation of Heat resource group fails if that group points to a nested 
  template with a wait condition and the name of the wait condition is too long. 
  That was fixed by changing domain authentication to use user ID instead of
  name - that works even when the username is truncated or modified in any other
  way before it is passed to keystone.
  See `LP1481197 <https://bugs.launchpad.net/bugs/1481197>`_.

Affected packages
-----------------
* **Centos\@6.1:** openstack-cinder=2014.2.2-fuel6.1.mira9
* **Centos\@6.1:** openstack-dashboard=2014.2.2-fuel6.1.mira25
* **Centos\@6.1:** openstack-glance=2014.2.2-fuel6.1.mira8
* **Centos\@6.1:** openstack-heat-api=2014.2.2-fuel6.1.mira8
* **Centos\@6.1:** openstack-heat-api-cfn=2014.2.2-fuel6.1.mira8
* **Centos\@6.1:** openstack-heat-api-cloudwatch=2014.2.2-fuel6.1.mira8
* **Centos\@6.1:** openstack-heat-common=2014.2.2-fuel6.1.mira8
* **Centos\@6.1:** openstack-heat-docker=2014.2.2-fuel6.1.mira8
* **Centos\@6.1:** openstack-heat-engine=2014.2.2-fuel6.1.mira8
* **Centos\@6.1:** openstack-nova=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** openstack-nova-api=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** openstack-nova-cells=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** openstack-nova-cert=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** openstack-nova-common=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** openstack-nova-compute=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** openstack-nova-conductor=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** openstack-nova-console=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** openstack-nova-network=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** openstack-nova-novncproxy=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** openstack-nova-objectstore=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** openstack-nova-scheduler=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** python-cinder=2014.2.2-fuel6.1.mira9
* **Centos\@6.1:** python-glance=2014.2.2-fuel6.1.mira8
* **Centos\@6.1:** sahara=2014.2.2-fuel6.1.mira16
* **Ubuntu\@6.1:** glance-api=2014.2.2-1~u14.04+mos8
* **Ubuntu\@6.1:** glance-common=2014.2.2-1~u14.04+mos8
* **Ubuntu\@6.1:** glance-registry=2014.2.2-1~u14.04+mos8
* **Ubuntu\@6.1:** glance_2014.2.2-1~u14.04+mos8
* **Ubuntu\@6.1:** python-glance=2014.2.2-1~u14.04+mos8
* **Ubuntu\@6.1:** cinder-api=2014.2.2-1~u14.04+mos13
* **Ubuntu\@6.1:** cinder-backup=2014.2.2-1~u14.04+mos13
* **Ubuntu\@6.1:** cinder-common=2014.2.2-1~u14.04+mos13
* **Ubuntu\@6.1:** cinder-scheduler=2014.2.2-1~u14.04+mos13
* **Ubuntu\@6.1:** cinder-volume=2014.2.2-1~u14.04+mos13
* **Ubuntu\@6.1:** python-cinder=2014.2.2-1~u14.04+mos13
* **Ubuntu\@6.1:** heat-api-cfn=2014.2.2-1~u14.04+mos8
* **Ubuntu\@6.1:** heat-api-cloudwatch=2014.2.2-1~u14.04+mos8
* **Ubuntu\@6.1:** heat-api=2014.2.2-1~u14.04+mos8
* **Ubuntu\@6.1:** heat-common=2014.2.2-1~u14.04+mos8
* **Ubuntu\@6.1:** heat-docker=2014.2.2-1~u14.04+mos8
* **Ubuntu\@6.1:** heat-engine=2014.2.2-1~u14.04+mos8
* **Ubuntu\@6.1:** python-heat=2014.2.2-1~u14.04+mos8
* **Ubuntu\@6.1:** nova-ajax-console-proxy=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-api-ec2=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-api-metadata=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-api-os-compute=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-api-os-volume=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-api=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-baremetal=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-cells=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-cert=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-common=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-compute-kvm=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-compute-libvirt=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-compute-lxc=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-compute-qemu=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-compute-vmware=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-compute_xen=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-compute=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-conductor=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-console=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-consoleauth=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-network=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-novncproxy=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-objectstore=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-scheduler=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-spiceproxy=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-volume=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** nova-xvpvncproxy=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** python-nova=2014.2.2-1~u14.04+mos30
* **Ubuntu\@6.1:** openstack-dashboard=2014.2.2-1~u14.04+mos25
* **Ubuntu\@6.1:** python-django-horizon=2014.2.2-1~u14.04+mos25
* **Ubuntu\@6.1:** sahara=2014.2.2-1~u14.04+mos16

Fixed packages
--------------
* **Centos\@6.1:** openstack-cinder=2014.2.2-fuel6.1.mira10
* **Centos\@6.1:** openstack-dashboard=2014.2.2-fuel6.1.mira27
* **Centos\@6.1:** openstack-glance=2014.2.2-fuel6.1.mira9
* **Centos\@6.1:** openstack-heat-api=2014.2.2-fuel6.1.mira10
* **Centos\@6.1:** openstack-heat-api-cfn=2014.2.2-fuel6.1.mira10
* **Centos\@6.1:** openstack-heat-api-cloudwatch=2014.2.2-fuel6.1.mira10
* **Centos\@6.1:** openstack-heat-common=2014.2.2-fuel6.1.mira10
* **Centos\@6.1:** openstack-heat-docker=2014.2.2-fuel6.1.mira10
* **Centos\@6.1:** openstack-heat-engine=2014.2.2-fuel6.1.mira10
* **Centos\@6.1:** openstack-nova=2014.2.2-fuel6.1.mira28
* **Centos\@6.1:** openstack-nova-api=2014.2.2-fuel6.1.mira28
* **Centos\@6.1:** openstack-nova-cells=2014.2.2-fuel6.1.mira28
* **Centos\@6.1:** openstack-nova-cert=2014.2.2-fuel6.1.mira28
* **Centos\@6.1:** openstack-nova-common=2014.2.2-fuel6.1.mira28
* **Centos\@6.1:** openstack-nova-compute=2014.2.2-fuel6.1.mira28
* **Centos\@6.1:** openstack-nova-conductor=2014.2.2-fuel6.1.mira28
* **Centos\@6.1:** openstack-nova-console=2014.2.2-fuel6.1.mira28
* **Centos\@6.1:** openstack-nova-network=2014.2.2-fuel6.1.mira28
* **Centos\@6.1:** openstack-nova-novncproxy=2014.2.2-fuel6.1.mira28
* **Centos\@6.1:** openstack-nova-objectstore=2014.2.2-fuel6.1.mira28
* **Centos\@6.1:** openstack-nova-scheduler=2014.2.2-fuel6.1.mira28
* **Centos\@6.1:** python-cinder=2014.2.2-fuel6.1.mira10
* **Centos\@6.1:** python-glance=2014.2.2-fuel6.1.mira9
* **Centos\@6.1:** sahara=2014.2.2-fuel6.1.mira17
* **Ubuntu\@6.1:** cinder-api=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** cinder-backup=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** cinder-common=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** cinder-scheduler=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** cinder-volume=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** python-cinder=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** glance-api=2014.2.2-1~u14.04+mos9
* **Ubuntu\@6.1:** glance-common=2014.2.2-1~u14.04+mos9
* **Ubuntu\@6.1:** glance-registry=2014.2.2-1~u14.04+mos9
* **Ubuntu\@6.1:** glance_2014.2.2-1~u14.04+mos9
* **Ubuntu\@6.1:** python-glance=2014.2.2-1~u14.04+mos9
* **Ubuntu\@6.1:** heat-api-cfn=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** heat-api-cloudwatch=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** heat-api=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** heat-common=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** heat-docker=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** heat-engine=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** python-heat=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** nova-ajax-console-proxy=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-api-ec2=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-api-metadata=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-api-os-compute=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-api-os-volume=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-api=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-baremetal=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-cells=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-cert=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-common=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-compute-kvm=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-compute-libvirt=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-compute-lxc=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-compute-qemu=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-compute-vmware=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-compute_xen=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-compute=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-conductor=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-console=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-consoleauth=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-network=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-novncproxy=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-objectstore=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-scheduler=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-spiceproxy=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-volume=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** nova-xvpvncproxy=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** python-nova=2014.2.2-1~u14.04+mos31
* **Ubuntu\@6.1:** openstack-dashboard=2014.2.2-1~u14.04+mos27
* **Ubuntu\@6.1:** python-django-horizon=2014.2.2-1~u14.04+mos27
* **Ubuntu\@6.1:** sahara=2014.2.2-1~u14.04+mos17

Patching scenario - CentOS
--------------------------

#. Run the following commands on OpenStack compute nodes, OpenStack
   controller nodes, OpenStack Cinder nodes::

       yum clean expire-cache
       yum -y update openstack-cinder
       yum -y update openstack-dashboard
       yum -y update openstack-glance
       yum -y update openstack-heat*
       yum -y update openstack-nova*
       yum -y update python-cinder
       yum -y update python-glance
       yum -y update sahara

#. Run the following commands on OpenStack controller nodes::

       pcs resource disable p_heat-engine
       pcs resource disable p_neutron-l3-agent
       pcs resource disable p_neutron-metadata-agent
       pcs resource disable p_neutron-dhcp-agent
       pcs resource disable p_neutron-plugin-openvswitch-agent
       pcs resource enable p_neutron-plugin-openvswitch-agent
       pcs resource enable p_neutron-dhcp-agent
       pcs resource enable p_neutron-metadata-agent
       pcs resource enable p_neutron-l3-agent
       pcs resource enable p_heat-engine

#. Restart all non-HA OpenStack services on compute and controller
   nodes.

Patching scenario - Ubuntu
--------------------------

#. Run the following commands on OpenStack compute nodes, OpenStack
   controller nodes, OpenStack Cinder nodes::

       apt-get update
       apt-get install --only-upgrade -y cinder*
       apt-get install --only-upgrade -y openstack-dashboard
       apt-get install --only-upgrade -y glance*
       apt-get install --only-upgrade -y heat*
       apt-get install --only-upgrade -y nova*
       apt-get install --only-upgrade -y python-cinder
       apt-get install --only-upgrade -y python-django-horizon
       apt-get install --only-upgrade -y python-glance
       apt-get install --only-upgrade -y python-heat
       apt-get install --only-upgrade -y pyton-nova
       apt-get install --only-upgrade -y sahara

#. Run the following commands on OpenStack controller nodes::

       pcs resource disable p_heat-engine
       pcs resource disable p_neutron-l3-agent
       pcs resource disable p_neutron-metadata-agent
       pcs resource disable p_neutron-dhcp-agent
       pcs resource disable p_neutron-plugin-openvswitch-agent
       pcs resource enable p_neutron-plugin-openvswitch-agent
       pcs resource enable p_neutron-dhcp-agent
       pcs resource enable p_neutron-metadata-agent
       pcs resource enable p_neutron-l3-agent
       pcs resource enable p_heat-engine

#. Restart all non-HA OpenStack services on compute and controller
   nodes.

