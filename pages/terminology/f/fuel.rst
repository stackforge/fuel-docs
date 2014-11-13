
.. _fuel-term:

Fuel
----

`Fuel <https://wiki.openstack.org/wiki/Fuel>`_
is an open source, software life cycle management application
that deploys multiple `OpenStack <https://www.openstack.org/>`_
environments from a single interface
and then enables you to manage those environments post deployment.

Fuel includes:

- A web-based UI that runs on the :ref:`fuel-master-node-term`
  The Fuel UI performs the following tasks:

  - create and manage multiple OpenStack environments
  - discover and configure hardware
  - configure network and storage for the environment
  - validate the network configuration before and after deployment
  - view logs in realtime from the UI

  The :ref:`Fuel CLI<cli_usage>` is a shell tool
  that performs many of the same functions as the Fuel UI
  plus does some advanced, specialized configuration tasks.

- Reference architectures that we have tested and certified
  to ensure that your deployed clouds
  are scalable, reliable, and production quality.

- An open and flexible library (REST API)
  that enables customers to make configuration changes
  that are more advanced or focused
  than the default choices within Fuel.
  This library can also be used
  to fold additional drivers or integrations into the deployed environment.

- A complete, command-line interface for Fuel;
  see :ref:`Fuel CLI<cli_usage>`
  that can be used for almost all tasks
  that are done from the Fuel UI
  as well as some advanced configuration tasks.

  The REST API communicates with :ref:`nailgun-term`,
  which then manages the other activities
  to deploy the OpenStack environment.

See

- `Fuel Architecture <http://docs.mirantis.com/fuel-dev/develop/architecture.html>`_.

- `Sequence diagrams <http://docs.mirantis.com/fuel-dev/develop/sequence.html#os-provisioning>`_
  provides details about how Fuel provisions the operating system,
  verifies the networking, then provisions and deploys
  the OpenStack environment.

