
.. _mos70mu1-how-to-update:

How to apply Mirantis OpenStack 7.0 Maintenance Update 1
********************************************************

During the updating procedure, only Mirantis OpenStack services are updated.
An update of an underlying operating system does not occur within the scope
of Mirantis OpenStack Maintenance Update.

.. warning::
   Updating a Mirantis OpenStack deployment can override manually applied
   custom patches and can cause a downtime of the entire environment.
   Therefore, you must plan a maintenance window. Apply the below set of
   actions carefully and with consideration. Always consult `Mirantis Support`_
   if you have any questions or concerns.

Before you proceed with the update procedure:

#. Back up your deployment.
#. Test the instructions below in a lab environment before
   applying the updates in production.
#. Verify that you have an Internet access on the Fuel Master node
   to download the updated repository.
#. Verify that you have about 2.5 GB of free space in the `/var/www/nailgun`
   folder to download the updates repository.

Updating the Fuel Master node
+++++++++++++++++++++++++++++

Complete the following steps to update the Fuel Master node:

#. Back up your data with :command:`dockerctl backup`. This will save the
   data to `/var/backup/fuel/`.
#. Run :command:`yum update`.
#. Run :command:`docker load -i /var/www/nailgun/docker/images/fuel-images.tar`.
#. Run :command:`dockerctl destroy all`.
#. Run :command:`dockerctl start all`.
#. Run :command:`puppet apply -dv /etc/puppet/modules/nailgun/examples/host-only.pp`.

Updating the Fuel Slave nodes
+++++++++++++++++++++++++++++

Mirantis recommends that you apply Maintenance Updates using the
`mos_apply_mu.py` script. If you prefer to install every updated package
manually one by one, see: `Applying Patches section of the Operations Guide`_.

.. note::
   The script uses the `Keystone`_ authentication to obtain the nodes list
   from the Fuel API. Therefore, you must provide the access credentials. Set
   the ``--user``, ``--pass``, ``--tenant`` options properly.

Complete the following steps to update the Fuel Slave nodes:

#. Download the `mos_apply_mu.py script`_.
#. Update the nodes using the following command:

   .. code-block:: console

       python mos_apply_mu.py --env-id=X --update

   The script downloads a repository with the latest updates to the Fuel
   Master node and installs the appropriate records to every Fuel Slave node.
   Then, it updates the nodes on a selected environment.

   * To check the update status of every node, run:

     .. code-block:: console

         python mos_apply_mu.py --env-id=X --check

   * To get a list of available options, run the script without parameters:

     .. code-block:: console

         python mos_apply_mu.py

#. Restart all the OpenStack services on every Fuel Slave node:

   * To restart the HA-OpenStack services, run the following commands on
     one of the OpenStack Controller nodes:

     .. code-block:: console

           crm resource restart p_heat-engine
           crm resource restart p_neutron-plugin-openvswitch-agent
           crm resource restart p_neutron-dhcp-agent
           crm resource restart p_neutron-metadata-agent
           crm resource restart p_neutron-l3-agent

   * To restart the non-HA-OpenStack services, run the following commands:

     #. On all the OpenStack Controller nodes:

        .. code-block:: console

           initctl restart heat-api-cloudwatch
           initctl restart heat-api-cfn
           initctl restart heat-api
           initctl restart cinder-api
           initctl restart cinder-scheduler
           initctl restart nova-objectstore
           initctl restart nova-cert
           initctl restart nova-api
           initctl restart nova-consoleauth
           initctl restart nova-conductor
           initctl restart nova-scheduler
           initctl restart nova-novncproxy
           initctl restart neutron-server

     #. On all the OpenStack Compute nodes:

        .. code-block:: console

           initctl restart neutron-plugin-openvswitch-agent
           initctl restart nova-compute

To apply some fixes, you need to execute manual steps. Find the list of these
fixes and the required actions in the `Maintenance Update section of the
Release Notes`_.

.. TODO (OL): update the link for MU on RN 7.0 page once created.

.. Links:

.. _`Mirantis Support`: https://mirantis.zendesk.com/home
.. _`mos_apply_mu.py script`: https://github.com/Mirantis/tools-sustaining/raw/master/scripts/mos_apply_mu.py
.. _`Applying Patches section of the Operations Guide`: https://docs.mirantis.com/openstack/fuel/fuel-7.0/operations.html#applying-patches
.. _`Keystone`: https://docs.mirantis.com/openstack/fuel/fuel-7.0/terminology.html#keystone-term
.. _`Maintenance Update section of the Release Notes`: https://docs.mirantis.com/openstack/fuel/fuel-7.0/maintenance-updates.html
