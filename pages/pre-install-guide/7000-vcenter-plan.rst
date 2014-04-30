
.. _vcenter-plan:

Preparing for vCenter Integration
=================================

This section summarizes the planning you should do
and other steps that are required
before you attempt to deploy Mirantis OpenStack
with vCenter intergration.

Note the following requirements for your OpenStack environment:

- The network must use the :ref:`nova-network-term` networking topology.

The following tasks are required:

- Deploy a VMware vCenter as discussed in
  [need reference to a VMware site that has complete info]

- Configure appropriate network cards on the Fuel Master node:
  [Is this for the entire Mirantis OpenStack environment or just
  the NICs that communicate with vCenter?]

  - A `vlance` (old AMD) network card is recommended;
    these work with all version of vCenter.
  - An `e1000` network card works with most enterprise vCenters.

  To determine which network card is configured,
  open the .VMX file on each server and check for
  one of the following settings:

::

    ethernetXXX.virtualDev=`vlance`
    or
    ethernetXXX.virtualDev=`e1000`

- Allow promiscuous mode for each network card.
  The following string should appear in the .VMX file:

::

    ethernetXXX.noPromisc = "false"

- PXE boot must not be turned off for any card that uses the vCenter driver;
  the following string in the VMX file is correct:

::

  vlance.noOprom = "false"

- If you use ESXi/vSphere with vSwitch as the networking solution:

  - Create a separate port group or separate vSwitch instance
    with the port group for each virtual network.

  - Allow promiscuous mode for each port group.

  Note that some kinds of multicast/broadcast traffic
  does not go outside the port group,
  so always use port groups for Neutron.

vSwitch does not support native VLAN for Trunk ports
and removes all VLAN tags from traffic
that goes through Access ports.
So you cannot mix VAN tagged and untagged traffic;
you must create different port groups for Trunk and Access ports.

VMware vCenter can be deployed on Mirantis OpenStack
with or without high-availability (HA) configured.
Note, however, that the vCenter services only run on one Compute node,
even if that Compute node is replicated to provide HA.

For background information about how vCenter support
is integrated into Mirantis OpenStack, see :ref:`vcenter-arch`.

Follow the instructions in :ref:`vcenter-deploy`
to deploy your Mirantis OpenStack environment
with vCenter support.

The following blog contains useful suggestions
`Deploying OpenStack on vSphere with Fuel <http://vbyron.com/blog/deploy-openstack-on-vsphere-with-fuel/>`_.
