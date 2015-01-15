
.. _fuel-agent-term:

Fuel Agent
----------

Fuel Agent provisions an operating system
using pre-built OS images that are copied to target nodes
rather than running native operating system installation mechanisms
like Anaconda or Debian-installer on each node.
This significantly reduces the time required
to deploy a new environment or a new node.
Fuel Agent was introduced as
an :ref:`experimental feature<experimental-features-term>`
in Mirantis OpenStack 6.0 and it is used as a default provision
mechanism since 6.1.

See:

- :ref:`provision-method-ug` gives instructions
  for implementing provisioning with the Fuel Agent
  when configuring your environment.

- :ref:`fuel-agent-arch` gives details about how
  the Fuel Agent provisions the OpenStack environment.

