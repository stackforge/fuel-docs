New Features in Mirantis OpenStack 4.1
======================================

Mirantis OpenStack hardened packages support the latest stable OpenStack Havana maintenance release
---------------------------------------------------------------------------------------------------

The OpenStack core projects in the Mirantis OpenStack hardened packages
support the `OpenStack Havana 2013.2.2 <https://wiki.openstack.org/wiki/ReleaseNotes/2013.2.2>`_ release.
Fuel 4.1 deploys this version of OpenStack on CentOS or Ubuntu.

Deployments can be stopped prior to completion
----------------------------------------------
In Mirantis OpenStack 4.1,
the deployment can be manually stopped prior to completion if necessary.
This is useful when a configuration mistake is recognized
or an unexpected error condition occurs within the environment.
Any incompletely provisioned nodes are returned to their pre-deployment state
and the previously entered configuration screens are unlocked to enable modification.

Environments can be reset to pre-deployment state
-------------------------------------------------
Mirantis OpenStack 4.1 enables you to reset an existing environment
back to its pre-deployment state.
This returns the existing nodes to their pre-deployment bootstrap mode
but keeps them allocated to the environment
and retains the previously entered configuration screens.
The configuration screens are also unlocked so you can make modifications.
This function is useful when an operator wishes to “re-install” an environment but
retain the majority of previously selected configuration parameters.

NIC Bonding is now configurable through the Fuel UI
---------------------------------------------------
Mirantis OpenStack 4.1 allows you to configure NIC Bonding
(also called “link aggregation”) through the Fuel UI
when configuring an environment utilizing Neutron as a network type.
In earlier releases, NIC bonding could only be configured by using the Fuel CLI.
