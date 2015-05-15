
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

* Ceph deployment no longer fails when used for
  ephemeral volumes.
  See `LP1405407 <https://bugs.launchpad.net/bugs/1405407>`_.

* Anaconda failures no longer affect the deployment, since
  image based provisioning is used starting with Fuel 6.1.
  See `LP1321790 <https://bugs.launchpad.net/bugs/1321790>`_ and
  the `related blueprint <https://blueprints.launchpad.net/fuel/+spec/ibp-build-ubuntu-images>`_.

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

* Fuel dashboard may incorrectly show online nodes
  as going offline and online again, when the nodes
  are actually healthy and online.
  See `LP1432175 <https://bugs.launchpad.net/bugs/1432175>`_.

* RabbitMQ does not keep non-default users, vhosts etc
  after a failover.
  See `LP1383258 <https://bugs.launchpad.net/fuel/+bug/1383258>`_.

* The Fuel upgrade procedure does not update packages
  that are part of the control plane rather than OpenStack.
  This includes the Fuel agent, mcollective agent, and the network checker.
  Not upgrading these components means
  that bugs fixed in those packages are not applied
  to environments that were previously deployed
  and introduces some limitations
  for the actions that can be added or modified
  to the Astute network checker.
  See `LP1343139 <https://bugs.launchpad.net/bugs/1343139>`_.

* If you add nodes to the environment after you create a
  :ref:`backup<Backup_and_restore_Fuel_Master>`
  and subsequently restore the Fuel Master,
  those nodes may be reported as offline.
  Rebooting those nodes brings them back online.
  To avoid this problem, always run a new backup
  of the Fuel Master node after adding nodes.
  See `LP1347718 <https://bugs.laudfgfdgnchpad.net/bugs/1347718>`_.

* You must run **deep_clean** before you run **make iso**
  to build an ISO file or old packages on your system may cause **make iso** to fail.
  See `LP1393777 <https://bugs.launchpad.net/bugs/1393777>`_.

* Docker version does not roll back on an
  updgade failure.
  See `LP1440709 <https://bugs.launchpad.net/bugs/1440709>`_.

