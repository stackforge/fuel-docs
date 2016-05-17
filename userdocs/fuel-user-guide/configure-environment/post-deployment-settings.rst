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

     If you modify the **network IP ranges**, and the new ranges do not cover
     the IP addresses already allocated to nodes during the deployment,
     the following error appears:
     *New IP ranges for network 'public'(2) do not cover already allocated
     IPs.*

     To resolve the problem, proceed with one of the following options:

     * Adjust the new network IP ranges to cover all allocated IP addresses.

     * Reset the OpenStack environment and update the network ranges.

     * If only a few nodes do not fit into the new network IP ranges, you can
       delete them from your OpenStack environment, update the network ranges,
       and re-add the deleted nodes.

     .. note::

        To get the allocated IP addresses, log in to any node and check
        the ``network_metadata[nodes]`` list in ``/etc/astute.yaml``.
        Alternatively, use CLI to download the interfaces information for
        the nodes.

     Additionally, verify that all VIP addresses conform to new network IP
     ranges.

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