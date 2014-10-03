
.. _ceph-verify-ops:

Verify the deployment
---------------------

Use the `**ceph -s** <http://docs.ceph.com/docs/v0.80.5/man/8/ceph/>`_
or **ceph health** (terse) command
on one of the Controller or Ceph-OSD nodes
to check the current status of the Ceph cluster.

[Neither of these options are listed on the man page]

The output of this command looks like:
::

  root@fuel-ceph-02:~# ceph -s
     health HEALTH_OK
     monmap e1: 2 mons at {fuel-ceph-01=10.0.0.253:6789/0,fuel-ceph-02=10.0.0.252:6789/0}, election epoch 4, quorum 0,1 fuel-ceph-01,fuel-ceph-02
     osdmap e23: 4 osds: 4 up, 4 in
     pgmap v275: 448 pgs: 448 active+clean; 9518 bytes data, 141 MB used, 28486 MB / 28627 MB avail
     mdsmap e4: 1/1/1 up {0=fuel-ceph-02.local.try=up:active}


Look for the following two lines:

- monmap:  should display the correct number of Ceph-MON processes.
- osdmap:  should display the correct number of Ceph-OSD instances
  (one per node per volume)

**ceph -s** may return an error similar to the following:
::

   root@fuel-ceph-01:~# ceph -s
   health HEALTH_WARN 63 pgs peering; 54 pgs stuck inactive; 208 pgs stuck unclean; recovery 2/34 degraded (5.882%)
   ...

**ceph** commands return "missing keyring" error,
such as:
::

  2013-08-22 00:06:19.513437 7f79eedea760 -1 monclient(hunting): ERROR: missing keyring, cannot use cephx for authentication
  2013-08-22 00:06:19.513466 7f79eedea760 -1 ceph_tool_common_init failed.

To analyze the problem:

- Check the links in */root/ceph\*.keyring*.
  There should be one for each admin, osd, and mon role
  that is configured.
  If any are missing, it may be the cause of the error.
  To correct use soft-links:
  ::

    ceph-deploy gatherkeys [monitor host]

  Place the downloaded keys to /etc/ceph/. Remove the original files from /root and create symlinks with the same names in /root, pointing to the actual files in /etc/ceph/.

- Try to run the following command:
  ::

    ceph-deploy gatherkeys {mon-server-name}

   If this does not work,
   an error may have occurred when initializing the cluster.

- Run the following command to find running ceph processes:
  ::

    ps axu | grep ceph


  If this lists a python process running for `ceph-create-keys`,
  it usually indicates that the Ceph-MON processes
  are unable to communicate with each other.

  - Check the network and firewall for each Ceph-MON.
    Ceph-MON defaults to port 6789.

  - If `public_network` is defined in the *ceph.conf* file,
    `mon_host` and DNS names must be inside the `public_network`
    or **ceph-deploy** does not create the Ceph-MON processes.

Missing OSD instances
+++++++++++++++++++++

For the default configuration,
you should have one Ceph-OSD instance per volume
for each Ceph-OSD node listed in the configuration.
If one or more of these is missing,
it may indicate a problem initializing and mounting the disks.
Common causes:

- The disk or volume is in use.
- The disk partition did not refresh in the kernel.

Check the osd tree:
::

  #ceph osd tree

     # id    weight  type name       up/down reweight
    -1      6       root default
    -2      2               host controller-1
    0       1                       osd.0   up      1
    3       1                       osd.3   up      1
    -3      2               host controller-2
    1       1                       osd.1   up      1
    4       1                       osd.4   up      1
    -4      2               host controller-3
    2       1                       osd.2   up      1
    5       1                       osd.5   up      1


Ceph pools
++++++++++

To see which Ceph pools have been created,
use the **ceph osd lspools** command:
::

   # ceph osd lspools
   0 data,1 metadata,2 rbd,3 images,4 volumes,

By default, two pools -- `image` and `volumes` are created.
In this case, we also have `data`, `metadata`, and `rbd` pools.
