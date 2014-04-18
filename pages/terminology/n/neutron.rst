
.. _neutron-term:

Neutron (formerly know as Quantum)
------------------------------------

OpenStack Core project to provide networking as a service
between interface devices such as vNICS
that are managed by other OpenStack services such as Nova.
See the `Neutron web page <https://wiki.openstack.org/wiki/Neutron>`_
for more information.

Mirantis OpenStack includes Neutron;
Fuel deploys per-tenant Routers with Private Networks.
Each tenant has a virtual Neutron router with one or more private networks,
each of which can communicate with the outside world.
This allows full routing isolation for each tenant private network.

See `Neutron Deployment <http://docs.mirantis.com/fuel/fuel-4.1/pre-install-guide.html#neutron>`_
for a description of the recommended network configuration parameters
for using the Neutron service.
