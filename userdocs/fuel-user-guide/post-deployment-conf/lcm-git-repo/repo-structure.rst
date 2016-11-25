.. _repo-structure:

Git repository structure
------------------------

You can have the following configuration priorities in the Git repo:

* **Global** - configuration is applied to all nodes. All global configuration
  files must be placed in the root directory in the Git repository.
* **Role** - configuration is applied to all nodes with the selected role, but
  overriten by the configurations with the global prioty if exist.
* **Node** - configuration is applied to the selected node, but
  overriten by the configurations with the global and role prioty if exist.

The following text is an example of a Git repository that you can create:

::

  .
  |-- controller_configs
  |   `-- glance-api.conf
  |-- node_1_configs
  |   `-- nova.conf
  |   `-- configuration.yaml
  |-- nova.conf
  |-- overrides.yaml
  |-- configuration.yaml
  |-- tools
      `-- show-config-for.py

While many of the files listed in the example above are optional and
created for a specific configuration, some files, such as ``overrides.yaml``
are required. The example above gives you an idea of what files need to be
stored in the repository, however, you can modify this structure as needed.

The configuration files you create must use Puppet's resource types
to describe required configuration. For more information about the parameters
and attributes that you can specify in the configuration files, see
*Puppet Resource Type Reference*.

The following table describes the Git repository structure.

.. list-table:: **Git repository structure**
   :widths: 10 10 15
   :header-rows: 1

   * - File
     - Description
     - Example
   * - ``configuration.yaml``
     - Describes global configurations in the form of a dictionary.
       In the provided example, the ``configuration.yaml`` ensures
       that Midnight Commander is installed on all nodes. Puppet's paramter
       ``package`` with the attribute ``ensure`` is used to guarantee the
       installation. For more information, see
       `package <https://docs.puppet.com/puppet/latest/reference/type.html#package>`.

     - 
       ::

         package:
             `mc`:
                 ensure: 'present'

   * - ``overrides.yaml``
     - A file that describes node and role priority configurations and paths
       to the configuration files in this repository using the following
       format:

       ::

         nodes:
           '<node_id>': '<directory_name>'
         roles:
           '<role_name>': '<directory_name>'

       The ``overrides.yaml`` file must be placed in the root directory of the
       Git repository.

       .. tip::

          To view the list of node roles in this environment, run:

          ::

            fuel node
     -
       ::

         nodes:
           '1': node_1_configs
           '2': node_2_configs
         roles:
           'cinder': 'cinder_configs'
           'compute': 'compute_configs'
           'controller': 'controller_configs'
           'primary-controller': 'controller_configs'

   * - ``<service-name>.conf``, **Example:** ``nova.conf``
     - A file that describes global priority configurations for the selected
       service, such as ``nova.conf``.
     -
       ::

         package:
           screen:
             ensure: present

   * - ``<service-configs>/<name-of-service>.conf``,
       **Example:** ``controller_configs/glance-api.conf``
     - Configuration files with node and role priorities. The files must be
       placed in directories with descriptive names.
     -
       ::

         [DEFAULT]
         cpu_allocation_ratio=1.0

.. seealso::

   - `Puppet Resource Type Reference
     <https://docs.puppet.com/puppet/latest/reference/type.html>`_
   - `Fuel CLI Reference
     <http://docs.openstack.org/developer/fuel-docs/userdocs/fuel-user-guide/cli/cli_config_openstack.html>`_
