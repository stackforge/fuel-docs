.. _mos61mu-1504916:

MOS 6.1 Maintenance Update 3 - OpenStack fixes
==============================================

This cumulative maintenance update for Mirantis OpenStack 6.1 includes the
following bug fixes:

* Changed the default option for a port replacement policy during the
  OpenStack update to ``AUTO``. The fix ensures that during the upgrade Nova
  will not delete a port, but only unbind.

  See `LP1486682 <https://bugs.launchpad.net/bugs/1486682>`_.

* Changed the format of the boot data for volumes created from Ceph images to
  meet Nova requirements. The new format enables correct discovery and usage
  of disk drives. For this type of volumes, Cinder uses Glance API v2
  which has a different format of passing the attributes.

  See `LP1421439 <https://bugs.launchpad.net/bugs/1421439>`_.

* Fixed the issue with Cinder ``ISCSIDriver`` containing LVM-specific calls
  which can lead to failures in drivers inherited from ``ISCSIDriver``.
  The fix moves the LVM-specific calls back to ``LVMISCSIDriver`` and keeps
  the base ``ISCSIDriver`` class as a generic one.

  See `LP1481523 <https://bugs.launchpad.net/bugs/1481523>`_.

* Fixed the issue with Keystone collecting garbage for the list of tokens on
  every request. It could result in significant performance degradation. The
  fix reduces the frequency of garbage collection, and now this operation
  performs only when expired token exist.

  See `LP1466901 <https://bugs.launchpad.net/bugs/1466901>`_.

* Fixed the issue with the creation of undesirable instances. If the
  evaluation period is shorter than the instance starting
  time and ``repeat_actions`` is set to True, extra instances are
  created even when the cooldown is long enough. The fix prevents
  the creation of undesirable extra instances.

  See `LP1474332 <https://bugs.launchpad.net/bugs/1474332>`_.

* When nova-compute fails over, it creates a new folder with cached images
  and downloads them again. It happens when you use nova-compute with VMware
  vCenter and set the ``remove_unused_base_images`` option. This may result in
  a longer VM booting time. The fix introduces a new configuration option
  ``cache_prefix`` that allows using a shared folder to speed up the VM
  booting time.

  See `LP1482121 <https://bugs.launchpad.net/bugs/1482121>`_.

* Fixed the issue with user entries in the Active Directory being filled
  without the ``user_id_attribute`` field, which resulted in Keystone
  failure. The fix fetches entries which have all the required fields populated.

  See `LP1487201 <https://bugs.launchpad.net/bugs/1487201>`_.

* Fixed the issue with the Swift .upstart scripts not including instructions
  for tracking unexpected shutdown of services. The fix adds the ``respawn``
  stanza and sets the limit to 20 retries within 5 seconds as a reasonable
  value for this type of services.

  See `LP1466101 <https://bugs.launchpad.net/bugs/1466101>`_.

* Fixed the issue with the volume attribute content in the Nimble driver being
  improperly checked in the ``display name`` and ``display_description``
  arguments. If these arguments are not empty, they are translated to a volume
  backend description. The patch also modifies other places where returning
  an empty string is more appropriate rather than returning the ``None`` or
  ``return`` value.

  See `LP1481681 <https://bugs.launchpad.net/bugs/1481681>`_.

* The implementation of ``tenant_quota_usages`` did not allow queries against
  any non-current project which resulted in the incorrect data usage while
  creating or editing a new project. The fix passes the project ID to the
  ``tenant_quota_usages`` function.

  See `LP1493263 <https://bugs.launchpad.net/bugs/1493263>`_.

* Added proxy support for Murano client to make it usable in environments
  without direct access to the Internet.

  See `LP1501889 <https://bugs.launchpad.net/bugs/1501889>`_.

* Added Murano middleware to handle SSL proxies to enable Murano
  deployments behind SSL termination proxy.

  See `LP1504611 <https://bugs.launchpad.net/bugs/1504611>`_.

* Fixed 2 usability issues on Network Topology page in Horizon:

  # Terminate Instance button is now functional - it failed because the page was
    generated with wrong data.

  # "Small" and "Normal" buttons now have correct state - they were randomly
    enabled and disabled in some conditions.

  See `LP1398397 <https://bugs.launchpad.net/bugs/1398397>`_,
  `LP1504171 <https://bugs.launchpad.net/bugs/1504171>`_.

Fixed security vulnerabilities
------------------------------

* [CVE-2015-5251] Fixed the security vulnerability in Glance v1 that allowed
  an attacker to change the status of an image by passing the
  ``x-image-meta-status`` header to */images/<image id>* using PUT, and
  therefore, to activate the deactivated images.

  See `LP1496798 <https://bugs.launchpad.net/bugs/1496798>`_,
  `CVE-2015-5251 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-5251>`_.

* [CVE-2015-5286] Fixed the security vulnerability in Glance images. When you
  delete images that were uploaded using a token that was about to expire, a
  malicious user can overcome the storage quota and accumulate untracked
  image data in the backend. It may result in a resource exhaustion and
  denial-of-service attack.

  See `LP1497984 <https://bugs.launchpad.net/bugs/1497984>`_,
  `CVE-2015-5286 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-5286>`_.

* Added a new *instancejobtracker* module to the libvirt driver. This module
  eliminates the issue with the ``scp`` and ``rsync`` processes causing
  the disk space reduction on the Compute nodes. If you resize an existing
  instance to a larger flavor and later delete it,  the ``scp`` and
  ``rsync`` processes continue running until they finish transferring the
  file data. If during the ``scp`` and ``rsync`` processes execution the user
  repeats this operation, it may lead to the disk space reduction on the
  Compute nodes, as well as it may impact the management network.
  The module adds, removes, or terminates the processes running against
  particular instances. Therefore, now the ``scp`` and ``rsync`` processes
  are terminated before you delete an instance.

  See `LP1466077 <https://bugs.launchpad.net/bugs/1466077>`_,
  `CVE-2015-3241 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-3241>`_.

* [CVE-2015-5223] When in possession of a *tempurl* key for a Swift container,
  a malicious user may retrieve objects within any other container of the
  same Swift account (tenant).

  See `LP1487450 <https://bugs.launchpad.net/bugs/1487450>`_,
  `CVE-2015-5223 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-5223>`_.

* [CVE-2015-3280] If an authenticated user deletes an instance while it is in
  the *resize* state, it causes the original instance not to be deleted from
  the Compute node it was running on. An attacker can use this to launch a
  denial-of-service attack.

  See `LP1489775 <https://bugs.launchpad.net/bugs/1489775>`_,
  `CVE-2015-3280 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-3280>`_.

Affected packages
-----------------

* **CentOS\@6.1:** murano=2014.2.2-fuel6.1.mira17
* **CentOS\@6.1:** openstack-cinder=2014.2.2-fuel6.1.mira10
* **CentOS\@6.1:** openstack-cinder-doc=2014.2.2-fuel6.1.mira10
* **CentOS\@6.1:** openstack-dashboard=2014.2.2-fuel6.1.mira27
* **CentOS\@6.1:** openstack-glance=2014.2.2-fuel6.1.mira10
* **CentOS\@6.1:** openstack-glance-doc=2014.2.2-fuel6.1.mira10
* **CentOS\@6.1:** openstack-heat-api=2014.2.2-fuel6.1.mira12
* **CentOS\@6.1:** openstack-heat-api-cfn=2014.2.2-fuel6.1.mira12
* **CentOS\@6.1:** openstack-heat-api-cloudwatch=2014.2.2-fuel6.1.mira12
* **CentOS\@6.1:** openstack-heat-common=2014.2.2-fuel6.1.mira12
* **CentOS\@6.1:** openstack-heat-docker=2014.2.2-fuel6.1.mira12
* **CentOS\@6.1:** openstack-heat-engine=2014.2.2-fuel6.1.mira12
* **CentOS\@6.1:** openstack-keystone=2014.2.2-fuel6.1.mira23
* **CentOS\@6.1:** openstack-keystone-doc=2014.2.2-fuel6.1.mira23
* **CentOS\@6.1:** openstack-nova=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** openstack-nova-api=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** openstack-nova-cells=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** openstack-nova-cert=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** openstack-nova-common=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** openstack-nova-compute=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** openstack-nova-conductor=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** openstack-nova-console=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** openstack-nova-doc=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** openstack-nova-network=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** openstack-nova-novncproxy=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** openstack-nova-objectstore=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** openstack-nova-scheduler=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** python-cinder=2014.2.2-fuel6.1.mira10
* **CentOS\@6.1:** python-django-horizon=2014.2.2-fuel6.1.mira27
* **CentOS\@6.1:** python-django-horizon-doc=2014.2.2-fuel6.1.mira27
* **CentOS\@6.1:** python-glance=2014.2.2-fuel6.1.mira10
* **CentOS\@6.1:** python-glanceclient=0.15.0-fuel6.1.mira5
* **CentOS\@6.1:** python-glanceclient=doc-0.15.0-fuel6.1.mira5
* **CentOS\@6.1:** python-keystone=2014.2.2-fuel6.1.mira23
* **CentOS\@6.1:** python-muranoclient=0.5.6-fuel6.1.mira4
* **CentOS\@6.1:** python-nova=2014.2.2-fuel6.1.mira30
* **CentOS\@6.1:** python-oslo-messaging=1.4.1-fuel6.1.mira32
* **CentOS\@6.1:** python-oslo-messaging-doc=1.4.1-fuel6.1.mira32
* **CentOS\@6.1:** sahara=2014.2.2-fuel6.1.mira16
* **Ubuntu\@6.1:** cinder-api=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** cinder-backup=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** cinder-common=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** cinder-scheduler=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** cinder-volume=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** glance=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** glance-api=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** glance-common=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** glance-registry=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** heat-api=2014.2.2-1~u14.04+mos12
* **Ubuntu\@6.1:** heat-api-cfn=2014.2.2-1~u14.04+mos12
* **Ubuntu\@6.1:** heat-api-cloudwatch=2014.2.2-1~u14.04+mos12
* **Ubuntu\@6.1:** heat-common=2014.2.2-1~u14.04+mos12
* **Ubuntu\@6.1:** heat-docker=2014.2.2-1~u14.04+mos12
* **Ubuntu\@6.1:** heat-engine=2014.2.2-1~u14.04+mos12
* **Ubuntu\@6.1:** keystone=2014.2.2-1~u14.04+mos23
* **Ubuntu\@6.1:** keystone-doc=2014.2.2-1~u14.04+mos23
* **Ubuntu\@6.1:** murano=2014.2.2-1~u14.04+mos15
* **Ubuntu\@6.1:** nova-ajax-console-proxy=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-api=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-api-ec2=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-api-metadata=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-api-os-compute=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-api-os-volume=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-baremetal=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-cells=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-cert=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-common=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-compute=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-compute-kvm=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-compute-libvirt=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-compute-lxc=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-compute-qemu=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-compute-vmware=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-compute-xen=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-conductor=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-console=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-consoleauth=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-doc=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-network=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-novncproxy=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-objectstore=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-scheduler=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-spiceproxy=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-volume=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** nova-xvpvncproxy=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** openstack-dashboard=2014.2.2-1~u14.04+mos27
* **Ubuntu\@6.1:** python-cinder=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** python-django-horizon=2014.2.2-1~u14.04+mos27
* **Ubuntu\@6.1:** python-glance=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** python-glance-doc=2014.2.2-1~u14.04+mos10
* **Ubuntu\@6.1:** python-glanceclient=0.15.0-1~u14.04+mos5
* **Ubuntu\@6.1:** python-heat=2014.2.2-1~u14.04+mos12
* **Ubuntu\@6.1:** python-keystone=2014.2.2-1~u14.04+mos23
* **Ubuntu\@6.1:** python-muranoclient_0.5.6-1~u14.04+mos5
* **Ubuntu\@6.1:** python-nova=2014.2.2-1~u14.04+mos33
* **Ubuntu\@6.1:** python-oslo.messaging=1.4.1-1~u14.04+mos12
* **Ubuntu\@6.1:** python-swift=2.2.0-1~u14.04+mos6
* **Ubuntu\@6.1:** sahara=2014.2.2-1~u14.04+mos16
* **Ubuntu\@6.1:** swift=2.2.0-1~u14.04+mos6
* **Ubuntu\@6.1:** swift-account=2.2.0-1~u14.04+mos6
* **Ubuntu\@6.1:** swift-container=2.2.0-1~u14.04+mos6
* **Ubuntu\@6.1:** swift-doc=2.2.0-1~u14.04+mos6
* **Ubuntu\@6.1:** swift-object=2.2.0-1~u14.04+mos6
* **Ubuntu\@6.1:** swift-object-expirer=2.2.0-1~u14.04+mos6
* **Ubuntu\@6.1:** swift-proxy=2.2.0-1~u14.04+mos6

Fixed packages
--------------

* **CentOS\@6.1:** murano=2014.2.2-fuel6.1.mira18
* **CentOS\@6.1:** openstack-cinder=2014.2.2-fuel6.1.mira12
* **CentOS\@6.1:** openstack-cinder-doc=2014.2.2-fuel6.1.mira12
* **CentOS\@6.1:** openstack-dashboard=2014.2.2-fuel6.1.mira31
* **CentOS\@6.1:** openstack-glance=2014.2.2-fuel6.1.mira11
* **CentOS\@6.1:** openstack-glance-doc=2014.2.2-fuel6.1.mira11
* **CentOS\@6.1:** openstack-heat-api=2014.2.2-fuel6.1.mira14
* **CentOS\@6.1:** openstack-heat-api-cfn=2014.2.2-fuel6.1.mira14
* **CentOS\@6.1:** openstack-heat-api-cloudwatch=2014.2.2-fuel6.1.mira14
* **CentOS\@6.1:** openstack-heat-common=2014.2.2-fuel6.1.mira14
* **CentOS\@6.1:** openstack-heat-docker=2014.2.2-fuel6.1.mira14
* **CentOS\@6.1:** openstack-heat-engine=2014.2.2-fuel6.1.mira14
* **CentOS\@6.1:** openstack-keystone=2014.2.2-fuel6.1.mira24
* **CentOS\@6.1:** openstack-keystone-doc=2014.2.2-fuel6.1.mira24
* **CentOS\@6.1:** openstack-nova=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-nova-api=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-nova-cells=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-nova-cert=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-nova-common=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-nova-compute=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-nova-conductor=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-nova-console=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-nova-doc=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-nova-network=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-nova-novncproxy=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-nova-objectstore=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-nova-scheduler=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** openstack-swift=2.2.0-fuel6.1.mira4
* **CentOS\@6.1:** openstack-swift-account=2.2.0-fuel6.1.mira4
* **CentOS\@6.1:** openstack-swift-container=2.2.0-fuel6.1.mira4
* **CentOS\@6.1:** openstack-swift-doc=2.2.0-fuel6.1.mira4
* **CentOS\@6.1:** openstack-swift-object=2.2.0-fuel6.1.mira4
* **CentOS\@6.1:** openstack-swift-proxy=2.2.0-fuel6.1.mira4
* **CentOS\@6.1:** python-cinder=2014.2.2-fuel6.1.mira12
* **CentOS\@6.1:** python-django-horizon=2014.2.2-fuel6.1.mira31
* **CentOS\@6.1:** python-django-horizon-doc=2014.2.2-fuel6.1.mira31
* **CentOS\@6.1:** python-glance=2014.2.2-fuel6.1.mira11
* **CentOS\@6.1:** python-glanceclient-0.15.0-fuel6.1.mira6
* **CentOS\@6.1:** python-glanceclient-doc-0.15.0-fuel6.1.mira6
* **CentOS\@6.1:** python-keystone=2014.2.2-fuel6.1.mira24
* **CentOS\@6.1:** python-muranoclient=0.5.6-fuel6.1.mira5
* **CentOS\@6.1:** python-neutron=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** python-nova=2014.2.2-fuel6.1.mira34
* **CentOS\@6.1:** python-oslo-messaging-1.4.1-fuel6.1.mira33
* **CentOS\@6.1:** python-oslo-messaging-doc-1.4.1-fuel6.1.mira33
* **CentOS\@6.1:** sahara=2014.2.2-fuel6.1.mira17
* **Ubuntu\@6.1:** cinder-api=2014.2.2-1~u14.04+mos16
* **Ubuntu\@6.1:** cinder-backup=2014.2.2-1~u14.04+mos16
* **Ubuntu\@6.1:** cinder-common=2014.2.2-1~u14.04+mos16
* **Ubuntu\@6.1:** cinder-scheduler=2014.2.2-1~u14.04+mos16
* **Ubuntu\@6.1:** cinder-volume=2014.2.2-1~u14.04+mos16
* **Ubuntu\@6.1:** glance=2014.2.2-1~u14.04+mos11
* **Ubuntu\@6.1:** glance-api=2014.2.2-1~u14.04+mos11
* **Ubuntu\@6.1:** glance-common=2014.2.2-1~u14.04+mos11
* **Ubuntu\@6.1:** glance-registry=2014.2.2-1~u14.04+mos11
* **Ubuntu\@6.1:** heat-api=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** heat-api-cfn=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** heat-api-cloudwatch=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** heat-common=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** heat-docker=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** heat-engine=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** keystone=2014.2.2-1~u14.04+mos24
* **Ubuntu\@6.1:** keystone-doc=2014.2.2-1~u14.04+mos24
* **Ubuntu\@6.1:** murano=2014.2.2-1~u14.04+mos16
* **Ubuntu\@6.1:** nova-ajax-console-proxy=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-api=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-api-ec2=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-api-metadata=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-api-os-compute=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-api-os-volume=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-baremetal=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-cells=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-cert=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-common=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-compute=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-compute-kvm=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-compute-libvirt=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-compute-lxc=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-compute-qemu=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-compute-vmware=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-compute-xen=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-conductor=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-console=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-consoleauth=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-doc=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-network=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-novncproxy=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-objectstore=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-scheduler=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-spiceproxy=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-volume=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** nova-xvpvncproxy=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** openstack-dashboard=2014.2.2-1~u14.04+mos32
* **Ubuntu\@6.1:** python-cinder=2014.2.2-1~u14.04+mos16
* **Ubuntu\@6.1:** python-django-horizon=2014.2.2-1~u14.04+mos32
* **Ubuntu\@6.1:** python-glance=2014.2.2-1~u14.04+mos11
* **Ubuntu\@6.1:** python-glance-doc=2014.2.2-1~u14.04+mos11
* **Ubuntu\@6.1:** python-glanceclient_0.15.0-1~u14.04+mos6
* **Ubuntu\@6.1:** python-heat=2014.2.2-1~u14.04+mos14
* **Ubuntu\@6.1:** python-keystone=2014.2.2-1~u14.04+mos24
* **Ubuntu\@6.1:** python-muranoclient_0.5.6-1~u14.04+mos6
* **Ubuntu\@6.1:** python-neutron=2014.2.2-1~u14.04+mos32
* **Ubuntu\@6.1:** python-nova=2014.2.2-1~u14.04+mos37
* **Ubuntu\@6.1:** python-oslo.messaging=1.4.1-1~u14.04+mos13
* **Ubuntu\@6.1:** python-swift=2.2.0-1~u14.04+mos8
* **Ubuntu\@6.1:** sahara=2014.2.2-1~u14.04+mos17
* **Ubuntu\@6.1:** swift=2.2.0-1~u14.04+mos8
* **Ubuntu\@6.1:** swift-account=2.2.0-1~u14.04+mos8
* **Ubuntu\@6.1:** swift-container=2.2.0-1~u14.04+mos8
* **Ubuntu\@6.1:** swift-doc=2.2.0-1~u14.04+mos8
* **Ubuntu\@6.1:** swift-object=2.2.0-1~u14.04+mos8
* **Ubuntu\@6.1:** swift-object-expirer=2.2.0-1~u14.04+mos8
* **Ubuntu\@6.1:** swift-proxy=2.2.0-1~u14.04+mos8

Patching scenario - CentOS
--------------------------

#. Run the following commands on OpenStack Compute nodes, OpenStack
   Controller nodes, OpenStack Cinder nodes::

       yum clean expire-cache
       yum -y update murano
       yum -y update openstack-cinder
       yum -y update openstack-dashboard
       yum -y update openstack-glance*
       yum -y update openstack-heat*
       yum -y update openstack-keystone*
       yum -y update openstack-nova*
       yum -y update openstack-swift*
       yum -y update python-cinder
       yum -y update python-django-horizon*
       yum -y update python-glance
       yum -y update python-glanceclient
       yum -y update python-muranoclient
       yum -y update python-nova
       yum -y update python-oslo-messaging*
       yum -y update sahara

#. Run the following commands on OpenStack Controller nodes::

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

#. Restart all non-HA OpenStack services on Compute and Controller
   nodes.

Patching scenario - Ubuntu
--------------------------

#. Run the following commands on OpenStack Compute nodes, OpenStack
   Controller nodes, OpenStack Cinder nodes::

       apt-get update
       apt-get install --only-upgrade -y cinder*
       apt-get install --only-upgrade -y glance*
       apt-get install --only-upgrade -y heat*
       apt-get install --only-upgrade -y keystone*
       apt-get install --only-upgrade -y murano
       apt-get install --only-upgrade -y nova*
       apt-get install --only-upgrade -y python-cinder
       apt-get install --only-upgrade -y python-django-horizon
       apt-get install --only-upgrade -y python-glance
       apt-get install --only-upgrade -y python-glanceclient
       apt-get install --only-upgrade -y python-heat
       apt-get install --only-upgrade -y python-keystone
       apt-get install --only-upgrade -y python-muranoclient
       apt-get install --only-upgrade -y python-nova
       apt-get install --only-upgrade -y python-oslo.messaging
       apt-get install --only-upgrade -y python-swift
       apt-get install --only-upgrade -y sahara
       apt-get install --only-upgrade -y swift*

#. Run the following commands on OpenStack Controller nodes::

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

#. Restart all non-HA OpenStack services on Compute and Controller
   nodes.

