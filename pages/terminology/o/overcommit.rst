
.. _overcommit-term:

Overcommit ratio
----------------

The overcommit ratio defines the percentage of
CPU, memory, and disk resources
that can be overcommitted to instances deployed in your environment.
Overcommittment allows you to better utilize the available resources
because most instances are not fully active at the same time.
However, setting this ratio too high may result in performance degradation
for the instances
and could even cause instances to shut down completely
because they ran out of resources.

Overcommit ratios can be set for CPUs, RAM, and disk.
By default, Fuel sets the overcommit ratio for CPUs at 8:1;
This means that, if your physical node has 12 cores,
the Filter :ref:`scheduler-term` sees 96 available virtual cores
and so could provide 24 4-core instances on that physical node.

Fuel sets the overcomit ratio for RAM and disks at 1:1,
meaning that the scheduler only sees the actual amount
of physical memory and physical disk space that is allocated.
Note that OpenStack sets the overcommit ratio for CPUs at 16:1
and the overcommitment ratio for RAM at 1.5:1.

To modify the overcommit ratio(s):

- Log into each Compute node.
- Edit the */etc/nova/nova.conf* file to change the values.
- Restart the nova-scheduler service.

Note that the overcommit ratio is not recognized
by the traditional Simple "naive" Scheduler.

For more information, see:

- `Overcommitting <http://docs.openstack.org/trunk/openstack-ops/content/compute_nodes.html#overcommit>`
- `Scheduler configuration improvements <https://www.mail-archive.com/fuel-dev%40lists.launchpad.net/msg00642.html>`_
  Mail archive

