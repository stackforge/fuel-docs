
.. _fuel-term:

Fuel
----

Fuel is an all-in-one control plane that can be used
to deploy an OpenStack environment.
It includes a web-based UI that runs on the :ref:`fuel-master-node-term`
and the :ref:`Fuel CLI<cli_usage>`
that can do advanced, specialized configuration tasks.
Fuel performs the following tasks:

- discover and configure hardware
- create and manage multiple OpenStack environments
- validate the network configuration before and after deployment
- view logs in realtime from the UI

Fuel uses a REST API to communicate with
:ref:`nailgun-term`
which then manages the other activities to deploy the OpenStack environment.

See

- `Fuel Architecture <http://docs.mirantis.com/fuel-dev/develop/architecture.html>`_.

- `Sequencing diagrams <http://docs.mirantis.com/fuel-dev/develop/sequence.html#os-provisioning>`_
  provides details about how Fuel provisions the operating system,
  verifies the networking, then provisions and deploys
  the OpenStack environment.
