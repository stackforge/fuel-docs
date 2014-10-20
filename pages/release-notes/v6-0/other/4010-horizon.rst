
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
  
* Horizon filter displays long objects correctly. Objects that are bigger than one page
  are now displayed properly in Horizon.
  See `LP1352749 <https://bugs.launchpad.net/bugs/1352749>`_.

Known Issues in Mirantis OpenStack 5.1
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

Horizon falsely shows that the external gateway is down
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In OpenStack environments that use Neutron and Open vSwitch on the routers,
Horizon may show that the external gateway (router_gateway) is down
when all networking is functional.
This happens because Horizon and the Neutron client
query port status from the database
but the agents do not update this status.
When this happens, instances can access the outside world
and be accessed from the outside world by their floating IP addresses
so this error can be ignored.
See `LP1323608 <https://bugs.launchpad.net/bugs/1323608>`_.

Horizon asks for username and password twice after session timeout
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Users have to log into Horizon twice after a session times out.
This happens when both the Keystone token
and the Horizon session expire at the same time.
Because the session has expired,
the token expiration cannot be checked when the user is logged out.
So the user logs into Horizon and then the session sees that the token has expired
so requires a second login for that.
See `LP1353544 <https://bugs.launchpad.net/bugs/1353544>`_.

Horizon filter displays long objects incorrectly
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Objects that are bigger than one page
may be displayed incorrectly in Horizon.
The amount of data Horizon displays per page can be modified
with **Settings->User Settings->Items Per Page**
When pagination is switched for any table.
See `LP1352749 <https://bugs.launchpad.net/bugs/1352749>`_.

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


Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

