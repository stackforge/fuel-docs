

.. _docker-disk-full-top-tshoot:

Fuel Master and Docker disk space troubleshooting
-------------------------------------------------

Overview
++++++++

One major consideration in maintaining a Fuel Master node is managing disk
space. While there is currently no monitoring for Fuel Master, it is important
to budget enough disk space. Failure to do so may lead to logs overwhelming the
/var partition. For example, enabling Ceilometer and debug logging will quickly
fill up disk space.
The following sections describe failures that may occur
if the disk fills up
and gives solutions for resolving them.

If the solution to your issue requires rebuilding Docker containers, take note
that data recovery is not necessary for the following containers: mcollective,
nginx, ostf, nailgun, rsyslog, keystone, rabbitmq. This is because the data on
these containers is stateless. For astute, cobbler, and postgres containers it
is necessary to recover stateful data from the affected container. Instructions
below will guide you through the processes.

PostgreSQL database inconsistency
+++++++++++++++++++++++++++++++++

**Diagnosis**

The following symptoms will be present:

* Fuel Web UI fails to work
* The **dockerctl list -l** output
  reports that the nailgun, ostf, and/or keystone container is down
* The output of the **fuel task** command reports an error
  similar to the following::

    HTTP Error 400: Bad Request (This Session's transaction has been rolled back
    due to a previous exception during flush. To begin a new transaction with
    this Session, first issue Session.rollback(). Original exception was:
    (InternalError) index "notifications_pkey" contains unexpected zero page at
    block 26
    HINT: Please REINDEX it.


**Solution**

The postgres container should still be running,
so you simply need to run an SQL command to correct the fault.
Before attempting to fix the
database, make a quick backup of it:

.. code-block:: bash

   date=$(date --rfc-3339=date)
   dockerctl shell postgres su postgres -c 'pg_dumpall --clean' \
   > /root/postgres_backup_${date}.sql


Now try to repair whatever corruption you saw in Nailgun or PostgreSQL logs:

.. code-block:: bash

   dockerctl shell postgres su postgres \
   -c "psql nailgun -c 'reindex table notifications;'"

Lastly, check proper function:

.. code-block:: bash

   dockerctl check all

.. note:: You may need to restart the nailgun, keystone,
   or ostf Docker container
   using the **dockerctl restart CONTAINERNAME** command.

Docker metadata corruption loses containers
+++++++++++++++++++++++++++++++++++++++++++

**Diagnosis**

The following symptoms will be present:

* Deployment fails for some reason
* One or more Docker containers is missing from docker ps -a
* /var/log/docker contains the following message::

    Cannot start container fuel-core-5.1-postgres: Error getting container
    273c9b19ea61414d8838772aa3aeb0f6f1b982a74555fb6631adb6232459fe80 from driver
    devicemapper: Error writing metadata to
    /var/lib/docker/devicemapper/devicemapper/.json325916422: write
    /var/lib/docker/devicemapper/devicemapper/.json325916422: no space left on device

**Solution**

This solution requires data recovery, described in the Summary above.
It is necessary to recover data manually
using the **dmsetup** and **mount** commands.

First, you need the full UID of the docker container that was lost. In the log
message above, we can see the ID is
273c9b19ea61414d8838772aa3aeb0f6f1b982a74555fb6631adb6232459fe80. If you are
missing such a message, it can be found this way:

.. code-block:: bash

   fuel_release=5.1
   container=postgres
   #Raise -m1 if you deleted and recreated before disk space incident
   grep -m1 -A5 "create?name=fuel-core-${fuel_release}-${container}" /var/log/docker

Once you have the container ID, you need to get the devicemapper block device
ID for the container:

.. code-block:: bash

   container_id="273c9b19ea61414d8838772aa3aeb0f6f1b982a74555fb6631adb6232459fe80"
   #Replace with your ID
   device_id=$(python -c 'import sys; import json; input = json.load(sys.stdin);\
   [sys.stdout.write(str(v["device_id"])) for k, v in input["Devices"].items() if
   k == sys.argv[1]]' "$container_id" < /var/lib/docker/devicemapper/devicemapper/json)
   echo $device_id

Now activate the volume and mount it:

.. code-block:: bash

   device_id="the device ID from previous step" #replace with the actual device_id
   container="postgres" #replace with container name
   pool=/dev/mapper/docker*pool
   dmsetup create "${container}_recovery" --table "0 20971520 thin $pool $device_id"
   mkdir -p "/mnt/${container}_recovery"
   mount -t ext4 -o rw,relatime,barrier=1,stripe=16,data=ordered,discard \
   "/dev/mapper/${container}_recovery" "/mnt/${container}_recovery"

Next, it is necessary to purge the container record from the Docker sqlite
database. You may see an issue when running **dockerctl start CONTAINER**::

   Abort due to constraint violation: constraint failed

Run this command before trying to restore the container data
or if you are simply destroying and recreating it:

.. code-block:: bash

   #replace with container name and Fuel version
   container_name="fuel-core-6.0-postgres"
   container_id=$(sqlite3 /var/lib/docker/linkgraph.db "select entity_id from edge\
   where name='${container_name}';")
   echo "Deleting container ID ${container_id}..."
   sqlite3 /var/lib/docker/linkgraph.db "delete from entity where\
   id='${container_id}';delete from edge where entity_id='${container_id}';"

Now perform the following recovery actions,
which vary depending on whether you need to recover data
from Cobbler, Astute, or PostgreSQL:

For Cobbler:

.. code-block:: bash

   cp -R /mnt/cobbler_recovery/var/lib/cobbler /root/cobbler_recovery
   dockerctl destroy cobbler
   dockerctl start cobbler
   dockerctl copy "/root/cobbler_recovery/*" cobbler:/var/lib/cobbler/
   dockerctl restart cobbler

For PostgreSQL:

.. code-block:: bash

   cp -R /mnt/postgres_recovery/var/lib/pgsql /root/postgres_recovery
   dockerctl destroy postgres
   dockerctl start postgres
   dockerctl copy "/root/postgres_recovery/*" postgres:/var/lib/pgsql/
   dockerctl restart postgres nailgun keystone ostf

You may want to make a PostgreSQL backup at this point:

.. code-block:: bash

   dockerctl shell postgres su postgres -c "pg_dumpall --clean' \
   > /root/postgres_backup_$(date).sql"

To recover a corrupted PostgreSQL database,
you can import the dump to another PostgreSQL installation,
where you can get a clean dump
that you then import to your PostgreSQL container.

.. code-block:: bash

   yum install postgresql-server
   cp -rf data/ /var/lib/pgsql/
   service postgresql start
   su - postgres -c 'pg_dumpall --clean' > dump.sql

Now import the *dump.sql* file to the postgres container, as described above.

For Astute:

.. code-block:: bash

   cp -R /mnt/astute_recovery/var/lib/astute /root/astute_recovery
   dockerctl destroy astute
   dockerctl start astute
   dockerctl copy "/var/lib/astute/*" astute:/var/lib/astute/
   dockerctl restart astute

Finally, clean up the recovery mount point:

.. code-block:: bash

   umount "/mnt/${container}_recovery"
   dmsetup clear $device_id


Read-only containers
++++++++++++++++++++

**Symptoms**

* Fuel Web UI does not work
* Fuel CLI fails to report any commands
* Some containers may be failing and stopped
* Trying to run **dockerctl shell CONTAINER touch /root/test** results in
  "Read-only filesystem" error

**Solution**

Because of bugs in docker-io 0.10,
the only way to correct this issue is to restart the Fuel Master node.
If it still fails with the same issue,
you may have a corrupt filesystem.
See the next section for more details.

Corrupt ext4 filesystem on Docker container
+++++++++++++++++++++++++++++++++++++++++++

**Symptoms**

Error::

  Cannot start container fuel-core-5.1-rsync: Error getting container
  df5f1adfe6858a13b0a9fe81217bf7db33d41a3d4ab8088d12d4301023d4cca3 from driver
  devicemapper: Error mounting
  '/dev/mapper/docker-253:2-341202-df5f1adfe6858a...d41a3d4ab8088d12d4301023d4cca3'
  on
  '/var/lib/docker/devicemapper/mnt/df5f1adfe6858a...d41a3d4ab8088d12d4301023d4cca3':
  invalid argument

**Solution**

If the container affected is stateful, it is necessary to recover the data.
Otherwise, you can simply destroy and recreate stateless containers.

For stateless containers:

.. code-block:: bash

   container="rsync" # Change container name
   dockerctl destroy rsync
   dockerctl start rsync

For stateful containers:

.. code-block:: bash

   #Replace with full container ID using docker ps -a | grep $container
   container_id="df5f1adfe6858a13b0a9fe81217bf7db33d41a3d4ab8088d12d4301023d4cca3"
   umount -l /dev/mapper/docker-*$container_id
   fsck -y /dev/mapper/docker-*$container_id
   dockerctl start $container
