
.. _murano-rn:

Application Catalog System (Murano)
===================================

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

Known Issues in Mirantis OpenStack 5.1
--------------------------------------

* **Murano requires the Neutron network type.**
  If you choose nova-network as the network type during deployment,
  the option to install the Murano project is greyed out.
  This is a design decision made by the OpenStack community;
  it allows us to focus our efforts on Neutron,
  and we see little demand for Murano support on Nova-network.

* **Murano changes deployment status to "successful" when Heat stack failed.**
  Murano uses Heat to allocate OpenStack resources;
  therefore one of the first steps of Environment
  deployment is creation of stack. Creation of stack may
  fail due to various reasons but unfortunately this failure
  will not be detected by Murano and overall Environment
  deployment will be reported as successful.
  See `LP1353589 <https://bugs.launchpad.net/bugs/1353589>`_.


RabbitMQ may lose Murano users
++++++++++++++++++++++++++++++

Murano users may be lost
when the Primary Controller in an HA cluster is shut down.
This is because RabbitMQ does not handle Murano users correctly.
See `LP1372483 <https://bugs.launchpad.net/fuel/+bug/1372483>`_.

As a workaround, you can reset the RabbitMQ credentials
as follows:

#. Obtain the OS RabbitMQ credentials:
   ::

     grep -E "(^rabbit_user|^rabbit_pass)" /etc/nova/nova.conf
     rabbit_userid=USERNAME
     rabbit_password=SOMEPASS

#. Edit the */etc/murano/murano.conf* file on all Controllers
   in the deployed environment.
   Add the values obtained above to the [DEFAULT] section of the file:
   ::

     ...
     rabbit_userid=USERNAME
     rabbit_password=SOMEPASS
     ...

#. Restart the **murano-api** and **murano-engine** services
   on all Controllers in the deployed environment.

   - For Ubuntu:
     ::

       service murano-api restart
       service murano-engine restart



   - For CentOS:
     ::

       service openstack-murano-api restart
       service openstack-murano-engine restart


Known Issues in Mirantis OpenStack 6.0
--------------------------------------

