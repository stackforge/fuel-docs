.. _intro_planning:

Planning your environment
-------------------------

Before you install Fuel and OpenStack, determine what type of
configuration addresses your business needs. You must understand
how OpenStack will integrate and communicate with existing components
in your IT infrastructure, as well as calculate resources required to process
estimated workloads.

If you are testing Fuel and OpenStack in a lab environment, you can
skip the planning and deploy the default configuration. However, for a
production environment, you must decide on the following:

* Network topology and IP address management plan
* Storage
* Number, type, and flavor of compute, controller, storage, and other nodes
* Monitoring facilities
* Additional components: Sahara and Murano
* Fuel plug-ins

This guide explains what OpenStack configurations you can deploy using Fuel,
as well as briefly describes guidelines and examples on how to plan resources
for your environment. However, we recommend that you read `OpenStack
Architecture Design Guide <http://docs.openstack.org/arch-design/content/>`__,
so you can better estimate your network, storage, and compute requirements.

.. see::

   - :ref:`System requirements <sysreq_intro>`


