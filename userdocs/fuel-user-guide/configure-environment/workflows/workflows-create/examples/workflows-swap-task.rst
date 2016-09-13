.. _workloads-replace-task:

Replace a task
--------------

You can replace a task with a custom task in the
``task.yaml`` file by replacing the path to the executable
file.

**To replace a task:**

#. Log in to Fuel CLI:
#. Open the ``task.yaml`` file for editing.
#. Replace the path to the path to the executable file:

   .. code-block:: console

      - id: netconfig
        type: puppet
        groups: [primary-controller, controller, cinder, compute, ceph-osd,
        zabbix-server, primary-mongo, mongo]
        required_for: [deploy_end]
        requires: [logging]
        parameters:
            # old puppet manifest
            # puppet_manifest: /etc/puppet/modules/osnailyfacter/netconfig.pp

            puppet manifest:
            /etc/puppet/modules/osnailyfacter/custom_network_configuration.pp
            puppet_modules: /etc/puppet/modules
            timeout: 3600

#. Synchronize deployment tasks:

   .. code-block:: console

      fuel rel --sync-deployment-tasks --dir <path-to-puppet-manifest>

   **Example:**

   .. code-block:: console

      fuel rel --sync-deployment-tasks --dir /etc/puppet/mitaka-9.0/
