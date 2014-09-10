.. index:: HowTo: Backport Galera Pacemaker OCF script

HowTo: Backport Galera Pacemaker OCF script
-------------------------------------------

Fuel 5.1 has completely redesigned OCF script which makes Galera cluster more reliable and predictible

.. note:: Schedule the maintenance window, Perform backups of all databases, Stop MySQL related services before any operations with Galera

1. Set p_mysql primitive in maintenance mode
   ::

       crm configure edit p_mysql
         meta is-managed=false

2. Check the status. It should show clone_p_mysql primitives as Unmanaged
   ::

       crm_mon -1

3. Download the latest OCF script from fuel-library repository to master node
   ::

       wget --no-check-certificate -O /etc/puppet/modules/galera/files/ocf/mysql-wss https://raw.githubusercontent.com/stackforge/fuel-library/master/deployment/puppet/galera/files/ocf/mysql-wss

4. OCF script is required a bit modification as it was designed for MySQL 5.6 originally
   ::

       perl -pi -e 's/--wsrep-new-cluster/--wsrep-cluster-address=gcomm:\/\//g' /etc/puppet/modules/galera/files/ocf/mysql-wss

5. Copy the script to all controllers
   ::

       for i in $(fuel nodes | awk '/ready.*controller.*True/{print $1}'); do scp /etc/puppet/modules/galera/files/ocf/mysql-wss node-$i:/etc/puppet/modules/galera/files/ocf/mysql-wss; done
       for i in $(fuel nodes | awk '/ready.*controller.*True/{print $1}'); do scp /etc/puppet/modules/galera/files/ocf/mysql-wss node-$i:/usr/lib/ocf/resource.d/mirantis/mysql-wss; done

6. Configure p_mysql resource for new Galera OCF script
   ::

        crm configure edit p_mysql

Primitive for Ubuntu should look like
   ::

       crm configure primitive p_mysql ocf:mirantis:mysql-wss \
              params socket="/var/run/mysqld/mysqld.sock" \
              pid="/var/run/mysqld/mysqld.pid" \
              test_passwd="password" test_user="wsrep_sst" \
              op monitor timeout="55" interval="60" enabled=true \
              op start timeout="475" interval="0" \
              op stop timeout="175" interval="0" \
              meta is-managed=true

Primitive for CentOS should look like
   ::

      crm configure primitive p_mysql ocf:mirantis:mysql-wss \
             params socket="/var/lib/mysql/mysql.sock" \
             pid="/var/run/mysql/mysqld.pid" \
             test_passwd="password" test_user="wsrep_sst" \
             op monitor timeout="55" interval="60" enabled=true \
             op start timeout="475" interval="0" \
             op stop timeout="175" interval="0" \
             meta is-managed=true

.. note:: During this operation MySQL cluster will be restarted. This may take up to 5 minute

7. Check Galera Cluster is fully assembled
   ::

       mysql -e "show global status like 'wsrep_incoming_addresses'"

8. Start MySQL related services
