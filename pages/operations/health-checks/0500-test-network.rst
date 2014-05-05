.. raw:: pdf

   PageBreak

.. index:: Fuel UI: Network Issues

Network Issues
==============

Fuel has the built-in capability to run a network check before or after 
OpenStack deployment. The network check includes tests for connectivity between 
nodes via configured VLANs on configured host interfaces. Additionally, checks 
for an unexpected DHCP server are done to ensure outside DHCP servers will not 
interfere with deployment. The image below shows a sample result of the check. 
If there are errors, it is either in your configuration of interfaces or 
possibly the VLAN tagging feature is disabled on your switch port. 

.. image:: /_images/net_verify_failure.jpg
  :align: center
