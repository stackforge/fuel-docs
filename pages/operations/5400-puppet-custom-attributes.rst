.. raw:: pdf

   PageBreak

.. _yaml-config-ops:

Using YAML configuration files
==============================

.. contents :local:

Fuel uses `YAML <http://www.yaml.org/>`_ files
to pass configuration attributes
to :ref:`puppet<puppet-term>`

Passing custom attributes are useful
when you have some Puppet manifests that should be run
but are not supported by Fuel itself.

.. warning::  Be very careful when modifying the configuration files.
   A simple typo when editing these files
   may severely damage your environment.

   When you modify the YAML files,
   you will receive a warning
   that some attributes were modified from the outside.
   Some features may become inaccessible
   from the  UI after you do this.

To do this:

#. Create an environment following the instructions in :ref:`create-env-ug`.

#. Assign roles to nodes following the instructions in :ref:`assign-roles-ug`
   but do not start deployment yet.

#. Log into the Fuel Master node
   and dump provisioning using this
   :ref:`fuel CLI<fuel-cli-config>` command::
   ::

       fuel --env 1 provisioning default

   where ``--env 1`` is a global optional argument
   that points to the specific environment.

   To dump deployment information, the command is:
   ::

       fuel --env 1 deployment default

   For a full list of configuration types that can be dumped,
   see the :ref:`fuel CLI<fuel-cli-config>` section.


   These commands create a directories called
   *provisioning_1* or *deployment_1*,
   which include a number of YAML files
   that correspond to roles
   that are currently assigned to nodes.
   Each file includes parameters for current role,
   so you can freely modify and save them.

Customizing Passwords
---------------------

A few service passwords are not managed
by the :ref:`keystone-term` based
:ref:`access control<fuel-passwd-ops>` facility
that was introduced in Fuel 5.1.
You may want to set your own passwords in some cases.

You can edit files and modify password values.
For example, you can set the MySQL root password in this block::

    "mysql": {
        "root_password": "mynewpassword"
    },

Adding new modules
------------------

You can extend Fuel functionality by adding new Puppet modules.
You can do this either by adding them to the */etc/puppet/modules* file
on the Fuel Master node,
or you can edit existing modules
to change the deployment behavior in some way.

As an example, let's add a new module called *'packages'*
that installs some useful packages from the repository
that is located on the Master node.

The module should have the following structure::

	packages/
	packages/manifests
	packages/manifests/init.pp

**init.pp** should have this content::

	class profile {
		$tools = $::fuel_settings['tools']
		package { $tools :
	    	ensure => installed,
	   	}
	}

To implement this module:

#. Copy this module to the */etc/puppet/modules* directory
   on the Master node.


#. Add 'include profile' to the end of
   the */etc/puppet/manifests/site.pp* file to enable this module.

#. As you can see, there is list of packages to install
   that should be passed through the Fuel parameters system.

   Let's add this attribute to the downloaded file’s top level hash::

   	“tools”: [
     		“htop”,
     		“tmux”,
   	]

   Provisioned nodes will have this addition in their parameters
   and our 'profile' module will be able to access their values
   and install the given list of packages during node deployment.

#. Upload the modified configuration::

        fuel --env 1 deployment upload

   You can also use the ``--dir`` option
   to set a directory from which to load the parameters.

#. Start the deployment process as usual.

This operation has following effects:
	
* Parameters that are about to be sent to the orchestrator
  are replaced completely with the ones you specified.
* The cluster sets the *is_customized* flag,
  which is checked by the UI
  so you will get a message about attributes customization.


