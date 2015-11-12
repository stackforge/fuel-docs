.. _mos70mu1-issues:

Mirantis OpenStack 7.0 Maintenance Update 1 - Resolved Issues
*************************************************************

MOS 7.0 MU 1 contains fixes for the following issues:

* When network is rescheduled from one DHCP agent to another, DHCP port binding
  didn't change. This prevented external SDNs like Cisco from configuring port
  properly. The fix adds updating of DHCP host port binding on failover.

  See `LP1501070 <https://launchpad.net/bugs/1501070>`_.

* Typically neutron-server processes with DVR consume 100-150M, but at some scale
  the size rapidly increases in several times, at 200 nodes the raise was from 150M
  to 2G, and upto 14G in the end. This was caused by a suboptimal SQL query which
  was optimized.

  See `LP1497219 <https://launchpad.net/bugs/1497219>`_.

* MuranoPL executor couldn't get correct method signature. The fix introduced
  internal _getDefaultRouter method to decorate it with additional parameter so it
  could be called correctly.

  See `LP1513497 <https://launchpad.net/bugs/1513497>`_.

* In some cases when more than 1 DHCP agents were assigned to a network and then
  they became dead, their DHCP ports become reserved. Later, when those agents
  revive or start again, they acquire reserved ports, but it's not guaranteed
  that they get exactly same ports. In such case DHCP agent may create interface
  in the namespaces despite that another interface already exist. That was fixed
  by cleaning up the DHCP namespace upon DHCP setup.

  See `LP1499914 <https://launchpad.net/bugs/1499914>`_.

* OCF script for RabbitMQ has some memory calculations and at some point it started
  to present the numbers in scientific notation which broke further calculations in
  bash. That was fixed by calculating in megabytes instead of bytes.

  See `LP1503331 <https://launchpad.net/bugs/1503331>`_.

* DHCP scheduler was looking at active agents only which causes duplicate DHCP agents
  assigned to networks after restart of DHCP agents. That was fixed by checking all
  DHCP agents after restart.

  See `LP1506198 <https://launchpad.net/bugs/1506198>`_.

* Volumes stays in creating status after node with keystone was shutdown because
  of unhandled exception in RPC executor. That was fixed by adding additional
  exception handling in oslo.utils.

  See `LP1496000 <https://launchpad.net/bugs/1496000>`_.

* Neutron used public endpoint for in-cluster operations which could be not accessible
  in some configurations. That was fixed by using admin endpoint for internal operations.

  See `LP1503725 <https://launchpad.net/bugs/1503725>`_.

* Eventlet green threads not released back to the pool leading to choking of new requests.
  Presently, the wsgi server allows persist connections hence even after the response is
  sent to the client, it doesn't close the client socket connection. In order to close the
  client socket connection explicitly after the response is sent and read successfully by
  the client, you simply have to set keepalive to False when you create a wsgi server.
  The fix added wsgi_keep_alive and client_socket_timeout options to enable that.

  See `LP1506600 <https://launchpad.net/bugs/1506600>`_.

* Keystone v3 user/tenant lookup by name via OpenStack CLI client fails because of
  invalid LDAP filter.

  See `LP1503336 <https://launchpad.net/bugs/1503336>`_.

* Batch provisioning was enabled in Sahara by default which is better option for large
  deployments.

  See `LP1498003 <https://launchpad.net/bugs/1498003>`_.

* Deployment of Sahara cluster failed without internet access because the time was not
  updated on VMs correctly. The failure was fixed by handling appropriate exception.

  See `LP1496246 <https://launchpad.net/bugs/1496246>`_.

* Murano failed to deploy environment with a lot of reconnecs tto RabbitMQ. That was
  caused by race condition in router creation. That was fixed by additional exception
  handling and adding retries.

  See `LP1493105 <https://launchpad.net/bugs/1493105>`_.

* Router rescheduling was failing with exception which potentially could prevent external
  access to failover. The router unbinding logic was changed to be consistent with the
  data model.

  See `LP1493754 <https://launchpad.net/bugs/1493754>`_.

* Python-keystoneclient: session fails to sanitize response body of passwords. The fix
  masks passwords when logging the HTTP response.

  See `LP1506690 <https://launchpad.net/bugs/1506690>`_.

* In some scenarios Cinder volume couldn't be deleted because of a deadlock when a thread
  spawned by python-rados attempts to import a module. Spawning this thread was removed so
  all long-running operations calls whith python-rbd are implemented in native Python
  threads to avoid eventlet loop.

  See `LP1459781 <https://launchpad.net/bugs/1459781>`_.

* Glance parameter show_image_direct_url set to False when Swift is used as Glance backend.
  That fixes potential vulnerability in Glance because Swift direct URLs could contain admin
  credentials.

  See `LP1498615 <https://launchpad.net/bugs/1498615>`_.

* Sahara CDH 5.4.0 cluster failed to scale because of wrong initialization of thread group
  object.

  See `LP1497950 <https://launchpad.net/bugs/1497950>`_.

* Sahara cluster with volumes failed to create because volumes were not formatted. An option
  to format volumes was added to fix this.

  See `LP1506858 <https://launchpad.net/bugs/1506858>`_.

* In some scenarios creating default security group failed because of missing method invocation
  within a transaction. The missing invocation was added.

  See `LP1503294 <https://launchpad.net/bugs/1503294>`_.

* [Murano] Exceptions get muted when occur inside Parallel block

  See `LP1498186 <https://launchpad.net/bugs/1498186>`_.

* Build nova-compute package with NSXv support for Fuel 7.0

  See `LP1485605 <https://launchpad.net/bugs/1485605>`_.

* [no-OSSN-yet] Add openstack_user_domain to assertion (no-CVE-yet)

  See `LP1506602 <https://launchpad.net/bugs/1506602>`_.

* Network configuration is broken after reboot if we are using ovs network provider

  See `LP1495534 <https://launchpad.net/bugs/1495534>`_.

* error at the end of deployment: restart_rados.sh not found on puppet

  See `LP1475530 <https://launchpad.net/bugs/1475530>`_.

* Rabbit OCF script doesn't reelect master in case of master node failure

  See `LP1490941 <https://launchpad.net/bugs/1490941>`_.

* nova-network - cannot untick "Use VLAN tagging for fixed networks"

  See `LP1503638 <https://launchpad.net/bugs/1503638>`_.

* fuel-createmirror requires internet access to docker repository and fails by default if it can't access it

  See `LP1485758 <https://launchpad.net/bugs/1485758>`_.

* Rabbit OCF monitor returns 'generic error' when it should be 'not running' instead

  See `LP1484280 <https://launchpad.net/bugs/1484280>`_.

* Response code '500 Internal Server Error' for POST /api/nodegroups/

  See `LP1494320 <https://launchpad.net/bugs/1494320>`_.

* Change "Amount of disks" "Amount of interfaces" to "Number of disks", "Number of interfaces" in Fuel UI

  See `LP1501520 <https://launchpad.net/bugs/1501520>`_.

* Broken cluster after plugin installation  with invalid data

  See `LP1484181 <https://launchpad.net/bugs/1484181>`_.

* Some manifests contain hard-coded bridge names

  See `LP1498088 <https://launchpad.net/bugs/1498088>`_.

* network group update leads 500 error

  See `LP1500308 <https://launchpad.net/bugs/1500308>`_.

* Task 'spawn_vms': ntpdate -u ...: shell timeout error: execution expired

  See `LP1504493 <https://launchpad.net/bugs/1504493>`_.

* [nailgun] Bonding conf is inconsistent after cloud ops

  See `LP1496279 <https://launchpad.net/bugs/1496279>`_.

* fuel-snapshot must contain kernel and system logs

  See `LP1494838 <https://launchpad.net/bugs/1494838>`_.

* [ostf] HA test 'Check pacemaker status' has failed with zabbix enabled

  See `LP1499236 <https://launchpad.net/bugs/1499236>`_.

* no gateway in default network configuration of new nodegroup

  See `LP1472662 <https://launchpad.net/bugs/1472662>`_.

* PXE menu without comments may confuse users

  See `LP1451552 <https://launchpad.net/bugs/1451552>`_.

* fuelmenu reports duplicating ip address by comparing it with itself

  See `LP1463418 <https://launchpad.net/bugs/1463418>`_.

* [Partition preservation] mysql is trying to use 'lost+found'  database 

  See `LP1484552 <https://launchpad.net/bugs/1484552>`_.

* PUT to NetworkGroupHandler throws 409 when network name is not changed

  See `LP1494974 <https://launchpad.net/bugs/1494974>`_.

* Network groups can not be modified with Fuel CLI

  See `LP1494842 <https://launchpad.net/bugs/1494842>`_.

* Proxy support for Murano Python Client

  See `LP1501889 <https://launchpad.net/bugs/1501889>`_.

* Error in /usr/lib/ocf/resource.d/fuel/rabbitmq-server when much memory used 

  See `LP1503331 <https://launchpad.net/bugs/1503331>`_.

* [no-OSSN-yet] Eventlet green threads not released back to the pool leading to choking of new requests (no-CVE-yet)

  See `LP1506600 <https://launchpad.net/bugs/1506600>`_.

* [no-OSSN-yet] Python-keystoneclient: session fails to sanitize response body of passwords (no-CVE-yet)

  See `LP1506690 <https://launchpad.net/bugs/1506690>`_.

* /etc/sysctl.conf values do not apply to haproxy namespace after a failover

  See `LP1500871 <https://launchpad.net/bugs/1500871>`_.

* [no-OSSN-yet] Add openstack_user_domain to assertion (no-CVE-yet)

  See `LP1506602 <https://launchpad.net/bugs/1506602>`_.

* Sahara cannot format volumes

  See `LP1506858 <https://launchpad.net/bugs/1506858>`_.

* [UI] Json for interfaces is sent with incorrect interfaces for bonds

  See `LP1495431 <https://launchpad.net/bugs/1495431>`_.

* [fuel-web][nailgun] generators are not supported in fuel plugin environment_config.yaml

  See `LP1473452 <https://launchpad.net/bugs/1473452>`_.

