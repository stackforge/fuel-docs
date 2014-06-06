.. _fuel-master-node-term:

Fuel Master Node
----------------
A server with the :ref:`fuel-term` application installed,
also commonly referred to as the Fuel server.
The Fuel Master node runs on its own server or VM
to deploy and manage OpenStack environments.
It assigns IP addresses to the OpenStack nodes,
performs PXE boot and initial configuration,
and provisions the nodes according to their roles in the environment.

For more information, see

- :ref:`download-install-ug` has instructions for downloading
  and installing the Fuel Master Node.
- :ref:`create-env-ug` gives instructions for creating
  a new OpenStack environment from the Fuel Master Node.
- `Fuel Architecture <http://docs.mirantis.com/fuel-dev/develop/architecture.html>`_
  for details about how Fuel is implemented.


