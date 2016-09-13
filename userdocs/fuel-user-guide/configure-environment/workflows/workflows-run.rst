
.. _custom-graph:

==================
Run a custom graph
==================

You can execute a custom deployment graph and merge it with existing deployment
graphs of the upstream master release.

This allows you to implement complex orchestrated workflows, such as
bugfixes application, reference architecture altering, or even upgrades.

Each cluster has three classes of deployment graphs with the following
hierarchy listed in a descending order of importance:

* Cluster-specific graph (most important).
* Graphs introduced by plugins -- These are the graphs of the enabled
  plugins merged by the task ID.
* Release-default graph (least important).

The custom graph may be of any particular type and is stored in the database
with this type. The default deployment graphs have the type ``default``.

Each deployment run executes the deployment of a particular type
(``default`` by default). Fuel fetches the graphs of each of the three classes
for the corresponding type of deployment and merges the graphs by merging all
tasks by task IDs where high-level tasks override the lower ones.

An example in the order of the graphs overriding:

**Default deployment:**

#. Release the default graph as derived from the tasks.yaml file of
   fuel-library.
#. Plugins default graphs, which are ``deployment_tasks.yaml`` from plugins
   manifests.
#. Cluster default grap, which is empty by default, with cluster-specific
   tasks specified by the user

The plugins graph merge order is not deterministic and it is supposed that
plugins graphs have no tasks intersections by task ID.

**Custom-type graph:**

#. Release custom-type graph, which is empty at this stage but can be derived
   from the tasks.yaml file of fuel-library or be delivered by a maintenance
   update.
#. Plugins custom-type graphs can be specified by plugin developers.
#. Cluster default grap, which is empty by default, with cluster-specific
   tasks specified by the user

To list a cluster-specific table with graphs, their relations, names, and
types:

The graph ``name`` is an arbitrary parameter that defines additional
information about the graph. It has no impact on the business logic.

#. Log in to the Fuel master node.
#. Run the following command:

   .. code-block:: console

      fuel2 graph list --env env_id

   where ``env_id`` is the ID of the environment.

**To upload a graph:**

#. Log in to the Fuel master node.
#. Run the following command:

   .. code-block:: console

      fuel2 graph upload --env env_id [--type graph_type] --file tasks.yaml
      fuel2 graph upload --release release_id [--type graph_type] --file tasks.yaml
      fuel2 graph upload --plugin plugin_id [--type graph_type] --file tasks.yaml

   where ``--type`` is an optional parameter. The ``default`` graph type with
   confirmation should be used if no type is defined.

The graphs downloaded with the keys ``--all`` and ``--plugins`` are the
result of other graphs merge performed by Nailgun and are not supposed to be
edited and uploaded back.
In most cases because they will completely override further changes made in
source graphs.

**To download a graph:**

#. Log in to the Fuel master node.
#. Run the following command:

   .. code-block:: console

      fuel2 graph download --env env_id --all [--type graph_type] [--file cluster_graph.yaml]
      fuel2 graph download --env env_id --cluster [--type graph_type] [--file cluster_graph.yaml]
      fuel2 graph download --env env_id --plugins [--type graph_type] [--file plugins_graph.yaml]
      fuel2 graph download --env env_id --release [--type graph_type] [--file release_graph.yaml]

     where ``--type`` is an optional parameter. The command downloads the
     ``default``if no type is defined.

**To execute a graph:**

#. Log in to the Fuel master node.
#. Run the following command:

   .. code-block:: console

      fuel2 graph execute --env env_id [--type graph_type] [--node node_ids]

Graph execution is available only for the environment.