
.. _Planning-Introduction:

Introduction to Mirantis OpenStack and Fuel
===========================================

OpenStack is an extensible, versatile, and flexible
cloud management platform.
It is a portfolio of cloud infrastructure services –
compute, storage, networking and other core resources —
that are exposed through ReST APIs.
It enables a wide range of control over these services,
both from the perspective of
an Integrated Infrastructure as a Service (IaaS)
controlled by applications
and as a set of tools that enable
automated manipulation of the infrastructure itself.

Mirantis OpenStack is a productized snapshot
of the open source technologies.
It includes Fuel, a graphical web tool
that helps you to quickly deploy your cloud environment.
Fuel includes scripts
that dramatically facilitate and speed up the process of cloud deployment,
without requiring you to completely familiarize yourself
with the intricate processes required
to install the OpenStack environment components.

This guide provides details
to get you started with Mirantis OpenStack and Fuel
on a set of physical servers ("bare-metal installation")
See the :ref:`User Guide<user-guide>` for detailed instructions about
how to download and install Fuel on the Fuel Master Node
and then how to use the Fuel interface
to deploy your OpenStack environment.

Further reading is available in the following documents:

- :ref:`Terminology Reference<terminology-ref>` is an alphabetical listing
  of technologies and concepts
  that serves as both a glossary and a master index
  of information in the Mirantis docs and the open source documentation.
- :ref:`Operations Guide<operations-guide>` gives information about advanced tasks
  required to maintain the OpenStack environment after it is deployed.
  Most of these tasks are done in the shell
  using text editors and command line tools.
- :ref:`Reference Architecture<ref-arch>` provides background information
  about how Mirantis OpenStack and its supporting HA architecture
  is implemented.

You can also run Fuel to deploy a Mirantis OpenStack Environment
on Oracle VirtualBox.
VirtualBox deployment is useful for demonstrations
and is a good way to begin your exploration of the tools and technologies.
It is discussed in :ref:`Running Fuel on VirtualBox<virtualbox>`.
However, it is worth noting that deployments on top of VirtualBox
do not generally meet the performance and robustness requirements
of most production environments.

You can instead install Fuel master node on vSphere
and deploy a Mirantis OpenStack Environment
on either bare-metal or on vSphere.
This is discussed in :ref:`Installing Fuel Master Node on vSphere<fuel-on-vsphere-ug>`.

For community members or partners looking to take Fuel even further,
see the `developer documentation <http://docs.mirantis.com/fuel-dev/develop.html>`_
for information about the internal architecture of Fuel,
instructions for building the project,
information about interacting with the REST API
and other topics of interest to more advanced developers.
You can also visit the `Fuel project <https://launchpad.net/fuel>`_
for more detailed information and become a contributor.
