How to Update the Product
=========================

You can easily update your Mirantis OpenStack using the introduced update mechanism
without a need to redeploy it completely.

Please follow the instruction below on how you can install updates.

Software updating procedure for Linux CentOS- and Ubuntu-based nodes with an access to the Internet
---------------------------------------------------------------------------------------------------

Note that you must have an access to the Internet on each cluster node to perform the update.

Ubuntu-based deployments
------------------------

#. Add the updates repository into the system using the following command on each node::

       $ echo -e "\ndeb http://fuel-repository.mirantis.com/fwm/6.0/updates/ubuntu precise main" >> /etc/apt/sources.list

#. Run the following command to update indexes::

       $ apt-get update

#. Run the following command to update packages::

       $ apt-get upgrade

CentOS-based deployments
------------------------

#. Add the repository into the system using the following command::

       $ yum-config-manager --add-repo=http://fuel-repository.mirantis.com/fwm/6.0/updates/centos/os/x86_64/6.0-updates.repo

#. Run the following command to update packages::

       $ yum update --skip-broken

.. note::
       ``--skip-broken`` flag is needed because of the installation method of ruby21, its dependencies are not presented in the repository.

Software updating procedure for Linux CentOS- and Ubuntu-based nodes in a closed environment
--------------------------------------------------------------------------------------------

If compute/controller nodes have no Internet access, you should download repository to Fuel-node and use it as an update mirror.
Run the following command on Fuel-node to obtain a local mirror of updates repository::

       $ rsync -vap --chmod=Dugo+x rsync://fuel-repository.mirantis.com/mirror/fwm/6.0/updates/ /var/www/nailgun/updates/


Ubuntu-based deployments
------------------------

#. Add the updates repository into the system using the following command on each node::

       $ echo -e "\ndeb http://10.20.0.2:8080/updates/ubuntu precise main" >> /etc/apt/sources.list

#. Run the following command to update indexes::

       $ apt-get update

#. Run the following command to update packages::

       $ apt-get upgrade

CentOS-based deployments
------------------------

#. Add repository into the system using the following command::

       $ yum-config-manager --add-repo=http://10.20.0.2:8080/updates/centos/os/x86_64/

#. Run the following command to update packages::

       $ yum update --skip-broken

.. note::
       `--skip-broken` flag is needed because of the installation method of ruby21, its dependencies are not presented in the repository.

Automated way to install updates to all nodes
---------------------------------------------

After rsync’ing the updates repository from the Mirantis mirror to a Fuel node’s internal repository, special script can be used for the automated update of all nodes in all or particular environments:
https://bitbucket.org/avgoor/scripts/raw/7d3c50af2bce722bc2a6a5eedbe2b7c36123458e/nodes_update.py.
This script updates all nodes one by one and should be run on a Fuel node in the following manner in order to update nodes in the environment `X`::

       # python nodes_update.py --env-id=X --update

There is also an option to update all environments `--all-envs`, the script will update all online nodes in all environment with respect to the version of an operating system in particular environment. Running the script without `--update` option will not produce any actions, it only shows the necessary commands.

.. note::
      The script uses keystone’s authentication in order to obtain nodes list from fuel’s API, thus access credentials must be provided.
      Default credentials are: `username` = `admin`, `password` = `admin`, `tenant` = `admin`.
      In case of different credentials `--user`, `--pass`, `--tenant` options must be set properly.

.. note::
      All output from nodes can be found in `/var/log/nodes-update.log`.


Maintenance updates
-------------------

.. include:: /pages/release-notes/v6-0/updates/1010-horizon.rst
.. include:: /pages/release-notes/v6-0/updates/2010-nova.rst
.. include:: /pages/release-notes/v6-0/updates/3010-neutron.rst
.. include:: /pages/release-notes/v6-0/updates/4010-glance.rst
.. include:: /pages/release-notes/v6-0/updates/9010-others.rst



