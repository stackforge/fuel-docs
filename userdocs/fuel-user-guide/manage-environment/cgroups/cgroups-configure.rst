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
