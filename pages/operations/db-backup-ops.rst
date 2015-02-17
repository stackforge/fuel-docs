.. _db-backup-ops:

OpenStack Database Backup and Restore with Percona XtraBackup
=============================================================

With the procedure described in this topic
you will be able to back up and restore
your OpenStack MySQL database.

OpenStack environment into maintenance mode.

Maintenance mode is a mode when the operating system
on the node has only a critical set of working services
that the system needs for basic network and disk operations.

Backing up with Percona XtraBackup
----------------------------------

#. Enable the HAProxy stats socket for every controller in a cluster:

  #. Open the */etc/haproxy/haproxy.cfg* file for editing.

  #. Find the *stats socket /var/lib/haproxy/stats* line in the global section
     and add *level admin* at the end of the line.

#. Restart HAProxy in one of the following ways:

   * Execute /usr/lib/ocf/resource.d/mirantis/ns_haproxy reload on every controller

   Or

   * Reload all HAProxy instances on all controllers in a cluster with a temporary
     services stop by running the *crm resource restart p_haproxy* command.

#. On the Fuel Master node, run the *fuel nodes | grep controller* command.
   If the node that you are going to back up is a host for a Neutron agent,
   you can move the agent to a different controller with the following command:

   ::

     ssh node-1
     pcs resource move agent_name node_name

   where "node-1" is the name of the node from which you would like to move.

#. For every controller in the cluster, put the MySQL service into
   maintenance mode by running the following command from the Fuel Master node:

   ::

     ssh -t node-1 'echo "disable server mysqld/node-1" | socat stdio /var/lib/haproxy/stats'

#. Put the node into maintenance mode for Pacemaker:

   ::

     ssh node-1
     crm node maintenance

   where "node-1" is the name of the node from which you would like to move.

#. Stop data replication on the selected MySQL instance:

   ::

     mysql -e "SET GLOBAL wsrep_on=off;"

#. Run the backup:

   ::

     xtrabackup --backup --stream=tar ./ | gzip - > backup.tar.gz

#. Make a streaming backup as described in
   `Percona Guide <http://www.percona.com/doc/percona-xtrabackup/2.1/howtos/recipes_ibkx_stream.html>`_.

#. Move the archive file to a safe place.

#. Re-enable the data replication:

   ::

     mysql -e "SET GLOBAL wsrep_on=on;"

#. Take the MySQL service out of maintenance mode with
   the following command for every controller in the cluster:

   ::

     ssh -t node-1 'echo "enable server mysqld/node-1" | socat stdio /var/lib/haproxy/stats'

#. Put the node into the ready mode:

   ::

     ssh -t node-1 crm node ready

   where "node-1" is the node that you have backed up.

Restoring with Percona XtraBackup
---------------------------------

#. Remove grastate.dat (e.g. move to a different place) оn all nodes:

   ::

     ssh node-1 mv /var/lib/mysql/grastate.dat /var/lib/mysql/grastate.old
     ssh node-2 mv /var/lib/mysql/grastate.dat /var/lib/mysql/grastate.old
     ssh node-3 mv /var/lib/mysql/grastate.dat /var/lib/mysql/grastate.old

#. Extract the database backup file on the first controller:

   ::

     ssh node-1 'cd /var/lib/mysql/ ;tar -xvzf clear-base.tgz'

   where "node-1" is the node that you have backed up.

#. Change the owner:

   ::

     chown -R mysql:mysql /var/lib/mysql

#. Export the variables for *mysql-wss* on all nodes:

   ::

     export OCF_RESOURCE_INSTANCE=p_mysql
     export OCF_ROOT=/usr/lib/ocf
     export OCF_RESKEY_socket=/var/run/mysqld/mysqld.sock

#. Export the variable for *mysql-wss on* the first node:

   ::

     export OCF_RESKEY_additional_parameters="--wsrep-new-cluster"

#. Start *mysqld* on the first controller:

   ::

     /usr/lib/ocf/resource.d/mirantis/mysql-wss start

#. Start *mysqld* on all other controllers:

   ::

     /usr/lib/ocf/resource.d/mirantis/mysql-wss start

#. Copy the extracted database backup.

#. Check the crm status for all nodes.
