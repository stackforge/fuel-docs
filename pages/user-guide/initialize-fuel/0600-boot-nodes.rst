
.. _boot-nodes-ug:

Boot the node servers
=====================

After the Fuel Master Node is installed and booted,
power on all slave nodes that you are going to use for the OpenStack environment.
First, ensure that servers are physically installed
in the same network Master node is or,
if you are using virtual servers,
are bridged to it so they are in the same L2 network segment.
Then you can boot each node (other than the Fuel master) in PXE boot mode
by either modifying the BIOS boot order
or using F12 (or another key your server uses) to enable PXE booting.

#. Each node sends out DHCP discovery requests and gets the response from
   the Fuel Master node that runs the DHCP server.
#. When a node receives the response from the Fuel Master node,
   it fetches the pxelinux bootloader
   and then the bootstrap image (CentOS based Linux in memory)
   from the Fuel Master node's TFTP server and boots into it.
#. When this image is loaded,
   it reports the node's readiness and configuration to the Fuel Master.
   This can take a few minutes.

Follow the instructions in :ref:`boot-fuel-master-ug`
to log into the Fuel UI if you have not already done so.
You will see notifications in the user interface about the discovered nodes.
Find the count of "Discovered nodes"
in the upper right area of the Fuel Web UI;
this value is incremented as each new node is ready.
When the count of "Discovered nodes"
becomes equal to the amount of the servers you have booted in the network,
you can create an OpenStack environment,
add nodes into it, and start configuration.

Networking configuration is the most complicated part,
so please read :ref:`net-topology-plan`
and the other documents it references before you begin.

When you have configured all the nodes and their roles,
and pressed the :ref:`Deploy<deploy-changes>` button:

#. Each server should reboot and start the provisioning
   of the selected operating system using the same PXE boot scheme,
   so ensure that all the servers have successfully rebooted,
   booted over the network and started the installers.
#. When all servers have been successfully provisioned
   and rebooted again from their local drives
   into the newly installed systems,
   the Fuel Master node starts the deployment of OpenStack on them.

