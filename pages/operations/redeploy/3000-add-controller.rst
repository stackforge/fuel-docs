
.. _add-controller-ops:

Adding a Controller node
------------------------

Mirantis OpenStack 5.0.1 and later
allows you to add Controller nodes to your environment
without redeploying the entire environment.
You can now deploy a single-Controller "highly-available" environment;
it is not actually highly-available
until at least three Controller nodes are configured
but it is run using :ref:`Pacemaker<pacemaker-term>`,
:ref:`Corosync<corosync-term>`,
and the other utilities used to manage an HA environment.

You may want to add a Controller node to your environment
for any of the following reasons:

- You deployed a single-node environment
  and want to make it highly available.
- The resources of your existing Controller nodes
  are being exhausted and you want to supplement them.
- You are replacing a Controller node that failed;
  you will first need to remove the failed Controller
  as discussed in :ref:`remove-controller-ops`.

To add a Controller to your environment:

#. Physically configure the server in your hardware environment
   and wait for it to be discovered;
   it will appear as an "Unallocated Node"
   on your Fuel dashboard.

#. 
