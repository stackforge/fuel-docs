
.. raw:: pdf

   PageBreak

.. _deploy-changes:

Deploy Changes
==============

When you have made all the configuration changes you want to make,
click the "Deploy Changes" button
to deploy the environment you have defined.

When you are satisfied with your configuration,
click on the "Deploy Changes" button.
The following screen is displayed
to summarize the configuration modifications you have made:

.. image:: /_images/user_screen_shots/assign-role-confirm2.png
   :width: 50%

This is your last chance to change the configuration;
check it carefully and,
if this is not the configuration you want to deploy, click "Cancel".
If this is the configuration you want,
click "Deploy";
after this, you cannot modify the configuration without starting over.

It can take fifteen minutes to an hour to deploy Mirantis OpenStack,
depending on the options chosen;
deployment times out at two hours.
You can monitor the progress by opening the **Nodes** tab
or by checking individual node logs in the **Logs** tab.

.. include:: /pages/user-guide/stop_reset/0200-stop-deploy-ui.rst
.. include:: /pages/user-guide/stop_reset/0500-reset-environment.rst

Note, that beginning with Fuel 6.1, the Fuel web UI
displays warnings if you try to press **Deploy** button
with network verification in progress, failed or
skipped. See :ref:`Verify networks <verify-networks-ug>` for
more details and screenshots.

