Throughput
~~~~~~~~~~

As far as throughput, that's going to depend on what kind of storage you choose.
In general, you calculate IOPS based on the packing density (drive IOPS * drives 
in the server / VMs per server), but the actual drive IOPS will depend on the 
drive technology you choose.  For example:

* 3.5" slow and cheap (100 IOPS per drive, with 2 mirrored drives)

  * 100 IOPS * 2 drives / 17 VMs per server = 12 Read IOPS, 6 Write IOPS

* 2.5" 15K (200 IOPS, four 600 GB drive, RAID-10)

  * 200 IOPS * 4 drives / 17 VMs per server = 48 Read IOPS, 24 Write IOPS

* SSD (40K IOPS, eight 300 GB drive, RAID-10)

  * 40K * 8 drives / 17 VMs per server = 19K Read IOPS, 9.5K Write IOPS

Clearly, SSD gives you the best performance, but the difference in cost between 
SSDs and the less costly platter-based solutions is going to be significant, to 
say the least. The acceptable cost burden is determined by the balance between 
your budget and your performance and redundancy needs. It is also important to 
note that the rules for redundancy in a cloud environment are different than a 
traditional server installation in that entire servers provide redundancy as 
opposed to making a single server instance redundant.

In other words, the weight for redundant components shifts from individual OS 
installation to server redundancy. It is far more critical to have redundant 
power supplies and hot-swappable CPUs and RAM than to have redundant compute 
node storage. If, for example, you have 18 drives installed on a server and have 
17 drives directly allocated to each VM installed and one fails, you simply 
replace the drive and push a new node copy. The remaining VMs carry whatever 
additional load is present due to the temporary loss of one node.
