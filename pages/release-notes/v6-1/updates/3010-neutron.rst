
.. _updates-neutron-rn:

OpenStack Networking (Neutron)
------------------------------

Known Issues
++++++++++++

* There is a vulnerability in OpenStack Neutron (CVE-2015-3221). By
  adding an address pair which is rejected as invalid by the ipset
  tool, an authenticated user may break the Neutron L2 agent resulting
  in a denial of service attack. Neutron setups that use the iptables
  firewall driver are affected.
