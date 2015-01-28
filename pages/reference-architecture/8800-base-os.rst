
.. _operating-system-role-arch:

How the Operating System Role is provisioned
============================================

Fuel provisions
the :ref:`Operating System Role<operating-system-role-term>`
with either the CentOS or Ubuntu operating system
that was selected for the environment
but :ref:`Puppet<puppet-term>` does not deploy other packages
on this node
or provision the node in any way.

The Operating System role is defined in the
:ref:`openstack.yaml<openstack-yaml-ref>` file;
the internal name is **base-os**.
Fuel installs a standard set of operating system packages
similar to what it installs on other roles;
use the **dpkg -l** command on Ubuntu or the **rpm -qa** command on CentOS
to see the exact list of packages that are installed.

A few configurations are applied to an Operating System role.
For environments provisioned with the traditional tools,
these configurations are applied by :ref:`Cobbler<cobbler-term>` snippets
that run during the provisioning phase.
When using image-based provisioning,
**cloud init** applies these configurations.
These include:

- :ref:`Disk partitioning<customize-partitions-ug>`.
  The default partitioning allocates a small partition (about 15GB)
  on the first disk for the `root` partition
  and leaves the rest of the space unallocated;
  users can manually allocate the remaining space.

- The :ref:`public key<public-key-ug>` that is assigned
  to all target nodes in the environment

- The :ref:`Kernel parameters<kernel-parameters-ug>`
  that are applied to all target nodes

- :ref:`Network settings<network-settings-ug>`
  configure the Admin :ref:`logical networks<logical-networks-arch>`
  with a static IP address.
  No other networking is configured.

The following configurations that are set in the Fuel Web UI
have no affect on the Operating System role:

- :ref:`Mapping of logical networks to physical interfaces<map-logical-to-physical>`.
  All connections for the :ref:`logical networks<logical-networks-arch>`
  that connect this node to the rest of the environment
  need to be defined.

- :ref:`VLAN splinters<vlan-splinters-ug>`

- :ref:`Debug logging<debug-level-ug>`

- :ref:`Syslog<syslog-ug>`

See :ref:`operating-system-role-ops`
for information about configuring a provisioned Operating System role.

