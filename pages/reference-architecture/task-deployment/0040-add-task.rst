.. _0040-add-task:

Additional task for existing role
----------------------------------

Add task description in /etc/puppet/2014.2-6.1/modules/my_tasks.yaml

.. code-block:: yaml

   - id: my_task
     type: puppet
     groups: [compute]
     required_for: [deploy_end]
     requires: [netconfig]
     parameters:
        puppet_manifest: /etc/puppet/modules/my_task.pp
        puppet_modules: /etc/puppet/modules
        timeout: 3600

And run

::

  fuel rel --sync-deployment-tasks --dir /etc/puppet/2014.2-6.1

After syncing task to nailgun database - you will be able to deploy it on
selected groups. In this example it will be deployed after netconfig.