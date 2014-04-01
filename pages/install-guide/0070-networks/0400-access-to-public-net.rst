.. _access_to_public_net:

Deployment configuration to access OpenStack API and VMs from host machine
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Helper scripts for VirtualBox create network adapters `eth0`, `eth1`, `eth2`
which are represented on host machine as `vboxnet0`, `vboxnet1`, `vboxnet2`
correspondingly, and assign IP addresses for adapters: 

  vboxnet0 - 10.20.0.1/24, 
  vboxnet1 - 172.16.1.1/24, 
  vboxnet2 - 172.16.0.1/24.

For the demo environment on VirtualBox, the first network adapter is used to run Fuel 
network traffic, including PXE discovery.

To access the Horizon and OpenStack RESTful API via Public network from the host machine,
it is required to have route from your host to the Public IP address on the OpenStack Controller.
Also, if access to Floating IP of VM is required, it is also required to have route
to the Floating IP on Compute host, which is binded to Public interface there.
To make this configuration possible on VirtualBox demo environment, the user has
to run Public network untagged. On the image below you can see the configuration of
Public and Floating networks which will allow to make this happen.

.. image:: /_images/vbox_public_settings.jpg
  :align: center
  :width: 100%

By default Public and Floating networks are ran on the first network interface.
It is required to change it, as you can see on this image below. Make sure you change
it on every node.

.. image:: /_images/vbox_node_settings.jpg
  :align: center
  :width: 100%

If you use default configuration in VirtualBox scripts, and follow the exact same
settings on the images above, you should be able to access OpenStack Horizon via
Public network after the installation.

If you want to enable Internet on provisioned VMs by OpenStack, you
have to configure NAT on the host machine. When packets reach `vboxnet1` interface,
according to the OpenStack settings tab, they have to know the way out of the host.
For Ubuntu, the following command, executed on the host, can make this happen::

  sudo iptables -t nat -A POSTROUTING -s 172.16.1.0/24 \! -d 172.16.1.0/24 -j MASQUERADE

To access VMs managed by OpenStack it is needed to provide IP addresses from 
Floating IP range. When OpenStack environment is deployed and VM is provisioned there,
you have to associate one of the Floating IP addresses from the pool to this VM,
whether in Horizon or via Nova CLI. By default, OpenStack blocks all the traffic to the VM.
To allow the connectivity to the VM, you need to configure security groups.
It can be done in Horizon, or from OpenStack Controller using the following commands::

  . /root/openrc
  nova secgroup-add-rule default icmp -1 -1 0.0.0.0/0
  nova secgroup-add-rule default tcp 22 22 0.0.0.0/0

IP ranges for Public and Management networks (172.16.*.*) are defined in ``config.sh`` 
script. If default values don't fit your needs, you are free to change them, but before
the installation of Fuel Master node.
