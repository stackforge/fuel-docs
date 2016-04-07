.. _post-deployment-conf:

===========================================
Reconfigure an environment after deployment
===========================================

Fuel enables you to change the configuration of an OpenStack environment
that is currently is on ``operational``, ``error``, ``stopped``, or
``partially_deployed`` states for further redeployment of the OpenStack
environment with the new parameters.

.. _post-deployment-settings:

Reconfigure the OpenStack environment settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**To redeploy an OpenStack environment settings configuration:**


#. In the Fuel web UI, click the :guilabel:`Settings` tab.
#. Reconfigure the OpenStack settings as required. See :ref:`settings-ug`
   for details.

#. Click :guilabel:`Save Settings`.

   .. note::

      If you would like to restore the last deployed OpenStack settings
      for your environment, click the :guilabel:`Load Deployed` button.
      The :guilabel:`Load Deployed` button does not display
      for the OpenStack environments with the ``new`` status.

#. In the :guilabel:`Dashboard` tab, view :guilabel:`List of changes`
   to deploy.

#. Click the :guilabel:`Deploy Changes` button to redeploy the OpenStack
   environment with the new configuration.
   Or click the :guilabel:`Discard` button to discard the changes and load
   the last deployed OpenStack environment configuration.

.. _post-deployment-network:

Reconfigure the network settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**To redeploy an OpenStack environment network configuration:**

#. In the Fuel web UI, click the :guilabel:`Networks` tab.
#. Reconfigure the network settings as required. See
   :ref:`network-settings-ug` for details.

#. Click :guilabel:`Save Settings`.

   .. note::

      If you would like to restore the last deployed network configuration
      for your OpenStack environment, click the :guilabel:`Load Deployed`
      button. The :guilabel:`Load Deployed` button does not display
      for the OpenStack environments with the ``new`` status.

#. In the :guilabel:`Dashboard` tab, view :guilabel:`List of changes`
   to deploy.

#. Click the :guilabel:`Deploy Changes` button to redeploy the OpenStack
   environment with the new configuration.
   Or click the :guilabel:`Discard` button to discard the changes and load
   the last deployed OpenStack environment configuration.