
.. _nailgun-term:

Nailgun
-------

Nailgun is the configuration and management service
used as the backend for the Fuel UI and CLI.
It contains the logic for creating an environment and editing its settings;
assigning roles to the discovered nodes;
an starting the deployment process for a new OpenStack cluster.

Nailgun stores all of its data in a PostgreSQL database.
that contains the hardware configuration of all managed nodes it discovers,
plus the roles, environment settings,
current deployment status and progress of running deployments.

Note that Nailgun in Fuel
is not in any way related to the Nailgun that provides
a JVM in which Java programs can be run without incurring
the standard JVM startup overhead.

- For a detailed explanation of Nailgun's role in the Fuel architecture,
  see :ref:`fuel-arch-dev`.
- For details about developing and customizing Nailgun, see
  :ref:`nailgun-dev`.


