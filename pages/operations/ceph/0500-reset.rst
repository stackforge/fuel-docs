
.. _ceph-reset-ops:

Reset the Ceph cluster
----------------------

You can reset the Ceph cluster if necessary
after correcting configuration errors.
This is often easier than having to re-deploy
the entire OpenStack environment.

To do this, edit the [??] file
and define `all` to contain
all nodes that contain Ceph-MON and Ceph-OSD services
you want to re-initialize
as well as all Compute nodes.

[where do these compute-4, controller-x notations come from?
Are these the names assigned to the nodes on the Fuel config screen?]

::

  export all="compute-4 controller-1 controller-2 controller-3"
  for node in $all
  do
     ssh $node 'service ceph -a stop ;
     umount /var/lib/ceph/osd/ceph*';
  done;
  ceph-deploy purgedata $all;
  ceph-deploy purge $all;
  yum install -y ceph-deploy;
  rm ~/ceph* ;
  ceph-deploy install $all
