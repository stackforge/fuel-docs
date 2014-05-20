
.. _Planning_Introduction:

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
and  as a set of tools that enable
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

You can run Fuel to deploy a Mirantis OpenStack Environment
on VMWare's VirtualBox.
The VirtualBox deployment is useful for demonstrations
and is a good way to begin your exploration of the tools and technologies
and is discussed in <link-to-virtualbox-guide>;
it does not meet the performance and robustness requirements
of most production environments.

This guide is part of a three-document set
with details to get you started with Mirantis OpenStack and Fuel
on a set of physical servers ("bare-metal installation"):

- :ref:`Pre-install_Guide` (this guide) discusses the planning decisions
  required before you install and deploy Mirantis OpenStack.
- :ref:`install-guide` gives instructions for configuring
  the physical servers and the networks that connect them
  and then how to download and install the Fuel Master node.
- :ref:`User_Guide` gives detailed instructions about
  how to use the Fuel graphical screens
  to deploy your OpenStack environment.

Other documents in the set provide addtional information:

- :ref:`terminology` is an alphabetical listing
  of technologies and concepts
  that serves as both a glossary and a master index
  to information in the Mirantis docs and the open source documentation.
- :ref:`operations-guide` gives information about advanced tasks
  required to maintain the OpenStack environment after it is deployed.
  Most of these tasks are done in the shell
  using text editors and command line tools.
- :ref:`ref-arch` provides background information
  about how OpenStack works.

For community members or partners looking to take Fuel even further,
see the `developer documentation <http://docs.mirantis.com/fuel-dev/develop.html>`_
for information about the internal architecture of Fuel,
instructions for building the project,
information about interacting with the REST API
and other topics of interest to more advanced developers.
You can also visit the `Fuel project <https://launchpad.net/fuel>`_
for more detailed information and become a contributor.
