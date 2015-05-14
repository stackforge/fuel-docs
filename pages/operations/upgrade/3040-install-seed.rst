.. index:: Install Seed

.. _Upg_Seed:

Install Controller
++++++++++++++++++

Installation of CIC node is performed by standard Fuel installer
actions and is split into two distinct steps.

#. Prepare nodes settings and use the provisioning feature of
Fuel to install an operating system and configure disks on nodes.
#. Make modifications to the deployment information of the environment
that affects all CIC nodes, and deploy OpenStack platform onto them.

Modified deployment settings
____________________________

To deploy a 7.0 CIC node properly, we need to prepare deployment
information to make Fuel configure nodes and OpenStack services
with the following modifications:

#. Disable checking access to the default gateway in Public network
#. Skip adding physical interfaces to Linux bridges
#. Skip creation of the 'default' Fuel-defined networks in Neutron
#. Change default gateway addresses to the address of the Fuel Master node

Deployment settings can be downloaded from Fuel API as a set of files.
The upgrade script updates the settings by changing those files and
uploading the modified information back via Fuel API.

The upgrade script keeps the deployment infromation for the environment
in a cache directory (by default, ``/tmp/octane/deployment``). The
deployment settings for the nodes are stored to subdirectory
``deployment_<cluster-id>``, where ``<cluster-id>`` is an ID of
the environment.

The deployment tasks are kept in subdirectory ``cluster_<cluster-id>``
of the same cache directory. You can use them to check that the
deployment is properly configured.

Install Controller commands
___________________________

The upgrade automation script allows upgrading a contorller that
exists in the original 6.1 environment. Select which controller
you would like to upgrade and run the following command. Replace
``<NODE-ID>`` with the actual ID of 6.1 Controller you'd like to
upgrade:

::

    ./octane upgrade-node ${SEED_ID} isolated <NODE-ID>
