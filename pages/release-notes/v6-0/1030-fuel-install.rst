
.. _fuel-install.rst:

Fuel Installation and Deployment Issues
=======================================

New Features and Resolved Issues in Mirantis OpenStack 6.0.1
------------------------------------------------------------

* Fuel now has a larger pool of IP addresses to use
  when additional nodes are added to the environment.
  See `LP1271571 <https://bugs.launchpad.net/fuel/+bug/1271571>`_.

* Fuel UI now prevents static and DHCP IP address ranges
  from overlapping during initial Fuel Master node configuration.
  See `LP1365067 <https://bugs.launchpad.net/bugs/1365067>`_.

* Nodes no longer stay indefinitely in the GRUB prompt
  when deploying an Ubuntu based environment.
  See `LP1356278 <https://bugs.launchpad.net/bugs/1356278>`_.

* :ref:`Fuel CLI<cli_usage>` now can be run by a non-root user.
  See `LP1355876 <https://bugs.launchpad.net/bugs/1355876>`_.

Known Issues in Mirantis OpenStack 6.0.1
----------------------------------------

GRE-enabled Neutron installation runs inter VM traffic through management network
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

In Neutron GRE installations configured with the Fuel UI,
a single physical interface is used
for both OpenStack management traffic and VM-to-VM communications.
This limitation only affects implementations deployed using the Fuel UI;
you can use the :ref:`Fuel CLI<cli_usage>` to use other physical interfaces
when you configure your environment.
See `LP1285059 <https://bugs.launchpad.net/fuel/+bug/1285059>`_.

Fuel default disk partition scheme is sub-optimal
+++++++++++++++++++++++++++++++++++++++++++++++++

* All available hardware LUNs under LVM are used and spanned across;
  for example, OpenStack and guest traffic are coupled.
  See the
  `Improve Fuel Default Disk Partition Scheme
  <https://blueprints.launchpad.net/fuel/+spec/improve-fuel-default-disk-partition-scheme>`_ blueprint.

* On target nodes that use Ubuntu as the operating system,
  Ubuntu provisioning applies the default Base System partition
  even if the user choses a different scheme.

New node may not boot because of IOMMU issues
+++++++++++++++++++++++++++++++++++++++++++++

A new node fails when trying to boot into bootstrap.
To fix this issue,
add the "intel_iommu=off" or "amd_iommu=off" kernel parameter
on the Fuel Master node;
follow instructions in :ref:`kernel-parameters-ops`.
See `LP1324483 <https://bugs.launchpad.net/bugs/1324483>`_.

Performance of OpenStack services is degraded when a controller is down
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

If one of the Controller nodes in an HA environment is deleted or goes offline,
requests to Horizon, Keystone, and other OpenStack services reliant on Keystone
will intermittently get delayed for several seconds while trying to connect to
memcached server on the offline controller node. See
`LP1405549 <https://bugs.launchpad.net/mos/+bug/1405549>`_ and
`LP1367767 <https://bugs.launchpad.net/bugs/1367767>`_.

To fix this problem, remove the offline memcached server from OpenStack
configuration files:

#.  View the */etc/hosts* file on one of the Controller nodes
    that is alive and determine the IP address
    that is assigned to the Management interface
    of the unavailable Controller.

#.  Edit the *keystone.conf* file on each Controller node
    to remove this IP address from the list of memcached servers:

    .. code-block:: sh

       DOWN_IP="192.168.0.5"; sed -r 's/'$DOWN_IP':11211,?//g' \
          -i.bak /etc/keystone/keystone.conf

#.  Restart the Keystone daemon on each Controller:

    .. code-block:: sh

       service openstack-keystone restart || restart keystone

#.  Edit the */etc/openstack-dashboard/local_settings* file. In the CACHES
    structure, temporarily remove the <IP>:<PORT> string for the offline server
    from the LOCATION line:

    .. code-block:: json

       CACHES = {
         'default': {
           'BACKEND' : 'django.core.cache.backends.memcached.MemcachedCache',
           'LOCATION' : "192.168.0.3:11211;192.168.0.5:11211;192.168.0.6:11211"
       },

    Then restart the Apache web server.

Anaconda fails with LVME error on CentOS
++++++++++++++++++++++++++++++++++++++++

Anaconda fails with LVME error: deployment was aborted by provisioning timeout,
because installation of CentOS failed on one of compute nodes.
See `LP1321790 <https://bugs.launchpad.net/bugs/1321790>`_.
This is related to known issues with Anaconda.

Invalid node status after restoring Fuel Master node from backup
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

If you add nodes to the environment after you create a
:ref:`backup<Backup_and_restore_Fuel_Master>`
and subsequently restore the Fuel Master,
those nodes may be reported as offline.
Rebooting those nodes brings them back online.
To avoid this problem, always run a new backup
of the Fuel Master node after adding nodes.
See the `blueprint <https://blueprints.launchpad.net/fuel/+spec/master-incremental-backup>`_.

Shotgun does not check available disk space before taking a diagnostic snapshot
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Shotgun does not ensure that adequate disk space is available
for the diagnostic snapshot.
Users should manually verify the disk space
before taking a diagnostic snapshot.
See `LP1328879 <https://bugs.launchpad.net/bugs/1328879>`_
and the `blueprint <https://blueprints.launchpad.net/fuel/+spec/manage-logs-with-free-space-consideration>`_.

Other Issues
++++++++++++

* The Fuel Master Node can only be installed with CentOS as the host OS.
  While Mirantis OpenStack nodes can be installed
  with either Ubuntu or CentOS as the host OS,
  the Fuel Master Node is only supported on CentOS.

* Deployments done through the Fuel UI
  create all of the networks on all servers
  even if they are not required by a specific role.
  For example, a Cinder node has VLANs created
  and addresses obtained from the public network.

* The provided scripts that enable Fuel
  to be automatically installed on VirtualBox
  create separate host interfaces.
  If a user associates logical networks
  with different physical interfaces on different nodes,
  it causes network connectivity issues between OpenStack components.
  Please check to see if this has happened prior to deployment
  by clicking on the “Verify Networks” button on the Networks tab.

* The Fuel Master node services (such as PostgrSQL and RabbitMQ)
  are not restricted by a firewall.
  The Fuel Master node should live in a restricted L2 network
  so this should not create a security vulnerability.

* We could improve performance significantly by upgrading
  to a later version of the CentOS distribution
  (using the 3.10 kernel or later).
  See `LP1322641 <https://bugs.launchpad.net/bugs/1322641>`_.

* Docker loads images very slowly on the Fuel Master node.
  See `LP1333458 <https://bugs.launchpad.net/bugs/1333458>`_.
