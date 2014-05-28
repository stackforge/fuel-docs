.. _murano-term:

Murano
------
The Murano project provides an application catalog
that application developers and cloud administrators can use
to publish various cloud-ready applications
in a browsable, categorized catalog.
Users can then select the applications and services they need
and install them in a "push-the-button" manner.
See the `Murano wiki <https://wiki.openstack.org/wiki/Murano>`_.

Fuel can deploy all Murano components, including the Murano Dashboard.
See :ref:`Murano-deployment-notes`
for more information about deploying Murano with Fuel.

Murano requires one of the :ref:`neutron-term` network topologies;
if you choose nova-network as the network type
when deploying your OpenStack environment with Fuel,
the Murano project is greyed out.
This is a design decision made by the OpenStack community;
it allows us to focus our efforts on Neutron,
and we see little demand for Murano support on Nova-network.


