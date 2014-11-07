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

  fuel rel --rel 1


Environment
+++++++++++

To list environments:

::

  fuel env

To create an environment, run:

::

  fuel env create --name MyEnv --rel 1 

by default it creates environment in ``multinode`` mode, and ``nova`` network mode, to specify other modes you can add optional arguments

::

  fuel env create --name MyEnv --rel 1 --mode ha --network-mode neutron

For changing environments name, mode or network mode exists ``set`` action

::

  fuel --env 1 env set --name NewEmvName --mode ha_compact

To delete the environment:

::

  fuel --env 1 env delete

To update the Mirantis OpenStack environment to a newer version
(available since Fuel 5.1):

::

  fuel env --update --env 1 --rel 42

To roll back a failed update,
use this same command but modify the release ID.


Node
++++

To list all available nodes run:

::

  fuel node list

and filter them by environment

::

  fuel --env-id 1 node list

Assign some nodes to environment with with specific roles

::

  fuel node set --node 1 --role controller --env 1
  fuel node set --node 2,3,4 --role compute,cinder --env 1

Remove some nodes from environment

::

  fuel node remove --node 2,3 --env 1

Also you can do it without ``--env`` or ``--node`` to remove some nodes without knowing their environment and remove all nodes of some environment respectively.

::

  fuel node remove --node 2,3
  fuel node remove --env 1

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

   To protect yourself from sudden errors, please follow these simple rules:

   * Back up all of your configuration before you begin any modifications.
   * If you remove something from a configuration file, be sure you don't need
     it. Fuel CLI doesn't merge new data with the existing - it will overwrite
     the old data with the new.
   * Keep in mind that if you upload any changes in provisioning or deployment
     operations, you will freeze the entire environment configuration - any changes
     with networks, cluster settings, or disk configurations won't take effect.
     In order to modify such parameters, you will need to change the appropriate
     section of each node configuration.


Deployment
++++++++++

You can deploy environment changes with:

::

  fuel --env 1 deploy-changes

Also, you can deploy and provision only some nodes like this

::

  fuel --env 1 node --provision --node 1,2
  fuel --env 1 node --deploy --node 1,2

.. _cli-fuel-password:

Change and Set Fuel password
++++++++++++++++++++++++++++

You can change the Fuel Master Node password with:

::

   fuel user --change-password --new-pass=*new*

You can use flags to provide username and password
to other fuel CLI commands:

::

  --os-username=admin --os-password=test

You can set the Fuel Master Node password
when upgrading from a earlier release
with the following command:

::

  fuel --password <password>

If you do not do this before running the **upgrade.sh** script,
you will be prompted to supply the password.

See :ref:`fuel-passwd-ops` for more information
about Fuel authentication.

