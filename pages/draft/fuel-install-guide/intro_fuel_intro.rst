.. _intro_fuel:

Introduction to Fuel
~~~~~~~~~~~~~~~~~~~~

Fuel is an open-source software application that simplifies the deployment of
highly available OpenStack environments, as well as enables you to
manage your OpenStack environments after deployment.

Fuel provides a web user interface, as well as a command-line user
interface (CLI) and RESTful API for provisioning, configuration, and
management of OpenStack environments. A link to the Horizon Dashboard appears
in the Fuel web user interface after you deploy an OpenStack environment.

Using Fuel you can:

- Deploy multiple highly-available OpenStack environments on virtual or bare
  metal hardware.

- Configure and verify network configurations.

- Test interoperability between the OpenStack components.

- Easily scale your OpenStack environment by adding and removing nodes.

Fuel architecture includes:

* Fuel Master node
  A server with the installed Fuel application that performs initial
  configuration, provisioning, and PXE booting of the Fuel Slave nodes, as
  well as assigning the IP addresses to the Fuel Slave nodes.

* Fuel Slave node
  In the Fuel project terminology, a generic term that describes a server that
  is provisioned by the Fuel Master node. A Fuel Slave node can be a
  controller, compute, or storage node, among others. These terms are
  interchangeable with the OpenStack terminology.

.. seealso::

   - `Fuel Architecture
     <https://docs.fuel-infra.org/fuel-dev/develop/architecture.html>`_
