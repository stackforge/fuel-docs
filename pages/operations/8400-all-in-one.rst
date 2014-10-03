
.. _all-in-one-ops:

Deploying Mirantis OpenStack on a Single Server
===============================================

It is possible to use Fuel
to deploy Mirantis OpenStack on a single server,
with all target node rolls running on the same machine.
A second server is required to serve as the Fuel Master node.

.. warning::  Be extremely careful when using this "all-in-one" deployment;
              if you create too many VM instances,
              they may consume all the available CPUs,
              causing serious problems accessing the MySQL database.
              Resource-intensive services
              such as Ceilometer with MongoDB, Zabbix,
              and Ceph are also apt to cause problems
              when OpenStack is deployed on a single server.

              Also note that you should only do this
              from a Fuel Master node that is not managing
              any other environments.
              If you deploy an "all-in-one" environment
              from a Fuel Master node that is managing other environments,
              the nailgun database reset that must be run
              causes Fuel to drop all information
              about existing environments.

              Deploying Fuel on VirtualBox
              (see `Quick Start Guide
              <https://software.mirantis.com/quick-start/>`_)
              is a much better way to install Fuel
              on minimal hardware for demonstration purposes
              than using this procedure.

To deploy the "all in one" environment:

#. :ref:`Download and install<download-install-ug>` Fuel
   on the server you will use as the Fuel Master node.

#. Log into the Fuel Master console shell.

#. Log into the nailgun :ref:`docker-term` container:
   ::

     dockerctl shell nailgun

#. Navigate to the */usr/lib/python2.6/site-packages/nailgun/fixtures*
   directory.

#. Edit the *openstack.yaml* file to remove role conflict statements.
   Find the following lines:
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

#. Run the following commands to Nailgun
   to reread its settings and restart:
   ::

     manage.py dropdb && manage.py syncdb && manage.py loaddefault
     killall nailgund


#. Exit the Nailgun docker container:
   ::

     exit

#. Deploy Fuel.
