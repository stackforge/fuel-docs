
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
by either modifying BIOS boot order
or using F12 (or another key your server uses) to enable PXE booting.

#. Each node sends out DHCP discovery requests and get the response from
   the Fuel Master node that runs the DHCP server.
#. When a node receives the response from the Fuel Master node,
   it fetches the pxelinux bootloader
   and then the bootstrap image (CentOS based Linux in memory)
   from the Fuel Master node's TFTP server and boots into it.
#. When this image is loaded,
   it reports the node's readiness and configuration to the Fuel Master.
   This can take a few minutes.

Now you can login into the Fuel UI.
The login prompt on the console of the master node
shows you the URL you need to use;
the default address is http://10.20.0.2:8000/.
You will see notifications in the user interface about the discovered nodes.
The count of "Discovered nodes" is incremented with every new node
and displayed in the upper right corner of the Fuel Web UI.
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

