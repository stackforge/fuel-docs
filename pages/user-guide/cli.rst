.. raw:: pdf

   PageBreak

.. index:: Understanding Environment deployment with Fuel CLI

.. _cli_usage:

Using Fuel CLI
==============

Introduction
------------

Fuel CLI tool is a powerful tool that allows you to:

* Operate with environments using the text console only.
* Modify directly the internal data that you can't modify via the web UI.
* Avoid data verifications done by the web UI logic.

Fuel CLI may break your environment if not used carefully.

It is necessary to understand that any modifications done using Fuel CLI
take precedence over the settings made from the browser.
Fuel shows a special message to inform you:

.. image:: /_images/fuel-cli-warning.png

.. contents :local:

Basic usage
-----------------------------------------

Fuel CLI has the following usage pattern:

::

  fuel [global optional args] <namespace> [action] <optional args>

*Example*::

  fuel --env-id=1 node set --node-id=1,4,5 --role=controller,compute

where ``--env-id=1`` is a global optional argument pointing to the specific
environment, ``node`` - is a namespace for all node control functions, ``set``
is an action that assigns specific nodes to some environments in certain roles.

for getting list of all global optional args and namespaces you can run:
::

  fuel --help

and for getting actions and optional args for some namespace run:
::

  fuel <namespace> --help

CLI commands reference
----------------------

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

Networks configuration
++++++++++++++++++++++

Download network configuration. This command reads networks from API
and saves them in .yaml format on the file system:

::

  fuel rel --rel <release_number> --network --download

To see interaction with Nailgun API, run the following command with **--debug** option:

::

  fuel rel --rel <release_number> --network --download --debug
  GET http://10.108.80.2:8000/api/v1/releases/1/networks

Modify network configuration.
You may want to modify the networks and upload the configuration back:

::

  fuel rel --rel <release_number> --network --upload


To see interaction with Nailgun API, run the following command with **--debug** option:

::

  fuel rel --rel <release_number> --network --upload --debug
  PUT http://10.108.80.2:8000/api/v1/releases/1/networks data={...}


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

To update the Mirantis OpenStack environment to a newer version
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
  fuel node set --node <node_id>,<node_id>,<node_id> \
  --role compute,cinder --env <env_id>

Remove some nodes from environment

::

  fuel node remove --node <node_id>,<node_id> --env <env_id>

Also you can do it without ``--env`` or ``--node`` to remove some nodes without knowing their environment and remove all nodes of some environment respectively.

::

  fuel node remove --node <node_id>,<node_id>
  fuel node remove --env <env_id>

.. _remove-inv:

Delete nodes from Fuel DB.

* Remove offline nodes:

  ::

            fuel node --node-id <id> --delete-from-db
            fuel node --node-id <id1> <id2> --delete-from-db

* Remove nodes with any status (``--force`` option provides
  deletion for any nodes):

  ::

            fuel node --node-id <id> --delete-from-db --force


.. _fuel-cli-node-group:

Node group
++++++++++

:ref:`Node groups<node-group-term>` are part of the
:ref:`Multiple Cluster Networks<mcn-arch>` feature
that is available for Fuel 6.0 and later.

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
  fuel --env <env_id> nodegroup --delete --group <group_id1>,<group_id2>,<group_id3>

Assign nodes to the specified node group:

::

  fuel --env <env_id> nodegroup --assign --node <node_id> --group <group_id>
  fuel --env <env_id> nodegroup --assign --node <node1_id>,<node2_id>,4 --group <group_id>


.. _fuel-cli-config:

Configuring
+++++++++++

Configuration of the environment or some node
is universal and done in three stages

1. Download current or default configuration. works for (``network``, ``settings``, ``node --disk``, ``node --network``). Operations with ``deployment`` and ``provisioning`` can be node specific. (e.g. ``fuel --env 1 deployment --node-id=1,2``)
   
*Example*::

   fuel --env 1 network download
   fuel --env 1 settings download
   fuel --env 1 deployment default
   fuel --env 1 provisioning download
   fuel node --node-id 2 --disk --download

2. Modify the downloaded :ref:`YAML<yaml-config-ops>` files
   with your favorite text editor.
3. Upload files to nailgun server

After redeploying your environment with the new configuration,
you should create a new :ref:`backup <Backup_and_restore_Fuel_Master>`
of the Fuel Master node.
You may also want to delete the YAML files
since you can easily regenerate them at any time.
Some of the generated YAML files
contain unencrypted passwords
whose presence on disk may constitute a security threat.

*Example*::

   fuel --env 1 provisioning upload
   fuel node --node-id 2 --disk --upload

.. note::

   To protect yourself when using the Fuel CLI to modify configurations,
   note the following:

   * :ref:`Back up<Backup_and_restore_Fuel_Master>`
     all of your configurations before you begin any modifications.
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

You can deploy environment changes with:

::

  fuel --env <env_id> deploy-changes

Also, you can deploy and provision only some nodes like this

::

  fuel --env <env_id> node --provision --node <node1_id>,<node2_id>
  fuel --env <env_id> node --deploy --node <node1_id>,<node2_id>

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

See :ref:`fuel-passwd-ops` for more information
about Fuel authentication.

.. _fuel-plugins-cli:

Fuel Plugins CLI
++++++++++++++++

For summary information on Fuel plugins, see :ref:`Install Fuel plugins <install-plugin>`
section.

* Once a plugin is downloaded and copied
  to the Fuel Master node,
  you can install it with:

  ::

    fuel plugins --install <fuel-plugin-file>

  It is recommended that you install rpm plugins
  using the command above.

  Nevertheless, if you would
  like to do that manually, follow these steps:

  * Run the following command:

    ::

        yum install <fuel-plugin-file>

  * Register the plugin in :ref:`Nailgun<nailgun-term>` with
    *fuel plugins --register <fuel-plugin-name>==<fuel-plugin-version>*
    command.
    You can run *fuel plugins --sync* instead, but
    in this case Fuel Client will update all
    plugins on the file system in Nailgun.

* You can see the list of all installed plugins using:

  ::

     fuel plugins --list


  You should get the following output:

  ::

            fuel plugins --list

         id |    name                  | version  | package_version
        ----|--------------------------|----------|--------
        1   | <fuel-plugin-name>       | 1.0.0    | 2.0.0


* To remove a plugin, run:

  ::

     fuel plugins --remove <fuel-plugin-name>==<fuel-plugin-version>


* To update an rpm plugin, run:

  ::

    fuel plugins --update <fuel-plugin-file>


  .. note::  Updates are *not* supported for fp plugins.

To see the list of all available options, use ``fuel plugins --help`` command.
