.. _deployment-pipeline:

Deployment pipeline
-------------------

A sequence of data transformations from user-friendly instructions
to the low-level data representation in the form of deployment input
data and deployment graph.

The deployment pipeline workflow:

#. Fuel manipulates the input data provided by the user. Data examples:

   * Cluster attributes
   * OpenStack release version
   * Networking settings
   * Huge Pages allocation

#. Fuel converts the data using a set of serializers.

#. Using the converted data, Fuel builds a deployment graph.

#. Fuel passes the deployment graph a task executor.

#. The task executor carries out the deployment tasks based on the input data.