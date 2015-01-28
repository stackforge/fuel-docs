
.. _operating-system-role-arch:

How the Operating System Role is provisioned
============================================

Fuel provisions
the :ref:`Operating System Role<operating-system-role-term>`
with either the CentOS or Ubuntu operating system
that was selected for the environment
but :ref:`Puppet<puppet-term>` does not deploy other packages
on this node.
This section gives details about what Fuel installs on this role;
see :ref:`operating-system-role-ops`
for information about configuring a provisioned Operating System role.

How provisioning is applied
---------------------------

The Operating System role is defined in the
:ref:`openstack.yaml<openstack-yaml-ref>` file;
the internal name is **base-os**.

Packages included
-----------------

Fuel installs the following packages on an Operating System role:


Configuration settings used
---------------------------

Configurations and settings that are applied to the operating system
are applied to an Operating System role.
These include:

- :ref:`Disk partitioning<customize-partitions-ug>`.
  The default partitioning allocates a small partition (about 15GB)
  on the first disk for the `root` partition
  and leave the rest of the space unallocated;
  users can manually allocate the remaining space.
  Note that, when using Ubuntu, the operating system
  can only be installed on the first disk.

- :ref:`Network settings<network-settings-ug>`,
  including :ref:`NIC aggregation<nic-bonding-ui>`.

- :ref:`Mapping of logical networks to physical interfaces<map-logical-to-physical>`.
  All connections for the :ref:`logical networks<logical-networks-arch>`
  that connect this node to the rest of the environment
  need to be defined.

- :ref:`Debug logging<debug-level-ug>` ??

- The :ref:`public key<public-key-ug>` that is assigned
  to target nodes in the environment
  is also applied to Operating System roles.

- :ref:`VLAN splinters<vlan-splinters-ug>` ?

- :ref:`Kernel parameters<kernel-parameters-ug>`
  are applied to Operating System roles.

- :ref:`Syslog<syslog-ug>`?


