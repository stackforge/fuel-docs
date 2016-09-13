.. _workflows_precedence:

========================================
Deployment workflows order of precedence
========================================

Each OpenStack environment has the following classes of deployment workflows
listed in a descending order of importance:

* Environment specific workflows (highest priority)

  * Graphs introduced by plugins

    * Release specific workflows (lowest priority)

A custom deployment workflow may be of any particular type and is stored
in the database with this type. The default deployment workflows belong to
the ``default`` type.

Each deployment run executes the deployment of a particular type.
Fuel fetches the workflows of each of the available classes for
the corresponding type of deployment and merges the workflows by merging
all tasks by tasks IDs where tasks of a higher priority override tasks of
a lower priority.

The merge order of plugins workflows is not deterministic as it is supposed that
plugins workflows have no tasks intersections by task IDs.

**Examples of workflow execution:**

* Fuel applies deployment workflows for default deployments in the following
  order:

  * Release default workflows from the ``tasks.yaml`` file from fuel-library
  * Plugins default workflows located in ``deployment_tasks.yaml`` in
    plugins` source code
  * Environment default workflows that are empty by default

* Fuel applies deployment workflows for custom deployments in the following
  order:

  * Release custom workflows from the ``tasks.yaml`` file from fuel-library
    or delivered by a maintenance update
  * Plugins custom workflows specified by plugin developers in plugins` source
    code
  * Environment custom workflows that include environment specific tasks
    specified by the user