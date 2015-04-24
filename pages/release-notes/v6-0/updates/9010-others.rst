
.. _updates-others-rn:

RabbitMQ
--------

Resolved Issues
+++++++++++++++

* Previously, while deleting a router, the RabbitMQ duplicated
  messages for the Neutron L3 agent. The issue is fixed, and the
  warning "Info for router XXX were not found. Skipping router
  removal." does not appear any more.
  See `LP1412772 <https://bugs.launchpad.net/mos/6.0-updates/+bug/1412772>`_.

Python
------

Resolved Issues
+++++++++++++++

* The memory leak in python-libvirt that affected Compute service
  has been fixed. See `LP1419362 <https://bugs.launchpad.net/mos/6.0-updates/+bug/1419362>`_.

Other
-----

Resolved Issues
+++++++++++++++

*  Sometimes the rpc subsystem could lose its temporary queues and cause actions failure.       
   The issue is fixed. See `LP1415932 <https://bugs.launchpad.net/mos/+bug/1415932>`_.
