
.. _linux-distro-plan:

Linux Distribution for Nodes
============================

Fuel allows you to deploy either the CentOS or Ubuntu
Linux distribution as the Host O/S on the nodes.
All nodes in the environment must run the same Linux distribution.
Often, the choice is made based on personal preference;
many administrative tasks on the nodes
must be performed at shell level
and many people choose the distribution
with which they are most comfortable.

Some specific considerations:

- Each distribution has some hardware support issues.
  See :ref:`RelNotes_50` for details about known issues.
- In particular, the CentOS version used for OpenStack
  does not include native support for VLANs
  while the Ubuntu version does.
  In order to use VLANs on CentOS based nodes,
  you must configure VLAN splinters.
- CentOS supports .rpm packages; Ubuntu supports .deb packages.
