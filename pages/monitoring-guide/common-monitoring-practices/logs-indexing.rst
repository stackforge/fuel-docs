.. _mg-logs-indexing:

Logs Indexing
+++++++++++++

Another common practice is to index all the logs in a central
database like ElasticSearch with Kibana running on top of it
to easily search and correlate those logs for root cause
analysis and troubleshooting. With complex distributed systems
like OpenStack, it is no longer possible to use ad-hoc tools like
``grep`` and ``awk`` to search the logs for troubleshooting.

.. note::
   The LMA Toolchain provides a `Fuel plugin that allows deploying
   ElasticSearch and Kibana`_ you can use to search and correlate the
   OpenStack logs and notifications.


.. Links
.. _`Fuel plugin that allows deploying ElasticSearch and Kibana`: https://github.com/stackforge/fuel-plugin-elasticsearch-kibana
