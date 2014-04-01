When Master Node Installation is Done
-------------------------------------

Once the Master node is installed, power on all slave nodes and log in to the 
Fuel UI. The login prompt on the console of the master node will show you the
URL you need to use. The default address is http://10.20.0.2:8000/

Slave nodes will automatically boot into bootstrap mode (CentOS based Linux 
in memory) via PXE and you will see notifications in the user interface about 
discovered nodes. At this point, you can create an environment, add nodes into 
it, and start configuration.

Networking configuration is the most complicated part, so please read the 
networking section of the documentation carefully.
