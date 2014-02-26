.. raw:: pdf

   PageBreak

.. index:: Heat

Heat Deployment Notes
==================================

.. contents :local:

Overview
--------

Heat is the OpenStack Orchestration service. Its main goal is to implement
a framework for managing the entire lifecycle of your infrastructure inside
the OpenStack cloud. Heat uses human-readable templates to describe the
deployment process of instances, but also supports AWS CloudFormation
template format.

Heat Components
---------------

heat-api
++++++++

This component provides a native REST API and processes API requests.

heat-api-cfn
++++++++++++

This component is similar to *heat-api*, but provides AWS CloudFormation
compatible API.

heat-engine
+++++++++++

This is the main component of the Heat framework. It does all the work
of reading templates, launching instances and providing events to the API
users.

Installation
------------

When using Fuel 4.1, Heat is installed by default
when you deploy a CentOS or Ubuntu environment.

Notes
-----

* The official `documentation of the Heat project <https://wiki.openstack.org/wiki/Heat>`_
  can be found here.
* `Development documentation <http://docs.openstack.org/developer/heat/>`_
  can be found here.
* Mirantis `blog record <http://www.mirantis.com/blog/heat-things-up-with-openstack-before-your-competitors-do/>`_ about Heat.
