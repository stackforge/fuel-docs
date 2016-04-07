Nailgun Extensions
__________________


Overview of extensions
======================

Nailgun extensions provide a capability for Fuel Developers to extend Fuel
features. Extensions were introduced to provide *pythonic way* for adding
integrations with external services, extending existing features, or adding
new features **without** changing the Nailgun source code.

A Nailgun extension can execute its method on specific events
such as ``on_node_create`` or ``on_cluster_delete`` (more about event handlers
in the `Available Events`_ section) and also to change deployment and
provisioning data just before it is sent to orchestrator by the means of
Data Pipelines classes.

.. note::
    The extensions mechanism does not provide a sufficient level
    of isolation. Therefore, the extension may not work after you upgrade Fuel.

    On the contrary, Fuel plugins provide backward compatibility and a friendly
    UI for the end user. Use plugins for all changes in the system performed
    by the Fuel user.


Required properties
===================

All Nailgun extensions must populate the following class variables:

* ``name`` - a string which will be used inside Nailgun to identify the
  extension. It should consist only of lowercase letters with "_" (underscore)
  separator and digits.

* ``version`` - a string with version. It should follow semantic versioning:
  http://semver.org/

* ``description`` - a short text which briefly describes the actions that the
  extension performs.


Available events
================

Extension can execute event handlers on specific events. There is
a list of available handlers:

.. list-table::
   :widths: 10 10
   :header-rows: 1

   * - Method
     - Event
   * - ``on_node_create``
     - Node has been created
   * - ``on_node_update``
     - Node has been updated
   * - ``on_node_reset``
     - Node has been reseted
   * - ``on_node_delete``
     - Node has been deleted
   * - ``on_node_collection_delete``
     - Collection of nodes has been deleted
   * - ``on_cluster_delete``
     - Cluster has been deleted
   * - ``on_before_deployment_check``
     - Called right before running "before deployment check task"


REST API handlers
=================
Nailgun Extensions also provide a way to add additional API endpoints.
To add an extension-specific handler sub-class from::

  nailgun.api.v1.handlers.base.BaseHandler

The second step is to register the handler by providing the ``urls`` list in
Extension class:

.. code-block:: python

  urls = [
      {'uri': r'/example_extension/(?P<node_id>\d+)/?$',
       'handler': ExampleNodeHandler},
      {'uri': r'/example_extension/(?P<node_id>\d+)/properties/',
       'handler': NodeDefaultsDisksHandler},
  ]


As you can see you need to provide a list of dicts with keys:

.. list-table::
   :widths: 10 10
   :header-rows: 1

   * - key
     - value
   * - ``uri``
     - a regular expression (string) for the URL path
   * - ``handler``
     - handler class


Database interaction
====================

There is a possibility to use the Nailgun database to store the data needed by
a Nailgun extension. To use it you must provide alembic migration scripts which
should be placed in::

  extension_module/alembic_migrations/migrations/

Where ``extension_module`` is the one where the file with your extension class
is placed.

You can also change this directory by overriding the classmethod::

  alembic_migrations_path

It should return an absolute path (string) to alembic migrations
directory.

Also you must use table name with extension specific prefix in models classes
and in alembic migration scripts. It is recommended to use ``table_prefix``
extension method to retrieve the prefix (string).

.. note::
  Do not use the direct db calls to Nailgun core tables in the extension
  class. Use the ``nailgun.objects`` module which ensures compatibility
  between the Nailgun DB and the configuration implemented in your extension.

  There **must be no** relations between extension models and core models.


Extension Data Pipelines
========================

If you want to change the deployment or provisioning data just before it is
sent to an orchestrator use Extension Data Pipelines.

Data Pipeline is a class which inherits from::

  nailgun.extensions.BasePipeline

BasePipeline provides two methods which you can override:

* ``process_provisioning``

* ``process_deployment``

Both methods take the following parameters:

* ``data`` - serialized data which will be sent to orchestrator. Data
  **does not include** nodes data which was defined by User in
  ``replaced_deployment_info`` or in ``replaced_provisioning_info``.

* ``cluster`` - a cluster instance for which the data was serialized.

* ``nodes`` - nodes instances for which the data was serialized. Nodes list
  **does not include** node instances which were filtered out in ``data``
  parameter.

* ``**kwargs`` - additional kwargs - must be in method definition to provide
  backwards-compatibility for future (small) changes in extensions API.

Both methods must return the ``data`` dict so it can be processed by other
pipelines.

To enable pipelines, add the ``data_pipelines`` variable in your extensions
class:

.. code-block:: python

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


Pipeline classes will be executed **in the order they are defined** in the
``data_pipelines`` variable.

How to install and plug in extensions
=====================================

To use extensions system in Nailgun, implement an extension class which will
be the subclass of::

  nailgun.extensions.BaseExtension

The class must be placed in a separate module which defines ``entry_points`` in
its ``setup.py`` file.

Extension entry point should use Nailgun extensions namespace which is::

  nailgun.extensions

Example ``setup.py`` file with ``ExampleExtension`` may look like this:

.. code-block:: python

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

.. code-block:: python

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
          logging.debug('Nodes %s have been deleted', ', '.join(node_ids))

      @classmethod
      def on_cluster_delete(cls, cluster):
          logging.debug('Cluster %s has been deleted', cluster.id)

      @classmethod
      def on_before_deployment_check(cls, cluster):
          logging.debug('Cluster %s will be deployed soon', cluster.id)
