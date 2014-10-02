
.. _cephx-arch:

Set up Cephx authentication for Cinder, Glance, and Nova
--------------------------------------------------------

Cephx is the authentication system for Ceph.
For more information, see the Community documenation:

- `Cephx Guide
  <http://docs.ceph.com/docs/v0.80.5/rados/operations/authentication/>`_

- `Ceph Authentication and Authorization
  <http://docs.ceph.com/docs/v0.80.5/rados/operations/auth-intro/>`_

- `Cephx Config Reference
  <http://docs.ceph.com/docs/v0.80.5/rados/configuration/auth-config-ref/>`_

- `ceph-authtool man page
  <http://docs.ceph.com/docs/v0.80.5/man/8/ceph-authtool/>`_

Fuel creates separate pools --
one each for images, volumes, and instances --
and assigns permissions to each separately.
Vanilla OpenStack Ceph deployments
only allocate a single pool called RBD.

The scripts for each component show the access permissions:

:Ceph-MON:    allow r

Ceph-OSD uses the following [??] for all components:
::

  allow class -read object_prefix rbd_children,

The access permissions are different
for each component:

:Glance:    allow rwx pool=images

:Cinder:    allow rwx pool=volumes
    allow rx pool=images

:Nova:    allow rwx pool=volumes
    allow rx pool=images
    allow rwx pool=compute

Cephx is easily tripped up by unexpected white space
in the ceph auth command line parameters
so each one must be kept on a single line.
