

Issues Resolved in Mirantis OpenStack 5.0.1
===========================================

Bootstrap kernel issues on certain hardware
-------------------------------------------

The bootstrap image shipped with earlier versions of Mirantis OpenStack
omitted some firmware files,
which led to issues with some hardware configurations,
(including some Dell R410/R610s servers).
The bootstrap image shipped with Mirantis OpenStack 5.0.1
has been updated to include these firmware files.
See `LP1323354 <https://bugs.launchpad.net/fuel/+bug/1323354>`_ 
for details.

Syslog log rotation on the Fuel Master Node enhancements
--------------------------------------------------------

Enhancements to the syslog rotation implementation
are included:

- The syslog log rotation on the Fuel Master Node
  has been reimplemented to integrate docker logs with other logs,
  to add audit logs to the rotation,
  and to split client logs from server logs.
  See `LP1316957 <https://bugs.launchpad.net/fuel/+bug/1316957>`_.

- Issues that caused duplicated entries in syslog
  and that prevented the log rotation scheme from clearing these logs
  could cause the logs to grow to the point
  where they filled the file system on the Fuel Master Node.
  These have been fixed.
  See `LP1329991 <https://bugs.launchpad.net/bugs/1329991>`_.

Health Check sometimes returned false positive error
----------------------------------------------------

In earlier releases, the Fuel Health Check sometimes
erroneously reported an error
when checking connectivity using a floating IP.
This was fixed by increasing the maximum number of ping probes
to allow at least three answers for up to ten requests,
increasing the interval between connectivity checks
from thirty seconds to sixty seconds,
and checking the command result rather than its output.
A retry is also implemented
when the ping command returns with an error code.
See `LP1322102 <https://bugs.launchpad.net/fuel/+bug/1322102>`_.

The network settings tab disappeared intermittedly on a VirtualBox deployment
-----------------------------------------------------------------------------

The Network Settings tab sometimes disappeared
from the Fuel UI screen on a VirtualBox deployment
and would then reappear.
The flaw in the UI coding has been resolved.
See `LP1323269 <https://bugs.launchpad.net/bugs/1323269>`_.

Content of the Murano description in Fuel UI has been corrected
---------------------------------------------------------------

The description of Murano on the Fuel UI
was not updated to reflect Murano 0.5 and later;
this has been corrected.
See `LP1323269 <https://bugs.launchpad.net/bugs/1323269>`_.

Stopping deployment in VirtualBox could damage filesystem
---------------------------------------------------------

Clicking the "Stop Deployment" button when modifying
a provisioned node sometimes destroyed the nodes's filesystem
when running OpenStack on VirtualBox.
This happened because Astute removed the node from Cobbler,
making the node's hostname unresolvable.
It was fixed by modifying the stop_provisioning task
to use the node's IP address rather than hostname.
See `LP1316583 <https://bugs.launchpad.net/fuel/+bug/1316583>`_.

Cobbler sometimes ran out of resources when redeploying environment
-------------------------------------------------------------------

Redeploying an OpenStack environment
requires that Cobbler delete existing nodes
and then redeploy them,
which sometimes caused Cobbler to run out of resources.
To fix this problem,
nodes are now split into smaller groups
which are processed in order
with some lag time (configurable, default 10 seconds)
between the processing of the groups.
See `LP1339024 <https://bugs.launchpad.net/fuel/+bug/1339024>`_.

Problems deploying Ceph OSD nodes when redeploying environment
--------------------------------------------------------------

LVM metadata was sometimes retained
when a new OpenStack cloud environment was deployed
using the same hardware as the old environment;
this prevented Ceph OSD nodes from deploying correctly.
LVM metadata is now explicitly erased
after the partitions are created for the new environment;
this solves the problem.
See `LP1323707 <https://bugs.launchpad.net/bugs/1323707>`_.

Deployment failed because HAProxy tried to exec check target nodes
------------------------------------------------------------------

HAProxy is controlled by Pacemaker/Corosync
and so it can exec check the primary controller
but the deployment recorded errors in the Puppet log
when it attempted to exec check the other controller nodes.
In 5.0.1, HAProxy only exec checks the primary controller.
See `LP1329780 <https://bugs.launchpad.net/bugs/1329780>`_.

Rebooting Fuel Master Node from installation media silently deleted partitions on target nodes
----------------------------------------------------------------------------------------------

If the Fuel Master Node was accidentally rebooted
from the installation media after deployment,
it silently wiped the partition table on the target nodes.
In 5.0.1, Fuel asks for confirmation before
wiping the disks on the target nodes.
See `LP1325068 <https://bugs.launchpad.net/fuel/+bug/1325068>`_.

Limit of 9 Ceph OSD Journal Partitions
--------------------------------------

In earlier releases,
double-digit partitions (10 and up)
on the Ceph OSD  Journal device
could not be allocated to Ceph OSDs.
This limitation has been removed.
See `LP1339833 <https://bugs.launchpad.net/fuel/+bug/1339833>`_.

"Verify Network" failed on Ubuntu
---------------------------------

A missing file in one of the Ubuntu packages
prevented the "Verify Network" utility from running to completion.
This file is now included in the package.
See `LP1325347 <https://bugs.launchpad.net/fuel/+bug/1325347>`_.

Murano Health Check no longer downloads images for testing
----------------------------------------------------------

Before running the Murano Health Check,
you should manually download the image
as documented in :ref:`murano-test-prepare`.
In earlier versions of Fuel,
if the image was not present,
the software would attempt to dowload the image
from a standard site and generate an error when it was not found.
Now the test fails if the image is not available on the target.
See `LP <https://bugs.launchpad.net/bugs/1327290>`.

