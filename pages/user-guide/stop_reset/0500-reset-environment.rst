.. index:: Resetting an environment after deployment

.. contents :local:

.. _Reset_Environment:

Resetting environment after deployment
--------------------------------------

Right now the deployment process may be completed in one of three ways
(not including deleting the environment itself):

1) Environment is deployed successfully
2) Deployment failed and environment received an "error" status
3) Deployment was interrupted by clicking "Stop Deployment" button
   (:ref:`Stop_Deployment`)

Any of these three possibilities will lead to the "Reset" button in the
"Actions" tab to become unlocked:

.. image:: /_images/reset_environment_button.png
  :align: center

By clicking it, you will reset the whole environment to the same state
as right before "Deploy changes" button was clicked at the first time.

    * All nodes will become offline and will eventually return back
      online after reboot. As you can't deploy an environment which includes
      offline nodes, the next deployment should be started after all nodes
      have been successfully discovered and report as online in UI.
    * All settings will be unlocked on all tabs and for all nodes, so
      that the user may change any setting before starting a new deployment.
