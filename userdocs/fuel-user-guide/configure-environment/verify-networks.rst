
.. raw:: pdf

  PageBreak

.. _verify-networks-ug:

Verify network configuration
----------------------------

After you configure network settings, verify your network configuration.
Network verification tests connectivity between nodes through configured
VLANs on the configured host interfaces.
Additionally, Fuel verifies that no external DHCP servers interfere with
the OpenStack environment deployment.
If network verification fails, the possible reasons may include incorrect
network configuration, hardware misconfiguration, such as VLAN tagging
is disabled on the switch port, and so on.

You must resolve all errors before you deploy an OpenStack environment.

.. note::
    Network verification does not test bond network interfaces.

**To verify network configuration:**

#. In the Fuel web UI, click :guilabel:`Networks`.
#. Click :guilabel:`Connectivity Check`.
#. Click :guilabel:`Verify Networks`.
#. Resolve any network conflicts.
#. Run the network verification again.

.. seealso::

   * :ref:`post-deployment-settings`