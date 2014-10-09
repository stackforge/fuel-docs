.. index:: How Fuel Deploys HA

How Fuel Deploys HA
-------------------

Fuel installs Corosync service, configures ``corosync.conf``,
and includes the Pacemaker service plugin into ``/etc/corosync/service.d``.
Then Corosync service starts and spawns corresponding Pacemaker processes.
Fuel configures the cluster properties of Pacemaker
and then injects resource configurations for virtual IPs, HAProxy,
MySQL and Neutron agent resources.

The running configuration can be retrieved from an OpenStack
controller node by running::

  # crm configure show
