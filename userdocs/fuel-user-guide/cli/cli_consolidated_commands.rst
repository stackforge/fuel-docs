.. _cli_consolidated_commands:

================================================
Consolidated commands for the Fuel CLI v1 and v2 
================================================

.. include:: /userdocs/snippets/notes/deprecated-cli-v1.rst

The following table describes the Fuel commands supported by the consolidated
Fuel CLIs v1 and v2.

.. csv-table:: **Fuel CLI commands description**
   :header: Command, Description, Fuel CLI v1 old alternative
   :widths: 8, 8, 6

   ``complete``, Print the completion of a command in CLI, None
   ``help``, Print a detailed help for all commands, ``fuel <cmd> --help``
   ``env add nodes``, Add nodes to an environment with specified roles, ``fuel node --set``
   ``env create``, Create an environment with given attributes, ``fuel env --create``
   ``env delete``, Delete an environment with a given ID, ``fuel env --delete``
   ``env deploy``, Deploy changes on a specified environment, ``fuel deploy-changes``
   ``env deployment-facts delete``, Delete current deployment facts, ``fuel deployment --delete``
   ``env deployment-facts download``, Download the user-defined deployment facts, ``fuel deployment --download``
   ``env deployment-facts get-default``, Download the default deployment facts, ``fuel deployment --default``
   ``env deployment-facts upload``, Upload deployment facts, ``fuel deployment --upload``
   ``env list``, Show a list of all available environments, ``fuel env``
   ``env network download``, Download and store network configuration of an environment, ``fuel network --download``
   ``env network upload``, Upload network configuration and apply it to an environment, ``fuel network --upload``
   ``env network verify``, Run network verification for a specified environment, ``fuel network --verify``
   ``env nodes deploy``, Deploy specified nodes for a specified environment, ``fuel node --deploy``
   ``env nodes provision``, Provision specified nodes for a specified environment, ``fuel node --provision``
   ``env provisioning-facts delete``, Delete current provisioning facts, ``fuel provisioning --delete``
   ``env provisioning-facts download``, Download the user-defined provisioning facts, ``fuel provisioning --download``
   ``env provisioning-facts get-default``, Download the default provisioning facts, ``fuel provisioning --default``
   ``env provisioning-facts upload``, Upload provisioning facts, ``fuel provisioning --upload``
   ``env redeploy``, Redeploy changes on a specified environment, ``fuel redeploy-changes``
   ``env remove nodes``, Redeploy changes on a specified environment, ``fuel redeploy-changes``
   ``env reset``, Reset a deployed environment, ``fuel reset``
   ``env settings download``, Download and store an environment settings, ``fuel settings --download``
   ``env settings upload``, Upload and apply an environment settings, ``fuel settings --upload``
   ``env show``, Show information about environment with a given ID, None
   ``env spawn-vms``, Provision a specified environment, None
   ``env stop-deployment``, Stop deployment process for a specific environment, ``fuel stop``
   ``env update``, Change given attributes for an environment, ``fuel env --set``
   ``fuel-version``, Show the current version of Fuel, ``fuel --fuel-version``
   ``graph download``, Download a deployment graph configuration, ``fuel graph --download``
   ``graph execute``, Start a deployment with a given graph type, ``fuel graph --execute``
   ``graph list``, List graphs of a deployment, ``fuel graph``
   ``graph upload``, Upload a deployment graph configuration, ``fuel graph --upload``
   ``network-group create``, Create a new network group, ``fuel network-group --create``
   ``network-group delete``, Delete a specified network group, ``fuel network-group --delete``
   ``network-group``, List all network groups, ``fuel network-group``
   ``network-group show``, Show a network group, None
   ``network-group update``, Set parameters for a specified network group, ``fuel network-group --set``
   ``network-template delete``, Delete the network template of a specified environment, ``fuel network-template --delete``
   ``network-template download``, Download the network configuration for a specified environment, ``fuel network-template --download``
   ``network-template upload``, Upload the network configuration for a specified environment, ``fuel network-template --upload``
   ``node ansible-inventory``, Generate an ansible inventory file based on the nodes list, None
   ``node attributes-download``, Download a node attributes, None
   ``node attributes-upload``, Upload a node attributes, None
   ``node create-vms-conf``, Create the VMs configuration in metadata for a specified node, None
   ``node disks download``, Download and store configuration of disks for a node to a file, ``fuel node --disk --download``
   ``node disks get-default``, Download the default configuration of disks for a node to a file, ``fuel node --disk --default``
   ``node disks upload``, Upload a stored configuration of disks for a node from a file, ``fuel node --disk --upload``
   ``node interfaces download``, Download and store a configuration of interfaces for a node to a file, ``fuel node --network --download``
   ``node interfaces get-default``, Download the default configuration of interfaces for a node to a file, ``fuel node --network --default``
   ``node interfaces upload``, Upload the stored configuration of interfaces for a node from a file, ``fuel node --network --download``
   ``node label delete``, Delete specific labels on nodes, None
   ``node label list``, Show a list of all labels, None
   ``node label set``, Create or update specific labels on nodes, None
   ``node list``, Show list of all available nodes, ``fuel node``
   ``node list-vms-conf``, Show a list VMs for a node, None
   ``node show``, Show information about a node with a given ID, None
   ``node undiscover``, Remove nodes from a database, ``fuel node delete-from-db``
   ``node update``, Change given attributes for a node, ``fuel node --set``
   ``openstack-config delete``, Delete an OpenStack configuration with a given ID, ``fuel openstack-config --delete``
   ``openstack-config download``, Download a specified OpenStack configuration file, ``fuel openstack-config --download``
   ``openstack-config execute``, Execute an OpenStack configuration deployment, ``fuel openstack-config --execute``
   ``openstack-config list``, List all OpenStack configurations, ``fuel openstack-config``
   ``openstack-config upload``, Upload a new OpenStack configuration from file, ``fuel openstack-config --upload``
   ``plugins list``, Show a list of all available plugins, ``fuel plugins --list``
   ``plugins sync``, Synchronize plugins on a file system with plugins in the API service, ``fuel plugins --sync``
   ``release component list``, Show a list of components for a given release, None
   ``release list``, Show a list of all available releases, ``fuel release``
   ``release repos list``, Show repositories for a given release, None
   ``release repos update``, Update repositories for a given release, None
   ``role create``, Create a role from a file description, ``fuel role --rel 1 --create``
   ``role delete``, Delete a role from an OpenStack release, ``fuel role --delete``
   ``role download``, Download a full role description to a file, ``fuel role --file``
   ``role list``, Show a list of all available roles for a release, ``fuel role``
   ``role update``, Update a role description from a file, ``fuel role --update``
   ``sequence create``, Create a new deployment sequence, None
   ``sequence upload``, Upload a new deployment sequence, None
   ``sequence download``, Download a deployment sequence data, None
   ``sequence delete``, Delete an existing sequence, None
   ``sequence update``, Update an existing sequence, None
   ``sequence list``, Show a list of all existing sequences, None
   ``sequence show``, Display information about a sequence, None
   ``sequence execute``, Execute a sequence on a specified environment, None
   ``snapshot create``, Generate a diagnostic snapshot, ``fuel snapshot``
   ``snapshot create -c/--config``, Generate a diagnostic snapshot with a custom configuration, ``fuel snapshot < config_file.yml``
   ``snapshot get-default-config``, Download the default configuration to generate a custom diagnostic snapshot, ``fuel snapshot --conf > config_file.yml``
   ``snapshot get-link``, Show the link to download diagnostic snapshot, None
   ``task delete``, Delete a task with a given ID, ``fuel task``
   ``task deployment-info download``, Save a task deployment information to a file, None
   ``task history show``, Show a deployment history about a task with a given ID, None
   ``task list``, Show a list of all available tasks, None
   ``task network-configuration download``, Save a task network configuration to a file, None
   ``task settings download``, Download and save a task settings to a file, None
   ``task show``, Show information about a task with a given ID, None
   ``vip create``, Create a VIP, ``fuel vip --create``
   ``vip download``, Download a configuration of VIPs, ``fuel vip --download``
   ``vip upload``, Upload a new configuration of VIPs from a file, ``fuel vip --upload``
