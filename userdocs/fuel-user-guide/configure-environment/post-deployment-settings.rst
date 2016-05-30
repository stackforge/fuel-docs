.. _post-deployment-settings:

=========================================
Modify the OpenStack environment settings
=========================================

Fuel enables you to change the configuration of an OpenStack environment
that is currently in the ``operational``, ``error``, ``stopped``, or
``partially_deployed`` states for further redeployment of the OpenStack
environment with new parameters.

**To redeploy the OpenStack environment settings:**

#. In the Fuel web UI, click the :guilabel:`Settings` tab.
#. Reconfigure the OpenStack settings as required:

   * To modify the OpenStack environment settings, see :ref:`settings-ug`.
   * To modify network settings, see :ref:`network-settings-ug`.

     .. seealso::

        * :ref:`ug-network`

#. Click :guilabel:`Save Settings`.

   .. note::

      To restore the last successfully deployed OpenStack settings
      for your environment, click :guilabel:`Load Deployed`.
      The :guilabel:`Load Deployed` button does not display
      for the OpenStack environments with the ``new`` status.

#. In the :guilabel:`Dashboard` tab, view :guilabel:`List of changes`
   to deploy.

#. Click :guilabel:`Deploy Changes` to redeploy the OpenStack environment
   with the new configuration.
   Or click :guilabel:`Discard` to discard the changes and load the last
   successfully deployed OpenStack environment configuration.