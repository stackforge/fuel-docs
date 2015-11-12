.. _mos70mu1-issues:

Mirantis OpenStack 7.0 Maintenance Update 1 - Resolved Issues
*************************************************************

Mirantis OpenStack 7.0 Maintenance Update 1 contains fixes for the following
issues:

* Fixed the issue with the DHCP port binding not being updated after a
  network is switched from one DHCP server to another. The issue prevented
  such external SDNs as Cisco to configure the network port correctly. See
  `LP1501070`_.

* A suboptimal SQL query is optimized to prevent neutron-server processes
  with DVR to rapidly raize in size at scale. See `LP1497219`_.

* Introduced an internal ``_getDefaultRouter`` method for a MuranoPL executor
  to get a correct method signature. See `LP1513497`_.

* A DHCP namespace is now cleaned up upon the DHCP setup. It fixes an issue
  with more than one DHCP agents assigned to a network creating interfaces
  in the namespaces despite that other interfaces already exist and the
  ports are reserved for the DHCP agents from the previous setup. See
  `LP1499914`_.

* OCF script for RabbitMQ now has memory calculations in megabytes instead
  of bytes. It prevents presenting numbers in a scientific notation that breaks
  further calculations in bash. See `LP1503331`_.

* DHCP scheduler now checks all the DHCP agents instead of only active ones
  after the DHCP agents restart. It prevents assigning duplicate DHCP agents
  to networks. See `LP1506198`_.

* An additional exception handling in oslo.utils is added. It prevents the
  volumes from staying in the `creating` status after a node with Keystone
  shuts down because of an unhandled exception in the RPC executor.
  See `LP1496000`_.

* Neutron now uses the admin endpoint instead of the public one for internal
  operations, as public endpoint could not be accessible in some
  configurations. See `LP1503725`_.

* Added the ``wsgi_keep_alive`` and ``client_socket_timeout`` options to
  configure a WSGI server during its creation. These options enable a closing
  of a client socket connection explicitly after the response is sent and
  read successfully by the client. The fix prevents eventlet green
  threads not to be released back to the pool that led to a choking of new
  requests. See `LP1506600`_.

* The LDAP filter is constructed correctly during the Keystone v3
  ``user/tenant`` lookup by name via OpenStack CLI client. See `LP1503336`_.

* Batch provisioning is enabled in Sahara by default which is a better option
  for large deployments. See `LP1498003`_.

* Deployment of Sahara cluster failed without an Internet access because the
  time was not updated on VMs correctly. The failure was fixed by handling
  an appropriate exception. See `LP1496246`_.

* Murano failed to deploy an environment with a lot of reconnects to RabbitMQ
  due to a race condition in router creation. That was fixed by an
  additional exception handling and adding retries. See `LP1493105`_.

* Changed the router unbinding logic to be consistent with the data model. It
  prevents the router rescheduling from failing with an exception that could
  potentially restrict an external access to the failover. See `LP1493754`_.

* Python-keystoneclient now masks passwords when logging the HTTP response so
  that a session can sanitize a response body of passwords. See `LP1506690`_.

* Sometimes, Cinder volume could not be deleted because of a deadlock when
  a thread spawned by python-rados attempted to import a module. The fix
  removes the spawning of this thread so that all the long-running
  operations' calls with python-rbd are implemented in native Python threads
  to avoid eventlet loop. See `LP1459781`_.

* The ``show_image_direct_url`` parameter in Glance is set to False when Swift
  is used as a backend for Glance. It fixes a potential vulnerability in
  Glance because Swift direct URLs could contain admin credentials.
  See `LP1498615`_.

* Fixed a wrong initialization of ``ThreadGroup`` that prevented the Sahara
  CDH 5.4.0 environment to scale. See `LP1497950`_.

* An option to format volumes is added to Sahara. It addresses the issue with
  Sahara volume failing to be created because the volumes are not formatted.
  See `LP1506858`_.

* The missing method invocation within a transaction is added to prevent
  failures in creating of default security groups. See `LP1503294`_.

* The exceptions' handling was improved in Murano to address the issue when
  the exceptions are muted and not reported in a failed deployment.
  See `LP1498186`_.

* Added the NSXv support to the nova-compute service. An API method for
  updating VNIC index and enabling the proxying load balancers in the metadata
  were added to support NSXv. See `LP1485605`_.

* Added a new ``openstack_user_domain`` attribute to the keystone IdP to
  ensure the user domain information is provided during the generation of
  SAML assertions. The fix addresses the use case when users with the same
  user name exist in different domains. See `LP1506602`_.

* Fixed an issue with the network configuration being broken after rebooting
  an environment that uses the OVS network provider. See `LP1495534`_.

* Added a warning to the update deployment tasks. It addresses the issue when
  a task is changed or deleted after you run ``yum update`` that could break
  redeployments. See `LP1475530`_.

* The migration of RabbitMQ resource on failure was added to the OCF script
  to reelect master in case of the master node failure. Also the fix
  enabled the resource stickiness (was 0) to reduce a possibility of moving
  the RabbitMQ master back to the failed host. See `LP1490941`_.

* The nova-network schema validation was improved. And now you can clear
  the check box with :guilabel:`Use VLAN tagging for fixed networks` option
  in the Fuel UI. See `LP1503638`_.

* Improved the text of the error message that occurs when ``fuel-createmirror``
  requires an Internet access to the Docker repository and fails.
  See `LP1485758`_.

* The RabbitMQ OCF script was changed to return a correct `not_running` status
  instead of a `generic error` when the beam process is not running.
  See `LP1484280`_.

* Changed the text of the error from `500 Internal Server` to `404 Not Found`
  if an incorrect or invalid cluster ID is passed to a nodegroup
  creation POST request. See `LP1494320`_.

* An incorrect wording was fixed in the Fuel UI. See `LP1501520`_.

* The default ``fuelweb_admin`` doesn't belong to any node group but was
  handled as a member of some group which led to a broken environment. It
  is fixed by defaulting to the ``admin`` network if there is no network in
  the Fuel Controller's node group. See `LP1484181`_.

* With the network templates, there is no guarantee that a bridge named
  `br-mgmt` or `br-ex` will exist, but some manifests contain hard-coded
  bridge names. That was fixed by finding the bridge information by a network
  role. See `LP1498088`_.

* A reference to the ``net_id`` field was removed to address the issue with
  a `500 Internal Server Error` if the ID field is not specified during the
  network group update using fuel-client. See `LP1500308`_.

* The `ntp.conf` generation on the Fuel Master node was updated to prevent
  sporadic NTP failures and a delayed start up of the Fuel Master node. It
  happened when NTP2 and NTP3 were not set, so the ERB generated a template
  with ``undef`` values. See `LP1504493`_.

* The original MAC address is returned in order to prevent Nailgun to get
  inconsistent network configuration in case of interface bonding mode.
  See `LP1496279`_.

* The Fuel snapshots were improved to contain kernel and system logs. See
  `LP1494838`_.

* A correct handling of the appropriate resource group was added to prevent
  the OSTF HA test 'Check pacemaker status' from failing with Zabbix enabled.
  See `LP1499236`_.

* A default network gateway check was added to ensure that valid gateways
  are specified for all the networks if non-default node groups are used.
  See `LP1472662`_.

* The PXE menu had entries to boot CentOS and Ubuntu which was confusing and
  non-functional. These menu entries were hidden for a better user experience.
  See `LP1451552`_.

* An ARP bind for duplicate IP check on PXE setup was added to prevent the
  ``fuelmenu`` reporting duplicate IP addresses by comparing them with
  themselves. See `LP1463418`_.

* MySQL now ignores the `lost+found` directory in its data directory after
  the Fuel Controller node re-installation. See `LP1484552`_.

* The validation for creating network groups and updating them has been
  split into two independent methods to improve the parameter handling and
  to avoid the 409 error when a network name is not changed. See `LP1494974`_
  and `LP1494842`_.

* Proxy support for python-muranoclient was added to enable using of Murano
  in environments without a direct Internet access. See `LP1501889`_.

* A ``sysctl`` call was added to set values in the namespace and the
  ``ip_nonlocal_bind`` parameter in the namespace was set explicitly to
  prevent HAProxy failures at start. It prevents applying incorrect values in
  the `/etc/sysctl.conf` file when performing HA tests on the controllers.
  See `LP1500871`_.

* The support of bonding with 3+ interfaces is added to prevent an incorrect
  data generation in `interfaces.json`. See `LP1495431`_.

* The processing of attributes was fixed to merge the instance and plug-in
  attributes before passing them to the generator. The fix addresses the
  attributes conflicts issue and prevents the generator support failure in the
  Fuel plug-in `environment_config.yaml`. See `LP1473452`_.

.. Links:
.. _`LP1500308`: https://launchpad.net/bugs/1500308
.. _`LP1498088`: https://launchpad.net/bugs/1498088
.. _`LP1484181`: https://launchpad.net/bugs/1484181
.. _`LP1494320`: https://launchpad.net/bugs/1494320
.. _`LP1484280`: https://launchpad.net/bugs/1484280
.. _`LP1501520`: https://launchpad.net/bugs/1501520
.. _`LP1504493`: https://launchpad.net/bugs/1504493
.. _`LP1496279`: https://launchpad.net/bugs/1496279
.. _`LP1494838`: https://launchpad.net/bugs/1494838
.. _`LP1499236`: https://launchpad.net/bugs/1499236
.. _`LP1472662`: https://launchpad.net/bugs/1472662
.. _`LP1451552`: https://launchpad.net/bugs/1451552
.. _`LP1463418`: https://launchpad.net/bugs/1463418
.. _`LP1484552`: https://launchpad.net/bugs/1484552
.. _`LP1494842`: https://launchpad.net/bugs/1494842
.. _`LP1494974`: https://launchpad.net/bugs/1494974
.. _`LP1501889`: https://launchpad.net/bugs/1501889
.. _`LP1500871`: https://launchpad.net/bugs/1500871
.. _`LP1501070`: https://launchpad.net/bugs/1501070
.. _`LP1497219`: https://launchpad.net/bugs/1497219
.. _`LP1513497`: https://launchpad.net/bugs/1513497
.. _`LP1499914`: https://launchpad.net/bugs/1499914
.. _`LP1503331`: https://launchpad.net/bugs/1503331
.. _`LP1506198`: https://launchpad.net/bugs/1506198
.. _`LP1496000`: https://launchpad.net/bugs/1496000
.. _`LP1503725`: https://launchpad.net/bugs/1503725
.. _`LP1503336`: https://launchpad.net/bugs/1503336
.. _`LP1498003`: https://launchpad.net/bugs/1498003
.. _`LP1506600`: https://launchpad.net/bugs/1506600
.. _`LP1496246`: https://launchpad.net/bugs/1496246
.. _`LP1493105`: https://launchpad.net/bugs/1493105
.. _`LP1493754`: https://launchpad.net/bugs/1493754
.. _`LP1506690`: https://launchpad.net/bugs/1506690
.. _`LP1459781`: https://launchpad.net/bugs/1459781
.. _`LP1498615`: https://launchpad.net/bugs/1498615
.. _`LP1497950`: https://launchpad.net/bugs/1497950
.. _`LP1485605`: https://launchpad.net/bugs/1485605
.. _`LP1506602`: https://launchpad.net/bugs/1506602
.. _`LP1495534`: https://launchpad.net/bugs/1495534
.. _`LP1475530`: https://launchpad.net/bugs/1475530
.. _`LP1506858`: https://launchpad.net/bugs/1506858
.. _`LP1503294`: https://launchpad.net/bugs/1503294
.. _`LP1498186`: https://launchpad.net/bugs/1498186
.. _`LP1490941`: https://launchpad.net/bugs/1490941
.. _`LP1503638`: https://launchpad.net/bugs/1503638
.. _`LP1485758`: https://launchpad.net/bugs/1485758
.. _`LP1473452`: https://launchpad.net/bugs/1473452
.. _`LP1495431`: https://launchpad.net/bugs/1495431