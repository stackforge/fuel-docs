
Issues Resolved in Mirantis OpenStack 5.0.1
===========================================

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


