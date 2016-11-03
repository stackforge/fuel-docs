.. _yaql-term:

YAQL
----

`YAQL <https://github.com/openstack/yaql>` is a parser for YAML data.

YAQL iterates over data using keys for hashes, access to arrays, or gets
the values.

In Fuel, Nailgun has an internal YAQL evaluator that evaluates the expressions
you write in tasks. Fuel the runs the task on a node.