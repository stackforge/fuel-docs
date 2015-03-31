How to Update the Product
=========================

You can easily update your Mirantis OpenStack using the introduced update mechanism
without a need to redeploy it completely.

Please follow the instruction below on how you can install updates.

Software updating procedure for Linux CentOS- and Ubuntu-based nodes with an access to the Internet
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Note that you must have an access to the Internet on each cluster node to perform the update.

Ubuntu-based deployments
------------------------

#. Add the updates repository into the system using the following command on each node:

   .. code::

       $ echo -e "\ndeb http://fuel-repository.mirantis.com/fwm/6.0/updates/ubuntu precise main" >> /etc/apt/sources.list

#. Run the following command to update indexes:

   .. code::

       $ apt-get update

#. Run the following command to update packages:

   .. code::

       $ apt-get upgrade

CentOS-based deployments
------------------------

#. Add the repository into the system using the following command:

   .. code::

       $ yum-config-manager --add-repo=http://fuel-repository.mirantis.com/fwm/6.0/updates/centos/os/x86_64/6.0-updates.repo

#. Run the following command to update packages:

   .. code::

       $ yum update --skip-broken


Software updating procedure for Linux CentOS- and Ubuntu-based nodes in a closed environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If compute/controller nodes have no Internet access, you should download repository to Fuel-node and use it as an update mirror.
Run the following command on Fuel-node to obtain a local mirror of updates repository:

   .. code::

       $ rsync -vap --chmod=Dugo+x rsync://fuel-repository.mirantis.com/mirror/fwm/6.0/updates/ /var/www/nailgun/updates/


Ubuntu-based deployments
------------------------

#. Add updates repository into the system using the following command on each node:

   .. code::

       $ echo -e "\ndeb http://10.20.0.2:8080/updates/ubuntu precise main" >> /etc/apt/sources.list

#. Run the following command to update indexes:

   .. code::

       $ apt-get update

#. Run the following command to update packages:

   .. code::

       $ apt-get upgrade

CentOS-based deployments
------------------------

#. Add repository into the system using the following command:

   .. code::

       $ yum-config-manager --add-repo=http://10.20.0.2:8080/updates/centos/os/x86_64/

#. Run the following command to update packages:

   .. code::

       $ yum update --skip-broken

You should repeat all the above steps on every node.

Maintenance updates
===================

.. include:: /pages/release-notes/v6-0/updates/1010-horizon.rst
.. include:: /pages/release-notes/v6-0/updates/2010-nova.rst
.. include:: /pages/release-notes/v6-0/updates/3010-neutron.rst
.. include:: /pages/release-notes/v6-0/updates/4010-glance.rst
.. include:: /pages/release-notes/v6-0/updates/9010-others.rst



