.. _cgroups-intro:

Manage control groups
---------------------

Control groups, or ``cgroups``, enable you to efficiently allocate
a specific amount of system resources, including CPU and memory,
to particular resource groups. Using control groups you can assign
a specific amount of resources to particular OpenStack services, as well as
to the underlying middleware components, such as RabbitMQ, MySQL, and others.
Rational assignment may significantly improve the performance of your system.

Fuel implementation of control groups enables you to create one group for one
process and then create a hierarchy of groups. By default, ``cgroups``
are enabled, but no limits are configured.

.. note::
   Fuel supports control groups only for Ubuntu 14.04. If you have integrated
   nodes with any other Linux distributions in your OpenStack environment,
   control groups will not work.

Fuel supports all standard Linux ``cgroups`` resource controllers, or
subsystems.
However, to optimize the performance of your system you will mostly use
the following resource controllers and limits.

.. list-table:: **Resource controllers and limits**
   :widths: 10 10
   :header-rows: 1

   * - Parameter
     - Description
   * - ``blkio``
     - Controls input and output operations on block devices.
       You can specify the following limits:

       ``blkio.weight``
        Defines a proportion of disk I/O available to the control group
        on all devices. Apply to Cinder and Glance back ends
        for better performance.

   * - ``memory``
     - Controls the use of memory.

       You can specify the following limits:

       ``memory.soft_limit_in_bytes``
        Enables soft limit on memory which means that the group can
        temporarily go beyond the soft limit to accommodate the workload
        and will be automatically reduced back to the soft limit when
        the system is low on memory.

       ``memory.limit_in_bytes``
        The maximum amount of memory that the control group can use.
        Specify a value in bytes.

       ``memory.swappiness``
        Controls swap priority. Determines whether kernel can claim memory
        from the control group. Set this value to 0 for high memory consuming
        processes, such as MySQL, MongoDB, RabbitMQ.

   * - ``cpu``
     - Controls the use of CPU.

       You can specify the following limits:

       ``cpu.cfs_quota_us``
        Defines the time during which all tasks in the
        control group can run in one period. After the quota expires
        the tasks are throlled and not allowed to run until the
        next period starts. The default value of `cpu.cfs_quota_us``
        for all control groups is 100_000. Which means 100%
        usage. To restrict the use of CPU, modify this
        setting. For example, to use 30% of CPU, change the
        value of `cpu.cfs_quota_us`` to 30000. Controlling the use of the
        CPU resources through the ``cpu.cfs_quota_us`` and
        ``cpu.cfs_period_us`` parameters provides more accurate resource
        allocation compared to using ``cpu.shares``.

        You can set the following CPU limits:

        * ``beam.smp`` - for RabbitMQ up to 40%.
        * ``pangine`` - for Pacemaker up to 10%.
        * ``nova-api`` - for Nova 20 - 45%.
        * ``nova-conductor`` - for Nova up to 20%.
        * ``mysqld`` - for MySQL up to 10%.
        * ``neutron-server`` - for Neutron - 10%.

       ``cpu.shares``
        Defines a share of CPU resources available to each control group.
        The default value is 1024. For example, if you assign *1024* to one
        process and *512* to the other process, kernel proportionally
        allocates more CPU for the first process and less for the second.
        Using the ``cpu.shares`` parameter to control CPU usage may not
        result in accurate CPU resource allocation.

   * - ``cpuset``
     -  Controls the use of memory and processor processes.

       You can specify the following limits:

       ``cpuset.sched_load_balance`` 
