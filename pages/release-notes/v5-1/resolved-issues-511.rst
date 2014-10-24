

Issues Resolved in Mirantis OpenStack 5.1.1
===========================================

Horizon and other services may be unavailable if a controller fails
-------------------------------------------------------------------

If the public NIC on the primary controller becomes unavailable,
the public VIP does not migrate to another controller.
This does not break your OpenStack environment
but services such as Horizon that use the Public VIP
become unavailable.
Bringing the affected bridge interface back online
restores access to these services.
See `LP1370510 <https://bugs.launchpad.net/fuel/+bug/1370510>`_.

Horizon filter displays long objects correctly
------------------------------------------------

Objects that are bigger than one page
are now displayed properly in Horizon.
See `LP1352749 <https://bugs.launchpad.net/bugs/1352749>`_.

MongoDB cannot store dictionary objects with keys that use $ and . special characters
-------------------------------------------------------------------------------------

The special characters '.' and '$' are special characters for the MongoDB database
and so cannot be used as keys in dictionary objects.
When Ceilometer processes data samples
that contain these characters in the resource metadata
(for example, has tag names with dots in them),
the sample writing fails.
This usually occurs when metric data is collected
from images with special tags
(such as images Sahara creates with tags like '_sahara_tag_1.2.1').
All data samples that do not contain these forbidden symbols
are processed as usual without any problems.
Do not create images, VMs, and other cloud resources
that contain resource metadata keys that use the $ and . special characters.
See `LP1360240 <https://bugs.launchpad.net/bugs/1360240>`_.


* Creating volume from image no longer performs full data copy with Ceph backend
  Previously, a regression was introduced into configuration of RBD backend for Cinder. In
  previous versions of Mirantis OpenStack, enabling RBD backend for both Cinder
  and Glance enabled zero-copy creation of a Cinder volume from a Glance image.
  See `LP1373096 <https://bugs.launchpad.net/bugs/1373096>`_.

* Image file injection is fixed on CentOS; libguestfs dependency no longer misses.
  See `LP1367324 <https://bugs.launchpad.net/fuel/+bug/1367324>`_.

* Neutron L3-agent starts interfaces successfully.
  See `LP1367324 <https://bugs.launchpad.net/fuel/+bug/1367324>`_.

* Neutron L3-agent no longer hangs.
  See `LP1361710 <https://bugs.launchpad.net/fuel/+bug/1361710>`_.

* If controller fails, all RBD backend Cinder volumes stay manageable.
  See `LP1371328 <https://bugs.launchpad.net/fuel/+bug/1371328>`_.

* Numerous reconnections no longer occur in different components logs.
  See `LP1371723 <https://bugs.launchpad.net/fuel/+bug/1371723>`_.

* Metadata agent now uses RPC to communicate with Neutron server instead
  of the Neutron client. This reduces Keystone load, helps to avoid 
  possible authentication failures and accelerates the work of Metadata
  agent itself. See `LP1364348 <https://bugs.launchpad.net/fuel/+bug/1364348>`_. 

* Rsyslogd restart does not cause different services to hang.
  See `LP1363102 <https://bugs.launchpad.net/fuel/+bug/1363102>`_.

* When setting osapi_compute_unique_server_name_scope to project or global,
  duplicate names in the appropriate scope now returns a BadRequest (400) ; previously,
  it returned a ClientException (500) with an unhelpful message.
  See `LP1377176 <https://bugs.launchpad.net/fuel/+bug/1377176>`_ and the upstream
  `LP1376936 <https://bugs.launchpad.net/fuel/+bug/1376936>`_.

* Backport modal file upload fix for Horizon to 5.x branches
  See `LP1383335 <https://bugs.launchpad.net/fuel/+bug/1383335>`_.

* The Nova CLI and Python API to support Nova server groups are now introduced
  in 5.1.1. See `LP1382443 <https://bugs.launchpad.net/fuel/+bug/1382443>`_.

* Exception ‘Something went wrong!’ now longer occurs
  when two different users work with Murano dashboard.
  See `LP1383673 <https://bugs.launchpad.net/fuel/+bug/1383673>`_.

* Rally benchmark NovaServers.resize_server is failing if concurrency >= 3 and only 1 tenant.
  See `LP1361614 <https://bugs.launchpad.net/fuel/+bug/1361614>`_.

* A flaw in the bash functionality was fixed; this bash functionality evaluated specially
  formatted environment variables passed to it from another environment.
  This feature could be used to override or bypass restrictions to the environment to
  execute shell commands before restrictions have been applied.
  See `LP1373965 <https://bugs.launchpad.net/fuel/+bug/1373965>`_.


