
Granular deployment based on tasks
----------------------------------

In earlier releases,
only one task (``site.pp``) was ran.
Fuel 6.1 provides
`granular deployment <https://blueprints.launchpad.net/fuel/+spec/granular-deployment-based-on-tasks>`_
based on tasks.
It allows to extend
deployment scenario, since it is
not required to patch puppet manifests anymore.
Now you can use the set of tasks instead; execution
order is calculated with resolving task dependencies graph.
For instructions, see :ref:`Task-based deployment <task-based-deploy>`.
Note, that you can not only
form your deployment criteria,
but also render graphs;
see :ref:`Graph representation <render-graph>` for more details.



