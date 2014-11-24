.. _ha-testing-scenarios-ops:

HA testing scenarios
====================

Currently, several testing scenarios are provided
to check HA enrivonment.

Regular testing scenarios
-------------------------

Nova-network
++++++++++++

These tests are run on both CentOS and Ubuntu.

1. Deploy cluster in HA mode with VLAN Manager.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller roles.

   * Add 2 nodes with compute roles.

   * Set up a cluster to use Network VLAN manager with 8 networks.

   * Deploy the cluster.

   * Make sure that the cluster is configured correcty: there should be no dead
     services or no errors in the logs. Also, you should check
     that all nova services are running and they are in up state;
     TestVM must appear in Glance and only one nova network should be present.

   * Run network verification test.

   * Run OSTF.


2. Deploy cluster in HA mode with nova-network
   and Flat DHCP manager enabled.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller roles

   * Add 2 nodes with compute roles.

   * Deploy the cluster.

   * Make sure that the cluster is configured correcty: there should be no dead
     services or no errors in the logs. Also, you should check
     that all nova services are running and they are in up state;
     TestVM must appear in Glance and only one nova network should be present.

   * Run network verification test.

   * Perform a security check: verify that it is impossible
     to access TCP or UDP unuced ports.

   * Run OSTF.

   * Create a snapshot.

3. Add a compute node to cluster in HA mode with nova-network with Flat DHCP
   manager enabled.
   Steps to perform:

   * Create cluster

   * Add 3 nodes with controller roles

   * Add 2 nodes with compute roles.

   * Deploy the cluster.

   * Make sure that the cluster is configured correcty: there should be no dead
     services or no errors in the logs. Also, you should check
     that all nova services are running and they are in up state;
     TestVM must appear in Glance and only one nova network is present.

   * Add one node with compute role.

   * Make sure that the cluster is configured
     correcty: there should be no dead
     services or no errors in the logs. Also, you should check
     that all nova services are running and they are in up state;
     TestVM must appear in Glance and only one nova network is present.

   * Run network verification test.

   * Run OSTF.

4. Deploy HA cluster with Ceph and nova-network:
   Steps to perform:

   * Create a cluster: use Ceph for volumes and images.

   * Add 3 nodes with controller and Ceph OSD roles.

   * Add one node with Ceph OSD role.

   * Add 2 nodes with compute and Ceph OSD roles.

   * Start cluster deployment.

   * Check Ceph status with **ceph health** command.
     Command output should have *HEALTH_OK*.

5. Stop and reset nova-network cluster in HA mode.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Start cluster deployment.

   * Stop deployment.

   * Reset settings.

   * Add 2 nodes with compute role.

   * Re-deploy the cluster.

   * Run OSTF.

6. Deploy nova-network cluster in HA mode with Ceilometer.
   Steps to perform:

   * Create a cluster. Set install Ceilometer option.

   * Add 3 nodes with controller role.

   * Add one node with compute role.

   * Add one node with MongoDB role.

   * Deploy the cluster.

   * Make sure that Ceilometer API is running.

   * Run OSTF.

7. Check HA mode on scalability.
   Steps to perform:

  * Create a cluster.

  * Add 1 controller node.

  * Deploy the cluster.

  * Add 2 controller nodes.

  * Deploy the changes.

  * Run network verification test.

  * Add 2 controller nodes.

  * Deploy the changes.

  * Run network verification test.

  * Run OSTF.

8. Backup/restore Fuel Master node with HA cluster.
   Steps to perform:

   * Revert "deploy_ha_flat" snapshot.

   * Backup master

   * Check if the backup succeeded.

   * Run OSTF.

   * Add 1 node with compute role.

   * Restore Fuel Master node.

   * Check if restore procedure succeeded.

   * Run OSTF.

Neutron
+++++++

These tests are run on both CentOS and Ubuntu.

1. Deploy cluster in HA mode with Neutron GRE
   Steps to perform:

   * Create cluster

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * Deploy the cluster.

   * Run network verification test.

   * Run OSTF

2. Deploy cluster in HA mode with Neutron GRE and public network
   assigned to all nodes.
   Steps to perform:

   * Create cluster.

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * Enable assign public networks to all nodes option.

   * Deploy the cluster.

   * Check that public network was assigned to all nodes.

   * Run network verification test.

   * Perform a security check: verify that it is impossible
     to access TCP or UDP unuced ports.


   * Run OSTF.

3. Deploy cluster in HA mode with Neutron VLAN
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * Deploy the cluster.

   * Run network verification test.

   * Run OSTF.

4. Deploy cluster in HA mode with Neutron VLAN and public network
   assigned to all nodes
   Steps to perform:

   * Create cluster

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * Enable assign public networks to all nodes option.

   * Deploy the cluster.

   * Check that public network was assigned to all nodes.

   * Run network verification test.

   * Perform a security check: verify that it is impossible
     to access TCP or UDP unuced ports.

   * Run OSTF.

5. Stop and reset Neutron GRE with Sahara cluster in HA mode.
   Steps to perform:

   * Create a cluster.

   * Add 3 node with controller role.

   * Start cluster deployment.

   * Stop deployment.

   * Reset settings.

   * Add 2 nodes with compute role.

   * Re-deploy the cluster.

   * Run network verification test.

   * Make sure that the cluster is configured
     correctly:
     there should be 
     no dead services or no errors in the
     logs. Also, you should check that all nova
     services are running and they are
     in up state;  TestVM must appear
     in Glance and only one nova network should be present.

   * Run OSTF.

6. Deploy cluster in ha mode with Murano and Neutron GRE
   Steps to perform:

   * Create cluster. Set install Murano option.

   * Add 3 node with controller role.

   * Add one nodes with compute role.

   * Deploy the cluster.

   * Verify Murano services.

   * Run OSTF.

   * Register Murano image.

   * Run Murano platform OSTF tests.

7. Deploy Heat cluster in HA mode
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add one node with compute role.

   * Deploy the cluster.

   * Verify that Heat services are up and running.

   * Run OSTF.

   * Register Heat image.

   * Run OSTF platform tests.

8. Deploy a new Neutron GRE cluster in HA mode after Fuel Master is upgraded.
   Steps to perform:

  * Create a cluster with 1 controller with Ceph, 2
    compute nodes with Ceph;
    Ceph for volumes and images should also be enabled.

  * Run upgrade on Fuel Master node.

  * Check that upgrade has succeeded.

  * Deploy a new cluster with HA Neutron Vlan, 3 controllers,
    2 compute
    nodes and 1 Cinder.

  * Run OSTF.


Bonding
+++++++

These scenarios can be applied to both Ubuntu and CentOS.

1. Deploy cluster in HA mode for Neutron VLAN with bonding.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * Set up bonding for all interfaces in **active-backup** mode.

   * Deploy the cluster.

   * Run network verification test.

   * Run OSTF.

2. Deploy cluster in HA mode for Neutron GRE with bonding.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * Setup bonding for all interfaces in **balance-slb** mode.

   * Deploy the cluster.

   * Run network verification test.

   * Run OSTF.

nova-network and Neutron environments check
+++++++++++++++++++++++++++++++++++++++++++

Deploy cluster in HA mode with flat nova-network
Steps to perform:

* Create a cluster.

* Add 3 nodes with controller role.

* Add 2 nodes with compute role.

* Deploy the cluster.

* Create a snapshot.

Failover testing scenarios
--------------------------

1. Neutron L3-agent rescheduling after L3-agent dies.
   Steps to perform:

  * Create a cluster (HA mode, Neutron with GRE segmentation).

  * Add 3 nodes with controller role.

  * Add 2 nodes with compute role.

  * Add one node with Cinder role.

  * Deploy the cluster.

  * Manually reschedule router from the primary controller
    to another one.

  * Stop L3-agent on a new node with
    **- pcs resource ban p_neutron-l3-agent NODE** command.

  * Check whether L3-agent has been rescheduled.

  * Check network connectivity from instance via
    dhcp namespace

  * Run OSTF.

2. Deploy nova-network environmen with Ceph in HA mode.
   Steps to perform:

   * Create a cluster with Ceph for images and volumes.

   * Add 3 nodes with controller and Ceph OSD roles.

   * Add one node with Ceph OSD roles.

   * Add 2 nodes with compute and Ceph OSD roles.

   * Deploy the cluster.

   * Check Ceph status with **ceph-health** command.
     Command output should have *HEALTH_OK*.

   *  Destroy a node with Ceph role and checking Ceph health.

   *  Destroy compute node with Ceph and check Ceph health.

   *  Restart four online nodes and check Ceph health.

   * Perform cold restart.

   * Check Ceph status.

3. Monit on compute nodes.
   Steps to perform:

  * Deploy HA cluster with nova-network, 3 controllers and 2 compute nodes.

  * SSH to each compute node.

  * Kill nova-compute service.

  * Check that service has been restarted by Monit.


6. Pacemaker restarts heat-engine when AMQP connection is lost.
   Steps to perform:

   * Deploy HA cluster with nova-network, 3 controllers and 2 compute nodes.

   * SSH to the controller with running heat-engine.

   * Check heat-engine status.

   * Block heat-engine AMQP connections.

   * Check if heat-engine has moved to another
     controller or stopped
     at the current controller.

   * If moved, SSH to the node with running heat-engine to
     check that heat-engine is running and that heat-engine has some AMQP connections.

   * If stopped, check heat-engine process is running with new pid;
     unblock heat-engine AMQP connections and check if AMQP connection has appeared for heat-engine again.

Testing scenarios 7-11 may be mixed with Nova or Neutron, CentOS or Ubuntu.

7. Shut down primary controller:

  * Deploy a cluster with 3 controllers and 2 compute nodes

  * Destroy the primary controller.

  * Check Pacemaker status: all nodes must be online
    after running **crm_mon -1** command.

  * Wait until MySQL Galera is up:
    **"SELECT VARIABLE_VALUE FROM information_schema.GLOBAL_STATUS WHERE VARIABLE_NAME = 'wsrep_ready';"** should return "On".

  * Run OSTF

8. Shut down non-primary controller:

  * Deploy a cluster with 3 controllers and 2 compute nodes

  * Destroy non-primary controller.

  * Check Pacemaker status: all nodes must be online
    after running **crm_mon -1** command.

  * Wait until MySQL Galera is up:
    **"SELECT VARIABLE_VALUE FROM information_schema.GLOBAL_STATUS WHERE VARIABLE_NAME = 'wsrep_ready';"** should return "On".

  * Run OSTF

9. Shut down management interface on the primary controller.

  * Revert a snapshot.

  * Disconnect the first controller.

  * Assert_pacemaker() that the controller marked as 'offline'.

  * Wait on a different controller for 'pacemaker' resources
    to become operational and vip__* resources migrated to the
    working controllers.

  * Run 'smoke' OSTF tests to make sure that the cluster is still operational.

  * Start or restore connectivity to the first controller.

  * Wait until pacemaker get the controller as 'online' (with assert_pacemaker() )

  * Wait for pacemaker resources to become operational on all controllers.

  * Run 'sanity' and 'smoke' OSTF tests.

  * Repeat steps described above for the second controller.

  Currently, this HA test scenario is being improved.
  For more details, see `LP1386702 <https://bugs.launchpad.net/fuel/+bug/1386702>`_.

10. Delete all management and public vIPs on all controller nodes:

   * Delete all secondary vIPs.

   * Wait till it gets restored.

   * Ensure that vIp has restored.

   * Run OSTF.

11. Terminate HAProxy on all controllers one by one:

   * Terminate HAProxy.

   * Wait till it gets restarted.

   * Go to another controller and repeat steps above.

   * Run OSTF.


Rally
+++++


1. Run `Rally <https://wiki.openstack.org/wiki/Rally>`_
   for generating the activity on a cluster (for example,
   create or delete instance and/or volumes). Shut down the primary controller
   and start Rally:

   * Ensure that vIP addresses have moved to another controller.

   * Ensure that VM is reachable from the outside world.

   * Check the state of Galera and RabbitMQ clusters.

2. HA load testing with Rally.
   Steps to perform:

  * Deploy HA cluster with Neutron GRE or VLAN, 3 MongoDB controllers and 4 Ceph compute nodes.
    You should also have Ceph volumes and images enabled for Storage.

  * Create an instance.

  * Wait until instance is created.

  * Delete the instance.

  * Run `Rally <https://wiki.openstack.org/wiki/Rally>`_
    for generating   the same activity.
    In average, 500-1000 VMs should be created using 50, 70 or 100 parallel requests.