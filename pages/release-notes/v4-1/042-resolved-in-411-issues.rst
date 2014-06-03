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

