.. index:: HowTo: Backport Galera Pacemaker OCF script

.. _backport-galera-ocf-op:

HowTo: Backport Galera Pacemaker OCF script
-------------------------------------------

Fuel 5.1 has a completely redesigned OCF script
which makes the :ref:`Galera cluster<galera-cluster-term>`
more reliable and predictible.
This can be backported to earlier Fuel releases
following the instructions below.

.. note:: Before performing any operations with Galera,
   you should schedule the maintenance window,
   perform backups of all databases,
   and stop all MySQL related services.

#. On any controller set the p_mysql primitive
   in maintenance mode:
   ::

       crm configure edit p_mysql
         meta is-managed=false

#. Check the status. It should show clone_p_mysql primitives as Unmanaged:
   ::

       crm_mon -1

#. Download the latest OCF script from the fuel-library repository
   to the Fuel Master node:
   ::

       wget --no-check-certificate -O /etc/puppet/modules/galera/files/ocf/mysql-wss https://raw.githubusercontent.com/stackforge/fuel-library/master/deployment/puppet/galera/files/ocf/mysql-wss

#. The OCF script requires some modification
   as it was designed for MySQL 5.6 originally
   ::

       perl -pi -e 's/--wsrep-new-cluster/--wsrep-cluster-address=gcomm:\/\//g' /etc/puppet/modules/galera/files/ocf/mysql-wss

#. Copy the script to all controllers
   ::

       for i in $(fuel nodes | awk '/ready.*controller.*True/{print $1}'); do scp /etc/puppet/modules/galera/files/ocf/mysql-wss node-$i:/etc/puppet/modules/galera/files/ocf/mysql-wss; done
       for i in $(fuel nodes | awk '/ready.*controller.*True/{print $1}'); do scp /etc/puppet/modules/galera/files/ocf/mysql-wss node-$i:/usr/lib/ocf/resource.d/mirantis/mysql-wss; done

#. Configure the p_mysql resource for the new Galera OCF script
   ::

        crm configure edit p_mysql

   The primitive for Ubuntu should look like:
      ::

          crm configure primitive p_mysql ocf:mirantis:mysql-wss \
                 params socket="/var/run/mysqld/mysqld.sock" \
                 pid="/var/run/mysqld/mysqld.pid" \
                 test_passwd="password" test_user="wsrep_sst" \
                 op monitor timeout="55" interval="60" enabled=true \
                 op start timeout="475" interval="0" \
                 op stop timeout="175" interval="0" \
                 meta is-managed=true

   The primitive for CentOS should look like:
      ::

         crm configure primitive p_mysql ocf:mirantis:mysql-wss \
                params socket="/var/lib/mysql/mysql.sock" \
                pid="/var/run/mysql/mysqld.pid" \
                test_passwd="password" test_user="wsrep_sst" \
                op monitor timeout="55" interval="60" enabled=true \
                op start timeout="475" interval="0" \
                op stop timeout="175" interval="0" \
                meta is-managed=true


   .. note:: During this operation, the MySQL/Galera cluster will be restarted.
      This may take up to 5 minutes.


#. Check that the Galera Cluster is fully assembled:
   ::

       mysql -e "show global status like 'wsrep_incoming_addresses'"

   Output should indicate IPs of all controller in cluster

#. Restart MySQL related services.

   - Restart neutron on every Controller (if installed).
   - Restart the remaining OpenStack services
     on each Controller and Storage node.
   - Restart the OpenStack services on the Compute nodes.

#. Verify OpenStack Services.
