.. _access_to_public_net:

Deployment configuration to access OpenStack API and VMs from host machine
==========================================================================

Follow the instructions
in :ref:`create-env-ug` and :ref`configure-env-ug`
to create and configure your OpenStack environment.
Most of the steps are the same for a VirtualBox deployment
and the bare-metal deployment.
The one exception is networking,
where the VirtualBox deployment requires some different settings.

Helper scripts for VirtualBox
create the network adapters `eth0`, `eth1`, `eth2`
which are represented on the host machine
as `vboxnet0`, `vboxnet1`, `vboxnet2` correspondingly,
and assigned IP addresses for adapters::

  vboxnet0 - 10.20.0.1/24
  vboxnet1 - 172.16.1.1/24
  vboxnet2 - 172.16.0.1/24

For the demo environment on VirtualBox,
the first network adapter is used to run Fuel network traffic,
including PXE discovery.

To access the Horizon and OpenStack RESTful API
via the Public :ref:`logical network<logical-networks-arch>`
from the host machine,
you must have a route from your host
to the Public IP address on the OpenStack Controller.
Also, if you need to access a VM's Floating IP,
you must also have a route to the Floating IP on the Compute node,
which is bind'ed to the Public interface there.
To make this configuration possible
on the VirtualBox demo environment,
you must run the Public network untagged.
On the image below, you can see the configuration of
Public and Floating networks which allows this:

.. image:: /_images/vbox_public_settings.jpg
  :align: center
  :width: 80%

By default, Public and Floating networks
run on the first network interface.
This must be changed on each node,
to run these networks on eth1
by setting the configuration as shown here:

.. image:: /_images/vbox_node_settings.jpg
  :align: center
  :width: 80%

If you use the default configuration in VirtualBox scripts,
and use the settings shown on the images above,
you should be able to access OpenStack Horizon via
the Public network after the installation.

If you want to enable Internet access
on VMs that are provisioned by OpenStack,
you must configure NAT on the host machine.
When packets reach the `vboxnet1` interface,
according to the OpenStack settings tab,
they must know the way out of the host.
For Ubuntu, the following command, executed on the host,
makes this happen::

  sudo iptables -t nat -A POSTROUTING -s 172.16.1.0/24 \! -d 172.16.1.0/24 -j MASQUERADE

To access VMs managed by OpenStack,
you must provide IP addresses from the Floating IP range.
When the OpenStack environment is deployed and VM is provisioned there,
you have to associate one of the Floating IP addresses
from the pool with this VM,
whether in Horizon or via Nova CLI.
By default, OpenStack blocks all the traffic to the VM.
To allow the connectivity to the VM,
you need to configure :ref:`security groups<security-groups-term>`.
This can be done in Horizon,
or from the OpenStack Controller using the following commands::

  . /root/openrc
  nova secgroup-add-rule default icmp -1 -1 0.0.0.0/0
  nova secgroup-add-rule default tcp 22 22 0.0.0.0/0

IP ranges for Public and Management networks (172.16.*.*)
are defined in the ``config.sh`` script.
If default values do not fit your needs,
you are free to change them,
but you must make the modifications
before running the **launch.sh** command
to install the Fuel Master node.
