
.. _operating-system-role-term:

Operating System Role
---------------------

The Operating System :ref:`role<role-term>`
(internal name: base-os)
can be deployed by Fuel 6.1 and later.
This role is provisioned with either the CentOS or Ubuntu operating system
that was selected for the environment
but :ref:`Puppet<puppet-term>` does not deploy other packages
on this node.
Instead, the user can configure this node as desired
or perhaps install a :ref:`plugin<plug-in-term>`
that configures the node.

For more information, see:

- The Operating System role is assigned on the
  :ref:`assign-roles-ug` screen.
- :ref:`operating-system-role-arch`
- :ref:`operating-system-role-ops`
