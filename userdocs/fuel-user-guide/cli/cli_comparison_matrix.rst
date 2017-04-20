.. _cli_comparison_matrix:

===================================
Fuel CLI commands comparison matrix
===================================

The Fuel command-line interface has been changed to simplify usage
and improve user experience. Some of the keys and options have been modified
as well. Although the old ``fuel`` commands are still available, we recommend that
you use the new ``fuel2`` commands instead. The following table describes
new ``fuel2`` commands and their alternatives in the ``fuel`` CLI.

.. csv-table:: **Fuel CLI commands comparison matrix**
   :header: Command in ``fuel2`` CLI, Description, Alternative in ``fuel`` CLI
   :widths: 8, 7, 7

   ``fuel2 complete``, Print the completion of a command in CLI, None
   ``fuel2 help``, Print a detailed help for all commands, ``fuel <cmd> --help``
   ``fuel2 env add nodes``, Add nodes to an environment with specified roles, ``fuel node --set``
   ``fuel2 env create``, Create an environment with given attributes, ``fuel env --create``
   ``fuel2 env delete``, Delete an environment with a given ID, ``fuel env --delete``
   ``fuel2 env deploy``, Deploy changes on a specified environment, ``fuel deploy-changes``
   ``fuel2 env deployment-facts delete``, Delete current deployment facts, ``fuel deployment --delete``
   ``fuel2 env deployment-facts download``, Download the user-defined deployment facts, ``fuel deployment --download``
   ``fuel2 env deployment-facts get-default``, Download the default deployment facts, ``fuel deployment --default``
   ``fuel2 env deployment-facts upload``, Upload deployment facts, ``fuel deployment --upload``
   ``fuel2 env extension disable``, Disable specified extensions for an environment with a given ID, None
   ``fuel2 env extension enable``, Enable specified extensions for an environment with a given ID, None
   ``fuel2 env extension list``, Show a list of all available extensions, None
   ``fuel2 env extension show``, Show a list of enabled extensions for an environment with a given ID, None
   ``fuel2 env list``, Show a list of all available environments, ``fuel env``
   ``fuel2 env network download``, Download and store network configuration of an environment, ``fuel network --download``
   ``fuel2 env network upload``, Upload network configuration and apply it to an environment, ``fuel network --upload``
   ``fuel2 env network verify``, Run network verification for a specified environment, ``fuel network --verify``
   ``fuel2 env nodes deploy``, Deploy specified nodes for a specified environment, ``fuel node --deploy``
   ``fuel2 env nodes provision``, Provision specified nodes for a specified environment, ``fuel node --provision``
   ``fuel2 env provisioning-facts delete``, Delete current provisioning facts, ``fuel provisioning --delete``
   ``fuel2 env provisioning-facts download``, Download the user-defined provisioning facts, ``fuel provisioning --download``
   ``fuel2 env provisioning-facts get-default``, Download the default provisioning facts, ``fuel provisioning --default``
   ``fuel2 env provisioning-facts upload``, Upload provisioning facts, ``fuel provisioning --upload``
   ``fuel2 env redeploy``, Redeploy changes on a specified environment, ``fuel redeploy-changes``
   ``fuel2 env remove nodes``, Remove nodes from an environment, ``fuel node remove``
   ``fuel2 env reset``, Reset a deployed environment, ``fuel reset``
   ``fuel2 env settings download``, Download and store an environment settings, ``fuel settings --download``
   ``fuel2 env settings upload``, Upload and apply an environment settings, ``fuel settings --upload``
   ``fuel2 env show``, Show information about environment with a given ID, None
   ``fuel2 env spawn-vms``, Provision a specified environment, None
   ``fuel2 env stop-deployment``, Stop deployment process for a specific environment, ``fuel stop``
   ``fuel2 env update``, Change given attributes for an environment, ``fuel env --set``
   ``fuel2 fuel-version``, Show the current version of Fuel, ``fuel --fuel-version``
   ``fuel2 graph delete``, Delete a deployment graph, None
   ``fuel2 graph download``, Download a deployment graph configuration, ``fuel env --deployment-tasks --download``
   ``fuel2 graph execute``, Start a deployment with a given graph type, None
   ``fuel2 graph list``, List deployment graphs, None
   ``fuel2 graph upload``, Upload a deployment graph configuration, ``fuel env --deployment-tasks --upload``
   ``fuel2 health list``, List all available test sets for a given environment, ``fuel health --list``
   ``fuel2 health restart``, Restart a test set with a given ID, None
   ``fuel2 health start``, Run specified test sets for a given environment, ``fuel health --check``
   ``fuel2 health status list``, Show a list of statuses of all test sets that have ever been executed, None
   ``fuel2 health status show``, Show status of a test set with a given ID, None
   ``fuel2 health stop``, Stop executing a test set with a given ID, None
   ``fuel2 network-group create``, Create a new network group, ``fuel network-group --create``
   ``fuel2 network-group delete``, Delete a specified network group, ``fuel network-group --delete``
   ``fuel2 network-group list``, List all network groups, ``fuel network-group``
   ``fuel2 network-group show``, Show a specified network group, None
   ``fuel2 network-group update``, Set parameters for a specified network group, ``fuel network-group --set``
   ``fuel2 network-template delete``, Delete the network template of a specified environment, ``fuel network-template --delete``
   ``fuel2 network-template download``, Download the network configuration for a specified environment, ``fuel network-template --download``
   ``fuel2 network-template upload``, Upload the network configuration for a specified environment, ``fuel network-template --upload``
   ``fuel2 node ansible-inventory``, Generate an ansible inventory file based on the nodes list, None
   ``fuel2 node attributes-download``, Download attributes of a specified node, None
   ``fuel2 node attributes-upload``, Upload attributes of a specified node, None
   ``fuel2 node create-vms-conf``, Create the VMs configuration in metadata for a specified node, None
   ``fuel2 node disks download``, Download and store configuration of disks for a node to a file, ``fuel node --disk --download``
   ``fuel2 node disks get-default``, Download the default configuration of disks for a node to a file, ``fuel node --disk --default``
   ``fuel2 node disks upload``, Upload a stored configuration of disks for a node from a file, ``fuel node --disk --upload``
   ``fuel2 node interfaces download``, Download and store a configuration of interfaces for a node to a file, ``fuel node --network --download``
   ``fuel2 node interfaces get-default``, Download the default configuration of interfaces for a node to a file, ``fuel node --network --default``
   ``fuel2 node interfaces upload``, Upload the stored configuration of interfaces for a node from a file, ``fuel node --network --download``
   ``fuel2 node label delete``, Delete specific labels on nodes, None
   ``fuel2 node label list``, Show a list of all labels, None
   ``fuel2 node label set``, Create or update specific labels on nodes, None
   ``fuel2 node list``, Show a list of all available nodes, ``fuel node``
   ``fuel2 node list-vms-conf``, Show a list of VMs for a node, None
   ``fuel2 node show``, Show information about a node with a given ID, None
   ``fuel2 node undiscover``, Remove nodes from a database, ``fuel node --delete-from-db``
   ``fuel2 node update``, Change a node name and/or host name, ``fuel node --name <NEW_NAME>`` and/or ``fuel node --hostname <NEW_HOSTNAME>``
   ``fuel2 openstack-config delete``, Delete an OpenStack configuration with a given ID, ``fuel openstack-config --delete``
   ``fuel2 openstack-config download``, Download a specified OpenStack configuration file, ``fuel openstack-config --download``
   ``fuel2 openstack-config execute``, Execute an OpenStack configuration deployment, ``fuel openstack-config --execute``
   ``fuel2 openstack-config list``, List all OpenStack configurations, ``fuel openstack-config --list``
   ``fuel2 openstack-config upload``, Upload a new OpenStack configuration from file, ``fuel openstack-config --upload``
   ``fuel2 plugins install``, Install a plugin. Provide an installation path after the ``install`` parameter, None
   ``fuel2 plugins list``, Show a list of all available plugins, ``fuel plugins --list``
   ``fuel2 plugins remove``, Remove a plugin. Provide a plugin name and version after the ``remove`` parameter, None
   ``fuel2 plugins sync``, Synchronize plugins on a file system with plugins in the API service, ``fuel plugins --sync``
   ``fuel2 release component list``, Show a list of components for a given release, None
   ``fuel2 release list``, Show a list of all available releases, ``fuel release``
   ``fuel2 release repos list``, Show repositories for a given release, None
   ``fuel2 release repos update``, Update repositories for a given release, None
   ``fuel2 role create``, Create a role from a file description, ``fuel role --rel 1 --create``
   ``fuel2 role delete``, Delete a role from an OpenStack release, ``fuel role --delete``
   ``fuel2 role download``, Download a full role description to a file, ``fuel role --file``
   ``fuel2 role list``, Show a list of all available roles for a release, ``fuel role``
   ``fuel2 role update``, Update a role description from a file, ``fuel role --update``
   ``fuel2 sequence create``, Create a new deployment sequence, None
   ``fuel2 sequence upload``, Upload a new deployment sequence, None
   ``fuel2 sequence download``, Download a deployment sequence data, None
   ``fuel2 sequence delete``, Delete an existing sequence, None
   ``fuel2 sequence update``, Update an existing sequence, None
   ``fuel2 sequence list``, Show a list of all existing sequences, None
   ``fuel2 sequence show``, Display information about a sequence, None
   ``fuel2 sequence execute``, Execute a sequence on a specified environment, None
   ``fuel2 snapshot create``, Generate a diagnostic snapshot, ``fuel snapshot``
   ``fuel2 snapshot create -c/--config``, Generate a diagnostic snapshot with a custom configuration, ``fuel snapshot < config_file.yml``
   ``fuel2 snapshot get-default-config``, Download the default configuration to generate a custom diagnostic snapshot, ``fuel snapshot --conf > config_file.yml``
   ``fuel2 snapshot get-link``, Show the link to download diagnostic snapshot, None
   ``fuel2 task delete``, Delete a task with a given ID, ``fuel task --delete``
   ``fuel2 task deployment-info download``, Save a task deployment information to a file, None
   ``fuel2 task history show``, Show a deployment history about a task with a given ID, None
   ``fuel2 task list``, Show a list of all available tasks, None
   ``fuel2 task network-configuration download``, Save a task network configuration to a file, None
   ``fuel2 task settings download``, Download and save a task settings to a file, None
   ``fuel2 task show``, Show information about a task with a given ID, None
   ``fuel2 vip create``, Create a VIP, ``fuel vip --create``
   ``fuel2 vip download``, Download a configuration of VIPs, ``fuel vip --download``
   ``fuel2 vip upload``, Upload a new configuration of VIPs from a file, ``fuel vip --upload``
