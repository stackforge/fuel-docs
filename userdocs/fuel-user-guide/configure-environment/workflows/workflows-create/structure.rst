.. _workflow-create-structure:

Workflow task structure
-----------------------

You can group the tasks defined in the deployment workflow
file using the types described in this section.

The following table describes the workflow task structure:

.. list-table:: **Workflow task structure**
   :widths: 10 10 10
   :header-rows: 1

   * - Parameter
     - Description
     - Example
   * - ``id``
     - Name of the deployment task.
     -
   * - ``version``
     - Version of the workflow execution engine.
     -
   * - ``type``
     - A type of task that Fuel executes. You can specify the
       following types of tasks:
     -
   * - ``stage``
     - Divides a deployment workflow on phases. In the default
       release workflow Fuel has the following stages:

       - ``pre_deployment_start``
       - ``pre_deployment_end``
       - ``deploy_start``
       - ``deploy_end``
       - ``post_deployment_start``
       - ``post_deployment_end``

       However, you can create any stages as required or do
       not use them at all.

     - ::

         id: deploy_end
         type: stage
         requires: [deploy_start]
   * - ``groups``
     - Describes node roles. By default, Fuel executes all tasks
       simultaneously. Hovewer, the order of tasks execution can be defined
       in the cross-depends and cross-depended-by fields of tasks.

       * ``one_by_one`` - deploy all nodes in this group one after another.

     - ::

        - id: controller
          type: group
          role: [controller]
          requires: [primary-controller]
          required_for: [deploy_end]

   * - ``skipped``
     - Fuel does not execute this task, but preserves all dependencies specified
       in the tasks. For example, if you use a plugin that requires some to be
       skipped, you can create a ``skipped`` task in the plugin workflow file.
     - ::

        - id: netconfig
          type: skipped
          groups: [primary-controller, controller, cinder, compute, ceph-osd,
                  zabbix-server, primary-mongo, mongo]
          required_for: [deploy_end]
          requires: [logging]
          parameters:
            puppet_manifest: /etc/puppet/modules/osnailyfacter/netconfig.pp
            puppet_modules: /etc/puppet/modules
            timeout: 3600

   * - ``puppet``
     - Deploys Puppet manifests.
     - ::

        - id: netconfig
          type: puppet
          groups: [primary-controller, controller, cinder, compute, ceph-osd,
                  zabbix-server, primary-mongo, mongo]
          required_for: [deploy_end]
          requires: [logging]
          parameters:
            puppet_manifest:
            /etc/puppet/modules/osnailyfacter/other_path/netconfig.pp
            puppet_modules: /etc/puppet/modules
            timeout: 3600
   * - ``shell``
     - Executes shell scripts.
     - ::

        - id: enable_quorum
          type: shell
          role: [primary-controller]
          requires: [post_deployment_start]
          required_for: [post_deployment_end]
          parameters:
            cmd: ruby
            /etc/puppet/modules/osnailyfacter/modular/astute/enable_quorum.rb
            timeout: 180
   * - ``upload_file``
     - Uploads values specified in ``data`` in the ``parameters`` section.
     - ::

        - id: upload_data_to_file
          type: upload_file
          role: '*'
          requires: [pre_deployment_start]
          parameters:
            path: /etc/file_name
            data: 'arbitrary info'
   * - ``sync``
     - Distributes files from the ``src`` direcory on the Fuel Master node
       to the ``dst`` directory on the Fuel Slave nodes that match the
       specified roles.
     - ::

        - id: rsync_core_puppet
          type: sync
          role: '*'
          required_for: [pre_deployment_end]
          requires: [upload_core_repos]
          parameters:
            src: rsync://<FUEL_MASTER_IP>:/puppet/
            dst: /etc/puppet
            timeout:

   * - ``copy_files``
     - Reads data from ``src`` and saves it in the file specified in the
       ``dst`` argument. Permissions can be specified for a group of files.
     - ::

        - id: copy_keys
          type: copy_files
          role: '*'
          required_for: [pre_deployment_end]
          requires: [generate_keys]
          parameters:
          files:
            src: /var/lib/fuel/keys/{CLUSTER_ID}/neutron/neutron.pub
            dst: /var/lib/astute/neutron/neutron.pub
          permissions: '0600'
          dir_permissions: '0700'

   * - ``role``
     - Node roles on which the task is executed. To select all roles assigned
       to the node, you can use a wildcard '*'.
     - ::

         role: [primary-controller]

   * - ``requires``
     - Requirements for a specific task or stage on the same node.
     - ::

         requires: [generate_keys]

   * - ``required_for``
     - Specifies which tasks and stages depend on this task.
     - ::

        required_for: [pre_deployment_end]

   * - ``reexecute_on``
     - Re-run the task after completion.
     - ::

        reexecute_on: [deploy_changes]

   * - ``cross-depended-by``
     - Specifies which tasks and stages on other nodes are dependent by this
       task. You can specify a value in a form of a regular expression.
       For example, use ``name:`` entries. Do not use lists
       not use lists.

       .. warning:: The ``cross-depends`` and ``requires`` fields have
          different syntax!

     - ::

          cross-depended-by:
            - name: neutron-keystone

   * - ``cross-depends``
     - Reverse to ``cross-depended-by``. You can specify the value in a form
       of a regular expression. Do not use lists.
     - ::

         cross-depends:
           - name: neutron-keystone
             role: primary-controller
           - name: openstack-haproxy

   * - ``condition``
     - Describes a condition required to execute this task.
       For more information, see: :ref:`data-driven`.
     - ::

        condition: yaql_exp: {yaql expression}
        parameters:
          data: yaql_exp: {yaql expression}

   * - ``parameters``
     - Task execution parameters. Differ for each task.
     - ::

         parameters:
           files:
             - src: /var/lib/fuel/keys/{CLUSTER_ID}/neutron/neutron.pub
               dst: /var/lib/astute/neutron/neutron.pub
           permissions: '0600'
           dir_permissions: '0700'
