.. index:: Resetting an environment after deployment

.. contents :local:

.. _Reset_Environment:

Resetting environment after deployment
--------------------------------------

The deployment process may be completed in one of three ways
(not including deleting the environment itself):

1) Environment is deployed successfully
2) Deployment failed and environment received an "error" status
3) Deployment was interrupted by clicking "Stop Deployment" button
   (see :ref:`Stop_Deployment`)

Any of these three possibilities causes the "Reset" button
in the "Actions" tab to become unlocked:

.. image:: /_images/reset_environment_button.png
  :align: center
  :width: 90%

Click this button to reset the whole environment
back to the state it was in
right before the "Deploy changes" button was first clicked.

    * All nodes will be offline; they will come back online after reboot.
      You can not deploy an environment that includes offline nodes,
      so you should start the next deployment
      after all nodes have been successfully discovered
      and reported as online in UI.
    * All settings will be unlocked on all tabs and for all nodes,
      so you can modify any setting before starting a new deployment.
