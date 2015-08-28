
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

You have ways to use Mirantis OpenStack and Fuel
other than the bare-metal installation:

- You can install Fuel and use it
  to deploy a Mirantis OpenStack environment on Oracle VirtualBox.
  VirtualBox deployment is useful for demonstrations
  and is a good way to begin your exploration of the tools and technologies.
  See :ref:`0 to OpenStack in 60 Minutes or less<quickstart-guide>`
  
.. note::

  The environments you deploy on VirtualBox are for testing purposes only.
  Typically, a production environment requires extensive resources and 
  network planning.

- You can :ref:`install Fuel master node on vSphere<fuel-on-vsphere-ug>`
  and deploy a Mirantis OpenStack Environment
  on either baremetal or on vSphere.

- Mirantis OpenStack is also available on-demand,
  preconfigured, and ready to use
  with our Hosted Private Cloud product,
  `Mirantis OpenStack Express <https://express.mirantis.com/home>`_.


For community members or partners looking to take Fuel even further,
see the `developer documentation <https://docs.fuel-infra.org/fuel-dev/develop.html>`_
for information about the internal architecture of Fuel,
instructions for building the project,
information about interacting with the REST API
and other topics of interest to more advanced developers.
You can also visit the `Fuel project <https://launchpad.net/fuel>`_
for more detailed information and become a contributor.
