
.. _empty-role:

Deploying an Empty Role through Fuel CLI
========================================

Make sure there are zero environments:

::

  [root@nailgun tmp]# fuel env
  id | status | name | mode | release_id | pending_release_id
  ---|--------|------|------|------------|-------------------


Check the operating systems:

::

  [root@nailgun tmp]# fuel release
  id | name                   | state     | operating_system | version
  ---|------------------------|-----------|------------------|-------------
  2  | Juno on Ubuntu 14.04.1 | available | Ubuntu           | 2014.2.2-6.1
  1  | Juno on CentOS 6.5     | available | CentOS           | 2014.2.2-6.1


Note down the numbers under the ``id`` column. You will
need these later.

Check the existing nodes:

::

  [root@nailgun tmp]# fuel node
  id | status   | name             | cluster | ip          | mac               | roles | pending_roles | online | group_id
  ---|----------|------------------|---------|-------------|-------------------|-------|---------------|--------|---------
  10 | discover | Untitled (8a:15) | None    | 10.109.0.4  | 64:dd:40:75:8a:15 |       |               | True   | None
  8  | discover | Untitled (96:c1) | None    | 10.109.0.5  | 64:2e:f0:06:96:c1 |       |               | True   | None
  9  | discover | Untitled (8b:4a) | None    | 10.109.0.3  | 64:7b:44:59:8b:4a |       |               | True   | None
  7  | discover | Untitled (d2:bf) | None    | 10.109.0.12 | 64:79:31:7a:d2:bf |       |               | False  | None

There are three nodes online: 8,9,10

Create a new environment:

::

  [root@nailgun tmp]# fuel env create --name test --release 1
  Environment 'test' with id=4, mode=ha_compact and network-mode=neutron was created!

Check if the environment has been created:

::

  [root@nailgun tmp]# fuel env
  id | status | name | mode       | release_id | pending_release_id
  ---|--------|------|------------|------------|-------------------
  4  | new    | test | ha_compact | 1          | None

Note down the ``id`` of the environment. You will need this later.

Check the existing roles:

::

  [root@nailgun tmp]# fuel role --release 1
  name          | id
  --------------|---
  controller    | 1
  compute       | 2
  cinder        | 3
  cinder-vmware | 4
  ceph-osd      | 5
  mongo         | 6
  base-os       | 7

The role that you need is ``base-os``.

Add the node whose ``id`` is 8 and the role is ``base-os`` to
the environment whose ``id`` is 4:

::

  [root@nailgun tmp]# fuel node set --env 4 --node 8 --role base-os
  Nodes [8] with roles ['base-os'] were added to environment 4

Check the results:

::

  [root@nailgun tmp]# fuel node
  id | status   | name             | cluster | ip          | mac               | roles | pending_roles | online | group_id
  ---|----------|------------------|---------|-------------|-------------------|-------|---------------|--------|---------
  10 | discover | Untitled (8a:15) | None    | 10.109.0.4  | 64:dd:40:75:8a:15 |       |               | True   | None
  8  | discover | Untitled (96:c1) | 4       | 10.109.0.5  | 64:2e:f0:06:96:c1 |       | base-os       | True   | 4
  9  | discover | Untitled (8b:4a) | None    | 10.109.0.3  | 64:7b:44:59:8b:4a |       |               | True   | None
  7  | discover | Untitled (d2:bf) | None    | 10.109.0.12 | 64:79:31:7a:d2:bf |       |               | False  | None

Your node with an empty role has been added to the cluster.
