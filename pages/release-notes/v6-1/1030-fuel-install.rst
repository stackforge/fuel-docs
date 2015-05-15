
.. _fuel-install.rst:

Fuel Installation and Deployment Issues
=======================================

New Features and Resolved Issues in Mirantis OpenStack 6.1
----------------------------------------------------------

* Removing and redeploying a Controller node
  does not result in an error.
  See `LP1394188 <https://bugs.launchpad.net/fuel/+bug/1394188>`_.

* Deployment now does not fail if there is no
  public gateway.
  See `LP1396126 <https://bugs.launchpad.net/fuel/+bug/1396126>`_.
  See also `HA deployment for Networking<Close_look_networking_HA>`.

* If the /var partition fills up, Fuel will warn you
  that you are running out of disk space to deploy a node.
  See `LP1371757 <https://bugs.launchpad.net/fuel/+bug/1371757>`_.

Known Issues in Mirantis OpenStack 6.1
--------------------------------------

* An attempt to join a Corosync cluster after a hard
  reboot of a Controller node fails.
  See `LP1434141 <https://bugs.launchpad.net/fuel/+bug/1434141>`_.
  The workaround is to do the following:

   1. Stop both the Corosync and Pacemaker on the faulty node.
   2. Delete the faulty node from the cluster.
   3. Issue the following command on the other node:

    ::

      crm node delete <faulty_node_name>

   4. Back up and remove CIB XMLs on the faulty node:

    ::

      rm -rf /var/lib/pacemaker/cib*.xml

  5. Start Corosync on the faulty node.

* Additional MongoDB roles cannot be added
  to an existing deployment.
  Fuel installs :ref:`mongodb-term`
  as a backend for :ref:`ceilometer-term`.
  Any number of MongoDB roles (or standalone nodes)
  can initially be deployed into an OpenStack environment
  but, after the environment is deployed,
  additional MongoDB roles cannot be added.
  Be sure to deploy an adequate number of MongoDB roles
  (one for each Controller node is ideal)
  during the initial deployment.
  See `LP1308990 <https://bugs.launchpad.net/fuel/+bug/1308990>`_.

* The script for disk partitioning in Fuel has no
  minimal requirement for the root partition.
  The recommendation is to allocate 50 GB or more for
  root and 30 GB or more for logs. You can
  configure the disk size in the Fuel Web UI.
  See `LP1394864 <https://bugs.launchpad.net/fuel/+bug/1394864>`_.

* If the /var partition gets filled up and you run out
  of disk space, you may run into one of the following issues:

   * Fuel Web UI fails to work.

   * The *dockerctl list -l* output reports that the nailgun, ostf,
     and/or keystone container is down.

   * The output of the *fuel task* command reports a *400: Bad Request*.

  For detailed symptoms, cause, and resolution
  see `Fuel Master and Docker disk space troubleshooting<docker-disk-full-top-tshoot>`.
  See also `LP1383741 <https://bugs.launchpad.net/fuel/+bug/1383741>`_.
