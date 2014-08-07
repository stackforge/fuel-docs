
.. _customize-partitions-ug:

Disk partitioning
-----------------

Fuel allocates some reasonable amount of disk space 
for each role that is assigned to a node.
To modify this allocation,
select the node(s) you want to modify
and click on the "Configure Disks" button.
You can also access this screen
by clicking the gear wheel to the right of the node listing;
in the detailed information window that is displayed,
click the "Configure Disks" button.

This displays a screen with a bar for each disk;
color-coded sections represent the disk partitions
that have been assigned.

To modify the disk allocation,
double click on the bar for a disk.
This example is for a node that runs
both a Compute node and a Storage - Cinder LVM role;
clicking on the center bar gives a display
similar to the following:

.. image:: /_images/user_screen_shots/partition-disks.png
   :width: 80%

To change the disk allocation for a specific role,
just type in the number of MB of space you want to allocate.
You can use round numbers;
Fuel adjusts this number to satisfy block size boundary requirements and such.

Note the following:

- Disk partitions can be customized
  only after a role is assigned to the node.
- If you have multiple nodes that have identical hardware
  and identical roles,
  you can partition all their disks at the same time
  by selecting them all and then clicking the "Configure Disks" button.

