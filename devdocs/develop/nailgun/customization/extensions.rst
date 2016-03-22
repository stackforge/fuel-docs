Nailgun Extensions
__________________


What extensions are
===================

Nailgun extensions is one of the ways we can extend Fuel features.
Extensions were introduced to provide *pythonic way* for adding integrations
with external services, extending existing features, or adding new features
**without** changing Nailgun source code.

Every Nailgun Extension is able to execute its method on specific events
like *on_node_create* or *on_cluster_delete* (more about event handlers
in `Available Events`_ section) and also to change deployment and provisioning
data just before it is sent to orchestrator thanks to Data Pipelines classes.


Required properties
===================

All Nailgun extensions must populate the following class variables:

* *name* - string which will be used inside Nailgun to identify the extension.
  It should consist only of lowercase letters with "_" (underscore) separator
  and digits.

* *version* - string which should look like *X.Y.Z* where X is a major version,
  Y is minor and Z is bug fix update or build number.

* *description* - short text which briefly describe what the extension is doing.


Available events
================

Extension is able to execute event handlers on specific events. There is
a list of available handlers:

* *on_node_create* - method which gets executed when node is created

* *on_node_update* - method which gets executed when node is updated

* *on_node_reset* - method which gets executed when node is reseted

* *on_node_delete* - method which gets executed when node is deleted

* *on_node_collection_delete* - method which gets executed when node collection is
  deleted

* *on_cluster_delete* - method which gets executed when cluster is deleted

* *on_before_deployment_check* - method which gets executed when before
  deployment check runs. We can do some additional verification here.


REST API handlers
=================
Nailgun Extensions also provide a way to add aditinal API endpoints.
To add extension-specific handler we need to implement it by sub-classing::

  nailgun.api.v1.handlers.base.BaseHandler

The second step is to register the handler by providing *urls* list in
Extension class:

.. code:: python

  urls = [
      {'uri': r'/example_extension/(?P<node_id>\d+)/?$',
       'handler': ExampleNodeHandler},
      {'uri': r'/example_extension/(?P<node_id>\d+)/properties/',
       'handler': NodeDefaultsDisksHandler},
  ]


As you can see you need to provide a list of dicts with keys:

* *uri* - which is a regular expression (string) for URL path.

* *handler* - which is a handler class.


Database interaction
====================

There is a possibility to use Nailgun database to store the data needed by
extension. To use it we need to provide alembic migration scripts which
should be placed in::

  extension_module/alembic_migrations/migrations/

Where *extension_module* is the one where the file with your Extension class
is placed.

You can also change this directory by overriding classmethod::

  alembic_migrations_path

It should return string containing absolute path to alembic migrations
directory.

.. important::
   Do not use direct db calls to Nailgun core tabels in extension class.
   Use *nailgun.objects* module which is a safe layer which will prevent from
   future incompatibilities between Nailgun DB and what you have implemented
   in your extension.


Extension Data Pipelines
========================

If you want to change deployment or provisioning data just before it is sent
to an orchestrator you need to use Extension Data Pipelines.

Data Pipeline is a class which inherits from::

  nailgun.extensions.BasePipeline

BasePipeline provides two methods which you can override:

* *process_provisioning*

* *process_deployment*

Both methods take the following parameters:

* *data* - serialized data which will be sent to orchestrator. Data
  **does not include** nodes data which was defined by User in
  *replaced_deployment_info* or in *replaced_provisioning_info*.

* *cluster* - a cluster instance which the data was serialized for

* *nodes* - nodes instances which the data was serialized for. Nodes list
  **does not include** node instances which were filtered out in *data*
  parameter.

* *\*\*kwargs* - additional kwargs - these are here to provide
  backwards-compatibility for future (small) changes in extensions API

Both methods must return the *data* parameter so it can be processed by other
pipelines.

To enable pipelines you need to add additional variable in your Extensions class
which is *data_pipelines*:

.. code:: python

  class ExamplePipelineOne(BasePipeline):

      @classmethod
      def process_provisioning(cls, data, cluster, nodes, **kwargs):
          data['new_field'] = 'example_value'
          return data

      @classmethod
      def process_deployment(cls, data, cluster, nodes, **kwargs):
          data['new_field'] = 'example_value'
          return data


  class ExamplePipelineTwo(BasePipeline):

      @classmethod
      def process_deployment(cls, data, cluster, nodes, **kwargs):
          data['new_field2'] = 'example_value2'
          return data


  class ExampleExtension(BaseExtension):
      ...
      data_pipelines = [
          ExamplePipelineOne,
          ExamplePipelineTwo,
      ]
      ...


Pipeline classes will be executed **in order they are defined** in
*data_pipelines* variable.

How to install and plug in Extensions
=====================================

To use extensions system in Nailgun we need to implement Extension
class which will be the subclass of::

  nailgun.extensions.BaseExtension

The class must be placed in separate module which defines *entry_points* in
its *setup.py* file.

Extension entry point should use Nailgun extensions namespace which is::

  nailgun.extensions

Example *setup.py* file with *ExampleExtension* may look like this:

.. code:: python

  from setuptools import setup, find_packages

  setup(
         name='example_package',
         version='1.0',
         description='Demonstration package for Nailgun Extensions',
         author='Fuel Nailgman',
         author_email='fuel@nailgman.com',
         url='http://example.com',
         classifiers=['Development Status :: 3 - Alpha',
                     'License :: OSI Approved :: Apache Software License',
                     'Programming Language :: Python',
                     'Programming Language :: Python :: 2',
                     'Environment :: Console',
                     ],
         packages=find_packages(),
         entry_points={
            'nailgun.extensions': [
                'ExampleExtension = example_package.nailgun_extensions.ExampleExtension',
             ],
         },
  )


Now to enable the extension it is enough to run::

  python setup.py install

or::

  pip install .

Now extension will be discovered by Nailgun automatically after restart.


Example Extension with Pipeline - additional logging
====================================================

.. code:: python

  import datetime
  import logging

  from nailgun.extensions import BaseExtension
  from nailgun.extensions import BasePipeline

  logger = logging.getLogger(__name__)


  class TimeStartedPipeline(BasePipeline):

      @classmethod
      def process_provisioning(cls, data, cluster, nodes, **kwargs):
          now = datetime.datetime.now()
          data['time_started'] = 'provisioning started at {}'.format(now)
          return data

      @classmethod
      def process_deployment(cls, data, cluster, nodes, **kwargs):
          now = datetime.datetime.now()
          data['time_started'] = 'deployment started at {}'.format(now)
          return data


  class ExampleExtension(BaseExtension):
      name = 'additional_logger'
      version = '1.0.0'
      description = 'Additional Logging Extension '

      data_pipelines = [
          TimeStartedPipeline,
      ]

      @classmethod
      def on_node_create(cls, node):
          logging.debug('Node %s has been created', node.id)

      @classmethod
      def on_node_update(cls, node):
          logging.debug('Node %s has been updated', node.id)

      @classmethod
      def on_node_reset(cls, node):
          logging.debug('Node %s has been reseted', node.id)

      @classmethod
      def on_node_delete(cls, node):
          logging.debug('Node %s has been deleted', node.id)

      @classmethod
      def on_node_collection_delete(cls, node_ids):
          logging.debug('Nodes %s has been deleted', ', '.join(node_ids))

      @classmethod
      def on_cluster_delete(cls, cluster):
          logging.debug('Cluster %s has been deleted', cluster.id)

      @classmethod
      def on_before_deployment_check(cls, cluster):
          logging.debug('Cluster %s will be deployed soon', cluster.id)
