Issues Resolved in Mirantis OpenStack 4.1.1
===========================================

Security Fixes
--------------

The following vulnerabilities are addressed:

- **The supplied operating systems are protected
  against the "Heartbleed" defect in OpenSSL.**
  While the standard distributions of CentOS 6.4 and Ubuntu 12.04
  were vulnerable to the Heartbleed defect in OpenSSL,
  the Mirantis OpenStack 4.1.1 packages have been updated
  with the patched 1.0.1g version
  and are thus protected against the vulnerability.

- `LP1297848 <https://bugs.launchpad.net/fuel/+bug/1297848>`_.

Some disk drivers do not support a 4K sector size for XFS file systems
----------------------------------------------------------------------

To work around this issue,
we now use 512-byte sectors
when creating XFS file systems;
these are supported for all file system architectures.
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

**dnsmasq** processes are not always terminated properly
when MySQL or Keystone fail.
This sometimes meant that DHCP addresses were not received properly
unless Pacemaker CRM restarted the neutron-dhcp-agent.
To solve this problem,
the CRM cleanup script for neutron-dhcp-agent has been modified
to inspect network namespaces on the node and react appropriately
rather than relying on information from the Neutron API.
See `LP1285929 <https://bugs.launchpad.net/fuel/+bug/1285929>`_.

Neutron agent failed if management VIP was recently moved
---------------------------------------------------------

The Pacemaker CRM start/stop/miration scripts
for Neutron L3 and DHCP agents
failed if the management VIP
(which specifies the virtual IP address and port
on which client traffic is received)
had recently been moved.
To solve this problem,
the CRM cleanup scripts for Neutron agents have been modified
to inspect network namespaces on the node and react appropriately
rather than relying on information from the Neutron API.
See `LP1287716 <https://bugs.launchpad.net/fuel/4.1.x/+bug/1287716>`_.

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

IFUP ran prematurely when bonding NICs
--------------------------------------

IFUP (which brings a network interface up)
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
which occasionally prevented them from starting.
This has been fixed.
See `LP1311634 <https://bugs.launchpad.net/fuel/+bug/1311634>`_

Neutron L3 agents could be moved unnecessarily
----------------------------------------------

Neutron L3 agents could be moved at random times,
causing outages.
This was fixed by setting stickiness=1
for the Pacemaker resource for Neutron and other services.
See `LP1312177 <https://bugs.launchpad.net/fuel/+bug/1312177>`_.

Notification for newly-spawned VMs could be broken by deployment ordering error
-------------------------------------------------------------------------------

The Neutron deployment script
sometimes tried to obtain a service tenant ID
before Kesometimes ystone was running and exposed via HAProxy.
This was fixed by ensuring that the Keystone service
and its HAProxy section are initialized
before the neutron-server is initialized.
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

Shotgun cannot log into the host system
---------------------------------------

Shotgun (the tool used to collect information for the diagnostic snapshot)
was sometimes unable to log into deployed nodes.
This was resolved by copying the master node's public key
to its own keyring.
See `LP1316581 <https://bugs.launchpad.net/fuel/+bug/1316581>`_.

TTL has been increased for MCollective
--------------------------------------

TTL (Time To Live) has been increased for MCollective.
Previously, deployment of a new controller sometimes failed
with a message such as
"Node ... not answered by RPC, removing from db" or
"MCollective agents ... didn't respond within the alloted time."
See `LP1316720 <https://bugs.launchpad.net/fuel/+bug/1316720>`_.

Ceilometer logs were not stored on Fuel Master node
---------------------------------------------------

Ceilometer logs were not stored on the Fuel Master node
because debug logging was not implemented.
This has been fixed.
See `LP1317123 <https://bugs.launchpad.net/fuel/+bug/1317123>`_.

Debian installer truncated long log messages
--------------------------------------------

The Debian installer (used for Ubuntu nodes)
truncated long log messages
rather than splitting them into shorter messages that could all be logged.
This has been fixed.
See `LP1318747 <https://bugs.launchpad.net/fuel/+bug/1318747>`_.

Keystone deployment script sometimes failed to initialize Keystone database
---------------------------------------------------------------------------

The Keystone deployment script would sometimes try
to run the db_sync command to initialize the Keystone database
too early in the deployment process.
This was fixed by adding a retry mechanism
to ensure that the database is initialized
as soon as possible.
See `LP1319087 <https://bugs.launchpad.net/fuel/+bug/1319087>`_.

Predefined Neutron networks were not available in Horizon
---------------------------------------------------------

Horizon could not access the predefined Neutron networks
when the admin tenant name was changed to a value
other than the default "admin" name.
The correct admin tenant name is now used
to create predefined networks with Neutron.
See `LP1319942 <https://bugs.launchpad.net/fuel/+bug/1319942>`_.

Ubuntu provisioning sometimes failed
------------------------------------

Ubuntu provisioning sometimes failed
when Ceph OSD was placed on the Controller node
rather than on a separate Storage node.
This has been fixed so that Ceph OSD can run on a Controller node
for demonstration purposes.
However, even with this problem fixed,
placing Ceph OSD on Controllers
is highly unadvisable for production environments
because it can severely degrade the Controller's performance.
See `LP1319995 <https://bugs.launchpad.net/fuel/+bug/1319995>`_.

AMQP/RabbitMQ nodes are now shuffled for all OpenStack services
---------------------------------------------------------------

AMQP/RabbitMQ nodes are now assigned to non-compute nodes
using a Round Robin algorithm
to better balance network traffic and improve performance.
See `LP1320184 <https://bugs.launchpad.net/fuel/+bug/1320184>`_.

Savanna deployment sometimes failed
-----------------------------------

Savanna deployment sometimes failed
because Savanna set some filters
that conflicted with those set by the Nova scheduler.
These issues have been resolved.
See `LP1321284 <https://bugs.launchpad.net/fuel/+bug/1321284>`_.

