How to Update the Product
=========================

You can easily update your Mirantis OpenStack using the introduced update mechanism
without a need to redeploy it completely.

.. warning:: Updating Mirantis OpenStack deployment could override
   manually applied customer's patches and cause restarting of OpenStack services.
   It is highly recommended that you backup your deployment before applying updates.
   Please, consult Mirantis Support, if you have any questions or concerns.

.. note::
      During the updating procedure only Mirantis OpenStack services will be updated.
      No update of an underlying Operating System will occur within the scope of Mirantis OpenStack Maintenance Update.

Please, follow the instruction below to install updates.

Automated way to install updates to all nodes
---------------------------------------------
Run the following command on the Fuel Master node to obtain a local mirror of the updates repository::

       rsync -vap --chmod=Dugo+x \
       rsync://fuel-repository.mirantis.com/mirror/fwm/6.0/updates/ /var/www/nailgun/updates/

.. note::
      Note that you must have an access to the Internet on the Fuel Master node to download the repository.

After rsync’ing the updates repository from the Mirantis mirror to the Fuel Master node internal repository, a special script can be used for the automated update of the nodes in all or particular environments:

       `mos_apply_mu.py <https://review.fuel-infra.org/gitweb?p=tools/sustaining.git;a=blob_plain;f=scripts/mos_apply_mu.py;hb=refs/heads/master>`_

This script updates all nodes one by one and should be run on the Fuel Master node in the following manner in order to update nodes in the environment `X` given that IP address of the Fuel Master node is 10.20.0.2::

       python mos_apply_mu.py --env-id=X --update --master-ip=10.20.0.2

To update all environments, use `--all-envs` option::

       python mos_apply_mu.py --update --all-envs --master-ip=10.20.0.2

The status of the update process can be checked by using `--check` option::

       python mos_apply_mu.py --check --all-envs --master-ip=10.20.0.2

The script will update all online nodes in all environments with respect to the version of an operating system in a particular environment.
You can find your environment id in the list by running the following command on the Fuel Master node::

       fuel env

To get the list of available options, run the script without parameters::

       python mos_apply_mu.py

.. note::
      The script uses :ref:`Keystone<keystone-term>`'s authentication in order to obtain nodes list from Fuel API, thus access credentials must be provided.
      Default credentials are: `username` = `admin`, `password` = `admin`, `tenant` = `admin`.
      In case of different credentials, `--user`, `--pass`, `--tenant` options must be set properly.

All output from nodes can be found in `/var/log/remote/$ip$/nodes-update.log` where $ip$ the IP address of particular node.

Manual updating procedure for Linux CentOS- and Ubuntu-based nodes in a closed environment
--------------------------------------------------------------------------------------------

If compute/controller nodes have no Internet access, you should download the repository to the Fuel Master node and use it as an update mirror.
Run the following command on the Fuel Master node to obtain a local mirror of the updates repository::

       rsync -vap --chmod=Dugo+x \
       rsync://fuel-repository.mirantis.com/mirror/fwm/6.0/updates/ /var/www/nailgun/updates/

.. note::
      Note that you must have an access to the Internet on the Fuel Master node to download the repository.

Ubuntu-based deployments
------------------------

#. Add the updates repository into the system using the following command on each node::

       echo -e "\ndeb http://<FUEL-MASTER-IP>:8080/updates/ubuntu precise main" \
       >> /etc/apt/sources.list

#. To update indexes, run::

       apt-get update

#. To upgrade packages, run::

       apt-get upgrade

CentOS-based deployments
------------------------

#. Add repository into the system using the following command::

       yum-config-manager --add-repo=http://<FUEL-MASTER-IP>:8080/updates/centos/os/x86_64/

#. To update packages, run::

       yum update --skip-broken

.. note::
       Due to ruby21 installation method (its dependencies are not present in the repository), the ``--skip-broken`` flag is required.

.. note::
      After updating OpenStack services need to be restarted.
      Please restart all OpenStack services manually after update. Consider that this will cause a downtime.


Maintenance updates
-------------------

.. include:: /pages/release-notes/v6-0/updates/1010-horizon.rst
.. include:: /pages/release-notes/v6-0/updates/2010-nova.rst
.. include:: /pages/release-notes/v6-0/updates/3010-neutron.rst
.. include:: /pages/release-notes/v6-0/updates/4010-glance.rst
.. include:: /pages/release-notes/v6-0/updates/5010-ceilometer.rst
.. include:: /pages/release-notes/v6-0/updates/7010-cinder.rst
.. include:: /pages/release-notes/v6-0/updates/6010-swift.rst
.. include:: /pages/release-notes/v6-0/updates/9010-others.rst



