
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

.. image:: /_images/user_screen_shots/net_verify_failure.png


Resolve any errors before attempting to deploy your environment.
After doing that, run the check once more. The *Verification succeeded*
message should appear.

.. image:: /_images/user_screen_shots/net_verify_success.png


.. note:: Currently, network verification does not check
   interfaces in bonds taking them for simple interfaces.
   In case of LACP L2 bonding, verification fails on the hardware.
   Due to this problem, interfaces in LACP bonds are excluded
   from the checklist.

Beginning with Fuel 6.1, if you press **Deploy** button
the Fuel web UI will prevent you from deploying the
environment in three cases:

* you have not verified networks at all:

  .. image:: /_images/user_screen_shots/verify-network-warning.png

* your network verification is in progress:

  .. image:: /_images/user_screen_shots/net_verify_in_progress.png

* your network verification failed:
 
  .. image:: /_images/user_screen_shots/net_verify_failure-warning.png
