.. _deployment_tasks.yaml:

=====================
deployment_tasks.yaml
=====================

The file ``deployment_tasks.yaml`` is used to define deployment tasks and dependencies between them.

Example:

.. code-block:: ini

  - id: myplugin-keystonedb
    groups: [primary-controller]
    required_for: [keystone]
    requires: [database]
    type: puppet
    parameters:
      puppet_manifest: /etc/puppet/modules/osnailyfacter/modular/keystone/db.pp
      puppet_modules: /etc/puppet/modules
      timeout: 1800


Fields:

``role``

Describes a role of a node where tasks will be executed. Should only be used with pre/post deployment tasks.

``groups``

Describes a group of nodes with the specified role where tasks will be executed and should only be used with the main deployment tasks. 

The task must have either a 'role' or 'group' field, but not both of them at the same time.

``requires``

Specifies the list of tasks needed by the current one. The list of tasks can be obtained by running the command:

.. code-block:: console

  fuel graph --env 1 --download

``required_for``

Specifies the list of tasks for which the current one is needed.

``timeout``

Specifies the execution timeout in seconds. Once it is specified, the deployment will fail if the timeout expires. By default, the timeout is set to 300 seconds.

``type``

Determines a type of the task, should be one of 'shell', 'puppet', 'reboot' or 'group'.

``type: shell``

Task with the type 'shell' will run shell script defined in the parameter 'cmd'.

Example:

.. code-block:: ini

	# This tasks will be applied on controller nodes,
	# here you can also specify several roles, for example
	# ['cinder', 'compute'] will be applied only on
	# cinder and compute nodes
	- id: task-shell-deploy
		role: ['controller']
		type: shell
		parameters:
			cmd: bash deploy.sh
			timeout: 42

	- id: task-shell-deploy
		role: ['cinder','compute'']
		type: shell
		parameters:
			cmd: bash deploy.sh
			timeout: 42

	# Task is applied for all roles
	- id: task-shell-pluginlog
		role: '*'
		type: shell
		parameters:
			cmd: echo all > /tmp/plugin.all
			timeout: 42


``type: puppet``

Task with the type 'puppet' allows you to apply your own Puppet manifests on OpenStack nodes.

Parameters:

* puppet_manifest - manifests directory path (relative to deployment_scripts).
* puppet_modules -  modules directory path (relative to deployment_scripts).

Example:

.. code-block:: ini

	# Deployment will be applied on controllers only
	- role: ['controller']
		type: puppet
		parameters:
			puppet_manifest: puppet/manifests/site.pp
			puppet_modules: puppet/modules
			timeout: 360

``type: reboot``

Task with the type 'reboot' allows you to reboot nodes with the specified roles after the timeout.

Example:

.. code-block:: ini

	- role: '*'
		type: reboot
		parameters:
			timeout: 300

``type: group``

Task with the type 'group' is actually a meta-task. It should contain the field 'tasks' with the llst of tasks to be executed on the specified nodes.

.. code-block:: ini

	- id: standalone-keystone 
		type: group 
		role: [standalone-keystone] 
		requires: [deploy_start, primary-standalone-keystone] 
		required_for: [deploy_end] 
		tasks: [fuel_pkgs, hiera, globals, tools, logging, netconfig, hosts, firewall, deploy_start, cluster, keystone-vip, cluster-haproxy, memcached, openstack-haproxy-stats, task-keystone] 
		parameters: 
			 strategy: 
					type: parallel

When you set up a group of tasks you can also specify how they will be executed: in “parallel” or “one-by-one”. 

``strategy: type``

 * "parallel" - tasks will be executed in parallel
 * "one-by-one" - tasks will be executed one-by-one

Once you choose “parallel” you can specify the maximal number of tasks that can be run in parallel using the “amount” parameter.

.. code-block:: ini

	- id: controller
	 type: group
	 role: [controller]
	 requires: [primary-controller]
	 required_for: [deploy_end]
	 parameters:
		 strategy:
			 type: parallel
			 amount: 6
