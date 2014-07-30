
.. _remove-controller-ops:

Removing a Controller
---------------------

If the server used for a Controller node fails,
it must be replaced with a new server.
To do this, one must remove the old controller
and the add the new one into the environment.

To remove a controller node:

#. [any way to save data?]

#. Remove controller from environment (add details)

   Puppet removes the controller from files
   and retriggers services.

#. [Manual corosync step -- remove/add new node from/to
   redundant ring protocol]

#. [Does Nailgun reassign an IP from an old node to a new one?]

#. Physically remove the controller from the configuration.


