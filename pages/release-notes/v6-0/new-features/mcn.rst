
Mutiple Cluster Networks are supported
--------------------------------------

Multiple Cluster Networks (MCN) are used for environments
that deploy a large number of target :ref:`nodes<node-term>`,
to avoid the broadcast storms that can occur
when all nodes share a single L2 domain.
This allows cloud operators to use the `leaf and spine
<http://searchdatacenter.techtarget.com/feature/Data-center-network-design-moves-from-tree-to-leaf>`_
network topology in OpenStack deployments.
Multiple Cluster Networks can be configured
for OpenStack environments that use an encapsulation protocol
such as :ref:`Neutron GRE<neutron-gre-ovs-arch>`
and are deployed using Fuel 6.0 and later.

The previous architecture that uses
a single L2 domain for each logical network is still fully supported
and looks the same to the user
although the underlying mechanisms are modified.
Configuring MCN uses :ref:`Fuel CLI<cli_usage>` commands;
see :ref:`mcn-ops` for instructions.
:ref:`mcn-arch` gives background information about MCN internals.
