
.. _updates-others-rn:

RabbitMQ
--------

Resolved Issues
+++++++++++++++

* Previously, while deleting a router, the RabbitMQ duplicated
  messages for the Neutron L3 agent. The issue is fixed and the
  warning "Info for router XXX were not found. Skipping router
  removal." does not appear any more. 
  See `LP1412772 <https://bugs.launchpad.net/mos/6.0-updates/+bug/1412772>`_.

Python
------

Resolved Issues
+++++++++++++++


