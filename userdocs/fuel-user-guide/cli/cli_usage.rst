
.. _cli_usage:

Basic usage
-----------

Fuel CLI has the following usage pattern:

::

  fuel [global optional args] <namespace> [action] <optional args>

*Example*::

  fuel --env-id=1 node set --node-id=1,4,5 --role=controller

where ``--env-id=1`` is a global optional argument pointing to the specific
environment, ``node`` - is a namespace for all node control functions, ``set``
is an action that assigns specific nodes to some environments in certain roles.

To get the list of all global optional arguments and namespaces, run:
::

  fuel --help

To get the list of actions and optional arguments for a namespace, run:
::

  fuel <namespace> --help

Release
+++++++

Get list of all available releases:

::

  fuel release

or short version

::

  fuel rel

for specific release

::

  fuel rel --rel <release_number>

Version
+++++++

To get all the details on the Fuel environment installed, run the
following command::

 fuel fuel-version

.. warning::
   The argument ``--fuel-version`` will be deprecated since the Fuel
   7.0 release. Please use :command:`fuel-version` command instead.

Networks configuration
++++++++++++++++++++++

Download a network configuration for a specific environment:

.. code-block:: console

   fuel --env <ENV_ID> network --download --dir <PATH>

where:

* ``<ENV_ID>`` - an environment ID
* ``<PATH>`` - a path to directory

For example, download the network configuration for
the environment with ID ``1`` to the current directory:

.. code-block:: console

   fuel --env 1 network --download

Upload a network configuration for a specific environment:

.. code-block:: console

   fuel --env <ENV_ID> network --upload --dir <PATH>

For example, upload the network configuration for
the environment with ID ``1`` from the current directory:

.. code-block:: console

   fuel --env 1 network --upload

.. note::

   The :command:`fuel network` command can update a configuration
   for all networks in an environment and Neutron parameters,
   but it does not update VIPs and network templates. You have to
   update VIPs and network templates additionally using
   corresponding Fuel CLI commands.

Verify a network configuration for a specific environment:

.. code-block:: console

   fuel --env <ENV_ID> network --verify --dir <PATH>

For example, verify the network configuration for
the environment with ID ``1`` from the current directory:

.. code-block:: console

   fuel --env 1 network --verify

.. note::

   Verification does not work for multiple cluster networks, when
   an environment has more than one node group.


To see interaction with Nailgun API, run the commands with
the :option:`--debug` option:

.. code-block:: console

   fuel --env <ENV_ID> network --download --dir <PATH> --debug
   fuel --env <ENV_ID> network --upload --dir <PATH> --debug
   fuel --env <ENV_ID> network --verify --dir <PATH> --debug


Environment
+++++++++++

To list environments:

::

  fuel env

To create an environment, run the following command using
``--name`` and ``--rel`` (release) options:

::

  fuel env create --name <env_name> --rel <release_number>


By default it creates environment in ``multinode`` mode, and ``nova`` network mode.
To specify other modes, you can add optional arguments; for example:

::

  fuel env create --name <env_name> --rel <release_number> \
  --mode ha --network-mode neutron --net-segment-type vlan


Use the ``set`` action to change the name, mode, or network mode for the environment; for example:

::

  fuel --env <env_id> env set --name <NewEmvName> --mode ha_compact

To delete the environment:

::

  fuel --env <env_id> env delete

To update the OpenStack environment to a newer version
(available since Fuel 5.1):

::

  fuel env --update --env <env_id> --rel <release_number>

To roll back a failed update,
use this same command but modify the release ID.


Node
++++

To list all available nodes run:

::

  fuel node list

and filter them by environment:

::

  fuel --env-id <env_id> node list

Assign some nodes to environment with with specific roles

::

  fuel node set --node <node_id> --role controller --env <env_id>
  fuel node set --node <node1_id>,<node2_id>,<node3_id> \
  --role compute,cinder --env <env_id>

Remove some nodes from environment

::

  fuel node remove --node <node1_id>,<node2_id> --env <env_id>

Also you can do it without ``--env`` or ``--node`` to remove some nodes without knowing their environment and remove all nodes of some environment respectively.

::

  fuel node remove --node <node1_id>,<node2_id>
  fuel node remove --env <env_id>

.. _remove-inv:

Delete nodes from Fuel DB.

* Remove offline nodes:

  ::

            fuel node --node-id <id> --delete-from-db
            fuel node --node-id <id1> <id2> --delete-from-db

* Remove nodes with any status (``--force`` option forces deletion
  of nodes regardless of their state):

  ::

            fuel node --node-id <id> --delete-from-db --force


.. _fuel-cli-node-group:

Node group
++++++++++

To list all available node groups:

::

  fuel nodegroup

and filter them by environment:

::

  fuel --env <env_id> nodegroup

Create a new node group

::

  fuel --env <env_id> nodegroup --create --name "group 1"

Delete the specified node groups

::

  fuel --env <env_id> nodegroup --delete --group <group_id>
  fuel --env <env_id> nodegroup --delete --group <group1_id>,<group2_id>,<group3_id>

Assign nodes to the specified node group:

::

  fuel --env <env_id> nodegroup --assign --node <node_id> --group <group_id>
  fuel --env <env_id> nodegroup --assign --node <node1_id>,<node2_id>,<node3_id> --group <group_id>

.. _network_template_operations:

Network Template
++++++++++++++++

To upload a network template, run the following
command on the Fuel Master node:

.. code-block:: console

   fuel --env <ENV_ID> network-template --upload --dir <PATH>

where:

* ``<ENV_ID>`` - an ID of your OpenStack environment that you
  can get by running the :command:`fuel environment` command
* ``<PATH>`` - a path to a directory where your template is located

For example:

.. code-block:: console

   fuel --env 1 network-template --upload --dir /home/stack/

Download a network template to the current directory:

.. code-block:: console

   fuel --env <ENV_ID> network-template --download

For example:

.. code-block:: console

   fuel --env 1 network-template --download

Delete an existing network template:

.. code-block:: console

   fuel --env <ENV_ID> network-template --delete

For example:

.. code-block:: console

   fuel --env 1 network-template --delete


.. _network_group_operations:

Network Group
+++++++++++++

List all available network groups:

.. code-block:: console

   fuel network-group

List network groups in a particular node group:

.. code-block:: console

   fuel network-group --node-group <GROUP_ID>

For example:

.. code-block:: console

   fuel network-group --node-group 1

Create a new network group:

.. code-block:: console

   fuel network-group --create --node-group <NODE_GROUP_ID> --name <NAME> \
        --release <RELEASE_ID> --vlan <VLAN_ID> --cidr <CIDR> --gateway <GATEWAY_IP> \
        --meta <META_INFO>

where:

* ``<NODE_GROUP_ID>`` - an ID of a node group
* ``<NAME>`` - a name of a new network group
* ``<RELEASE_ID>`` - a release ID this network group belongs to
* ``<VLAN_ID>`` - a VLAN of a network
* ``<CIDR>`` - a CIDR of a network
* ``<GATEWAY_IP>`` - a gateway of a network
* ``<META_INFO>`` - meta information in JSON format

For example:

.. code-block:: console

   fuel network-group --create --node-group 1 --name "new network" \
                --release 2 --vlan 100 --cidr 10.0.0.0/24

   fuel network-group --create --node-group 2 --name "new network" \
               --release 2 --vlan 100 --cidr 10.0.0.0/24 --gateway 10.0.0.1 \
               --meta 'meta information in JSON format'

Set parameters for the specified network group:

.. code-block:: console

   fuel network-group --set --network <ID> --<PARAMETER> <NEW_VALUE>

where:

* ``<ID>`` - an ID of a network group
* ``<PARAMETER>`` - a parameter you want to set or update.
  See the ``fuel network-group --create`` command for the
  list of parameters.
* ``<NEW_VALUE>`` - a new value for the specified parameter

For example:

.. code-block:: console

   fuel network-group --set --network 1 --name new_name

Delete network groups:

.. code-block:: console

   fuel network-group --delete --network <GROUP_ID>

For example:

.. code-block:: console

   fuel network-group --delete --network 1

You can also delete multiple groups:

.. code-block:: console

   fuel network-group --delete --network 2,3,4


.. _vip-operations:

Virtual IP
++++++++++

Download a virtual IP (VIP) configuration for a specific environment to a specified file:

.. code-block:: console

   fuel --env <ENV_ID> vip --download --file <FILE_NAME>

where:

* ``<ENV_ID>`` - an environment ID
* ``<FILE_NAME>`` - a name of the ``yaml`` file where to save a VIP configuration (optional)

For example:

.. code-block:: console

   fuel --env 1 vip --download --file vip.yaml

Upload a VIP configuration for a specific environment from a specified file:

.. code-block:: console

   fuel --env <ENV_ID> vip --upload --file <FILE>

For example:

.. code-block:: console

   fuel --env 1 vip --upload --file vip.yaml



.. _roles-operations:

Roles operations
++++++++++++++++

CLI basically implements standard CRUD for operating on a role.

* List a role:

  ::

       fuel role --rel 2

        name          | id
        --------------|---
        controller    | 9
        compute       | 10
        cinder        | 11
        cinder-vmware | 12
        ceph-osd      | 13
        mongo         | 14
        zabbix-server | 15
        base-os       | 16


* Create a new role.

  - In this example,
    we first create a swift role in ``swift.yaml``:

    ::

         meta:
           description: Installs swift server.
           has_primary: true # we need primary-swift and swift during orchestration
           name: Swift
         name: swift
         volumes_roles_mapping:
           - allocate_size: min
             id: os

  - Then use ``--create`` flag to proceed. When created,
    you can start using a new role for your own tasks:

    ::

         fuel role --rel <2> --create --file <swift.yaml>

         fuel role --rel <2>

         name          | id
        --------
         swift         | 17


* Update role data:

  ::

       fuel role --rel <2> --update --file <swift.yaml>

* Delete the role:

  ::

      fuel role --rel <2> --delete --role <swift>


.. _fuel-cli-config:

Configuring
+++++++++++

Configuration of the environment or some node
is universal and done in three stages:

1. Download current or default configuration. Works for 
(``network``, ``settings``, ``node --disk``, ``node --network``). 
Operations with ``deployment`` and ``provisioning`` can be node 
specific. (e.g. ``fuel --env 1 deployment --node-id=1,2``)
   
*Example*::

   fuel --env 1 network download
   fuel --env 1 settings download
   fuel --env 1 deployment default
   fuel --env 1 provisioning download
   fuel node --node-id 2 --disk --download

2. Modify the downloaded ``.yaml`` files
   with your favorite text editor.
3. Upload files to Nailgun server

After redeploying your environment with the new configuration,
you should create a new backup
of the Fuel Master node.
You may also want to delete the ``.yaml`` files
since you can easily regenerate them at any time.
Some of the generated ``yaml`` files
contain unencrypted passwords
whose presence on disk may constitute a security threat.

*Example*::

   fuel --env 1 provisioning upload
   fuel node --node-id 2 --disk --upload

.. note::

   To protect yourself when using the Fuel CLI to modify configurations,
   note the following:

   * Back up
     all your configurations before you begin any modifications.
   * If you remove something from a configuration file,
     be sure you do not need it;
     Fuel CLI overwrites the old data with the new
     rather than merging new data with existing data.
   * If you upload any changes for provisioning or deployment operations,
     you freeze the configuration for the entire environment;
     any changes you later make to the networks, cluster settings,
     or disk configurations using the Fuel Web UI are not implemented.
     To modify such parameters,
     you must edit the appropriate section of each node's configuration
     and apply the changes with Fuel CLI.

Deployment
++++++++++

For acronyms meaning,
see :ref:`cli-acronyms`.

You can deploy environment changes with:

::

  fuel --env <env_id> deploy-changes

Also, you can deploy and provision only some nodes like this

::

  fuel node --provision --node <node1_id>,<node2_id>
  fuel node --deploy --node <node1_id>,<node2_id>

.. _cli-fuel-password:

Change and Set Fuel password
++++++++++++++++++++++++++++

You can change the Fuel Master Node password
with either of the following:

::

   fuel user --change-password --new-pass=<new_password>


Note that **change-password** option
can also be used without preceding hyphens.

You can use flags to provide username and password
to other fuel CLI commands:

::

  --user=admin --password=test


.. note: In Release 5.1 and earlier, the **--os-username**
         and ``os-password`` options are used
         rather than ``user`` and ``--change-password``.
         These options are not supported in Releases 5.1.1 and later.

.. _fuel-plugins-cli:

Fuel Plugins CLI
++++++++++++++++

* To install a Fuel plugin:

1. Select from the following options:

* If you install a Fuel plugin from an `.fp` package, type:

  .. code-block:: bash

     fuel plugins --install <fuel-plugin-file>

* If you install a Fuel plugin from an `.rpm` package, select from the
  following options:

  * Using ``yum install``:

    1. Install the Fuel plugin:

    .. code-block:: bash

     yum install <fuel-plugin-file>

    2. Register the plugin in Nailgun:

    .. code-block:: bash

     fuel plugins --register <fuel-plugin-name>==<fuel-plugin-version>

  * Using the same command you used to install a Fuel plugin from the
    `.fp` package:

    .. code-block:: bash

     fuel plugins --install <fuel-plugin-file>

2. View the list of installed plugins:

   .. code-block:: bash

    fuel plugins --list

    id |    name                   | version  | package_version
    ---|---------------------------|----------|----------------
    1  | <fuel-plugin-name>        | 1.0.0    | 2.0.0


* To remove a plugin, type:

  .. code-block:: bash

    fuel plugins --remove <fuel-plugin-name>==<fuel-plugin-version>


* To upgrade a Fuel RPM plugin, type:

  .. code-block:: bash

    fuel plugins --update <fuel-plugin-file>


  .. note::  Upgradess are *not* supported for:

             * fp plugins

             * major versions of RPM plugins

               For example, you can only upgrade from version 1.0.0 to 1.0.1.


To see the list of all available options, use ``fuel plugins --help`` command.
