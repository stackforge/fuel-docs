
.. _neutron-rn:

OpenStack Network Service (Neutron)
===================================

See the OpenStack Release Notes about
`Neutron in Juno
<https://wiki.openstack.org/wiki/ReleaseNotes/Juno#OpenStack_Network_Service_.28Neutron.29>`_.

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

Known Issues in Mirantis OpenStack 5.1
--------------------------------------

Spurious "Critical error" appears in neutron-openvswitch-agent.log
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

A Critical error is logged in the *neutron-openvswitch-agent.log*
on the Compute node.
It does not affect the behavior of Neutron networking
and can be ignored.
This is related to the upstream
`LP1246848 <https://bugs.launchpad.net/nova/+bug/1246848>`_.
* When ovs-agent is started, Critical error appears.
See `LP1347612 <https://bugs.launchpad.net/bugs/1347612>`_.


Known Issues in Mirantis OpenStack 6.0
--------------------------------------

