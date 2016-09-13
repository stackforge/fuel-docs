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
in the database with this type. The default deployment workflows are of the
type ``default``.

Each deployment run executes the deployment of a particular type, that is
``default`` by default. Fuel fetches the workflows of each of the available
classes for the corresponding type of deployment and merges the workflows by
merging all tasks by tasks IDs where tasks of a higher priority override tasks
of a lower priority.

The merge order of plugins workflows is not deterministic as it is supposed that
plugins workflows have no tasks intersections by task IDs.

**An example of workflows execution order for the default deployment:**

#. Release default workflows derived from the ``tasks.yaml`` file from
   fuel-library
#. Plugins default workflows that are ``deployment_tasks.yaml`` from plugins
   manifests
#. Environment default workflows that are empty by default

**An example of workflows execution order for a custom deployment:**

#. Release custom workflows that can be derived from the ``tasks.yaml`` file
   from fuel-library or be delivered by a maintenance update
#. Plugins custom workflows that are specified by plugin developers
#. Environment custom workflows that include environment specific tasks specified
   by the user