.. _ha-testing-scenarios-ops:

HA testing scenarios
====================

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
