.. _Stop_Deployment:

Stopping Deployment from Web UI
-------------------------------

After clicking "Deploy changes" and deployment itself starts, a small red
button to the right of the progress bar will appear:

.. image:: /_images/stop_deployment_button.png
  :align: center
  :width: 100%

By clicking this button, you may interrupt deployment process (in case of any
errors, for example). This may lead to two possible results:

1. If no nodes have finished deployment (reached "ready" status), all nodes
   will be rebooted back to bootstrap. The environment will be reset to its
   state right before "Deploy Changes" was pressed. The environment may be
   redeployed from scratch. Two things will happen in UI:

    * First, all nodes will become offline and will eventually return back
      online after reboot. As you can't deploy an environment which includes
      offline nodes, the next deployment should be started after all nodes
      have been successfully discovered and report as online in UI.
    * Second, all settings will be unlocked on all tabs and for all nodes, so
      that the user may change any setting before starting a new deployment.

This is quite similar to resetting the environment (:ref:`Reset_Environment`).

2. Some nodes are already deployed (usually controllers) and have reached
   "ready" status in the UI. In this case, the behavior will be different:

    * Only nodes which did not reach "ready" status will be rebooted back to
      bootstrap and deployed ones will remain intact.
    * Settings will remain locked because they have been already applied to
      some nodes. You may reset the environment (:ref:`Reset_Environment`) to
      reboot all nodes, unlock all parameters and redeploy an environment
      from scratch to apply them again.

.. note::

    In Release 4.1, deployment cannot be interrupted during the
    provisioning stage. This means that a user can click on "Stop
    deployment" while nodes are provisioning, but they will be rebooted
    back to bootstrap only when OS installation is complete.
