
.. _openstack-yaml-ref:

openstack.yaml
==============

The *openstack.yaml* file defines
the basic configuration of the target nodes
that Fuel deploys for the OpenStack environment.
Initially, it contains Fuel defaults;
these are adjusted in response to configuration choices
the user makes through the Fuel UI
and then fed to :ref:`Nailgun<nailgun-term>`.

Path
----

Fuel Master Node:
**/usr/lib/python2.6/site-packages/nailgun/fixtures**

Usage
-----

#. Log into the nailgun :ref:`docker-term` container:
   ::

     dockerctl shell nailgun

#. Edit file.

#. Run the following commands to Nailgun
   to reread its settings and restart:
   ::

     manage.py dropdb && manage.py syncdb && manage.py loaddefault
     killall nailgund


#. Exit the Nailgun docker container:
   ::

     exit

Description
-----------

The *openstack.yaml* file contains a number of blocks,
each of which may contain multiple parameters.
The major ones are described here.

The file has two major sections:

- The first is for VirtualBox and other limited deployments.

- The second is for full bare-metal deployments.

roles-metadata
++++++++++++++

Lists each of the roles available on the
:ref:`assign-roles-ug` screen
with the description.
Note that there are two `roles-metadata` sections in the file:

- The limited deployments section
  lists only the Controller, Compute, and Cinder LVM roles.

- The "full_release" section
  lists the Controller, Compute, Cinder LVM,
  Ceph-OSD, MongoDB, and Zabbix Server roles.

Roles that should not be deployed on the same server
are identified with "conflicts" statements
such as the following that prevents a Compute role
from being installed on a Controller node:
::

  controller:
    name: "Controller"
    description: "The controller initiates orchestration activities..."
    conflicts:
      - compute

If you delete the "conflicts:" and "compute" line
and redeploy nailgun,
you can deploy a bare-metal deployment
that runs on a single server.

.. warning::  Deploying Fuel on VirtualBox is a much better
              way to install Fuel on minimal hardware
              for demonstration purposes
              than using this procedure.
              Be extremely careful when using this "all-in-one" deployment;
              if you create too many VM instances,
              they may consume all the available CPUs,
              causing serious problems accessing the MySQL database.
              Resource-intensive services
              such as Ceilometer with MongoDB, Zabbix,
              and Ceph are also apt to cause problems
              when OpenStack is deployed on a single server.

networks-metadata
+++++++++++++++++

volumes-metadata
++++++++++++++++
