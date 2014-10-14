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
and assigned IP addresses for adapters:
::

  vboxnet0 - 10.20.0.1/24,
  vboxnet1 - 172.16.0.1/24,
  vboxnet2 - 172.16.1.1/24.

For the demo environment on VirtualBox,
the first network adapter is used to run Fuel network traffic,
including PXE discovery.

To access the Horizon and OpenStack RESTful API
via the Public :ref:`logical network<logical-networks-arch>`
from the host machine,
you must have a route from your host
to the Public IP address on the OpenStack Controller.
Also, if access to Floating IP of VM is required,
you must have a route to the Floating IP on the Compute host,
which is binded to the Public interface there.
To make this configuration possible on the VirtualBox demo environment,
the user must run the Public network untagged.
On the image below, you can see the configuration
of the  Public and Floating networks
which allows this to happen.

.. image:: /_images/vbox_public_settings.jpg
  :align: center
  :width: 80%

By default, the Public and Floating networks
are run on the first network interface.
You must modify this on every node
as shown here:

.. image:: /_images/vbox_node_settings.jpg
  :align: center
  :width: 80%

If you use the default configuration in VirtualBox scripts,
then configure the network as shown above,
you should be able to access OpenStack Horizon via
Public network after the installation.

If you want to enable Internet access
on VMs that are provisioned OpenStack,
you must configure NAT on the host machine.
When packets access the `vboxnet1` interface,
according to the OpenStack settings tab,
they must know the way out of the host.
For Ubuntu, the following command,
executed on the host, can make this happen::

  sudo iptables -t nat -A POSTROUTING -s 172.16.1.0/24 \! -d 172.16.1.0/24 -j MASQUERADE

To access VMs managed by OpenStack,
you must provide IP addresses from the Floating IP range.
When the OpenStack environment is deployed
and a VM is provisioned there,
you must associate one of the Floating IP addresses
from the pool to this VM,
whether in Horizon or via Nova CLI.
By default, OpenStack blocks all the traffic to the VM.
To allow the connectivity to the VM,
you need to configure :ref:`security groups<security-groups-term>`.
It can be done in Horizon,
or from the Controller node using the following commands::

  . /root/openrc
  nova secgroup-add-rule default icmp -1 -1 0.0.0.0/0
  nova secgroup-add-rule default tcp 22 22 0.0.0.0/0

IP ranges for Public and Management networks (172.16.*.*)
are defined in the ``config.sh`` script.
If the default values don't fit your needs,
you are free to change them
before installing the Fuel Master node.
