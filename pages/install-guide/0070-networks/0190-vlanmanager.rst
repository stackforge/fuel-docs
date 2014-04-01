.. raw:: pdf

   PageBreak

VLANManager
------------

VLANManager mode is more suitable for large scale clouds. The idea behind 
this mode is to separate groups of virtual machines owned by different 
projects into separate and distinct L2 networks. In VLANManager, this is done 
by tagging IP frames, identified by a given VLAN. It allows virtual machines 
inside the given project to communicate with each other and not to see any 
traffic from VMs of other projects. Again, like with FlatDHCPManager, switch 
ports must be configured as tagged (trunk) ports to allow this scheme to work.
