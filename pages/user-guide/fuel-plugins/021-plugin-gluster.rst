.. _plugin-gluster-ug:

GlusterFS
+++++++++

This plug-in allows use of an existing `GlusterFS <http://www.gluster.org/
documentation/About_Gluster>`_ cluster as the Cinder backend.

**Requirements**

This plug-in is compatible with the following GlusterFS version:

+------------------------------------------------+------------------------------------+
| Description                                    |Ubuntu 14.04 LTS                    |
+------------------------------------------------+------------------------------------+
| Release                                        |14.04                               |
+------------------------------------------------+------------------------------------+
| Codename                                       |trusty                              |
+------------------------------------------------+------------------------------------+
| glusterfs 3.4.2 built on Jan 14 2014 18:05:35  |                                    |
+------------------------------------------------+------------------------------------+
|Repository revision                             |git://git.gluster.com/glusterfs.git |
+------------------------------------------------+------------------------------------+


**GlusterFS backend configuration**

To enable GlusterFS plug-in, you should first set up GlusterFS.
To do this, please note the following prerequisites:

* Choose your desired setup method (AWS, virtual machines or bare metal) after step
  four, adding an entry to fstab. If you want to get right to it (and don’t need more information), the steps below are all you need to get started.

* You will need to have at least two X86 machines with a 64 bit OS
  and a working network connection.
  At least one gig of RAM is the bare minimum recommended for testing,
  and you will want at least 8GB in any system you plan on doing any real work on.

* A single CPU is fine for testing, as long as it is 64 bit.
  Each node should have a dedicated disk for Gluster - they are called "bricks".
  One of the nodes will be serving the gluster volume to clients, we’ll be calling that
  "node01" and the other one "node02", and so on.

**Partition, Format and mount the bricks**

Assuming you have a brick at /dev/sdb:

::


      sudo fdisk /dev/sdb

Create a single partition on the brick that uses the whole capacity.

**Format the partition**

::

    sudo mkfs.xfs -i size=512 /dev/sdb1

**Mount the partition as a Gluster "brick"**

::


     sudo  mkdir -p /export/sdb1 && mount /dev/sdb1 /export/sdb1 && mkdir -p /export/sdb1/brick

**Add an entry to /etc/fstab**

::

    sudo echo "/dev/sdb1 /export/sdb1 xfs defaults 0 0"  >> /etc/fstab

**Install Gluster packages on both nodes**

::


    sudo yum install glusterfs{,-server,-fuse,-geo-replication}

.. note:: This example assumes Fedora 18 or later, where
          gluster packages are included in the official repository

**Run the gluster peer probe command**

.. note:: From node01 to the other nodes (do not peer probe
          the first node).

::

    sudo gluster peer probe <ip or hostname of node02>

**Configure your Gluster volume**

::

  sudo gluster volume create testvol rep 2 transport tcp node01:/export/sdb1/brick node02:/export/sdb1/brick

**Test using the volume**

::

    sudo mkdir /mnt/gluster; mount -t glusterfs node01:/testvol; cp -r /var/log /mnt/gluster
    sudo mkdir /mnt/gluster/hello_world
    df -h


**Installation**

#. Download the plug-in from `<https://software.mirantis.com/fuel-plugins>`_.

#. Install GlusterFS plug-in. For instructions, see :ref:`install-plugin`.

#. After plug-in is installed, create an environment.

**Configuration**

Client side (Fuel side):

#. Enable the plug-in on the *Settings* tab of the Fuel web UI.

   .. image:: /_images/fuel_plugin_glusterfs_configuration.png

GlusteFS (server side):

#. After GlusterFS plug-in is installed and a volume is created,
   configure each Gluster volume to accept libgfapi connections.
   To do this, configure every Gluster volume to all insecure ports [1, 2]:

   ::

       gluster volume set <volume_name> server.allow-insecure on
       gluster volume stop <volume_name>
       gluster volume start <volume_name>

#. Add to /etc/glusterfs/glusterd.vol the following option:

   ::

      option rpc-auth-allow-insecure on

#. Restart glusterd daemon.

.. SeeAlso:: For more information on GlusterFS, see
             `Configure GlusterFS backend <http://docs.openstack.org/admin-guide-cloud/content/glusterfs_backend.html>`_ in the official OpenStack documentation.

**How to use**

According to
`Cinder support Matrix <https://wiki.openstack.org/wiki/CinderSupportMatrix>`_, GlusterFS plug-in is supported.
To check that GlusterFS is up and running, see
`Testing instructions <https://wiki.openstack.org/wiki/How_to_deploy_cinder_with_GlusterFS>`_ in OpenStack wiki.