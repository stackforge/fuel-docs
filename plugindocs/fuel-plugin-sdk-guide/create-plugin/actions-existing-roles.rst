
.. _actions-existing-roles:

Actions for existing roles 
--------------------------

The ``deployment_tasks.yaml`` file contains tasks that define actions.
The tasks that define actions execute on the existing roles.

Basic syntax for a task definition:

.. code-block:: ini

   type: <type of task>
    groups: [<one or more of existing roles>]
    required_for: [<the list of tasks, which requires this one>]
    requires: [<the list of tasks, which a required for this one>]
    parameters:
     <parameter name>: <parameter value>

.. note:: You can represent the lists in the full form or the abbreviated
          form:

          * Full:

            .. code-block:: ini

               keyword: 
                - value1
                - value2
                - value3

          * Abbreviated:

            .. code-block:: ini

               keyword: [ value1, value2, value3 ]

**Examples**

We will provide examples of tasks that define actions. We will also provide
examples of how to test the tasks.

We will list possible keyword values for reference.

Prerequisites

* A deployed Fuel environment with one controller node and one compute node.
* A plugin enabled in the environment settings.

You can make live changes to the plugin's deployment tasks, as this is much
faster to test the changes this way rather than do the full environment
reinstallation for every task change. 

.. tip:: Here is how plugin live update works. When a plugin is installed,
         its files are in the directory
         ``/var/www/nailgun/plugins/<plugin name>`` on the Fuel Master node:
         ``plugin root directory`` or ``plugin root``; the definitions of tasks
         are in the Nailgun database.

         To quickly change and debug the plugin tasks, edit the files in
         the ``/var/www/nailgun/plugins/<plugin name>`` directory without
         rebuilding and reinstalling the plugin. Then synchronise the Nailgun
         database content with the filesystem with the command
         :command:`fuel plugins --sync`.

         You can also update the plugin from one version to a newer one with
         the command
         :command:`fuel plugins --update <rpm package for a new version of the plugin>`.
         In this case you also need to run :command:`fuel plugins --sync`
         after that.

         You can also download all task definitions, including the core and
         plugins tasks, for the environment with the command
         :command:`fuel env --env <env-id> --deployment-tasks --download`
         and verify that your plugin's tasks are present by searching for
         the task IDs.

         You can also change the tasks inside this file directly and then
         upload it. This way you can change and debug the already existing
         core tasks on the Fuel Master node in ``/etc/puppet/modules``,
         not related to your plugin, but this is outside of the scope of this
         guide.

To make it simple, we will delete the automatically generated ``tasks.yaml``
and ``deployment_tasks.yaml`` files. We will create a new
``deployment_tasks.yaml`` from scratch.

Add a task to execute shell commands:

.. code-block:: ini

   - id: fuel-plugin-example-iotop
     type: shell
     role: '*'
     requires: [post_deployment_start]
     required_for: [post_deployment_end]
     parameters:
     cmd: apt install iotop && echo `date` ' iotop installed' >>
     /tmp/post_deployment || echo `date` ' failed to install iotop'
     >> /tmp/post_deployment

Then sync the plugin tasks, execute the newly defined one, and verify the results:

.. code-block:: console

   # fuel plugins --sync
   # fuel node  --node 1,2 --tasks fuel-plugin-example-iotop
   # ssh node-1 "cat  /tmp/post_deployment;  iotop --version"
   Fri May 20 12:48:08 UTC 2016  iotop installed
   iotop 0.6

.. note:: In the snippet above, the values for the node IDs and the node
          name are just examples and they may differ from the ones in your
          installation. To find the correct values, use the command
          ``fuel nodes``.

The task in the example executes the shell commands listed in the parameter
``cmd``: the task installs the package iotop on all the nodes in the
environment; or, in our test, in the subset listed after the key '--node'.
Pay attention to the parameters ``requires`` and ``required_for``: they define
when exactly during installation the task will run and are required for the
task execution. The task will usually run in the post-deployment stage, but in
our example we forced it to run alone. After the task execution, you can use
the command :command:`iotop` to monitor the I/O on the environment nodes.

.. note:: If you receive the error message ``400 Client Error: Bad Request
          (Problem with loading YAML file /var/www/nailgun/plugins/
          fuel-plugin-example-1.0/deployment_tasks.yaml)``, verify the syntax
          of ``deployment_tasks.yaml``. 

          The error ``400 Client Error: Bad Request (Tasks fuel-plugin-example
          -iotop are not present in deployment graph)`` means that your tasks
          failed to synchronise with the Nailgun database or that your plugin
          is not enabled for the environment with the nodes that you specified.

          If other issues, check the Astute log on the Fuel Master node at
          ``/var/log/docker-logs/astute/astute.log``. Alternatively, check
          the :guilabel:`Logs` tab in the Fuel web UI.

In our example, we used the asterisk '*' as the value for the keyword
``role``. To run the tasks only on particular roles, but not the others,
replace the value with the list of roles on which to run; for example:

.. code-block:: ini

   role: [ primary-controller, controller, compute] 

.. note:: Use the list even if your task needs to run on only one role;
          for example ``role: [compute]``. This will not work:
          ``role: compute``.

.. note:: The roles ``primary-controller`` and ``controller`` are not the
          same. The ``controller`` role does not include the
          ``primary-controller`` role, so they should be specified explicitly.

.. note:: While you can run tasks on particular roles, you cannot run tasks on
          all roles except a particular role. For example, there is option
          to run tasks on all roles except for a compute role.

Our example task with the commands listed in the cmd parameter is not suitable
for more than two shell commands; but we always can put the commands in
a shell script and call the script instead:

.. code-block:: ini

   parameters:
    cmd: bash install_iotop.sh

Put the script ``install_iotop.sh`` in the subdirectory ``deployment_scripts``
in ``plugin root``. If you run the plugin task, the result will be the same as
in the previous case, when we defined all the commands in
``deployment_tasks.yaml``. 

The mechanism behind this is as follows. Before the plugin task runs, all the
files inside the ``plugin root`` are synced by rsync protocol to the directory
``/etc/fuel/plugins/<plugin name>`` on target nodes. This directory is set as
the default working directory for plugin tasks -- although you can override it
by specifying the explicit ``cwd`` parameter for the task, so the command
:command:`bash install_iotop.sh` will run the script from it.

Considering that deployment scripts are copied to target nodes before any of
the tasks run, you can skip the step for syncing tasks if you only change the
contents of the deployment scripts in the process of debugging and run the
tasks directly after the changes.

You can use any script language or executable as long as they can be called
from shell, but Puppet is the most common tool to write Fuel plugins and there
is support for Puppet tasks.

Let us rewrite the same task using Puppet manifests.

``deployment_tasks.yaml``:

.. code-block:: ini

   - id: fuel-plugin-example-iotop
     type: puppet
     role: '*'
     requires: [post_deployment_start]
     required_for: [post_deployment_end]
     parameters:
      puppet_manifest: puppet/manifests/install_iotop.pp
      puppet_modules: puppet/modules:/etc/puppet/modules

``deployment_scripts/puppet/manifests/install_iotop.pp``:

.. code-block:: ini

   notice('MODULAR: fuel-plugin-example/iotop')

   package { 'iotop':
     ensure => 'installed',
   }

.. note:: All plugin tasks must be idempotent: each plugin task must be able
          to run multiple times without changing the results. Puppet manifests
          have an inherent advantage of idempotency and this is one of the
          reasons to use Puppet for plugin tasks.

We changed the ``type`` attribute of the deployment task to ``puppet`` and
replaced the ``cmd`` parameter with the two Puppet specific ones:
``puppet_manifest`` and ``puppet_modules``. If you are familiar with Puppet,
these parameters are self-explanatory. The values of the parameters are path
specifications relative to the ``deployment_scripts`` directory in
``plugin root``. Follow the standard Puppet conventions and keep Puppet
manifests in modules in separate subdirectories. In our example we are using
no modules, but in any other not so trivial case it is good to keep the code
modular. The parameter ``puppet_modules`` is required.

.. note:: Pay attention to the first line of our Puppet manifest:

          .. code-block:: ini

             notice('MODULAR: fuel-plugin-example/iotop')

          This is a convention to start any of your Puppet tasks in a plugin
          with the notice statement that starts with a substring ``MODULAR:``
          followed by the name of the plugin and the name of the task itself.
          This output is in the Puppet logs. You can find the output in the
          :guilabel:`Logs`of the Fuel web UI, at ``/var/log/puppet.log`` on
          the Fuel target node, or at
          ``/var/log/remote/<target node IP>//puppet-apply.log``. This
          convention is very helpful for debugging.

**Related links**

See also `Deployment Tasks on Fuel Wiki <https://wiki.openstack.org/wiki/Fuel/Plugins#deployment_tasks.yaml>`_.

.. toctree::
   :maxdepth: 3

   actions-existing-roles/deployment-stages.rst
   actions-existing-roles/skip-core-tasks.rst
