.. _mg-notifications-processing:

OpenStack Notifications Processing
++++++++++++++++++++++++++++++++++

The `OpenStack notifications`_ are another source of valuable
operational data information that can be exploited by a monitoring
system. The OpenStack notifications, as opposed to logs, are
structured messages that are sent to the AMQP bus through the
*notifications* topic with an *info* priority by default. Some
OpenStack services send notifications with a *warning* and *error*
priority. Notifications contain rich data sets that can be exploited
to extract performance metrics and operations status for the service
workers at different levels of the stack. Most of the OpenStack
services publish notifications to the AMQP bus. See the list of
notifications for details.

.. note::
   Currently, if you enable the notifications, you also need to take
   care of effectively consuming them otherwise the queue will grow
   indefinitely.

In addition to the built-in notifications, there is a possibility to
configure each service endpoint to emit notifications of type
``http.request`` and ``http.response`` for all HTTP transactions. This
is achieved by adding the `notification middleware`_ in the WSGI
*pipeline*.

The LMA Collector plugin, that can be deployed on the controller
nodes, taps into the AMQP bus to collect and process the
notifications. Out of those notifications, the LMA Collector plugin
creates new metrics that can be sent to a time-series database. It
includes:

* Nova instance creation time
* Cinder volume creation time

Other asynchronous operations like ``Glance image creation time`` or
``Neutron network/port creation time`` can be computed the same way.

.. note::
   The LMA Toolchain provides a `Fuel plugin that allows to deploy
   InfluxDB and Grafana`_ to plot those metrics.


.. Links
.. _`OpenStack notifications`: https://wiki.openstack.org/wiki/SystemUsageData
.. _`notification middleware`: https://github.com/openstack/oslo.messaging/blob/master/oslo_messaging/notify/middleware.py
.. _`Fuel plugin that allows to deploy InfluxDB and Grafana`: https://github.com/stackforge/fuel-plugin-influxdb-grafana
