Calculating CPU
----------------

Use the following formula to calculate the number of CPU cores per virtual machine::

  max GHz /(number of GHz per core x 1.3 for hyper-threading)

Example::
  
  16 GHz / (2.4 x 1.3) = 5.12

Therefore, you must assign at least 5 CPU cores per virtual machine.

Use the following formula to calculate the total number of CPU cores::

  (number of VMs x number of GHz per VM) / number of GHz per core

Example::

  (100 VMs * 2 GHz per VM) / 2.4 GHz per core = 84

Therefore, the total number of CPU cores for 100 virtual machines is 84.

Depending on the selected CPU you can calculate the required number of sockets.
Use the following formula::

  total number of CPU cores / number of cores per socket

For example, you use Intel E5 2650-70 8 core CPU:: 

  84 / 8 = 11

Therefore, you need 11 sockets. To calculate the number of servers required for your deployment, use the following formula::
 
  total number of sockets / number of sockets per server

Round the number of sockets to an even number to get 12 sockets. Use the following formula::

  12 / 2 = 6

Therefore, you need 6 dual socket servers.  
You can calculate the number of virtual machines per server using the following formula::

  number of virtual machines / number of servers

Example::

  100 / 6 = 16.6

Therefore, you can deploy 17 virtual machines per server.

Using this calculation, you can add additional servers accounting for 17 virtual machines per server.

The calculation presumes the following conditions:

* No CPU oversubscribing

* If you use hyper-threading, count each core as 1.3, not 2. 

* CPU supports the technologies required for your deployment

Calculating Memory
--------------------

Continuing to use the example from the previous section, we need to determine 
how much RAM will be required to support 17 VMs per server. Let's assume that 
you need an average of 4 GBs of RAM per VM with dynamic allocation for up to 
12GBs for each VM. Calculating that all VMs will be using 12 GBs of RAM requires 
that each server have 204 GBs of available RAM. 

You must also consider that the node itself needs sufficient RAM to accommodate 
core OS operations as well as RAM for each VM container (not the RAM allocated 
to each VM, but the memory the core OS uses to run the VM). The node's OS must 
run it's own operations, schedule processes, allocate dynamic resources, and 
handle network operations, so giving the node itself at least 16 GBs or more RAM 
is not unreasonable.

Considering that the RAM we would consider for servers comes in 4 GB, 8 GB, 16 GB 
and 32 GB sticks, we would need a total of 256 GBs of RAM installed per server. 
For an average 2-CPU socket server board you get 16-24 RAM slots. To have 
256 GBs installed you would need sixteen 16 GB sticks of RAM to satisfy your RAM 
needs for up to 17 VMs requiring dynamic allocation up to 12 GBs and to support 
all core OS requirements. 

You can adjust this calculation based on your needs. 

Calculating Storage
--------------------

When it comes to disk space there are several types that you need to consider:

* Ephemeral (the local drive space for a VM)
* Persistent (the remote volumes that can be attached to a VM)
* Object Storage (such as images or other objects)

As far as local drive space that must reside on the compute nodes, in our 
example of 100 VMs we make the following assumptions:

* 150 GB local storage per VM
* 5 TB total of local storage (100 VMs * 50 GB per VM)
* 500 GB of persistent volume storage per VM
* 50 TB total persistent storage

Returning to our already established example, we need to figure out how much 
storage to install per server. This storage will service the 17 VMs per server. 
If we are assuming 50 GBs of storage for each VMs drive container, then we would 
need to install 2.5 TBs of storage on the server. Since most servers have 
anywhere from 4 to 32 2.5" drive slots or 2 to 12 3.5" drive slots, depending on 
server form factor (i.e., 2U vs. 4U), you will need to consider how the storage 
will be impacted by the intended use.

If storage impact is not expected to be significant, then you may consider using 
unified storage. For this example a single 3 TB drive would provide more than 
enough storage for seventeen 150 GB VMs. If speed is really not an issue, you might even 
consider installing two or three 3 TB drives and configure a RAID-1 or RAID-5 
for redundancy. If speed is critical, however, you will likely want to have a 
single hardware drive for each VM. In this case you would likely look at a 3U 
form factor with 24-slots.

Don't forget that you will also need drive space for the node itself, and don't 
forget to order the correct backplane that supports the drive configuration 
that meets your needs. Using our example specifications and assuming that speed 
is critical, a single server would need 18 drives, most likely 2.5" 15,000 RPM 
146 GB SAS drives. 

Throughput
++++++++++

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

Remote storage
++++++++++++++

IOPS will also be a factor in determining how you plan to handle persistent 
storage. For example, consider these options for laying out your 50 TB of remote 
volume space:

* 12 drive storage frame using 3 TB 3.5" drives mirrored

  * 36 TB raw, or 18 TB usable space per 2U frame
  * 3 frames (50 TB / 18 TB per server)
  * 12 slots x 100 IOPS per drive = 1200 Read IOPS, 600 Write IOPS per frame
  * 3 frames x 1200 IOPS per frame / 100 VMs = 36 Read IOPS, 18 Write IOPS per VM

* 24 drive storage frame using 1TB 7200 RPM 2.5" drives

  * 24 TB raw, or 12 TB usable space per 2U frame
  * 5 frames (50 TB / 12 TB per server)
  * 24 slots x 100 IOPS per drive = 2400 Read IOPS, 1200 Write IOPS per frame
  * 5 frames x 2400 IOPS per frame / 100 VMs = 120 Read IOPS, 60 Write IOPS per frame

You can accomplish the same thing with a single 36 drive frame using 3 TB 
drives, but this becomes a single point of failure in your environment.

Object storage
++++++++++++++

When it comes to object storage, you will find that you need more space than 
you think.  For example, this example specifies 50 TB of object storage.  

Object storage uses a default of 3 times the required space for replication, 
which means you will need 150 TB. However, to accommodate two hands-off zones, 
you will need 5 times the required space, which actually means 250 TB. 
The calculations don't end there. You don't ever want to run out of space, so 
"full" should really be more like 75% of capacity, which means you will need a 
total of 333 TB, or a multiplication factor of 6.66.

Of course, that might be a bit much to start with; you might want to start 
with a happy medium of a multiplier of 4, then acquire more hardware as your 
drives begin to fill up. That calculates to 200 TB in our example. So how do 
you put that together? If you were to use 3 TB 3.5" drives, you could use a 12 
drive storage frame, with 6 servers hosting 36 TB each (for a total of 216 TB). 
You could also use a 36 drive storage frame, with just 2 servers hosting 108 TB 
each, but its not recommended due to the high cost of failure to replication 
and capacity issues.

Calculating Network
--------------------

Perhaps the most complex part of designing an OpenStack environment is the 
networking. 

An OpenStack environment can involve multiple networks even beyond the Public, 
Private, and Internal networks.  Your environment may involve tenant networks, 
storage networks, multiple tenant private networks, and so on. Many of these 
will be VLANs, and all of them will need to be planned out in advance to avoid 
configuration issues.

In terms of the example network, consider these assumptions:

* 100 Mbits/second per VM
* HA architecture
* Network Storage is not latency sensitive

In order to achieve this, you can use two 1 Gb links per server (2 x 1000 
Mbits/second / 17 VMs = 118 Mbits/second). 

Using two links also helps with HA. You can also increase throughput and 
decrease latency by using two 10 Gb links, bringing the bandwidth per VM to 
1 Gb/second, but if you're going to do that, you've got one more factor to 
consider.

Scalability and oversubscription
++++++++++++++++++++++++++++++++

It is one of the ironies of networking that 1 Gb Ethernet generally scales 
better than 10Gb Ethernet -- at least until 100 Gb switches are more commonly 
available. It's possible to aggregate the 1 Gb links in a 48 port switch, so 
that you have 48 x 1 Gb links down, but 4 x 10 Gb links up. Do the same thing with a 
10 Gb switch, however, and you have 48 x 10 Gb links down and 4 x 100b links up, 
resulting in oversubscription.

Like many other issues in OpenStack, you can avoid this problem to a great 
extent with careful planning. Problems only arise when you are moving between 
racks, so plan to create "pods", each of which includes both storage and 
compute nodes. Generally, a pod is the size of a non-oversubscribed L2 domain.

Hardware for this example
+++++++++++++++++++++++++

In this example, you are looking at:

* 2 data switches (for HA), each with a minimum of 12 ports for data 
  (2 x 1 Gb links per server x 6 servers)
* 1 x 1 Gb switch for IPMI (1 port per server x 6 servers)
* Optional Cluster Management switch, plus a second for HA

Because your network will in all likelihood grow, it's best to choose 48 port 
switches. Also, as your network grows, you will need to consider uplinks and 
aggregation switches.

Summary
----------

In general, your best bet is to choose a 2 socket server with a balance in I/O, 
CPU, Memory, and Disk that meets your project requirements. 
Look for a 1U R-class or 2U high density C-class servers. Some good options 
from Dell for compute nodes include:

* Dell PowerEdge R620
* Dell PowerEdge C6220 Rack Server
* Dell PowerEdge R720XD (for high disk or IOPS requirements)

You may also want to consider systems from HP (http://www.hp.com/servers) or 
from a smaller systems builder like Aberdeen, a manufacturer that specializes 
in powerful, low-cost systems and storage servers (http://www.aberdeeninc.com).
