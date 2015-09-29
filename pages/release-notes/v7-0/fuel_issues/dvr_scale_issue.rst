* Currently Mirantis OpenStack 7.0 can only scale to 50 nodes
  or less under the following conditions:

  * The Neutron DVR feature is enabled
  * The L3 agent workload consists of 178 router operations
    (create, delete) or more with 5 concurrent threads or more

  See `LP1500488 <https://bugs.launchpad.net/fuel/+bug/1500488>`_.
