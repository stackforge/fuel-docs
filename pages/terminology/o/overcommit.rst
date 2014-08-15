
.. _overcommit-term:

Overcommit ratio
----------------

The overcommit ratio defines the amount
of virtual CPU, memory, and disk resources
that can be allocated to instances on a Compute node,
relative to the amount of physical resources available on that node.
Often, instances do not fully utilize all resources allocated to them;
overcommittment allows you to better utilize the available resources
in light of this fact.
You must carefully monitor resource utilization
to ensure that adequate resources are available on the system.
If this ratio is set too high for your workload,
customers may suffer performance degradation for the instances;
if CPU and memory resources are exhausted,
instances may be destroyed;
if a host runs out of disk space,
instances may suffer spurious disk I/O errors.

Overcommit ratios can be set for CPUs, RAM, and disk.
By default, Fuel sets the overcommit ratio for CPUs at 8:1;
This means that, if your physical node has 12 cores,
the Filter :ref:`Scheduler<scheduler-term>` sees 96 available virtual cores
and so could provision 24 4-core instances on that physical node.

Fuel sets the overcommit ratio for RAM and disks at 1:1,
meaning that the scheduler only sees the actual amount
of physical memory and physical disk space that is allocated.
Note that OpenStack sets the overcommit ratio for CPUs at 16:1
and the overcommitment ratio for RAM at 1.5:1.

To modify the overcommit ratio(s):

- Log into each Compute node.
- Edit the */etc/nova/nova.conf* file to change the values.
- Log into each controller node and restart the nova-scheduler service.

Note that the overcommit ratio is not recognized
by the traditional Simple "naive" Scheduler.

For more information, see:

- `Overcommitting <http://docs.openstack.org/trunk/openstack-ops/content/compute_nodes.html#overcommit>`_
- `Scheduler configuration improvements <https://www.mail-archive.com/fuel-dev%40lists.launchpad.net/msg00642.html>`_
  discussion on the fuel-dev mailing list

