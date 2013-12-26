.. index:: Introduction

.. _User_Introduction:

Introducing Fuel for OpenStack
===============================

OpenStack is an extensible, versatile, and flexible cloud management 
platform. By exposing its portfolio of cloud infrastructure services – 
compute, storage, networking and other core resources — through ReST APIs, 
OpenStack enables a wide range of control over these services, both from the 
perspective of an integrated Infrastructure as a Service (IaaS) controlled 
by applications, as well as automated manipulation of the infrastructure 
itself.

This architectural flexibility doesn’t set itself up magically. It asks you, 
the user and cloud administrator, to organize and manage an extensive array 
of configuration options. Consequently, getting the most out of your 
OpenStack cloud over time – in terms of flexibility, scalability, and 
manageability – requires a thoughtful combination of complex configuration 
choices. This can be very time consuming and requires that you become 
familiar with much of the documentation from the number of different projects.

Mirantis Fuel for OpenStack was created to eliminate exactly these problems. 
This step-by-step guide takes you through this process of:

* Configuring OpenStack and its supporting components into a robust cloud 
  architecture
* Deploying that architecture through an effective, well-integrated automation 
  package that sets up and maintains the components and their configurations
* Providing access to a tested, integrated, and up-to-date set of components 
  proven to work together

Fuel for OpenStack can be used to create and support many popular OpenStack 
configurations. To make the process easier, the installation includes several 
pre-defined architectures. For the sake of simplicity, this guide emphasizes 
a single, common reference architecture; the multi-node, high-availability 
configuration. We begin with an explanation of this architecture, then move 
on to the details of creating the configuration in a test environment using 
VirtualBox. Finally, we provide you the information you need to know to create 
this and other OpenStack architectures in a production environment.

For community members or partners looking to take Fuel even further, we’ve
supplied `developer documentation <http://docs.mirantis.com/fuel-dev/develop.html>`_
on the internal architecture of Fuel, instructions on building the project,
information on interacting with the REST API and other topics of interest to
more advanced developers. You can also visit the `Fuel project <https://launchpad.net/fuel>`_
for more detailed information and become a contributor.