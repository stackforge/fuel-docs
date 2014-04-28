.. raw:: pdf

   PageBreak

.. index:: Passing Custom Attributes From Fuel To Puppet

Passing Custom Attributes From Fuel To Puppet
=============================================

.. contents :local:

Passing custom attributes can be helpful in case you have some Puppet manifests 
which should be run, but are not supported by Fuel itself.

You can do this at your own risk, and some features might 
become unaccessible from UI after that. Also, there will be a warning 
telling that some attributes were modified from the outside.

First, you should set up an environment as always, assign roles to nodes but don't 
start deployment yet. Now you can dump provisioning after that as JSON using this 
command::

   fuel --env 1 provisioning default

where ``--env 1`` is global optional argument pointing to specific environment.

This command will create a directory called "deployment_1", which will include a 
number of JSON files corresponding to roles, which are currently assigned to nodes. 
Each file includes parameters for current role, so you can freely modify and save 
them.

**Customizing Passwords**: All passwords used in Fuel are automaticly randomly 
generated before deployment. You may want to set your own passwords in some cases. 

You can edit files and modify password values. For 
example we can set MySQL root password in this block::

    "mysql": {
        "root_password": "mynewpassword"
    },

**Adding new modules**: Some people may want to extend Fuel functionality by adding 
new Puppet modules. You can do it by adding them to '/etc/puppet/modules' on master 
node, or you can edit existing modules changing deployment behaviour in some 
way. 

Let’s try to add new module that will install some useful packages from repository, 
which is located on the master node.

In this example, our module will be named *'packages'* and it will have following 
structure::

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

Then we can copy this module to '/etc/puppet/modules' folder on the master node and add 
'include profile' to the end of '/etc/puppet/manifests/site.pp' file to enable this 
module.

As you can see, there is list of packages to install that should be passed through Fuel 
parameters system.

Let's add this attribute to the downloaded file’s top level hash::

	“tools”: [
  		“htop”,
  		“tmux”,
	]

Provisioned nodes will have this addition in their parameters and our 'profile' 
module will be able to access their values and install given list of packages during 
node deployment.

Then we can upload modified configuration and start deployment process as usual::

   fuel --env 1 deployment upload

You can also use ``--dir`` option to set a directory where to load parameters from, 
if it's not default.

This operation has following effects:
	
	* parameters which are about to send to orchestrator are replaced completely with 
	  the ones you specified
	* cluster sets *is_customized* flag, which is checked by UI, so you will get a 
	  message about attributes customization
