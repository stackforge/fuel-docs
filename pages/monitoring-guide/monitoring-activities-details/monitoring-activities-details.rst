.. _mg-monitoring-activities-details:

Monitoring Activities Details
=============================

In this chapter we are getting into the details of how the monitoring
activities introduced above can be implemented. It is worth
restating that a common trait of those monitoring activities is to
collect and process the operational data that should increase the
operational visibility about how an OpenStack cloud behaves over
time. In other words, get the level of insights that is required to
make value judgments about what should be done to keep your
OpenStack cloud kicking and healthy.

.. note::
   The `LMA Collector`_, available as a `Fuel plugin`_, does all the
   heavy lifting work of collecting and processing those operational
   data for you. Please refer to the `LMA Collector documentation`_ to
   understand how it works and how it can be used. Now, you have the
   choice between using the LMA Collector directly or build your own
   solution based on the guidelines described below.

| The chapter is organized in sections where each section covers a
  particular OpenStack service or auxiliary component like RabbitMQ
  for the AMQP bus or Corosync/Pacemaker for the HA cluster. Then,
  each section is further divided into subsections describing:

* The process checks, which gives you a list of all processes
  involved in the support of a particular service function, including
  details about the role of the node, where the process is running,
  the incoming connections and a port number and their dependencies.
  As we have seen above, a failed process check should always be
  reported as a critical error, but the ensuing alert will not
  necessarily require an immediate attention.

* The service API checks, which gives you a list of the API endpoints
  that you should monitor with an example of synthetic transaction you
  can use to verify that the service responds properly to user
  requests. A failed service API check should always be reported as a
  critical error and the ensuing alert should call for immediate
  attention.

* The operational data metrics, which aims to increase your
  operational visibility along with a simple method to retrieve their
  values. Those metrics can be used for both diagnosis and alerting
  purposes.


.. Links
.. _`LMA Collector`: https://github.com/stackforge/fuel-plugin-lma-collector
.. _`Fuel plugin`: https://wiki.openstack.org/wiki/Fuel/Plugins
.. _`LMA Collector documentation`: http://fuel-plugin-lma-collector.readthedocs.org/en/latest/


.. include:: /pages/monitoring-guide/monitoring-activities-details/keystone.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/nova.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/network.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/glance.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/cinder.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/horizon.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/heat.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/ceilometer.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/sahara.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/murano.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/libvirt.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/haproxy.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/rabbitmq.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/mysql.rst
.. include:: /pages/monitoring-guide/monitoring-activities-details/memcached.rst

