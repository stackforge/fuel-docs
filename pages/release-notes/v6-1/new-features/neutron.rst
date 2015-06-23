Neutron-related Features
------------------------

Neutron features supported in 6.1
+++++++++++++++++++++++++++++++++

* DB migration refactor and new timeline.

* IPSet support for security groups (this option is configurable).

* L3 agent performance improvements such as processing many routers
  in parallel and improved responsiveness to L3 changes made through
  the API following an agent restart.

* Migration to oslo.messaging library for RPC communication.

* Security group rules for devices RPC call refactoring (a huge
  performance improvement).

Neutron features not supported in 6.1
+++++++++++++++++++++++++++++++++++++

* Distributed Virtual Router Support (DVR).

* Full IPv6 support for tenant networks.

* High Availability for the L3 Agent.



