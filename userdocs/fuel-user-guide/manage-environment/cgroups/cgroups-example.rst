.. _cgroups-example:

Example of the control groups configuration
-------------------------------------------

The following text is an example of the section
in the ``settings.yaml`` file that describes the ``cgroups``
configuration:

.. code-block:: console

   editable:
     cgroups:
       mysqld:
         label: mysqld
         type:  text
         value: '{"memory":{"memory.swappiness":0, "memory.limit_in_bytes":"%95,
         2048, 4096"}, , "cpu":{"cpu.shares":100}}'
       beam.smp:
         label: rabbitmq
         type:  text
         value: '{"memory":{"memory.swappiness":0}, "cpu":{"cpu.shares":400,
         "cpu.cfs_quota_us":25000}}'
       cinder-volume:
         label: cinder-volume
         type:  text
         value: '{"blkio":{"blkio.weight":1000}}'
       nova-api:
         label: nova-api
         type:  text
         value: '{"cpu":{"cpu.shares":700}}'
       neutron-server:
         label: neutron-server
         type:  text
         value: '{"cpuset":{"cpuset.sched_load_balance":0,"cpuset.cpus":1,
         "cpuset.mems":0}}'
       metadata:
         always_editable: true
         group: general
         label: Cgroups conguration for services
         restrictions:
         - action: hide
           condition: 'true'
         weight: 90
