.. _repo-structure:

Git repository structure
------------------------

You can have the following configuration priorities in the Git repo:

* **Cluster** - configuration is applied to all nodes. All cluster level
  configuration  files must be placed in the root directory in the Git
  repository.
* **Role** - configuration is applied to all nodes with the selected role.
  Parameters with the Role level override parameters with the Cluster level.
* **Node** - configuration is applied to the selected node ID. Parameters
  with the Node level override the parameters with Global and Role levels.

The following text is an example of a Git repository that you can create:

::

  .
  |-- cluster.yaml
      |`-- glance-api.conf
  |-- nodes
      |`-- node_1.domain.local.yaml
  |-- roles
      |`-- compute.yaml
      |`-- controller.yaml
      |`-- primaray-controller.yaml

The example above illustrates what types of files can be
stored in the repository, however, you can modify this structure as needed.

The configuration files you create must use Puppet's resource types
to describe the required configuration. For more information about the
parameters and attributes that you can specify in the configuration files, see
*Puppet Resource Type Reference*.

The following table describes the Git repository structure.

.. list-table:: **Git repository structure**
   :widths: 20 10 15
   :header-rows: 1

   * - File
     - Description
     - Example
   * - ``cluster.yaml``
     - Describes cluster-level configurations in a form of a dictionary.
     -
       ::

         configuration:
             nova_config:
                 'DEFAULT/nova_test':
                     value: cluster_param
                 'DEFAULT/another_param':
                     value: another_param_value

   * - ``nodes/<node-name>.yaml``

       **Example:** ``node_1.domain.local.yaml``
     - A file that describes node priority configurations.
     -
       ::

         -configuration:
         -    nova_config:
         -        'DEFAULT/debug':
         -            value: True
         -        'DEFAULT/nova_cluster_override':
         -            value: node_param
         -
         -    package:
         -        'mc':
         -            ensure: absent
         -    exec:
         -        'some_test':
         -            command: '/bin/touch /tmp/test'
         -            unless: '/bin/test -f /tmp/test'
         -            path: '/bin:/sbin'

   * - ``roles/<node-role>.yaml``

       **Example:** ``roles/primary-controller``
     - A file that describes configuration for all related node roles.

       To view the list of node roles in this environment, run:

       ::

         fuel node
     -
       ::

         configuration:
             nova_config:
                 'DEFAULT/nova_test':
                     value: controller_param

.. seealso::

   - `Puppet Resource Type Reference
     <https://docs.puppet.com/puppet/latest/reference/type.html>`_
   - `Fuel CLI Reference
     <http://docs.openstack.org/developer/fuel-docs/userdocs/fuel-user-guide/cli/cli_config_openstack.html>`_
