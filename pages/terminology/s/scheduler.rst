
.. _scheduler-term:

Scheduler, Nova
---------------

The Nova scheduler determines how to allocate
new VM instances among the configured Compute Nodes.
The Filter Scheduler
uses a set of filters plus a weighting algorithm
to determine the best location for a new VM instance.
This scheduler is superior to the "Simpler" or "naive" scheduler
that older versions of Fuel deployed.
Fuel 5.0 and Fuel 4.1.1
are the first versions of Fuel that allow you
to choose which scheduler you use;
see :ref:`scheduler-ug`.

The Filter Scheduler uses the :ref:`overcommit-term`
to compute available resources.

For more details, see:

- `Scheduling reference <http://docs.openstack.org/trunk/config-reference/content/section_compute-scheduler.html>`_
  gives reference information about the Filter Scheduler.
- `Filter Scheduler <http://docs.openstack.org/developer/nova/devref/filter_scheduler.html>`_
  provides developer information about the Filter Scheduler.
- `Grizzly Scheduling <http://docs.openstack.org/grizzly/openstack-compute/admin/content/ch_scheduling.html>`_
  gives details about the Simpler ("naive") Scheduler.
