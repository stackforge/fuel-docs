
.. _astute-term:

Astute
------

Astute processes are worker processes
used by :ref:`fuel-term` to deploy an OpenStack environment.
The :ref:`Nailgun<nailgun-term>` service
creates a JSON file that contains information
about the nodes and their roles
and puts this file into the :ref:`rabbitmq-term` queue.
An Astute worker process then receives this information
and deploys the environment
by setting the configuration for each node in :ref:`cobbler-term`.
This same Astute worker process monitors the deployment process
and periodically reports the progress to Nailgun
through its RabbitMQ queue.

See :ref:`fuel-arch-dev` for more information.
