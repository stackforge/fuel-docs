.. _stop_deployment:

Interrupt the OpenStack environment deployment
----------------------------------------------

You may need to interrupt the deployment of your OpenStack
environment if you have applied incorrect settings.

Depending on the status of deployment, deployment interruption
may result in various outcomes.

**To interrupt the OpenStack environment deployment:**

#. In the Fuel web UI, click the :guilabel:`Dashboard` tab.
#. In the deployment progress bar area, click :guilabel:`Stop`.
#. Click the :guilabel:`Nodes` tab.

   * If no nodes have finished deployment, all nodes are rebooted
     to the bootstrap state and appear as *Offline*.
     Fuel resets the environment to the state before you have
     started the deployment.

     #. Wait until Fuel reboots the nodes.
        The nodes must appear as *Online*. All settings in all tabs
        must be unlocked.
     #. Apply any required changes to the OpenStack environment
        configuration.
     #. Deploy your OpenStack environment.

   * If some nodes have already been deployed and have the *Ready* status,
     Fuel reboots only the nodes that have not finished deployment.
     Settings remain locked.

     #. Reset the OpenStack environment as described in
        :ref:`reset_environment`.
     #. Configure your OpenStack environment.
     #. Deploy your OpenStack environment.
