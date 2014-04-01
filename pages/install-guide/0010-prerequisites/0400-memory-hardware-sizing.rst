Calculating Memory
------------------

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
