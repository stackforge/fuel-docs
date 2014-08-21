.. index:: HowTo: Backup and Restore Fuel Master

.. _Backup_and_restore_Fuel_Master:

HowTo: Backup and restore Fuel Master
-------------------------------------

Because the Fuel Master itself is not available with high availability,
it is strongly recommended to create a backup after each deployment. This
allows for recovery in the event of data corruption or hardware loss.
The backup process requires the operator to place the backup on a remote
location so that it survives a complete system failure. Note that this
backup is only for the Fuel Master itself and not for OpenStack deployments.
In order to be able to manage existing OpenStack environments deployed by Fuel,
it is necessary to restore a backed up Fuel Master if a reinstall was
performed.

You can back up your Fuel Master without downtime. What this means is
Fuel API, Fuel UI, DHCP, DNS, and NTP services continue to operate
during the backup process, causing no impact for any deployed or
bootstrapped nodes.

In order to back up the Fuel Master, you need to meet these requirements:
* No deployment tasks are currently running
* You have at least 11GB free disk space

The backup contains the following items:
* All docker containers (including Fuel DB)
* PXE deployment configuration
* All OpenStack environment configurations
* Package repositories
* Deployment SSH keys
* Puppet manifests

Items not backed up include logs, databases, and host network configuration.
If preserving log data is important, back up the /var/log directory
separately. This could be done by using *scp* to transfer /var/log to another
host. Network configuration needs to be done manually via Fuel Setup if you
reinstall your Fuel Master before restoring it.

To start a backup, run **dockerctl backup**. Optionally, you can specify a
path for backup. The default path is **/var/backup/fuel**.
This process takes approximately 30 minutes
and is dependent on the performance of your hardware.
After the backup is done, you may want to copy the backup to
a separate storage medium.

.. note:: If you make further changes to your environment after a backup,
   you should make a new backup.

Restoring Fuel Master
---------------------

The restore is quite similar to the backup process.
This process can be run any time after installing a Fuel Master
node. Before starting a restore operation, ensure the following:
* The Fuel version is the same release as the backup
* There are no deployments running
* At least 11GB free space in /var


If you reinstall your Fuel Master host, you need to configure your network
settings via Fuel Setup the same way it was configured originally. It is
particularly important that the configuration for the Admin (PXE) network
is the same as before.

To run the restore, simply run **dockerctl restore /path/to/backup**.
