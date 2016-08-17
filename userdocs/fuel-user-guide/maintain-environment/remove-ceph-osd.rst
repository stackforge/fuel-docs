.. _remove-ceph-osd:

======================
Remove a Ceph OSD node
======================

Removing a Ceph OSD node from your OpenStack environment requires
a few more steps if compared to other Fuel slave nodes. As Fuel prevents
the deletion of OSD nodes that still have data on them, you should move
all data from a Ceph OSD node to be deleted to other OSD nodes.

**To safely delete a Ceph OSD node:**

#. Verify that at least replica count hosts remain in the environment.
   For example, if the replica count is three, there should always be
   at least three hosts in the environment.

#. Verify that your environment has not reached its full ratio. By default,
   when the environment reaches 95% of utilization, Ceph prevents clients
   from writing data to it. See `Ceph Cluster Storage Capacity <http://ceph.com/docs/master/rados/configuration/mon-config-ref/#storage-capacity>`_
   for details.

#. Determine which OSD processes are running on the Ceph OSD node
   to be deleted:

   .. code-block:: console

      ceph osd tree

   **Example of system response:**

   .. code-block:: console

      id    weight    type   name      up/down reweight
      -1    0.4499    root   default
      -2    0.09998   host   node-1
       0    0.04999          osd.0     up      1
       1    0.04999          osd.1     up      1

   The example output above shows that ``osd.0`` and ``osd.1`` are up and
   running on the ``node-1`` node.

#. Trigger a rebalance process to move the placement groups to other OSD
   nodes. For example:

   .. code-block:: none

      ceph osd out 0
      ceph osd out 1

   .. note::

      The amount of time the whole process can take depends on the amount
      of data to be rebalanced.

#. Monitor the state of your environment to know when the rebalance is
   completed:

   .. code-block:: console

      ceph -s

   While the rebalance is in progress, you will see the following example
   of system response:

   .. code-block:: console
      :emphasize-lines: 2

      cluster 7fb97281-5014-4a39-91a5-918d525f25a9
       health HEALTH_WARN recovery 2/20 objects degraded (10.000%)
       monmap e1: 1 mons at {node-33=10.108.2.4:6789/0}, election epoch 1, quorum 0 node-33
       osdmap e172: 7 osds: 7 up, 5 in
        pgmap v803: 960 pgs, 6 pools, 4012 MB data, 10 objects
              10679 MB used, 236 GB / 247 GB avail
              2/20 objects degraded (10.000%)
                   1 active
                   959 active+clean

   Once the rebalance is completed, you will see the following example
   of system response:

   .. code-block:: console
      :emphasize-lines: 2

      cluster 7fb97281-5014-4a39-91a5-918d525f25a9
       health HEALTH_OK
       monmap e1: 1 mons at {node-33=10.108.2.4:6789/0}, election epoch 1, quorum 0 node-33
       osdmap e172: 7 osds: 7 up, 5 in
        pgmap v804: 960 pgs, 6 pools, 4012 MB data, 10 objects
              10679 MB used, 236 GB / 247 GB avail
                   960 active+clean

#. Verify the environment's state is ``HEALTH_OK``
#. Remove all OSD processes from the ``CRUSH`` map and the host. For example:

   .. code-block:: console

      stop ceph-osd id=0

      ceph osd crush remove osd.0
      ceph auth del osd.0
      ceph osd rm osd.0

#. Repeat the previous step for all OSD processes running on the host.
#. Remove the Ceph OSD node from the ``CRUSH`` map:

   .. code-block:: console

      ceph osd crush remove node-1

#. Delete the Ceph OSD node from your environment in the usual manner
   through either the Fuel web UI or the Fuel CLI.

   .. seealso::

      * :ref:`cli-nodes`