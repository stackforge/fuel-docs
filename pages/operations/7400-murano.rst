.. raw:: pdf

   PageBreak

.. index:: Murano-operations

.. _Murano-deployment-notes:

Murano Deployment Notes
=======================

.. contents :local:

Murano provides an application catalog
that application developers and administrators can use
to publish various cloud-ready applications
in a browsable, categorized catalog.
Users can select applications from this catalog
and deploy them easily.

Some highlights of Murano features include:

* Native to OpenStack
* Application catalog;
  see `<https://wiki.openstack.org/wiki/Murano>`_
* Introduction of abstraction level
* Support for Availability Zones and Disaster Recovery scenarios
* Use of native Windows features to provide HA solutions

Note that, because Microsoft Windows and other necessary components
can only be obtained directly from Microsoft,
Murano is still to some degree a do-it-yourself project.
Fuel is able to configure Murano's dashboard, API, and engine services,
but you will need to read documentation on the steps
to set up a Murano base image;
see `Creating a Murano Image <http://murano-api.readthedocs.org/en/latest/image_builders/index.html>`_.
Images can be uploaded via Glance.

Fuel can install Murano on either CentOS or Ubuntu;
simply check the appropriate check box when configuring your environment.

.. include:: /pages/operations/murano/7410-components.rst
.. include:: /pages/operations/murano/7482-test-prepare.rst
.. include:: /pages/operations/murano/7485-test-details.rst
.. include:: /pages/operations/murano/7490-troubleshoot.rst


