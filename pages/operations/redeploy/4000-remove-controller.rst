
.. _remove-controller-ops:

Remove a Controller node
------------------------

You may need to remove a Compiler node from your environment,
usually because you want to replace it with a different server.
This may be because of a catastrophic hardware failure
on the node's server
or because you want to replace the server
with a more powerful system.

.. note: When running a multi-node HA cluster,
         all controllers contain the same data
         so it is not necessary to preserve data before removing
         one of the Controller nodes.

         If you have only one Controller running
         and it fails or needs to be replaced with a more powerful system,
         you need a good backup from which to restore the data.
         Often, if you must replace the Controller node
         in a single-Controller node environment,
         you are better off redeploying the environment from scratch.

To remove a Controller node:

#. Remove Controller(s) from environment
   by going to the Nodes tab in the Fuel desktop,
   selecting the node(s) to be deleted,
   and click on the "Delete Nodes" button.

   Puppet removes the controller(s) from the configuration files
   and retriggers services.

#. [Does Nailgun reassign an IP from an old node to a new one?]

#. Physically remove the controller from the configuration.


