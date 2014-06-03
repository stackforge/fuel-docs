Issues Resolved in Mirantis OpenStack 4.1.1
===========================================

Some disk drivers do not support a 4K sector size for XFS file systems
----------------------------------------------------------------------

To work around this issue,
we now use 512-byte sectors
which are supported for all file system architectures.
See `LP1316266 <https://bugs.launchpad.net/fuel/+bug/1316266>`_.

Compute nodes with running instances can now be redeployed
----------------------------------------------------------

In earlier releases,
environments that contained Compute nodes with running instances
could not be redeployed
because the Puppet iptables-firewall module
did not correctly prefetch OpenStack firewall rules.
This was fixed by adding MAC match support to the firewall module,
which fixes parsing errors and allows for rules with MAC matches.
The neutron-ovs-agent on compute nodes is also notified
so it can delete saved rules from old and removed instances.
See `LP1308963 <https://bugs.launchpad.net/fuel/+bug/1308963>`_.

DHCP addresses are now valid after MySQL and Keystone failures
--------------------------------------------------------------

**dnsmqsq** processes are not always terminated properly
when MySQL or Keystone fail.
This sometimes meant that DHCP addresses were not received properly
unless CRM restarted the neutron-dhcp-agent.
To solve this problem,
the cleanup-script has been modified
to inspect network namespaces on the node and react appropriately
rather than relying on information from the Neutron API.
See `LP1285929 <https://bugs.launchpad.net/fuel/+bug/1285929>`_.

Pacemaker neutron agent failed if management VIP was recently moved
-------------------------------------------------------------------

The start/stop/migration scripts
for Pacemaker Neutron L3 and DHCP agents
failed if the management VIP
(which specifies the virtual IP address and port
on which client traffic is received)
had recently been moved.
To solve this problem,
the cleanup-script has been modified
to inspect network namespaces on the node and react appropriately
rather than relying on information from the Neutron API.
See `LP1287716 <https://bugs.launchpad.net/fuel/4.1.x/+bug/1287716>`_.

??Unnamed security bug??
------------------------

See `LP1297848 <https://bugs.launchpad.net/fuel/+bug/1297848>`_.

Swift Ringbuilder rebalance fails
---------------------------------

When converting a one-controller HA environment
to have multiple controllers,
the Swift binaries were not immediately replicated
to the new controllers.
The ordering scripts were modified
to ensure that the rebalancing happens in the right order.
See `LP1305826 <https://bugs.launchpad.net/fuel/+bug/1305826>`_.

HAProxy sometimes failed to reload
----------------------------------

HAProxy sometimes failed to reload
because Pacemaker puppet provider returned immediately
rather than waiting for HAProxy to start on the node.
This has been fixed.
See `LP1306005 <https://bugs.launchpad.net/fuel/+bug/1306005>`_.

Heat API was not available on the public URL
--------------------------------------------

The Heat API could not be accessed over the public URL.
This was resolved by implementing proxy requests
from HAProxy to the Heat API.
See `LP1307503 <https://bugs.launchpad.net/fuel/+bug/1307503>`_.

Redeployment failed for Compute nodes with running instances
------------------------------------------------------------

The PuppetLabs firewall module did not support MAC addresses
so redeployment of Compute nodes with running instances failed.
MAC match support has been added to the firewall
and neutron-ovs-agent on Compute nodes
is now notified of the redeployment
so it can clean out saved rules from old and removed instances,
which fixes this problem.
See `LP1308963 <https://bugs.launchpad.net/fuel/+bug/1308963>`_.

Horizon instance console could not be opened
--------------------------------------------

If you created a security group then created an instance in that group,
you could not open the instance console.
This occurred because VIP
(which specifies the virtual IP address and port
on which client traffic is received)
now runs in the HAProxy namespace
but one of the services used to connect to the instance console
was not moved to HAProxy namespace.
This has now been fixed.
See `LP1309529 <https://bugs.launchpad.net/fuel/+bug/1309529>`_.

IFUP ran prematurely when bonding NICs
--------------------------------------

IFUP (which brings a network up)
must run after at least one slave interface has been added;
in earlier releases, this was not guaranteed.
This has now been fixed.
See `LP1310661 <https://bugs.launchpad.net/fuel/+bug/1310661>`_

Swift rings built with wrong permissions
----------------------------------------

Swift rings were being built with root-only access permissions,
which meant that swift-proxy could not read them.
This has been fixed.
See `LP1311249 <https://bugs.launchpad.net/fuel/+bug/1311249>`_.

Neutron agents failed to start
------------------------------

The lock_path variable was not defined for Neutron agents,
which prevented them from starting.
This has been fixed.
See `LP1311634 <https://bugs.launchpad.net/fuel/+bug/1311634>`_

Neutron L3 agents could be moved unnecessarily
----------------------------------------------

Neutron L3 agents could be moved at random times,
causing outages.
This was fixed by setting stickiness=1
for Neutron Pacemaker (and other) resources.
See `LP1312177 <https://bugs.launchpad.net/fuel/+bug/1312177>`_.

Notify service tenant ID sometimes missing on primary Controller
----------------------------------------------------------------

The tenant_id was sometimes no set on the primary Controller.
This was fixed by ensuring that the Keystone service
and its HAProxy section are initialized
before nova notify service tenant-id runs.
See `LP1312614 <https://bugs.launchpad.net/fuel/+bug/1312614>`_.

Neutron L3 agent was not associated with Floating IP
----------------------------------------------------

The floating IP was sometimes not associated with the Neutron L3 agent
and so the Neutron server could not communicate with the Neutron agents.
This was because the report interval
was larger than the agent_down_time interval.
It was fixed by setting the report interval to be
one-third of the agent_down_time interval.
See `LP1315338 <https://bugs.launchpad.net/fuel/+bug/1315338>`_.

Galera fails to deploy secondary Controllers
--------------------------------------------

Galera could not deploy secondary Controllers
because the MySQL root password is set on all Controllers
but soe Puppet exec resources log in with no user ID or password set.
This was fixed by modifying the Galera helper scripts
to use replication user credentials.
See `LP1315396 <https://bugs.launchpad.net/fuel/+bug/1315396>`_.

Shotgun cannot log into the host system
---------------------------------------

This was resolved by copying the master node's public key
to its own keyring.
See `LP <https://bugs.launchpad.net/fuel/+bug/1316581>`_.

TTL has been increased for MCollective
--------------------------------------

TTL (Time To Live) has been increased for MCollective.
Previously, deployment of a new controller sometimes failed
with a message such as
"Node ... not answered by RPC, removing from db" or
MCollective agents ... didn't respond within the alloted time."
See `LP1316720 <https://bugs.launchpad.net/fuel/+bug/1316720>`_.

Ceilometer logs were not kept on Fuel Master node
-------------------------------------------------

Ceilometer logs were not kept on the Fuel Master node
because debug logging was not implemented.
This has been fixed.
See `LP1317123 <https://bugs.launchpad.net/fuel/+bug/1317123>`_.

Debian installer truncated long log messages
--------------------------------------------

The Debian installer (used for Ubuntu nodes)
truncated long log messages
rather than splitting them into shorter messages that could all be logged.
This has been fixed.
In addition, the sleep time after creating partitions has been increased
to allow enough time to partition the devices.
See `LP1318747 <https://bugs.launchpad.net/fuel/+bug/1318747>`_.

Keystone sometime failed to sync with database on first controller
------------------------------------------------------------------

Keystone sometimes failed to sync with the database
on the first controller.
This happens if Puppet restarts HAProxy at the same time
Keystone tries to sync with the database.
Keystone now retries the sync, which fixes the problem.
See `LP1319087 <https://bugs.launchpad.net/fuel/+bug/1319087>`_.

Ceph partition now always uses the XFS architecture
---------------------------------------------------

In previous releases, a second Ceph partition was formatted
to use the EXT4 filesystem architecture instead of XFS.
This has been fixed.
See `LP1319871 <https://bugs.launchpad.net/fuel/+bug/1319871>`_.

Predefined Neutron networks were not available in Horizon
---------------------------------------------------------

Horizon could not access the predefined Neutron networks
when the admin tenant was not admin.
The predefined network settings have been corrected.
See `LP1319942 <https://bugs.launchpad.net/fuel/+bug/1319942>`_.

Ubuntu provisioning sometimes failed
------------------------------------

Ubuntu provisioning sometimes failed in HA mode
when ceph-osd was placed on the Controller node
rather than on a separate Storage node.
This has been fixed,
although placing ceph-osd on Controllers
is highly unadvisable for production environments
because it can severely degrade the Controller's performance.
See `LP1319995 <https://bugs.launchpad.net/fuel/+bug/1319995>`_.

AMQP/RabbitMQ nodes are now shuffled for all OpenStack services
---------------------------------------------------------------

AMQP/RabbitMQ nodes are now assigned to non-compute nodes
using a Round Robin algorithm
to better balance network traffic and improve performance.
See `LP1320184 <https://bugs.launchpad.net/fuel/+bug/1320184>`_.

Sahara deployment sometimes failed
----------------------------------

Sahara deployment sometimes failed
because Sahara set some filters
that conflicted with those set by the Nova scheduler.
These issues have been resolved.
See `LP1321284 <https://bugs.launchpad.net/fuel/+bug/1321284>`_.

VIP service could not find management address for other nodes
-------------------------------------------------------------

The VIP service
(which specifies the virtual IP address and port
on which client traffic is received)
could not reach the management address for other nodes
because it had not been modified to access the HAProxy namespace.
This has been resolved.
See `LP1321466 <https://bugs.launchpad.net/fuel/+bug/1321466>`_.

MySQL init script sometimes failed to set password correctly
------------------------------------------------------------

The MySQL init script sometimes failed to set the password correctly.
This mostly occurred on slower machines
where the MySQL initialization might return
before the service is ready to handle commands,
thus causing a race condition.
This was resolved by adding a retry for setting the MySQL password.
See `LP1322231 <https://bugs.launchpad.net/fuel/+bug/1322231>`_.
