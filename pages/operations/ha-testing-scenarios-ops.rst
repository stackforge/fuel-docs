.. _ha-testing-scenarios-ops:

Common HA testing scenarios
===========================

Currently, several testing scenarios are provided
to check HA enrivonment.

These issues may be mixed with nova|neutron] & [centos|ubuntu].

1. Shutdown primary controller:

   * Ensure that vIP addresses have moved to other controller.

   * Ensure connectivity to the
     outside world from a VM.

   * Ensure that all services work properly.

   * Run OSTF.

2. Shut down non-primary controller:

   * Ensure that all services work fine.

   * Run OSTF.

3. Reboot primary controller in a safe mode:

   * Check the state of Galera and RabbitMQ clusters.

   * Run OSTF.

4. Hard reset of primary controller:

   * Check  the state of Galera and RabbitMQ clusters.

   * Run OSTF.

5. Shut down management interface on primary controller:

   * Ensure that vIP addresses have moved to another controller.

   * Ensure that connectivity to outside world is up from VM.

   * Ensure that all services work properly.

   * Check the state of Galera and RabbitMQ clusters.

   * Run OSTF.

6. Corrupt root filesystem on the primary controller
   (for example, remount it as read-only):

   * Check the state of Galera and RabbitMQ clusters.

   * Run OSTF.

7. Lock database access from the primary controller (emulate non-responsiveness of MySQL):
	
	* Check the state of Galera cluster.

	* Run OSTF.

8. Delete *public__vip* 2 times:

   * Ensure that vIP addresses have moved to another controller.

   * Ensure that connectivity is up to outside world from VM.

   * Ensure that all services work properly.

   * Run OSTF.

9. Terminate HAProxy:
	
	* Ensure that vIP addresses have moved to another controller.

	* Ensure that the connectivity is up to outside world from VM.

	* Check the state of Galera and RabbitMQ clusters.

	* Run OSTF.
	
10. Run Rally for generating the same activity on a cluster (create-delete instances|volumes)  => Shutdown primary controller => Run rally:

	* Ensure that vIP addresses have moved to another controller.

	 * Ensure that the connectivity is up to outside world from VM.

	* Check  the state of Galera and RabbitMQ clusters.

Specific scenarios
------------------

The following scenarios enable
testing problem that may occur in HA environment.

Shut down public vIP address two times
++++++++++++++++++++++++++++++++++++++

See the related `L1311749 <https://bugs.launchpad.net/fuel/+bug/1311749>`_.

Steps to perform:

1. Deploy HA cluster with nova-network, 3 controllers and 2 compute nodes.

2. Find a node with public vIP address.

3. Shut down ethernet interface with public vIP address.

4. Check if vIP has recovered.

5. Find a node with recovered vIP.

6. Shut down ethernet interface with public vIP address once again.

7. Check if vIP has recovered.

8. Run OSTF.

9. Repeat the steps described above to test management vIP address.


Galera does not reassemble on galera quorum loss
++++++++++++++++++++++++++++++++++++++++++++++++

See the related `L1350545 <https://bugs.launchpad.net/fuel/+bug/1350545>`_.


Steps to perform:

1. Deploy HA cluster with nova-network, 3 controllers and 2 compute nodes.

2. Shut down one controller.

3. Wait till Galera cluster reassembles (HA health check should be passed).

4. Kill mysqld on the second controller.

5. Start the first controller.

6. Wait for 5 minutes to let Galera reassemble and check if it has succeeded.

7. Run OSTF.

8. Using Mirantis OpenStack script, check RabbitMQ status.


Corrupt root file system on primary controller
++++++++++++++++++++++++++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with nova-network, 3 controllers and 2 compute nodes.

2. Corrupt root file system on the primary controller.

3. Run OSTF.

Block Corosync traffic
++++++++++++++++++++++

See the related `LP1354520 <https://bugs.launchpad.net/fuel/+bug/1354520`_.

Steps to perform:

1. Deploy HA cluster with nova-network, 3 controllers and 2 compute nodes.

2. Login to RabbitMQ Master node.

3. Block corosync traffic by extracting an interface from management bridge.

4. Unblock Corosync traffic back.

5. Check rabbitmqctl cluster_status at Rabbit master node.

6. Run OSTF HA tests.


HA scalability for mongo
++++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with nova-network, 1 controller and 3 MongoDB nodes.

2. Add 2 controller nodes and re-deploy the cluster.

3. Run OSTF.

4. Add 2 MongoDB nodes and re-deploy cluster.

5. Run OSTF.

Lock DB access on primary controller
++++++++++++++++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with nova-network, 3 controllers and 2 compute nodes.

2. Lock database access on the primary controller.

3. Run OSTF.


HA failover on clusters with enabled bonding
++++++++++++++++++++++++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with Neutron VLAN, 3 controllers and 2 compute nodes.
   eth1-eth4 interfaces are bonded in active backup mode.

2. Destroy the primary controller.

3. Check Pacemaker status.

4. Run OSTF.

5. Using Mirantis OpenStack script, check RabbitMQ status.
   Retry it during 5 minutes till successful result is reached.


HA load testing with Rally
++++++++++++++++++++++++++


9. Need to test HA Neutron cluster under high load and simultaneous
removing of virtual router ports
(related link http://lists.openstack.org/pipermail/openstack-operators/
2014-September/005165.html)

Cinder/Neutron plugin check
+++++++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with Neutron GRE, 3 controllers and 2 compute nodes.
   Cinder or Neutron plugin must be enabled.

2. Run network verification test.

3. Run OSTF.

Rmq failover test for compute service
+++++++++++++++++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with nova-network, 3 controllers and
   2 compute nodes with Cinder roles.

2. Disable one compute node:

::


        nova-manage service disable --host=<compute_node_name> --service=nova-compute

3. On controller node under test
   (which compute node under test is connected
   to via rmq port 5673) repeat spawn / destroy instance
   requests continuosly
   (sleep 60) while the test is running


4. Add iptables block rule from compute IP to controller IP:5673
   (take care for conntrack as well):

 ::



      iptables -I INPUT 1 -s compute_IP -p tcp --dport 5673 -m state
      --state NEW,ESTABLISHED,RELATED -j DROP


5. Wait for 3 minutes: compute node under test should be marked as down
   in the nova service-list.

6. Wait for another 3 min for it to be brought up back.

7. Check for the compute node under test queue - it should be zero messages
   in it.

8. Check if the instance could be spawned at the node.

Check monit on compute nodes
++++++++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with nova-network, 3 controllers and 2 compute nodes.

2. SSH to each compute node.

3. Kill nova-compute service.

4. Check that service was restarted by monit.

Check pacemaker restarts heat-engine in case of losing AMQP connection
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with nova-network, 3 controllers and 2 compute nodes.

2. SSH to controller with running heat-engine.

3. Check heat-engine status.

4. Block heat-engine AMQP connections.

5. Check if heat-engine was moved to another controller or stopped
   on current controller.

6. If moved, SSH to the node with running heat-engine:

   * Check that heat-engine is running.

   * Check heat-engine has some amqp connections.

7. If stopped - check heat-engine process is running with new pid:

   * Unblock heat-engine amqp connections.

   * Check amqp connection re-appears for heat-engine.


Neutron agent rescheduling
++++++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with Neutron GRE, 3 controllers and 2 compute nodes.

2. Check the neutron-agents list consitency (no duplicates,
   alive statuses, etc).

3. On host with l3 agent create one more router.

4. Check there are 2 namespaces.

5. Destroy controller with l3 agent.

6. Check it was moved to another controller, check all routers
   and namespaces were moved.

7. Check metadata agent was also moved, there is process in router
   namespace that listen to 8775 port

DHCP agent rescheduling
+++++++++++++++++++++++

Steps to perform:

1. Deploy HA cluster with Neutron GRE, 3 controllers and 2 compute nodes.

2. Destroy controller with DHCP agent.

3. Check it was moved to another controller.

4. Check metadata agent was also moved, there is process in router
   namespace that listen to 8775 port