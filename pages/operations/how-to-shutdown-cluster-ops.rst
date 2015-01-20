.. _how-to-shutdown-cluster-ops:

HowTo: Shut down the whole cluster
==================================

To shut down the whole cluster, follow these steps:

#. Stop all virtual machines.

#. Either power off all the nodes at once or power off them in the following order:

   * Computes

   * Cinder/Ceph/Swift

   * Controllers (one by one or all in one)

   * Other/Neutron (if separate Neutron node exists)

To start up cluster, power on all the nodes.

Starting up cluster with Neutron
--------------------------------

Cinder or Ceph require Neutron, Neutron node requires database and Controllers,
so the following sequence is also possible:
 
#. Power on Ceph/Cinder/Swift/MongoDB/Zabbix nodes.

#. Start all controllers and Neutron (if separate Neutron node exists) and
   wait until RabbitMQ, Neutron
   agents and Galera get synced by Pacemaker.
   It should take no more than 5 minutes.

#. Ensure that HAProxy is OK. Note, that HAProxy is under Pacemaker so you
   should use *pcs resource <command> clone_p_haproxy* to manage it.

#. Ensure that RabbitMQ cluster is OK and fix it if there are failed nodes.

#. Ensure that Galera cluster is OK and fix it if necessary.
   Note, that Galera is under Pacemaker, so you should use *pcs resource* to manage it.

#. Run *pcs resource restart clone_p_neutron-metadata-agent* command.

#. Run *pcs resource restart clone_p_neutron-plugin-openvswitch-agent*

#. Wait several minutes and check the cluster state with *crm status* command.
   All Neutron agents including L3 and DHCP should be started.
   L3 and DHCP agents should be running on the single node only,
   not necessarily on the same one.

#. Restart all Openstack services.

#. Power on compute nodes.