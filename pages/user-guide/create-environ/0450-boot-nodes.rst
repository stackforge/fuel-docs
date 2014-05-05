
.. _boot-nodes-ug:

Boot the node servers
---------------------

After the Fuel Master Node is booted,
you must boot all the nodes that will be used
for the OpenStack environment:

#. Be sure that node servers are physically installed in the network.
#. Boot each node (other than the Fuel master) in PXE boot mode.
#. After it is rebooted,
   each node sends out DHCP/PXE discovery requests
   and get the response from the Fuel Master node
   that runs the DHCP/PXE server.
#. When each node receives the response from the Fuel Master node,
   it fetches the boostrap image from the Fuel Master node
   and self-installs the bootstrap image,
   erasing any other operating system that might have been installed.
#. When this is done, the node reports its readiness to the Fuel Master;
   this takes a few minutes.
#. The count of "Discovered nodes" is incremented
   and displayed in the upper right corner of the Fuel Web UI.

When the count of "Discovered nodes" reflects
all the servers that are configured in the network,
the network is ready for you to create and deploy
your OpenStack environment.
