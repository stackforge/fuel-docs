
.. raw:: pdf

  PageBreak

.. _verify-networks-ug:

Verify Networks
---------------

When you have applied all your information to the "Network Settings" screen,
click the "Verify Networks" button at the bottom of the screen.
This checks and confirms the network configuration

The network check includes tests for connectivity between
nodes via configured VLANs on configured host interfaces.
Additionally, checks for an unexpected DHCP server are done
to ensure that outside DHCP servers will not interfere with deployment.
The image below shows a sample result of the check.
If there are errors, it is either in your configuration of interfaces
or possibly the VLAN tagging feature is disabled on your switch port.

.. image:: /_images/net_verify_failure.jpg
   :width: 90%

Resolve any errors before attempting to deploy your environment.


