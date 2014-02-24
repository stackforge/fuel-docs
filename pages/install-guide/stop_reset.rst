.. raw:: pdf

   PageBreak

.. index:: Stopping Deployment and Resetting Environment

Stopping Deployment and Resetting Environment
=============================================

.. contents :local:

.. _Stop_Deployment:

Stopping Deployment from Web UI
-------------------------------

After "Deploy changes" button was clicked and deployment itself was started, the small red button near progress bar will appear:

.. image:: /_images/stop_deployment_button.png
  :align: center

By clicking this button, you may interrupt deployment process (in case of any errors, for example). This may lead to two possible results:

1. There are no nodes which are already deployed (got "ready" status), so all of them will be rebooted back to bootstrap. Cluster will be resetted back to the stage right before "Deploy changes" button was clicked, and may be redeployed from scratch. Two things will happen in UI:

	* First, all nodes will become offline and will eventually return back online after reboot. As you can't deploy an environment which includes offline nodes, so next deployment should be started after all nodes are successfully discovered and became online in UI.
	* Second, all settings will be unlocked at all tabs and nodes, so user may update some of them before starting new deployment process again.

This is quite similar to resetting the environment (:ref:`Reset_Environment`).

2. Some nodes are already deployed (probably, controllers), and got "ready" status in UI. In this case the behaviour will be different:

	* Only nodes which weren't "ready" will be rebooted back to bootstrap and deployed ones will remain intact.
	* Settings will remain locked, because they are already applied on some nodes. You may reset the environment (:ref:`Reset_Environment`) to reboot all nodes, unlock all parameters and redeploy an environmtent from scratch to apply them again.


.. index:: Resetting an environment after deployment

.. contents :local:

.. _Reset_Environment:

Resetting environment after deployment
--------------------------------------

Right now deployment process may be completed in one of three ways (not including deleting environment itself):

1) Environment is deployed successfully
2) Deployment failed and environment got an "error" status
3) Deployment was interrupted by clicking "Stop Deployment" button (:ref:`Stop_Deployment`)

Any of these three possibilities will lead to button "Reset" at "Actions" tab to become unlocked:

.. image:: /_images/reset_environment_button.png
  :align: center

By clicking it, you will reset the whole environment to the same state as right before "Deploy changes" button was clicked at the first time.

	* All nodes will become offline and will eventually return back online after reboot. As you can't deploy an environment which includes offline nodes, so next deployment should be started after all nodes are successfully discovered and became online in UI.
	* All settings will be unlocked at all tabs and nodes, so user may update some of them before starting new deployment process again.

