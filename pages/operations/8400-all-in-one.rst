
.. _all-in-one-ops:

Deploying Mirantis OpenStack on a Single Server
===============================================

It is possible to use Fuel
to deploy Mirantis OpenStack on a single server,
with the Fuel Master and all target node rolls
running on the same machine.

To do this:

#. :ref:`download-install-ug` Fuel on your server.

#. Remove role conflict statements from the *openstack.yaml* file.

#. Anything about networking?

#. Upload nailgun docker container?

#. Deploy Fuel.

.. warning::  Deploying Fuel on VirtualBox is a much better
              way to install Fuel on minimal hardware
              for demonstration purposes.
              Be extremely careful when using this deployment;
              if you create too many VM instances,
              they may consume all the available CPUs,
              causing serious problems accessing the MySQL database.
              Resource-intensive services
              such as Ceilometer with MongoDB, Zabbix,
              and Ceph are also apt to cause problems
              when OpenStack is deployed on a single server.


Remove role conflict statements from openstack.yaml
---------------------------------------------------

#. Log into the Fuel Master console shell.

#. Log into the nailgun :ref:`docker-term` container:
   ::

     dockerctl shell nailgun

#. Navigate to the */usr/lib/python2.6/site-packages/nailgun/fixtures*
   directory and edit the *openstack.yaml* file.

#. Find the following lines:
   ::

     Name: "Controller"
     ...
     conflicts:
     - compute

#. Delete the "conflicts" and "compute" lines.
   This allows the "Compute" role
   to run on the Controller node.

#. Find the other "conflicts" statements and delete them
   and the roles defined for them.
