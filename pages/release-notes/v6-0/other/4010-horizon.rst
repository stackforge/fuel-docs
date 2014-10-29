
.. _horizon-rn:

OpenStack Dashboard (Horizon)
-----------------------------

New Features and Resolved Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* If the public NIC on the primary controller becomes unavailable,
  the public VIP now migrates to another controller.
  See `LP1370510 <https://bugs.launchpad.net/fuel/+bug/1370510>`_.

* Users no longer have to log into Horizon twice after a session times out.
  This used to happen when both the Keystone token and the Horizon session expired at the same time.
  See `LP1353544 <https://bugs.launchpad.net/bugs/1353544>`_.

* Horizon filter displays long objects correctly: objects that are bigger
  than one page
  are now displayed properly in Horizon.
  See `LP1352749 <https://bugs.launchpad.net/bugs/1352749>`_.

* In OpenStack environments that use Neutron and Open vSwitch on the routers,
  Horizon does not show that the external gateway (router_gateway) is down
  when all networking is functional.
  See `LP1323608 <https://bugs.launchpad.net/bugs/1323608>`_.

Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

Multiple TestVM images may be created
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Multiple TestVM images may be created
and will appear on the Horizon dashboard.
Any of the images can be used.
See `LP1342039 <https://bugs.launchpad.net/fuel/+bug/1342039>`_.

"Deassociate floating IP" button may disappear from Horizon menu
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The "Deassociate floating IP" button may disappear
from the Horizon menu when using Neutron network topologies.
See `LP1325575 <https://bugs.launchpad.net/bugs/1325575>`_.

Horizon performance is degraded when a node is down
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Horizon uses memcached servers for caching
and it connects to each one directly.
If one of the nodes is down so that its memcached server does not respond,
Horizon operations may be delayed.
See `LP1367767 <https://bugs.launchpad.net/bugs/1367767>`_.

You can perform the following workaround:

To work around this, edit
the */etc/openstack-dashboard/local_settings* file
and temporarily remove the IP:PORT string from the LOCATION line
for the problem controller from the CACHE structure:
::

  CACHES = {
    'default': {
      'BACKEND' : 'django.core.cache.backends.memcached.MemcachedCache',
      'LOCATION' : "192.168.0.3:11211;192.168.0.5:11211;192.168.0.6:11211"
  },

Then restart the Apache web server.

* If node is added to the cluster after removing a compute node from this cluster,
  an error occurs: the deleted node still is displayed in Horizon in down state.
  See `LP1374361 <https://bugs.launchpad.net/bugs/1374361>`_.


