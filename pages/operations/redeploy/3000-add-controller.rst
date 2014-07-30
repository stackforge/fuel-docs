
.. _add-controller-ops:

Add a Controller node
---------------------

Mirantis OpenStack 5.0.1 and later
allows you to add Controller nodes to your environment
without redeploying the entire environment.

You may want to add a Controller node to your environment
for any of the following reasons:

- You deployed a single-Controller, HA-ready environment;
  it is not actually highly-available
  until at least three Controller nodes are configured
  but it is run using :ref:`Pacemaker<pacemaker-term>`,
  :ref:`Corosync<corosync-term>`,
  and the other utilities used to manage an HA environment.
  To make it highly available,
  add two or more Controller nodes.

- The resources of your existing Controller nodes
  are being exhausted and you want to supplement them.

- You are replacing a Controller node that failed;
  you will first need to remove the failed Controller
  as discussed in :ref:`remove-controller-ops`.

Each Controller cluster should include an odd number of nodes --
1 node, 3 nodes, 5 nodes, et cetera.
If you are running Ceilometer,
you should have the same number of MongoDB nodes
as you have Controller nodes.

To add Controllers to your environment:

#. Physically configure the servers in your hardware environment
   and wait for them to be discovered
   and reflected in the "Unallocated Node" count on your Fuel dashboard.

#. Use the :ref:`assign-roles-ug` screen to assign
   the Controller role to each node.
   If you are also adding MongoDB nodes,
   assign those roles to the appropriate nodes.

#. Check the connectivity between the nodes
   by running :ref:`verify-networks-ug`.

#. Click "Deploy changes" and wait for Fuel to redeploy the environment.

#. Run the :ref:`post-deployment checks`<Post-Deployment-Check-run>`.

