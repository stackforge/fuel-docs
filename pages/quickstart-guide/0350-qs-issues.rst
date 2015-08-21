.. _qs_issues_linux:

Resolving the Network Issues on Some Linux Distributions
========================================================

In some Linux distributions, for example in Fedora 20, you may encounter an issue
when the NetworkManager service interfering with the VirtualBox host-only network
adapters.
The NetworkManager service may interfere with the VirtualBox IP addresses assigned
for host-only adapters and remove the IP addresses after the DHCP timeout.
This may result in issues with an HA environment deployment.

**Procedure:**

#. Verify the Fuel installation is completed.
#. Open the VirtualBox network configuration file for editing.
#. In the beginning of the configuration file, add the following line:

   ::

      NM_CONTROLLED=no

#. Save the file.
#. Repeat **Step 2** to **Step 5** for all network interface configuration files.
   Depending on how you configure your environment and your Linux distribution,
   the network configuration files may have different names.

   **Example:**

   ::

      [user@system]$ ls -l /etc/sysconfig/network-scripts/ifcfg-*
      -rw-r--r--. 1 root root 254 Jan 14  2014 /etc/sysconfig/network-scripts/\
      ifcfg-lo
      -rw-r--r--. 1 root root 178 Feb 13 12:01 /etc/sysconfig/network-scripts/\
      ifcfg-p2p1
      -rw-r--r--. 1 root root 242 Feb 16 12:14 /etc/sysconfig/network-scripts/\
      ifcfg-Wired_connection_1
      -rw-r--r--. 1 root root 242 Feb 16 12:14 /etc/sysconfig/network-scripts/\
      ifcfg-Wired_connection_2
      -rw-r--r--. 1 root root 242 Feb 16 12:14 /etc/sysconfig/network-scripts/\
      ifcfg-Wired_connection_3

   In the example above, the ``NM_CONTROLLED=no`` line must be added to the following
   files:

   * ``Wired_connection_1``
   * ``Wired_connection_2``
   * ``Wired_connection_3``

#. In VirtualBox, stop all VMs.
#. Reboot the host operating system.
#. Start all VMs.

.. seealso::

   - `LP1421723 <https://bugs.launchpad.net/fuel/+bug/1421723>`_
