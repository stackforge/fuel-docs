.. index:: HowTo: Backup and Restore Fuel Master

.. _Backup_and_restore_Fuel_Master:

HowTo: Backup and restore Fuel Master
-------------------------------------

You can now back up your Fuel Master without downtime. In order to
back up the master node, you need to meet these requirements:
* No deployment tasks are currently running
* You have at least 11GB free disk space

The backup contains the following items:
* All docker containers (including Fuel DB)
* Package repositories
* Deployment SSH keys
* Puppet manifests

Logs are not backed up. If preserving log data is important, back up /var/log
directory separately.

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

To run the restore, simply run **dockerctl restore /path/to/backup**.
