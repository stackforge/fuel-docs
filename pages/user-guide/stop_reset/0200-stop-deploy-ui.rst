.. _Stop_Deployment:

Stopping Deployment from Web UI
-------------------------------

Click on the small red button that appears to the right of the progress bar
after you click "Deploy changes" and deployment itself starts:

.. image:: /_images/stop_deployment_button.png
  :align: center
  :width: 70%

Clicking this button interrupts the deployment process;
this is useful if, for example, you realize you made an error in the configuration.
This may lead to one of two possible results:

#. If no nodes have finished deployment (reached "ready" status),
   all nodes are rebooted back to bootstrap.
   The environment is reset to the state it had
   right before "Deploy Changes" was pressed;
   the environment may then be redeployed from scratch.
   Two things will happen in UI:

    * All nodes are marked as offline
      and are eventually return back online after reboot.
      You can not deploy an environment that includes offline nodes,
      so the next deployment should not be started
      until all nodes have been successfully discovered
      and reported as online in the UI.
    * All settings will be unlocked on all tabs and for all nodes,
      so that you can change any setting before starting a new deployment.

    This is quite similar to resetting the environment (:ref:`Reset_Environment`).

#. Some nodes are already deployed (usually controllers)
   and have reached "ready" status in the UI.
   In this case, the behavior is different:

    * Only nodes which did not reach "ready" status are rebooted
      back to bootstrap; deployed ones remain intact.
    * Settings remain locked
      because they have been already applied to some nodes.
      You may reset the environment (:ref:`Reset_Environment`)
      to reboot all nodes, unlock all parameters,
      and redeploy an environment from scratch to apply them again.

