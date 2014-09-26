
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

The following partition types may be configured:

- Base System: comprehensive of swap space, includes operating system and basic software
- Virtual Storage: used by Nova running instances
- Image Storage: used by Glance to store images
- Cinder: used by Cinder
- Ceph and Ceph Journal: used by Ceph
- MongoDB: used for Ceilometer information stored in MongoDB
- Mysql database: stores Zabbix statistics on Zabbix nodes

To modify the disk allocation,
click on the bar for a disk.
This example is for a node that runs
both a Compute node and a Storage - Cinder LVM role;
clicking on the center bar gives a display
similar to the following:

.. image:: /_images/user_screen_shots/partition-disks.png
   :width: 80%

To change the disk allocation for a specific role,
just type in the amount of space (in MB) you want to allocate.
You can use round numbers;
Fuel adjusts this number to satisfy block size boundary requirements and such.
The display adjusts to show the new allocation;
click on the "Apply" button in the lower right of the screen
to save the modifications
and return to the Node List.
Click on the "Back to Node List" button in the lower left of the screen
if you do not want to change the disk allocation.

Note the following:

- Disk partitions can be customized
  only after a role is assigned to the node.
- If you have multiple nodes that have identical hardware
  and identical roles,
  you can partition all their disks at the same time
  by selecting them all and then clicking the "Configure Disks" button.
- If the node's roles are modified,
  the disk configuration is reset to default values.

