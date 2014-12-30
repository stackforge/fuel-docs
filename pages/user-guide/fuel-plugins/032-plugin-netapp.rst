.. _032-plugin-netapp:

NetApp
++++++

NetApp plug-in will replace
`Cinder LVM <http://docs.openstack.org/juno/config-reference/content/lvm-volume-driver.html>`_, the default volume backend that uses local volumes managed by LVM.


**Requirements**

Note that to enable NetApp plug-in for Cinder, you should check the following:

* NetApp appliance is deployed and configured.

* NetApp appliance is reachable via one of the Mirantis OpenStack networks.

**Limitations**

Since only one Cinder node should be deployed,
Cinder volume is **not** highly available.

**NetApp appliance configuration**

NetApp plug-in was tested via NetApp NFS Simulator and configured according to the step-by-

*Pre setup*
											
Using VMware ESX or VMware Player,
create 2 networks called VM Network and Cluster Network.
Untar the vsim and add it to your VMware ESX inventory/VMware Player
inventory.

.. note:: The VM will have 4 NICs. The first 2 (e0a and e0b)
          are connected to Cluster Network and the second 2
          (e0c and e0d) are connected to the VM Network.
          The VM Network should be the regular VMware vSwitch
          that is bridged onto the lab network. The Cluster Network
          is a vSwitch that's connected to nothing. The purpose
          of the Cluster Network is the following: when you have
          multiple vsims you want to cluster together,
          they use this private network to talk to each other.
          The point is not in clustering vsims (this will not be done),
          so this network will be unused, but you should still create it.
          You should only take into consideration that e0a and e0b are
          connected to a fake network so you should not use them; use e0c and e0d exclusively.
						
*OS setup*
						
#. Start up the VM with the console open.

#. Press Ctrl-C when the message about the boot menu appears (you only get about 10-15 seconds to do this so do not miss it).

#. Select option 4 (*Clean configuration and initialize all disks*).

#. Answer Yes to the next 2 questions. The VM will reboot and do some work.
						
*Cluster setup*
						
#. When asked if you want to join or create a cluster, select *Create*.

#. Answer Yes when asked about a single node cluster.

#. Enter the cluster name: *<cluster_name>-cluster*.

#. Enter cluster base license key. Do not enter any more license keys.

#. Enter the admin password twice.

*Cluster management interface configuration**

::


     Port: e0c
     IP address: 192.168.4.10
     Netmask: 255.255.255.128
     Default gateway 192.168.4.1
     DNS domain name: <name>.netapp.com
     Nameserver IP: 192.18.4.1
     Location: <location_name>

*Node management interface configuration*

::

    Port: e0c
    IP address: 192.168.4.12
    Netmask: 255.255.255.128
    Default gateway 192.168.4.1

Press enter to acknowledge the autosupport notification.

*Cluster configuration*
						
#. You can either continue through the VMware console,
   or switch to SSH at this point.
   If you SSH, connect to the cluster management interface
   (in our case, that is 192.168.4.10).

#. Login at the prompt using <admin_name> and <password>.

#. Add the unassigned disks to the node by entering the following command:

  ::

      storage disk assign -all true -node <cluster_name>-cluster-01

*Create an aggregate using 10 disks*

::

    storage aggregate create -aggregate aggr1 -diskcount 10

*Create a vserver*

::

    vserver create -vserver <server_name>-vserver -rootvolume vol1 -aggregate aggr1 -ns-switch file -rootvolume-security-style unix

*Create a data LIF*

::

     network interface create -vserver bswartz-vserver -lif bswartz-data -role data -home-node <cluster_name>-cluster-01 -home-port e0d -address <192.168.4.15>-netmask <255.255.255.128>

Add a rule to the default export policy: 
vserver export-policy rule create -vserver <server_name>-vserver -policyname default -clientmatch 0.0.0.0/0 -rorule any -rwrule any -superuser any -anon 0

*Enable NFS on the vserver*

::

     vserver nfs create -vserver <server_name>-vserver -access true

*Create a volume with some free space*

::

    volume create -vserver <server_name>-vserver -volume vol<volume_number> -aggregate aggr1 -size 5g -junction-path /vol<volume_number>		


**Installation**

#. Download the plug-in from `<https://software.mirantis.com/fuel-plugins>`_.

#. Move this file to the Fuel
   Master node and install it using the following command:

   ::

        fuel plugins --install cinder_netapp-1.0.0.fp

#. After plug-in is installed, create an environment the default Cinder backend.

**Configuration**

#. Enable the plug-in on the *Settings* tab of the Fuel web UI.

   .. image:: /_images/fuel-plugin-netapp-configuration.png

#. Configure the plug-in and assign Cinder role to one of the nodes.

#. For more information on accessing Cinder NetApp functionality,
   see `the Official OpenStack documentation <http://docs.openstack.org/juno/config-reference/content/netapp-volume-driver.html>`_.