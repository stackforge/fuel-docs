.. _ha-testing-scenarios-ops:

Common HA testing scenarios
===========================

Currently, several testing scenarios are provided
to check HA enrivonment.

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

  * Repeat the same from 1) to 9) for the second controller.

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

2. Run `Rally <https://wiki.openstack.org/wiki/Rally>`_.


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



