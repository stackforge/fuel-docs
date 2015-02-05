.. _ha-term:

HA
--
HA (High Availability or Highly Available architecture)
replicates servers and services
to minimize downtime and data loss in the event of a hardware failure.
OpenStack is architected to support HA; see the
`OpenStack High Availability Guide <http://docs.openstack.org/high-availability-guide/content/ch-intro.html>`_
for more information about the OpenStack implementation.

When you create an OpenStack environment with Fuel,
you are asked to choose either an HA or non-HA deployment mode
on the :ref:`mode-ha-ug` screen.
Before Mirantis OpenStack 5.1,
different internal architectures were used for the two modes;
if you deployed a non-HA environment,
you had to redeploy the environment to convert it to HA.

Now you can deploy the Highly Available architecture
(also known as Multi-node HA)
onto any number of controllers, including just one.
The environment is not considered highly available
if installed on a single controller
because no secondary controller is present for failover
and no quorum can be retained for the
:ref:`Pacemaker<pacemaker-term>` and :ref:`Galera<galera-cluster-term>`,
but the same internal mechanisms are used
so you can later add replica servers
and transform your OpenStack environment
into an HA environment without having to redeploy it.
But controllers can be added to the environment at a later time
and will be properly configured for High Availability
in conjunction with the initially deployed controller.

At least three controllers must be configured
to have a reliable HA environment;
this is the minimal requirement for quorum-based clusters, such as
Pacemaker and Galera.
The controller cluster can include more than three servers
to increase the level of reliability.
For more information about how Fuel deploys HA,
see :ref:`Multi-node_HA`.

The multi-node mode,
previously used to deploy an environment with only one controller,
is retained as a legacy option in Mirantis OpenStack for 5.1
but it is not recommended for deploying new environments;
we expect to remove this option in a future release.

