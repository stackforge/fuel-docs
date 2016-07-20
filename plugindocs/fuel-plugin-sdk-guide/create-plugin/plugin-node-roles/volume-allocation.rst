.. _volume-allocation:

Volume allocation
-----------------

Fuel defines a set of rules for existing roles. The rules determine disk space
usage on the nodes with the specified role. Fuel partitions the disk drives
assigned to the node in accordance with these rules.

Using the Fuel web UI, you can also tweak the disk size for a predetermined
partition on the node before the deployment.

The plugin framework allows you to change the predefined rules and to specify
new rules for the plugin specific roles using the file ``volumes.yaml`` in the
plugin root directory.

The syntax of the ``volumes.yaml`` file follows the same conventions used to
define volumes for the standard Fuel roles. For reference,
see :ref:`Creating Partitions on Nodes<dev-create-partition>` and
`an example of partitioning rules <https://github.com/openstack/fuel-web/blob/master/nailgun/nailgun/fixtures/openstack.yaml#L561-L724>`_.

.. note:: The plugin framework only allows changing disk partitioning to
          an extent; you can always use some of a plugin's tasks to partition
          disks with a sophisticated scheme. The main purpose of specifying
          partitions with definitions in ``volumes.yaml`` is to allow
          interactive resizing of partitions, which are defined by the plugin,
          from the Fuel web UI before environment deployment.

There are two primary use cases with ``volumes.yaml``:

* Defining the disk allocation for a new role.
* Redefining the disk allocation for the existing role.

**Define disk allocation for a new role**

An example of an automatically generated ``volumes.yaml``:

.. code-block:: ini

   volumes_roles_mapping:
    # Default role mapping
    fuel-plugin-example_role:
     - {allocate_size: "all", id: "os"}

   # Set here new volumes for your role
   volumes: []

The two sections are:

* ``volumes_roles_mapping`` -- defines which Fuel defined and plugin specific
  volumes the nodes with the given roles will contain. In the given example,
  there is only one rule: all the disk size is assigned to one volume named
  'os'. This is also the default rule, which means that even if you define
  a new role but do not provide volume mapping for it, it will be used
  implicitly.

* ``volumes`` -- contains the definition of plugin specific volumes. In the
  given example there no plugin specific volumes defined.

To assign a minimal size to the OS VG and create a raw partition on all of
the remaining space:

#. Edit ``volumes.yaml``:

   .. code-block:: ini
   
      volumes_roles_mapping:
       fuel-plugin-example_role:
        - {allocate_size: "min", id: "os"}
        - {allocate_size: "all", id: "fuel-plugin-example-raw_partition"}

      volumes:
       - id: fuel-plugin-example-raw_partition
         type: partition
         min_size:
          generator: calc_gb_to_mb
          generator_args: [10]
         label: "Example Plugin raw partition"
         mount: none
         disk_label: "example"
         file_system: none

#. Synchronize the edited ``volumes.yaml`` using :command:`fuel plugins --sync`.
#. In the Fuel web UI, add a new node with the plugin's role.

.. note:: The definitions in ``volumes.yaml`` are not retroactive. The
          definitions will affect only the nodes created after
          synchronization. The nodes created before synchronization
          keep their previous disk partitioning.

**Redefine disk allocation for an existing role**

An example of adding two plugin specific volume groups to the standard
controller role:

.. code-block:: ini
 
   volumes_roles_mapping:
    compute:
     - {allocate_size: "min", id: "os"}
     - {allocate_size: "all", id: "vm"}
     - {allocate_size: "min", id: "example1"}
     - {allocate_size: "min", id: "example2"}

   # Set here new volumes for your role
   volumes:
     - id: "example1"
       type: "vg"
       min_size:
        generator: "calc_gb_to_mb"
        generator_args: [5]
       label: "Example 1"
       volumes:
        - mount: "/example1"
          type: "lv"
          name: "example1"
          size:
           generator: "calc_total_vg"
           generator_args: ["example1"]
          file_system: "ext4"
     - id: "example2"
       type: "vg"
       min_size:
        generator: "calc_gb_to_mb"
        generator_args: [10]
       label: "Example 2"
       volumes:
        - mount: "/example2"
          type: "lv"
          name: "example2"
          size:
           generator: "calc_total_vg"
           generator_args: ["example2"]
          file_system: "xfs"

Although allocation of volumes for existing roles can be redefined by
a plugin, existing volumes definition cannot be changed; there will be
no error message, but you will not be able to open the settings for the
environment. If you need to redefine the partitioning for the already
exisiting roles, the only way to do that is to define your own volumes
and replace the standard one with them in the mappings. We do not
recommend this approach, though, as it makes the plugin incompatible
with other plugins, as well as with any updates.