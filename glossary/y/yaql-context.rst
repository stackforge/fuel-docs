.. _yaql-context:

YAQL context
------------

Context is a YAQL data representation of a cluster. Context is different
for different deployments.

There are two context types: current and previous.

When you create a cluster and intend to deploy it, you have the current context
for the node task equal to a future ``astute.yaml`` file of the node.
The previous context in this case is null.