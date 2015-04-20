
.. _updates-neutron-rn:

OpenStack Networking (Neutron)
------------------------------

Resolved Issues
+++++++++++++++

* RPC method in OVS agent attempts to access an uninitialized attribute.
  This failure at startup of OVS agent has been addressed and does
  not lead to a connectivity failure of a whole node caused by improper
  tunnels set up anymore.
  See `LP1419763 <https://bugs.launchpad.net/mos/6.0-updates/+bug/1419763>`_.

