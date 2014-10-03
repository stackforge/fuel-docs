
.. _ceph-reset-ops:

Reset the Ceph cluster
----------------------

You can reset the Ceph cluster if necessary
after correcting configuration errors.
This is often easier than having to re-deploy
the entire OpenStack environment.

To do this, create simple a shell script
with the following contents (below), then
edit the string *export all="compute-4 controller-1 controller-2 controller-3"*
and define variable *$all* to contain all nodes
that contain Ceph-MON and Ceph-OSD services that
you want to re-initialize as well as all Compute nodes.

You can get the node names with the *fuel node list* command.

::

  export all="compute-4 controller-1 controller-2 controller-3"
  for node in $all
  do
     ssh $node 'service ceph -a stop ;
     umount /var/lib/ceph/osd/ceph* ;
  done;
  ceph-deploy purgedata $all;
  ceph-deploy purge $all;
  yum install -y ceph-deploy;
  rm ~/ceph* ;
  ceph-deploy install $all
