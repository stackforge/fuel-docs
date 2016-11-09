.. _network-templates-limitations:

Network template limitations
----------------------------

When using network templates, consider the following limitations:

* All operations with templates must be performed through CLI or API.
  The Fuel web UI does not support network templates.
* The Public network which maps to the External network in OpenStack
  cannot be removed.
* When you use network templates, do not download and modify Fuel
  deployment configurations using the ``fuel download`` and
  ``fuel upload`` commands as it may result in a system malfunction.
* Mapping of network roles to networks, as well as network topology cannot
  be configured for individual nodes. They can only be set for a node role
  or/and node group.
* Network verification in the Fuel web UI has limited support.
