
.. _horizon-rn:

OpenStack Dashboard (Horizon)
-----------------------------

New Features and Resolved Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* Users no longer have to log into Horizon twice after a session times out.
  This used to happen when both the Keystone token and the Horizon
  session expired at the same time.
  See `LP1353544 <https://bugs.launchpad.net/bugs/1353544>`_.

* Horizon filter displays long objects correctly: objects that are bigger
  than one page
  are now displayed properly in Horizon.
  See `LP1352749 <https://bugs.launchpad.net/bugs/1352749>`_.

* In OpenStack environments that use Neutron and Open vSwitch on the routers,
  Horizon does not show that the external gateway (router_gateway) is down
  when all networking is functional.
  See `LP1323608 <https://bugs.launchpad.net/bugs/1323608>`_.

* Administrator's panel now works in Horizon for custom role;
  Horizon successfully recognizes *customadmin* as an administrator.
  See `LP1371161 <https://bugs.launchpad.net/bugs/1371161>`_.

Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

Multiple TestVM images may be created
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Multiple TestVM images may be created
and will appear on the Horizon dashboard.
Any of the images can be used.
See `LP1342039 <https://bugs.launchpad.net/fuel/+bug/1342039>`_.

"Disassociate Floating IP" button disappears from Horizon menu
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When the environment is deployed using
one of the Neutron topologies,
the "Disassociate" option in the
Project->Access & Security -> Floating IPs table
does not appear for an instance
that has an associated floating IP address.
This option does appear when one of the Nova Network topologies
is used for the environment.
This is related to the upstream
`bug 1226003 <https://bugs.launchpad.net/horizon/+bug/1226003>`_.
See `LP1325575 <https://bugs.launchpad.net/mos/+bug/1325575>`_.

Horizon performance is degraded when a node is down
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Horizon uses memcached servers for caching
and it connects to each one directly.
If one of the nodes is down so that its memcached server does not respond,
Horizon operations may be delayed.
See `LP1367767 <https://bugs.launchpad.net/bugs/1367767>`_.

To work around this, edit
the */etc/openstack-dashboard/local_settings* file.
In the CACHES structure,
temporarily remove the IP:PORT string
for the problem controller from the LOCATION line:
::

  CACHES = {
    'default': {
      'BACKEND' : 'django.core.cache.backends.memcached.MemcachedCache',
      'LOCATION' : "192.168.0.3:11211;192.168.0.5:11211;192.168.0.6:11211"
  },

Then restart the Apache web server.

Deleted nodes may not be displayed incorrectly
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If node is added to the cluster
after a compute node is removed from the cluster,
an error occurs
and the deleted node still is displayed in Horizon in down state.
See `LP1374361 <https://bugs.launchpad.net/bugs/1374361>`_ and
`Full life-cycle of Compute node <https://blueprints.launchpad.net/fuel/+spec/compute-node-lifecycle>`_ blueprint.

Glance may not be able to upload image using Horizon dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Glance may not be able to download an image
from a remote http source;
in other words, when the image is created
using the Glance **image-create** command
with the **copy-from** parameter specifying an HTTP location
or using the equivalent set of API calls.
This happens when the download speed is slow enough
that a 16MB chunk of data
might not be downloaded within a minute;
the download operation is in "Saving" state for several minutes
and then is moved to "Killed" state
and the image disappears from the list of active images.
It happens often when downloading from image storage
on the public hosting providers
such as `murano-files.mirantis.com`
and `sahara-files.mirantis.com`;
these storages may throttle connection speeds
when the load is heavy,
which may reduce the speed enough to cause these problems.

You can avoid the problem
by using **wget** or a similar facility
to manually download the image from the external storage
to the local filesystem on the Controller node.
You can then execute the Glance **image-create** command,
using the **--file** parameter to point to the downloaded file
or use the equivalent API calls.
See `LP1401118 <https://bugs.launchpad.net/mos/+bug/1401118>`_.

Horizon - hypervisors page report is misleading for Ceph
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The statistics on the `Horizon - hypervisors` page
are misleading when Ceph is used as the storage backend;
the actual amount of space available/used
is multiplied by the number of Compute nodes.
The Nova **hypervisor-stats** command has the same issue.
Note that this does not affect the booting of instances in any way;
it merely presents confusing information
on the resource usage report.
See `LP1359989 <https://bugs.launchpad.net/mos/+bug/1359989>`_.

On CentOS, some UI elements and actions erroneously show as available
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

CentOS searches the wrong location for policy files
so some Ui elements and actions seem to be available
but the actions will be rejected
by the underlying OpenStack services
such as Nova, Keystone, and Cinder.
This happens because, by default, all policy checks succeed
if no rule is defined.
To correct the problem,
edit the */etc/openstack_dashboard/local_settings* file
and set the value of POLICY_FILES_PATH to `/etc/openstack-dashboard`.
See `LP1397069 <https://bugs.launchpad.net/mos/+bug/1397069>`_.

