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
        from the control group.

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
        value of `cpu.cfs_quota_us`` to 30000.

       ``cpu.shares``
        Defines a share of CPU resources available to each control group.
        The default value is 1024. For example, if you assign *1024* to one
        process and *512* to the other process, kernel proportionally
        allocates more CPU for the first process and less for the second.


.. _cgroups-configure:

Configure control groups
++++++++++++++++++++++++

You can configure ``cgroups`` for multiple nodes before you deploy an
OpenStack environment by editing the ``settings_1.yaml`` file on the
Fuel Master node.

**To configure control groups:**

#. Log in to the Fuel Master node CLI.
#. Download the Fuel configuration:

   .. code-block:: console

      fuel settings --env-id <id> --download

#. Open the ``settings_1.yaml`` file for editing.
#. Add the required services to the ``cgroups`` section.

   **Example:**

   .. code-block:: console

      editable:
       cgroups:
         metadata:
           always_editable: true
           group: general
           label: Cgroups conguration for services
           restrictions:
             - action: hide
               condition: 'true'
               weight: 90
       mysqld:
         label: mysqld
         type:  text
         value: '{"memory":{"memory.swappiness":0,
                "memory.soft_limit_in_bytes":"%5, 10, 20"}}'
       beam.smp:
         label: beam.smp
         type:  text
         value: '{"memory":{"memory.swappiness":0}}'
       cinder-api:
         label: cinder-api
         type:  text
         value: '{"blkio":{"blkio.weight":500}}'
       keystone-api:
         label: keystone-api
         type:  text
         value: '{"cpu":{"cpu.shares":70}}'
       neutron-server:
         label: neutron-server
         type:  text
         value: '{"memory":{"memory.soft_limit_in_bytes":"%total, min, max"}}'

#. Save and exit.
#. Upload the new configuration file to Fuel:

   .. code-block:: console

   fuel settings --env-id <env_id> --upload

.. _cgroups-modify-multiple-nodes:

Modify control groups for multiple nodes
++++++++++++++++++++++++++++++++++++++++

You can modify ``cgroups`` for a particular process on multiple nodes by
creating a separate file with the ``cgroups`` configuration, uploading
the new configuration file to fuel, and restarting the ``cgroups`` task.
You can modify control groups before or after you deploy an OpenStack
environment.

**To modify control groups for multiple nodes:**

#. Log in to the Fuel Master node CLI.
#. #. Download the Fuel configuration:

   .. code-block:: console

      fuel settings --env-id <id> --download

#. Open the ``settings.yaml`` file for editing.
#. Copy the ``cgroups`` section.
#. Create a blank ``.yaml`` file.
#. Paster the copied ``cgroups`` configuration into the file.
#. Edit as required.
#. Upload the new configuration file to Fuel:

   .. code-block:: console

   fuel settings --dir <path_to_new_yaml> --env-id <env_id> --upload

#. Restart the ``cgroups`` task:

   .. code-block:: console

      fuel node --node-id <node_1> <node_2> <node_3> --tasks cgroups


.. _cgroups-modify-single-node:

Modify control groups for a single node
+++++++++++++++++++++++++++++++++++++++

If you want to change the control group settings on a single node, you must
edit the control groups configuration file ``/etc/cgconfig.conf``, as well
as create, if needed, and configure the ``/etc/cgrules.conf`` file.
You can modify control groups before or after you deploy an OpenStack
environment.

**To modify control groups for a single node:**

#. Log in to the CLI of corresponding node.
#. Open the ``/etc/cgconfig.conf`` file for editing.
#. Apply the required changes.
#. Save and exit.
#. Add the corresponding parameters to the ``/etc/cgrules.conf`` file.

   **Example:**

   .. code-block:: console

      * :keystone-api   cpu   keystone-api
      * :mysqld   cpu   mysqld

#. Restart ``cgconfigparser``:

   .. code-block:: console

      service cgconfigparser restart

#. For each running process, type:

   .. code-block:: console

      cgclassify 'pidof -x <name_of_process>'

#. Restart ``cgrulesengd``:

   .. code-block:: console

      service cgrulesengd restart
