.. _intro_fuel:

Introduction to Fuel
~~~~~~~~~~~~~~~~~~~~

Fuel is an open-source software application that simplifies the deployment of
highly available OpenStack environments, as well as enables you to
manage resources of your OpenStack environments after deployment.

Fuel provides a web user interface, as well as a command-line user
interface (CLI) and RESTful API for provisioning, configuration, and
management of OpenStack environments. However, Fuel does not replace the
OpenStack Horizon dashboard. Instead, a link to the Horizon Dashboard appears
in the Fuel web user interface after you deploy an OpenStack environment.

Using Fuel you can:

- Deploy multiple highly-available OpenStack environments on virtual or bare
  metal hardware.

- Configure and verify network configurations.

- Test interoperability between the OpenStack components.

- Manage the Fuel Target nodes after deployment.

Fuel includes the following components:

* Fuel Master node
  A server with the installed Fuel application that is performs the initial
  configuration, provisioning, and PXE booting of the Fuel Target nodes, as
  well as assigning the IP addresses to the Fuel Target nodes.

* Fuel Target node
  In the Fuel project terminology, a generic term that describes a server that
  is provisioned by the Fuel Master node. A Fuel Target node can be a
  controller, compute, or storage node. These terms are interchangeable with
  the OpenStack terminology.

.. seealso::

   - `Fuel Architecture
     <https://docs.fuel-infra.org/fuel-dev/develop/architecture.html>`_
