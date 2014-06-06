
.. _fuel-term:

Fuel
----

Fuel is an application that can be used
to deploy an OpenStack environment.
It includes a web-based UI that runs on the :ref:`fuel-master-node-term`
and the :ref:`Fuel CLI<cli_usage>`
that can do advanced, specialized configuration tasks.
Fuel performs the following tasks:

- hardware discovery and configuration
- create and manage multiple OpenStack environments
- validate the network configuration before and after deployment
- view logs in realtime from the UI

Fuel uses a REST API to communicate with
:ref:`nailgun-term`
which then manages the other activities to deploy the OpenStack environment.
See `Fuel Architecture` <http://docs.mirantis.com/fuel-dev/develop/architecture.html>`_.
for details.
