
.. _ceph-osd-placement-groups:

HowTo: Adjust Placement Groups when adding additional Ceph OSD node(s)
======================================================================

When adding additional Ceph OSD nodes to an environment, it may be
necessary to addjust the placement groups (pg_num) and the placement
groups for placement (pgp_num) for the pools. The following process
can be used to update these two values for the ceph deployment.
These adjustments may not be necessary unless you are a significant
number of OSDs to an existing deployment. Fuel attempts to calculate
appropriate values for the initial deployment but does not adjust it
when adding additional OSDs.


#. Determine the current values for pg_num and pgp_num for each pool
   that will be touched.  The pools that may need to be adjusted are the
   'images', 'volumes' and 'compute' pools.

   First get the list of pools that are currently configured.

   ::

     # ceph osd dump | grep '^pool'
     pool 0 'data' replicated size 2 min_size 1 crush_ruleset 0 object_hash rjenkins pg_num 64 pgp_num 64 last_change 1 flags hashpspool crash_replay_interval 45 stripe_width 0
     pool 1 'metadata' replicated size 2 min_size 1 crush_ruleset 0 object_hash rjenkins pg_num 64 pgp_num 64 last_change 1 flags hashpspool stripe_width 0
     pool 2 'rbd' replicated size 2 min_size 1 crush_ruleset 0 object_hash rjenkins pg_num 64 pgp_num 64 last_change 1 flags hashpspool stripe_width 0
     pool 3 'images' replicated size 2 min_size 1 crush_ruleset 0 object_hash rjenkins pg_num 512 pgp_num 512 last_change 83 flags hashpspool stripe_width 0
     pool 4 'volumes' replicated size 2 min_size 1 crush_ruleset 0 object_hash rjenkins pg_num 512 pgp_num 512 last_change 3 flags hashpspool stripe_width 0
     pool 5 'compute' replicated size 2 min_size 1 crush_ruleset 0 object_hash rjenkins pg_num 512 pgp_num 512 last_change 4 flags hashpspool stripe_width 0

   The pools that may need to be adjusted are the 'images', 'volumes', and
   'compute' pools. You can query each pool to see what the current value of
   pg_num and pgp_num is for a pool individually.

   ::

     # ceph osd pools get {pool-name} pg_num
     # ceph osd pools get {pool-name} pgp_num


#. Calculate the correct value for pg_num and pgp_num that should be
   used based on the number of OSDs the cluster has.  See the
   `Ceph Placement Groups documentation <http://ceph.com/docs/master/rados/operations/placement-groups/#a-preselection-of-pg-num>`_
   for additional details on how to properly calculate these values.
   Ceph.com has a `Ceph PGs Per Pool Calculator <http://ceph.com/pgcalc/>`_
   that can be helpful in this calculation.


#. Adjust the pg_num and pgp_num for each of the pools as necessary.

   ::

     # ceph osd pool set {pool-name} pg_num {pg_num}
     # ceph osd pool set {pool-name} pgp_num {pgp_num}

   It should be noted that this will cause a cluster rebalance to occur
   which may have performance impacts on services consuming Ceph.

Caveats:

* It is also not advisable to set pg_num and pgp_num to large values unless
  necessary as it does have an impact on the amount of resources required.
  See the `Choosing the Number of Placement Groups documentation <http://ceph.com/docs/master/rados/operations/placement-groups/#choosing-the-number-of-placement-groups>`_
  for additional details.
