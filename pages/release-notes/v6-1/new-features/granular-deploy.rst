
Granular deployment based on pluggable tasks
--------------------------------------------

In earlier releases of Fuel, one monolithic task (``site.pp``) was used
to complete the deployment.
Fuel 6.1 provides
`granular deployment <https://blueprints.launchpad.net/fuel/+spec/granular-deployment-based-on-tasks>`_
based on tasks which allows users to extend the deployment
using tasks instead of patching puppet manifests directly.
Task execution order is calculated using the task dependencies graph.
Note that you can not only form your deployment criteria, but also
render graphs; see :ref:`Graph representation <render-graph>` for more details.
For additional instructions, see :ref:`Task-based deployment <task-based-deploy>`.
