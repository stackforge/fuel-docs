.. _deployment-graph:

Deployment graph
----------------

A collection of deployment tasks with their parameters and dependencies
resolved according to the settings of the current deployment.

Fuel renders each graph from a three-level hierarchical representation of its
class. For example, for basic deployment, the deployment graph class is
``default``. Fuel builds the deployment graph with respect to the existing
graphs of the default class for plugins as well as for a cluster-specific
graph.