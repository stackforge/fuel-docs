
.. _heat-term:

Heat
----

Heat is the OpenStack Orchestration service.
It implements a framework that manages the lifecycle
of your infrastructure inside the OpenStack cloud.
Mirantis OpenStack 4.0 and later
deploys Heat into each environment by default.
Heat uses human-readable templates to describe the
deployment process of instances,
but also supports the AWS CloudFormation template format.

Heat uses a template that humans can read and write
and that can be maintained under source code control.
See the `Heat wiki <https://wiki.openstack.org/wiki/Heat>`_
for more information.

The Heat components are:

**heat-api** -- provides a native REST API and processes API requests.

**heat-api-cfn** -- similar to the *heat-api*
but also provides an AWS CloudFormation compatible API.

**heat-engine** -- main component of the Heat framework.
It does all the work of reading templates,
launching instances and providing events to the API users.

See also:

* The official `documentation of the Heat project <https://wiki.openstack.org/wiki/Heat>`_
* `Development documentation <http://docs.openstack.org/developer/heat/>`_
* Mirantis `blog record <http://www.mirantis.com/blog/heat-things-up-with-openstack-before-your-competitors-do/>`_

