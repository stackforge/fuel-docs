.. _ha-testing-scenarios-ops:

HA testing scenarios
====================

Currently, several testing scenarios are provided
to check HA environment.

Regular testing scenarios
-------------------------

Nova-network
++++++++++++

These tests are run on both CentOS and Ubuntu.

1. Deploy a cluster in HA mode with VLAN Manager.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * Set up a cluster to use Network VLAN manager with 8 networks.

   * Deploy the cluster.

   * Make sure that the cluster is configured correcty: there should be no dead
     services or no errors in the logs. Also, you should check
     that all nova services are running and they are in up state;
     TestVM must appear in Glance and only one nova-network should be present.

   * Run network verification test.

   * Run OSTF.


2. Deploy a cluster in HA mode with nova-network
   and Flat DHCP manager enabled.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * Deploy the cluster.

   * Make sure that the cluster is configured correcty: there should be no dead
     services or no errors in the logs. Also, you should check
     that all nova services are running and they are in up state;
     TestVM must appear in Glance and only one nova-network should be present.

   * Run network verification test.

   * Perform a security check: verify that it is impossible
     to access TCP or UDP unused ports.

   * Run OSTF.

3. Add a compute node to a cluster in HA mode with nova-network with Flat DHCP
   manager enabled.
   Steps to perform:

   * Create cluster

   * Add 3 nodes with controller role

   * Add 2 nodes with compute role.

   * Deploy the cluster.

   * Make sure that the cluster is configured correctly: there should be no dead
     services or no errors in the logs. Also, you should check
     that all nova services are running and they are in up state;
     TestVM must appear in Glance and only one nova-network is present.

   * Add one node with compute role.

   * Re-deploy the cluster.

   * Make sure that the cluster is configured
     correcty: there should be no dead
     services or no errors in the logs. Also, you should check
     that all nova services are running and they are in up state;
     TestVM must appear in Glance and only one nova-network should be present.

   * Run network verification test.

   * Run OSTF.

4. Deploy an HA cluster with Ceph and nova-network:
   Steps to perform:

   * Create a cluster: use Ceph for volumes and images.

   * Add 3 nodes with controller and Ceph OSD roles.

   * Add one node with Ceph OSD role.

   * Add 2 nodes with compute and Ceph OSD roles.

   * Start cluster deployment.

   * Check Ceph status with **ceph health** command.
     Command output should have *HEALTH_OK**.

   * Run OSTF.

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

   * Run network verification test.

6. Deploy nova-network cluster in HA mode with Ceilometer.
   Steps to perform:

   * Create a cluster. On **Settings** tab of the Fuel web UI,
     select **Install Ceilometer** option.

   * Add 3 nodes with controller role.

   * Add one node with compute role.

   * Add one node with MongoDB role.

   * Deploy the cluster.

   * Check that partitions on MongoDB node
     are the same as those selected on the Fuel web UI.

   * Make sure that Ceilometer API is running (it must be
     present in 'ps ax' output).

   * Run OSTF.

7. Check HA mode on scalability.
   Steps to perform:

  * Create a cluster.

  * Add 1 controller node.

  * Deploy the cluster.

  * Add 2 controller nodes.

  * Deploy the changes.

  * Check Pacemaker status: all nodes must be online after running **crm_mon -1** command.

  * Run network verification test.

  * Add 2 controller nodes.

  * Deploy the changes.

  * Run network verification test.

  * Check that public and management vIPs have started after running **crm_mon -1** command.

  * Run OSTF.

8. Backup/restore Fuel Master node with HA cluster.
   Steps to perform:

   * Create a cluster with 3 controllers and 2 compute nodes.

   * Backup Fuel Master node.

   * Run OSTF.

   * Add 1 node with compute role.

   * Restore Fuel Master node.

   * Check if restore procedure succeeded.
     Before backup, a file is created and its checksum is saved.
     After performing environment backup and restore, 
     you get checksum of this file and verify that it is equal to the checksum that was saved before backup.

   * Run OSTF.

Neutron
+++++++

These tests are run on both CentOS and Ubuntu.

1. Deploy a cluster in HA mode with Neutron GRE segmentation.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * Deploy the cluster.

   * Run network verification test.

   * Run OSTF.

2. Deploy a cluster in HA mode with Neutron
   GRE segmentation and public network
   assigned to all nodes.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * On **Settings* tab of the Fuel web UI,
     select **Assign public networks to all nodes** option.

   * Deploy the cluster.

   * Check that public network is assigned to all nodes.

   * Run network verification test.

   * Perform a security check: verify that it is impossible
     to access TCP or UDP unused ports.

   * Run OSTF.

3. Deploy a cluster in HA mode with Neutron VLAN.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * Deploy the cluster.

   * Run network verification test.

   * Run OSTF.

4. Deploy cluster in HA mode with Neutron VLAN and public network
   assigned to all nodes.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add 2 nodes with compute role.

   * On **Settings** tab of the Fuel web UI,
     select **Assign public networks to all nodes** option.

   * Deploy the cluster.

   * Check that public network is assigned to all nodes.

   * Run network verification test.

   * Perform a security check: verify that it is impossible
     to access TCP or UDP unused ports.

   * Run OSTF.

5. Deploy a cluster in HA mode with Murano and Neutron GRE segmentation.
   Steps to perform:

   * Create a cluster. Select **Install Murano** option.

   * Add 3 node with controller role.

   * Add one nodes with compute role.

   * Deploy the cluster.

   * Verify that Murano services are up and running.

   * Run OSTF.

   * Register Murano image.

   * Run Murano platform OSTF tests.

6. Deploy Heat cluster in HA mode.
   Steps to perform:

   * Create a cluster.

   * Add 3 nodes with controller role.

   * Add one node with compute role.

   * Deploy the cluster.

   * Verify that Heat services are up and running (check
     that 'heat-api' is present in'ps ax' output on every controller).

   * Run OSTF.

   * Register Heat image.

   * Run OSTF platform tests.

7. Deploy a new Neutron GRE cluster
   in HA mode after Fuel Master is upgraded.
   Steps to perform:

  * Create a cluster with 1 controller with Ceph, 2
    compute nodes with Ceph;
    Ceph for volumes and images should also be enabled.

  * Run upgrade on Fuel Master node.

  * Check that upgrade has succeeded.

  * Deploy a new upgraded cluster with HA Neutron VLAN manager, 3 controllers,
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

  * Check network connectivity from the instance with
    *dhcp namespace*.

  * Run OSTF.

2. Deploy nova-network environment with Ceph in HA mode.
   Steps to perform:

   * Create a cluster with Ceph for images and volumes.

   * Add 3 nodes with controller and Ceph OSD roles.

   * Add 1 node with Ceph OSD role.

   * Add 2 nodes with compute and Ceph OSD roles.

   * Deploy the cluster.

   * Check Ceph status with **ceph-health** command.
     Command output should have *HEALTH_OK*.

   * Destroy a node with Ceph role and check Ceph status.

   * Run OSTF and check Ceph status.

   * Destroy the compute node with Ceph and check Ceph status.

   * Run OSTF and check Ceph status.

   * Restart 4 online nodes.

   * Run OSTF and check Ceph status.

3. Monit on compute nodes for nova-network and Neutron.
   Steps to perform:

  * Deploy HA cluster with nova-network or Neutron 3 controllers and 2 compute nodes.

  * SSH to each compute node.

  * Kill nova-compute service.

  * Check that service has been restarted by Monit.


4. Pacemaker restarts heat-engine when AMQP connection is lost (for
   both nova-network and Neutron).
   Steps to perform:

   * Deploy HA cluster with nova-network or Neutron,
     3 controllers and 2 compute nodes.

   * SSH to any controller.

   * Check heat-engine status.

   * Block heat-engine AMQP connections.

   * Check that heat-engine has stopped on the current controller.

   * Unblock heat-engine AMQP connections.

   * Check that heat-engine process is running with new pid.

   * Check that AMQP connection has re-appeared for heat-engine.

The following testing scenarios (from 5 to 9) may be mixed with Nova or Neutron, CentOS or Ubuntu.

5. Shut down primary controller.
   Steps to perform:

  * Deploy a cluster with 3 controllers and 2 compute nodes.

  * Destroy the primary controller.

  * Check Pacemaker status: all nodes must be online
    after running **crm_mon -1** command.

  * Wait until MySQL Galera is up:
    **"SELECT VARIABLE_VALUE FROM information_schema.GLOBAL_STATUS WHERE VARIABLE_NAME = 'wsrep_ready';"** should return "On".

  * Run OSTF.

6. Shut down non-primary controller.
   Steps to perform:

  * Deploy a cluster with 3 controllers and 2 compute nodes.

  * Destroy non-primary controller.

  * Check Pacemaker status: all nodes must be online
    after running **crm_mon -1** command.

  * Wait until MySQL Galera is up:
    **"SELECT VARIABLE_VALUE FROM information_schema.GLOBAL_STATUS WHERE VARIABLE_NAME = 'wsrep_ready';"** should return "On".

  * Run OSTF.

7. Shut down management interface on the primary controller.
   Steps to perform:

   * Deploy a cluster with 3 controllers and 2 compute nodes.

   * Disconnect eth2 of the first controller via iptables.

   * Check Pacemaker status: all nodes must be online
     after running **crm_mon -1** command.

   * Wait for vip__ resources to migrate to the working controllers.

   * Run OSTF 'smoke' tests.

   * Restore connectivity to the first controller.

   * Wait until Pacemaker specifies the 'lost' controller as 'online'.

   * Wait for Pacemaker resources to become operational on all controllers.

   * Run 'sanity' and 'smoke' OSTF tests.

   * Repeat steps described above (from disconnecting eth2) for another controller.

   * Run OSTF.

8. Delete all management and public vIPs on all controller nodes:
   Steps to perform:

   * Delete all secondary vIPs.

   * Wait till it gets restored.

   * Ensure that vIp has restored.

   * Run OSTF.

9. Terminate HAProxy on all controllers one by one.
   Steps to perform:

   * Terminate HAProxy on every controller in cycle.

   * Wait till it gets restarted.

   * Go to another controller and repeat steps above.

   * Run OSTF.

10. Terminate MySQL on all controllers one by one.
    Steps to perform:

  * Terminate MySQL on every controller in cycle.

  * Wait until it gets restarted.

  * Verify that MySQL has restarted.

  * Go to another controller.

  * Run OSTF.

11. Verify that resources are configured.
    Steps to perform:

    * SSH to controller node.

    * Verify that all resources are configured.

    * Go to another controller.

Rally
+++++


1. Run `Rally <https://wiki.openstack.org/wiki/Rally>`_
   for generating typical activity on a cluster (for example,
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
    for generating the same activity on the cluster.
    In average, 500-1000 VMs should be created using 50, 70 or 100 parallel requests.
