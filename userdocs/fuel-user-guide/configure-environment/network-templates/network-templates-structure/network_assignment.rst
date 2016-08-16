.. _network-assignment:

network_assignment
------------------

**Description**

Describes mapping between endpoints and network names and defines
the L3 configuration for the network endpoints. The **Example**
section describes the mapping that Fuel configures by default
without using templates. The set of networks can be changed
using API.

**Example**

::

  network_assignments:
  storage:
        ep: br-storage
  private:
        ep: br-prv
  public:
        ep: br-ex
  management:
        ep: br-mgmt
