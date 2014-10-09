
.. _node-term:

Node
-----------
A node is a physical or virtual server
that is provisioned to run a specific set of OpenStack services.
Nodes are often identified by the :ref:`role<role-term>`
that they run
(for example, Controller node or Compute node)
but internally they are identified by a node ID number,
such as node-1, node-2, and so forth.
Use the **fuel node list** command
on the Fuel Master node to see the node IDs
that are assigned for your environment.
See :ref:`nodes-arch` for details about the information
displayed by this command.

Fuel assigns node numbers sequentially,
in the order that the hardware is discovered.
The node ID is a primary key
so node IDs are never reused
unless the environment is redeployed.
For example,
if you deploy an environment with ten nodes,
then delete node-6 and add a new node,
the new node will be node-11.

The node-id can be used to SSH to a node
and is used to identify a specific node
from :ref:`fuel CLI<cli_usage>`.

The term "node" is also used to refer
to a member of a :ref:`Galera Cluster<galera-cluster-term>`,
a :ref:`Pacemaker<pacemaker-term>` Cluster,
a :ref:`RabbitMQ<rabbitmq-term>` Cluster,
a :ref:`Hadoop<hadoop-term>` Cluster,
and so forth.
