
Mutiple L2 networks can be supported in one logical network
-----------------------------------------------------------

Multiple L2 network domains can be supported in one environment. This allows
cloud operators to use the `leaf and spine
<http://searchdatacenter.techtarget.com/feature/Data-center-network-design-moves-from-tree-to-leaf>`_
network topology in OpenStack deployments. The previous architecture that uses
a single L2 domain for each logical network is still fully supported.
Configuration of multiple L2 networks requires use of :ref:`Fuel
CLI<cli_usage>` commands, and is not fully covered in Fuel UI screens. See the
`Support multiple networks per cluster
<https://blueprints.launchpad.net/fuel/+spec/multiple-cluster-networks>`_
blueprint for implementation details.

