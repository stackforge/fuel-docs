
.. _fuel-install.rst:

Fuel Installation and Deployment Issues
=======================================

Known Issues in 6.0
-------------------

Fuel may not allocate enough IP addresses for expansion
+++++++++++++++++++++++++++++++++++++++++++++++++++++++

The pool of IP addresses to be used by all nodes
in the OpenStack environment
is allocated when the Fuel Master Node is initially deployed.
The IP settings cannot be changed
after the initial boot of the Fuel Master Node.
This may mean that the IP pool
is too small to support additional nodes
added to the environment
without redeploying the environment.
See :ref:`public-floating-ips-arch`
for more information.
See `LP1271571 <https://bugs.launchpad.net/fuel/+bug/1271571>`_
for a detailed description of the issues
and pointers to blueprints of proposed solutions.

GRE-enabled Neutron installation runs inter VM traffic through management network
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

In Neutron GRE installations configured with the Fuel UI,
a single physical interface is used
for both OpenStack management traffic and VM-to-VM communications.
This limitation only affects implementations deployed using the Fuel UI;
you can use the :ref:`Fuel CLI<cli_usage>` to use other physical interfaces
when you configure your environment.
See `LP1285059 <https://bugs.launchpad.net/fuel/+bug/1285059>`_.

Fuel default disk partition scheme is sub-optimal
+++++++++++++++++++++++++++++++++++++++++++++++++

* All available hardware LUNs under LVM are used and spanned across;
  for example, OpenStack and guest traffic are coupled.
  See `LP1306792 <https://bugs.launchpad.net/bugs/1306792>`_.

* On target nodes that use Ubuntu as the operating system,
  Ubuntu provisioning applies the default Base System partition
  even if the user choses a different scheme.

New node may not boot because of IOMMU issues
+++++++++++++++++++++++++++++++++++++++++++++

A new node fails when trying to boot into bootstrap.
To fix this issue,
add the "intel_iommu=off" kernel parameter on the Fuel Master node
with the following console command on master node:
::

    `dockerctl shell cobbler cobbler profile edit --name bootstrap --kopts="intel_iommu=off" --in-place`

See `LP1324483 <https://bugs.launchpad.net/bugs/1324483>`_.

Anaconda fails with LVME error on CentOS
++++++++++++++++++++++++++++++++++++++++

Anaconda fails with LVME error: deployment was aborted by provisioning timeout,
because installation of CentOS failed on one of compute nodes.
See `LP1321790 <https://bugs.launchpad.net/bugs/1321790>`_.
This is related to known issues with Anaconda.

Fuel UI does not prevent overlapping IP ranges
++++++++++++++++++++++++++++++++++++++++++++++

The Fuel UI allows IP ranges that overlap in PXE setup.
When configuring IP ranges, be very careful not to use DHCP addresses
that overlap the Static addresses used.
See :ref:`public-floating-ips-arch` for more information.
See `LP1365067 <https://bugs.launchpad.net/bugs/1365067>`_.

Invalid node status after restoring Fuel Master node from backup
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Invalid node status for nodes modified since backup after restore.
Nodes added to an environment after a backup may be reported as offline.
Reboot any bootstrapped nodes after restoring your Fuel Master from a backup.
See `LP1347718 <https://bugs.launchpad.net/bugs/1347718>`_.

Shotgun does not check available disk space before taking a diagnostic snapshot
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Shotgun does not ensure that adequate disk space is available
for the diagnostic snapshot.
Users should manually verify the disk space
before taking a diagnostic snapshot.
See `LP1328879 <https://bugs.launchpad.net/bugs/1328879>`_.



Other Issues
++++++++++++

* The Fuel Master Node can only be installed with CentOS as the host OS.
  While Mirantis OpenStack nodes can be installed
  with either Ubuntu or CentOS as the host OS,
  the Fuel Master Node is only supported on CentOS.

* Deployments done through the Fuel UI
  create all of the networks on all servers
  even if they are not required by a specific role.
  For example, a Cinder node has VLANs created
  and addresses obtained from the public network.

* The provided scripts that enable Fuel
  to be automatically installed on VirtualBox
  create separate host interfaces.
  If a user associates logical networks
  with different physical interfaces on different nodes,
  it causes network connectivity issues between OpenStack components.
  Please check to see if this has happened prior to deployment
  by clicking on the “Verify Networks” button on the Networks tab.

* The Fuel Master node services (such as PostgrSQL and RabbitMQ)
  are not restricted by a firewall.
  The Fuel Master node should live in a restricted L2 network
  so this should not create a security vulnerability.

* We could improve performance significantly by upgrading
  to a later version of the CentOS distribution
  (using the 3.10 kernel or later).
  See `LP1322641 <https://bugs.launchpad.net/bugs/1322641>`_.

* Docker loads images very slowly on the Fuel Master Node.
  See `LP1333458 <https://bugs.launchpad.net/bugs/1333458>`_.

* When using Ubuntu, in rare cases some nodes may stay on the grub prompt.
  This usually occurs if the node is power-cycled during the boot process.
  You should press Enter to continue booting.
  See `LP1356278 <https://bugs.launchpad.net/bugs/1356278>`_.

* :ref:`Fuel CLI<cli_usage>` can not be run by a non-root user.
  See `LP1355876 <https://bugs.launchpad.net/bugs/1355876>`_.

