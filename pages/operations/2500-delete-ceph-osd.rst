
.. _delete-ceph-osd:

How To: Safely remove a Ceph OSD node
=============================================

Before a Ceph OSD node can be deleted from an environment all data
must be moved to other OSDs. Fuel prevents the deletion of OSDs
that still have data on them. The following process will move
any data present on the soon-to-be-deleted node to other OSDs
in the cluster.


#. Determine which OSD processes are running on the target node
   (node-35 in this case):

   ::

     # ceph osd tree
        # id    weight  type name       up/down reweight
        -1      0.4499  root default
        -2      0.09998         host node-35
        0       0.04999                 osd.0   up      1
        1       0.04999                 osd.1   up      1


   From this output we can see that OSDs 0 and 1 are running
   on this node.

#. Remove the OSDs from the Ceph cluster:

   ::

    # ceph osd out 0
    # ceph osd out 1

   This will trigger a rebalance. Placement groups will be moved to
   other OSDs. Once that has completed we can finish removing the
   OSD. This process can take minutes o rhours depending on the amount
   of data to be rebalanced. While the rebalance is in progress the
   cluster state will look something like:

   ::

    # ceph -s
    cluster 7fb97281-5014-4a39-91a5-918d525f25a9
     health HEALTH_WARN recovery 2/20 objects degraded (10.000%)
     monmap e1: 1 mons at {node-33=10.108.2.4:6789/0}, election epoch 1, quorum 0 node-33
     osdmap e172: 7 osds: 7 up, 5 in
      pgmap v803: 960 pgs, 6 pools, 4012 MB data, 10 objects
            10679 MB used, 236 GB / 247 GB avail
            2/20 objects degraded (10.000%)
                   1 active
                 959 active+clean

   Once the rebalance is complete it will look like:

   ::

    # ceph -s

    cluster 7fb97281-5014-4a39-91a5-918d525f25a9
     health HEALTH_OK
     monmap e1: 1 mons at {node-33=10.108.2.4:6789/0}, election epoch 1, quorum 0 node-33
     osdmap e172: 7 osds: 7 up, 5 in
      pgmap v804: 960 pgs, 6 pools, 4012 MB data, 10 objects
            10679 MB used, 236 GB / 247 GB avail
                 960 active+clean


   When the cluster is in state HEALTH_OK the OSD can be removed
   from the crush map:

   ::

    # service ceph stop osd.0
    # ceph crush remove osd.0
    # ceph auth del osd.0

#. This node can now be deleted from the environment with Fuel.

Caveats:

* Ensure that at least replica count hosts remain in the cluster.
  If the replica count is 3 then there should always be at least 3
  hosts in the cluster.

* Do not let the cluster reach its full ratio. By default when the
  cluster reaches 95% utilization Ceph will prevent clients from
  writing data to it.

