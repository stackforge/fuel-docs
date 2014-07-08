
.. _upgrade-ug:

Upgrade from an Earlier Version
===============================

Fuel 5.0.1 provides the first phase of the in-place upgrades
for Mirantis OpenStack.
If you have a functional Fuel 5.0 cloud environment,
you can install the 5.0.1 onto the Fuel Master Node.
After you do this, your new Fuel 5.0.1 Fuel console
can manage your existing 5.0 OpenStack environment(s)
as well as any new OpenStack environments
you might be using.

To upgrade the Fuel Master Node
that manages an existing Mirantis OpenStack 5.0 cloud environment:

#. Create the Fuel 5.0.1 installation media,
   following the instructions in :ref:`download-install-ug`.

#. Log into your Fuel Master Node and create a mount point for the media.
   For example:

    ::

       mkdir /mnt/media

#. Mount the device:

    ::

       mount -r -t iso9660 /dev/sr0 /mnt/media # mount DVD
       mount -r /dev/sdb1 /mnt/media   # mount USB device

#. Copy the tarball [need file name] to a location on the
   Fuel Master Node disk that has adequate space, such as */var/tmp*:

    ::

       cp /mnt/media/xxx.tar /var/tmp

#. Extract tarball contents to the same directory:

    ::

       cd /var/tmp
       tar -xf xxx.tar

#. Run upgrade script from that same directory:

    ::

       ./upgrade.sh

The upgrade process can take 30-60 minutes.
When it is complete,
the following message will appear on the Fuel UI:

   New release available: Icehouse on CentOS 6.5 (2014.1.1-5.0.1)
