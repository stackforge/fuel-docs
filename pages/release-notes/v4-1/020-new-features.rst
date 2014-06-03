New Features in Mirantis OpenStack 4.1.x
========================================

Mirantis OpenStack hardened packages support the latest stable OpenStack Havana maintenance release
---------------------------------------------------------------------------------------------------

The OpenStack core projects in the Mirantis OpenStack hardened packages
support the `OpenStack Havana 2013.2.3 <https://wiki.openstack.org/wiki/ReleaseNotes/2013.2.3>`_ release.
Fuel 4.1.x deploys this version of OpenStack on CentOS or Ubuntu.

Deployments can be stopped prior to completion
----------------------------------------------
In Mirantis OpenStack 4.1.x,
the deployment can be manually stopped prior to completion if necessary.
This is useful when a configuration mistake is recognized
or an unexpected error condition occurs within the environment.
Any incompletely provisioned nodes are returned to their pre-deployment state
and the previously entered configuration screens are unlocked to enable modification.
See
`Stopping Deployment from Web UI <http://docs.mirantis.com/fuel/fuel-4.1/install-guide.html#stopping-deployment-from-web-ui>`_
for more information.

Environments can be reset to pre-deployment state
-------------------------------------------------
Mirantis OpenStack 4.1.x enables you to reset an existing environment
back to its pre-deployment state.
This returns the existing nodes to their pre-deployment bootstrap mode
but keeps them allocated to the environment
and retains the previously entered configuration screens.
The configuration screens are also unlocked so you can make modifications.
This function is useful when an operator wishes to “re-install” an environment but
retain the majority of previously selected configuration parameters.
See
`Resetting environment after deployment <http://docs.mirantis.com/fuel/fuel-4.1/install-guide.html#stopping-deployment-from-web-ui>`_
for more information.

NIC Bonding is now configurable through the Fuel UI
---------------------------------------------------
Mirantis OpenStack 4.1.x allows you to configure NIC Bonding
(also called “link aggregation”) through the Fuel UI
when configuring an environment utilizing Neutron as a network type.
In earlier releases, NIC bonding could only be configured by using the Fuel CLI.
See `NIC Aggregation in UI <http://docs.mirantis.com/fuel/fuel-4.1/reference-architecture.html#nic-aggregation-in-ui>`_
for more information.
