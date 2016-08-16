.. _network-templates-limitations:

Network template limitations
----------------------------

When using network templates, consider the following limitations:

* All operations must be perform through CLI or API. Fuel web UI does
  not support network templates.
* Addressing for the Admin network cannot be modified.
* The Public network which maps to the External network in OpenStack,
  cannot be removed.
* When you use network templates, do not download and modify Fuel network
  and deployment configurations using the ``fuel download`` and
  ``fuel upload`` commands. Network templates take precedence over all
  configurations applied through Fuel web UI and CLI commands. Manually
  changing Fuel configuration while using networking templates may result
  in system malfunction.
* Mapping of network roles to networks, as well as network topology cannot
  be configure for individual nodes. They can only be set for node role
  or/and node group.
