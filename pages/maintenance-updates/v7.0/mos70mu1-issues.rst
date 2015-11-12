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

* Under some conditions an exception within Murano could be muted and not reported which resulted
  in failed deployment will continue as if nothing happened. The exception handling was improved
  to fix this.

  See `LP1498186 <https://launchpad.net/bugs/1498186>`_.

* NSXv support was added to nova-compute. 2 patches to enable proxying loadbalancers in metadata
  and API method for updating VNIC index were accepted to support NSXv. 

  See `LP1485605 <https://launchpad.net/bugs/1485605>`_.

* Currently, a keystone IdP does not provide the domain of the user when generating SAML
  assertions. Since it is possible to have two users with the same username but in different
  domains, this patch adds an additional attribute called "openstack_user_domain" in the
  assertion to identify the domain of the user.

  See `LP1506602 <https://launchpad.net/bugs/1506602>`_.

* Network configuration was broken after reboot if OVS network provider is used. The fix
  implements saving configuration for ovs2ovs patches, adds VLAN IDs and includes additional
  test coverage.

  See `LP1495534 <https://launchpad.net/bugs/1495534>`_.

* Simple yum update could break redeployments because a given task could be changed or
  deleted. Therefore, an attempt or warning was added to update deployment tasks.

  See `LP1475530 <https://launchpad.net/bugs/1475530>`_.

* Rabbit OCF script didn't reelect master in case of master node failure. To fix this
  migration of rabbitmq resource on failure was added to the OCF script. Also the fix
  enabled resource stickiness (was 0) to reduce likelihood of moving RabbitMQ master
  back to the failed host.

  See `LP1490941 <https://launchpad.net/bugs/1490941>`_.

* It was not possible to untick "Use VLAN tagging for fixed networks" if nova-network
  was used. The fix improved ova networking schema validation to enable this in the UI.

  See `LP1503638 <https://launchpad.net/bugs/1503638>`_.

* fuel-createmirror required internet access to docker repository and failed with
  unclear error message. The error message was fixed to explain the cause of the issue.

  See `LP1485758 <https://launchpad.net/bugs/1485758>`_.

* Rabbit OCF monitor returned 'generic error' when it should be 'not running'.
  The script was changed to return correct status when beam process is not_running. 

  See `LP1484280 <https://launchpad.net/bugs/1484280>`_.

* If API user passed incorrect or invalid cluster ID to nodegroup creation POST request
  the 500 Internal Server error occurred. That was fixed to return 404 Not Found error
  if non-existing clusted ID is passed.

  See `LP1494320 <https://launchpad.net/bugs/1494320>`_.

* Some incorrect wording was fixed in Fuel UI.

  See `LP1501520 <https://launchpad.net/bugs/1501520>`_.

* Default fuelweb_admin doesn't belong to any node group but was handled as a member
  of some group which lead to broken cluster. That was fixed by dafaulting to admin 
  network if there is no network in controller's node group.

  See `LP1484181 <https://launchpad.net/bugs/1484181>`_.

* With network templates there is no guarantee that a bridge named 'br-mgmt' or 'br-ex'
  will exist but some manifests contained hard-coded bridge names. That was fixed by
  finding bridge information by network role.

  See `LP1498088 <https://launchpad.net/bugs/1498088>`_.

* When user updates certain attributes of the network group using fuel-client it could
  lead to 500 error if ID field is not specified. That was fixed by removing reference
  to ID field when it is not actually needed.  

  See `LP1500308 <https://launchpad.net/bugs/1500308>`_.

* When NTP2 and NTP3 are not set, ERB generates a template with 'undef' values. This
  creates a delay start up on 'master' node. For system tests that create environment
  immediately after master node creation it might create sporadic ntp failures. That
  was fixed by updating ntp.conf generation on master node. 

  See `LP1504493 <https://launchpad.net/bugs/1504493>`_.

* In order to prevent nailgun to get inconsistent network configuration in case of
  interface bonding mode original MAC address should be returned.

  See `LP1496279 <https://launchpad.net/bugs/1496279>`_.

* Fuel snapshots were improved to contain kernel and system logs.

  See `LP1494838 <https://launchpad.net/bugs/1494838>`_.

* OSTF HA test 'Check pacemaker status' failed with zabbix enabled. To fix this
  proper handling of appropriate resource group was added.

  See `LP1499236 <https://launchpad.net/bugs/1499236>`_.

* Default network configuration of new nodegroup had no default gateway. Appropriate
  check was added to ensure that valid gateways are specified for all networks if
  non-default node groups are used.

  See `LP1472662 <https://launchpad.net/bugs/1472662>`_.

* PXE menu had entries to boot CentOS and Ubuntu which was confusing and actually
  not functional. These menu entries were hidden for better user experience.

  See `LP1451552 <https://launchpad.net/bugs/1451552>`_.

* fuel-menu reported duplicate IP addresses because it compared it with itself.
  That was fixed by adding ARP bind for duplicate IP check on PXE setup.

  See `LP1463418 <https://launchpad.net/bugs/1463418>`_.

* After reinstallation of the controller MySQL defines and addes preserved
  partition with databases and tries to add 'lost+found' directory. The fix
  makes MySQL to ignore lost+found directory in its datadir. 

  See `LP1484552 <https://launchpad.net/bugs/1484552>`_.

* The validation for creating network groups and updating them has been
  split into two independent methods to improve parameter handling and 
  to avoid 409 error when network name is not changed.

  See `LP1494974 <https://launchpad.net/bugs/1494974>`_, 
  `LP1494842 <https://launchpad.net/bugs/1494842>`_.

* Proxy support for Murano python client was added to enable using of Murano
  in environments without direct access to the intennet.

  See `LP1501889 <https://launchpad.net/bugs/1501889>`_.

* When performing HA tests on the controllers and during the install the values in /etc/sysctl.conf
  don't get applied correctly and as a result haproxy fails to start. To fix this a sysctl call to
  set values in namespace was added and ip_nonlocal_bind parameter in namespace was set explicitly
  to prevent HAProxy failures at start.

  See `LP1500871 <https://launchpad.net/bugs/1500871>`_.

* When bonding with 3 or more interfaces is used JSON containing interfaces data was generated
  incorrectly. The issue was fixed to support 3+ interfaces.

  See `LP1495431 <https://launchpad.net/bugs/1495431>`_.

* Generator support was broken in Fuel plugin environment_config.yaml because editable attributes
  of an instance conflicted with plugin attributes. The processing of attributes was fixed to merge
  instance and plugin attributes before passing to the generator.

  See `LP1473452 <https://launchpad.net/bugs/1473452>`_.

