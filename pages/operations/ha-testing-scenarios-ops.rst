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

   * Create a snapshot.


2. Deploy cluster in HA mode with nova-network and Flat DHCP manager enabled.
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

   * Run network verification test.

   * Run OSTF.

4. Deploy Ceph with Cinder in HA mode with nova-network:
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller and Ceph OSD roles.

   * Add one node with Ceph OSD role.

   * Add 2 nodes with compute and Ceph OSD roles.

   * Deploy the cluster.

   * Check Ceph status.

5. Stop and reset nova-network cluster in HA mode.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Deploy the cluster.

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

   * Run OSTF.

5. Stop and reset Neutron GRE with Sahara cluster in HA mode.
   Steps to perform:

   * Create a cluster.

   * Add 3 node with controller role.

   * Deploy the cluster.

   * Stop deployment.

   * Reset settings.

   * Add 2 nodes with compute role.

   * Re-deploy the cluster.

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

  * Revert a snapshot with a simple Ceph environment.

  * Run upgrade on Fuel Master node.

  * Check that upgrade has succeeded.

  * Re-deploy cluster.

  * Run OSTF.


Bonding
+++++++

These scenarios can be applied to both Ubuntu and CentOS.

1. Deploy cluster in HA mode for Neutron VLAN with bonding.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * Setup bonding for all interfaces.

   * Deploy the cluster.

   * Run network verification test.

   * Run OSTF.

2. Deploy cluster in HA mode for Neutron GRE with bonding.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * Setup bonding for all interfaces.

   * Deploy the cluster.

   * Run network verification test.

   * Run OSTF.


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

  * Stop L3-agent on a new node with pcs.

  * Check whether L3-agent has been rescheduled.

  * Check network connectivity from instance via
    dhcp namespace

  * Run OSTF.

2. Deploy nova-network environmen with Ceph in HA mode.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller and Ceph OSD roles.

   * Add one node with Ceph OSD roles.

   * Add 2 nodes with compute and Ceph OSD roles.

   * Deploy the cluster.

   * Check Ceph status.

   * Perform cold restart.

   * Check Ceph status.

The following testing scenario can be applied to both
nova-network and Neutron environments:

Deploy cluster in HA mode with flat nova-network
Steps to perform:

* Create a cluster.

* Add 3 nodes with controller role.

* Add 2 nodes with compute role.

* Deploy the cluster.

* Create a snapshot.

Other common HA testing scenarios
---------------------------------

These issues may be mixed with Nova or Neutron, CentOS or Ubuntu.

1. Shut down primary controller:

   * Check Pacemaker status.

   * Ensure that vIP addresses have moved to other controller.

   * Ensure that VM is reachable from
     the outside world.

   * Ensure that all services work properly.

   * Revert the enrironment.

   * Run OSTF.

2. Shut down non-primary controller:

   * Ensure that all services work properly.

   * Check Pacemaker status.

   * Run OSTF.

3. Shut down management interface on the primary controller.

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

4. Delete all management and public vIPs on all controller nodes:

   * Delete all secondary vIPs.

   * Wait till it gets restored.

   * Ensure that vIp has restored.

   * Run OSTF.

5. Terminate HAProxy on all controllers one by one:

   * Terminate HAProxy.

   * Wait till it gets restarted.

   * Go to another controller and repeat steps above.

   * Run OSTF.

6. Run `Rally <https://wiki.openstack.org/wiki/Rally>`_
   for generating the same activity on a cluster (for example,
   create or delete instance and/or volumes). Shut down the primary controller
   and start Rally:

   * Ensure that vIP addresses have moved to another controller.

   * Ensure that VM is reachable from the outside world.

   * Check the state of Galera and RabbitMQ clusters.

Specific scenarios
------------------

The following testing scenarios allow preventing
problems that may occur in HA environment.

Shut down public vIP address two times
++++++++++++++++++++++++++++++++++++++

See the related `L1311749 <https://bugs.launchpad.net/fuel/+bug/1311749>`_.

Steps to perform:

1. Deploy HA cluster with nova-network, 3 controllers and 2 compute nodes.

2. Find a node with public vIP address.

3. Shut down ethernet interface with public vIP address.

4. Check if vIP has recovered.

5. Find a node with the recovered vIP.

6. Shut down ethernet interface with public vIP address once again.

7. Check if vIP has recovered.

8. Run OSTF.

9. Repeat the steps described above to test management vIP address.


HA load testing with Rally
++++++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with Neutron GRE or VLAN, 3 MongoDB controllers and 4 Ceph compute nodes.
   You should also have Ceph volumes and images enabled for Storage.

2. Create an instance.

3. Wait until instance is created.

4. Delete the instance.

5. Run `Rally <https://wiki.openstack.org/wiki/Rally>`_ for generating the same activity.
   In average, 500-1000 VMs should be created using 50, 70 or 100 parallel requests.


Monit on compute nodes
++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with nova-network, 3 controllers and 2 compute nodes.

2. SSH to each compute node.

3. Kill nova-compute service.

4. Check that service has been restarted by monit.


Pacemaker restarts heat-engine when AMQP connection is lost
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with nova-network, 3 controllers and 2 compute nodes.

2. SSH to the controller with running heat-engine.

3. Check heat-engine status.

4. Block heat-engine AMQP connections.

5. Check if heat-engine has moved to another controller or stopped
   at the current controller.

6. If moved, SSH to the node with running heat-engine:

   * Check that heat-engine is running.

   * Check heat-engine has some AMQP connections.

7. If stopped, check heat-engine process is running with new pid:

   * Unblock heat-engine AMQP connections.

   * Check if AMQP connection has appeared for heat-engine again.
