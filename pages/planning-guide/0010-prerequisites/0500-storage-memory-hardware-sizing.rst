
.. _storage-hardware-plan:

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
