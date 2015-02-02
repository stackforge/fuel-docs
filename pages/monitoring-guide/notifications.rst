.. _Monitoring-Notifications:

OpenStack notifications
=======================

All OpenStack services are able to send notifications over the AMQP bus to notify
an external system for each user operations, this aims to be consumed by an auditing
and/or a billing system.
Notifications are not enabled per default but easy to configure since
the library layer has been unified in last release with the adoption of
*oslo.messaging*.

However schema and information within notifications are not standardized
and vary between projects, this imply to consider each projects
specificities and their eventual evolutions over releases.
A reflexion is underway to standardize and bring up consistency
`across all project notifications`_ but should take several release cycles before
landing.

The large majority of notifications are published on the topic **notifications**
with **info** *priority*. Some services emit *error* notifications and also a
**warn** *priority* exists. see `the list of notifications on wiki
<https://wiki.openstack.org/wiki/SystemUsageData>`_.

.. warning:: Operator must take care to consume notifications otherwise the
             queue will grow indefinitely.
             See `oslo.messaging side effect <https://bugs.launchpad.net/nova/+bug/1188643>`_
             for details.

In addition to hard coded notification emitted by projects, there is a
possibility to configure each API to emit notifications of type
**http.request** and **http.response** for all calls.
This is achieved by adding the
`notification middleware
<https://github.com/openstack/oslo.messaging/blob/master/oslo_messaging/notify/middleware.py>`_
in the WSGI *pipeline*, but notice that currently it lacks information about
response times.

Whatever the current state of notifications in OpenStack, it is clear that
notifications are a formidable source of information and the monitoring solution
**must** consume and sublime them.
This is a reference source to feed the monitoring repository to figure out:

- user operations
- response time of asynchronous operations
- errors and warnings events

with a bunch of contextual information like tenant-id, user-id, service name, host name.

There are at least two projects in OpenStack ecosystem which cosume
notifications: `StackTack`_ and `Ceilometer <https://github.com/openstack/ceilometer/>`_.
There is some overlap, different purposes and even there has been initiative [#]_
to converge them but which seems now canceled.

Initially, StackTach was more focused on trouble shooting and billing use cases,
and now aims to became a notifications toolbox to handle and process them with a high
modularity and configurability to adress as well auditing and monitoring of OpenStack.
It is now announced to be integrable with `Monasca`_, a monitoring solution recently
open sourced which should be able to adress both *Monitoring-as-a-service* and
infrastructure monitoring.

Ceilometer has been originally designed for billing purpose and currently the project
struggles to answer monitoring challenges [#]_ [#]_, although these concerns are
not directly related to notifications handling.

The choice to leveraging one of them must be carefully evaluated in terms of
feature, deployment and its operational management.

That said, any system able to speak to *RabbitMQ* can consume these notifications,
letting user to implement their own logic to extract and process them but also choosing
its underlying storage technology.
Some tools have connector ready to use: `Logstach RabbitMQ input`_,
`Heka AMQP input`_ `Reimann <https://github.com/aphyr/riemann-tools/blob/master/bin/riemann-rabbitmq>`_
for example and `ElasticSearch <http://www.elasticsearch.org/>`_ or
`GrayLog <https://www.graylog.org/>`_ are good candidates to store and index notifications.

.. [#] https://blueprints.launchpad.net/ceilometer/+spec/stacktach-integration
.. [#] https://julien.danjou.info/blog/2014/openstack-ceilometer-the-gnocchi-experiment
.. [#] http://lists.openstack.org/pipermail/openstack-operators/2015-February/006235.html
.. _Monasca: https://wiki.openstack.org/wiki/Monasca
.. _oslo notifier: https://github.com/openstack/oslo.messaging/blob/master/oslo_messaging/notify
.. _across all project notifications: https://etherpad.openstack.org/p/kilo-crossproject-notifications
.. _StackTack: https://github.com/rackerlabs/stacktach
.. _Logstach RabbitMQ input: http://www.logstash.net/docs/1.4.2/inputs/rabbitmq
.. _Heka AMQP input: http://hekad.readthedocs.org/en/v0.8.2/config/inputs/index.html#amqpinput
