.. index:: Finalize Upgrade

.. _Upg_Final:

Finalize Upgrade
----------------

This chapter contains actions required to finalize the upgrade procedure on an
environment and on Fuel installer in general. Essentially, finalization involves
the following steps:

* Clean up obsolete entries in the lists of services in OpenStack databases (for
  example, Nova services and Neutron agents that were running on nodes in the
  original environment that no longer exist)
* Restore the source code of the components of the installer by reverting the patches that
  implement modifications to the installer's behavior.
* Make permanent changes to IP addresses for the upgraded 6.0 environment in Nailgun
  database.
* Delete the original 5.1.1 environment and release the original controller nodes.

See the sections below for the detailed description of how to do that and the
list of commands:

* :ref:`Delete obsolete services <upgrade-cleanup-env>`
* :ref:`Revert patches <upgrade-cleanup-revert>`
* :ref:`Update Nailgun DB <upgrade-cleanup-update-db>`
* :ref:`Decommission environment <upgrade-cleanup-delete-env>`

.. _upgrade-cleanup-env:

Clean Up Upgraded Environment
+++++++++++++++++++++++++++++

After DB migration, there are several service entries left from the original cloud
in OpenStack state databases. Those services are identified as running on nodes
that are not actually part of 6.0 environment (i.e. 5.1.1 CICs and Compute nodes).
Some of OpenStack components provide API to delete those services, e.g. Nova. We
use these API to clean up database by deleting all services that run on nodes
that don't belong to the 6.0 environment. See below for the exact command to do
that.

Clean up Nova services
______________________

You need to SSH to any controller in 6.0 environment, use the ``openrc`` script to
authenticate as the 'admin' user to OpenStack cloud and list the services that don't
belong to this cloud. Run the following command to delete all the services that are
not associated with nodes in the upgraded environment:

::

    ssh root@${PRIMARY_CIC} '. /root/openrc; nova service-list | grep nova \
            | grep -Ev "('$(fuel node --env $SEED_ID \
            | awk -F\| '$7~/(controller|compute)/{print("node-"$1)}' \
            | sed ':a;N;$!ba;s/\n/|/g')')"' \
        | awk -F \| '{print($2)}' | tr -d ' ' \
        | xargs -I{} ssh root@${PRIMARY_CIC} ". /root/openrc; nova service-delete {}"

Clean up Neutron agents
_______________________

To delete obsolete entries from the list of Neutron agents, you need to run the
following command:

::

    ssh root@${PRIMARY_CIC} '. /root/openrc; neutron agent-list | grep neutron \
            | grep -Ev "('$(fuel node --env $SEED_ID \
            | awk -F\| '$7~/(controller|compute)/{print("node-"$1)}' \
            | sed ':a;N;$!ba;s/\n/|/g')')"' \
        | awk -F \| '{print($2)}' | tr -d ' ' \
        | xargs -I{} ssh root@${PRIMARY_CIC} ". /root/openrc; neutron agent-delete {}"

.. _upgrade-cleanup-revert:

Revert Patches
++++++++++++++

The final goal of the upgrade procedure is to get the upgraded environment as
close as possible to the environment installed with the new release version and
retain the ability to manage it in the new version of Fuel installer. To restore
the original behavior of Fuel installer, you need to revert all changes made to its
source code and configurations. You also need to restore the configuration of
environment to the state installed by Fuel.

This section describes how to restore the Fuel installer and the upgraded
environment to their original state.

Revert patches to Fuel components
_________________________________

Run the following commands to restore Puppet modules to the original state as of
release 6.0 of Fuel installer.

::

    sed -ie "s%skip_existing = true%skip_existing = false%" \
        /etc/puppet/2014.2-6.0/modules/l23network/manifests/l2/bridge.pp
    sed -ie "s%defaultto(true)%defaultto(false)%" \
        /etc/puppet/2014.2-6.0/modules/l23network/lib/puppet/type/l2_ovs_bridge.rb
    patch -Rp1 /etc/puppet/2014.2-6.0/modules/openstack/manifests/controller.pp \
        /root/octane/patches/controller.pp.patch

Run the following commands to restore Astute to its original state as of release
6.0 of Fuel installer.

::

    dockerctl shell astute sed -i "94s%^#%%" \
        /usr/lib64/ruby/gems/2.1.0/gems/astute-6.0.0/lib/astute/deploy_actions.rb
    dockerctl shell astute supervisorctl restart astute

Revert Ceph configuration changes
_________________________________

You need to restore Ceph configuration to the default settings with the following
command:

::

    pssh -i -h /tmp/env-6.0-cic.hosts \
        "sed -i '/osd_crush_update_on_start = false/d' /etc/ceph/ceph.conf"

You also need to unset the ``noout`` flag on the cluster to make sure that the data
rebalance capability is restored:

::

    ssh root@${PRIMARY_CIC} ceph osd unset noout

.. _upgrade-cleanup-update-db:

Update IP addresses in Nailgun DB
+++++++++++++++++++++++++++++++++

Permanent changes to IP addresses assigned to the environment in Nailgun DB are
requried to make Fuel generate the correct deployment information for the new nodes
added to the upgraded 6.0 environment. The following changes are required:

* Update VIP address value for Public and Management networks in the
  environment to be the same as corresponding VIP addresses in 5.1.1
  environment.
* Update IP addresses for each Controller node in the environment in Public and
  Management networks to be the same as the addresses of a Controller node in
  5.1.1 environment.

Obtain Nailgun DB password
__________________________

To access Nailgun DB, you will need to retrieve the password from the Nailgun
configuration file. Run the following command to get the password in the
``NAILGUN_PASS`` variable:

::

    export NAILGUN_PASS=$(dockerctl shell nailgun \
        python -c "import yaml; \
        print(yaml.load(open('/etc/nailgun/settings.yaml'))['DATABASE']['passwd'])")

Set up command shortcut to send queries to Nailgun DB:

::

    export PSQL_CMD="psql -At \
        postgresql://nailgun:${NAILGUN_PASS}@localhost/nailgun"

Create lists of IDs of controllers
__________________________________

Create a list of IDs of controllers in the original 5.1.1 environment and store
it to the ``ORIG_CIC_IDS`` var using the following command:

::

    ORIG_CIC_IDS=$(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print $1}' \
        | tr -d ' ' | sort -n)

Create a list of IDs of controllers in the upgraded 6.0 environment and store it
to the ``SEED_CIC_IDS`` var using the following command:

::

    SEED_CIC_IDS=$(fuel node --env $SEED_ID \
        | awk -F\| '$7~/controller/{print $1}' \
        | tr -d ' ' | sort -n)

Obtain Management network IDs
_____________________________

Run the following command to set ``ORIG_MGMT_NET`` var to the ID of Management
network in original 5.1.1 environment:

::

    ORIG_MGMT_NET=$(echo "SELECT id FROM network_groups
        WHERE group_id IN (SELECT id FROM nodegroups
                           WHERE cluster_id = $ORIG_ID)
        AND name = 'management'" | $PSQL_CMD)

Run the following command to set the ``SEED_MGMT_NET`` var to the ID of Management
network in the upgraded 6.0 environment:

::

    SEED_MGMT_NET=$(echo "SELECT id FROM network_groups
        WHERE group_id IN (SELECT id FROM nodegroups
                           WHERE cluster_id = $SEED_ID)
        AND name = 'management'" | $PSQL_CMD)

Update Management VIP address
_____________________________

Run the following command to set the ``MGMT_VIP`` variable value to the VIP for
Management network in the environment:

::

    MGMT_VIP=$(echo "SELECT ip_addr FROM ip_addrs
        WHERE network = $ORIG_MGMT_NET
        AND node IS NULL;" | $PSQL_CMD)

The following command changes VIP address to proper value:

::

    echo "UPDATE ip_addrs SET ip_addr = '$MGMT_VIP'
        WHERE network = $SEED_MGMT_NET
        AND node IS NULL;" | $PSQL_CMD

Update Management addresses for controllers
___________________________________________

Run the following command to replace IP addresses automatically assigned to 6.0
controllers with the addresses of 5.1.1 controllers in Management network:

::

    for ITER in $(seq $(echo $SEED_CIC_IDS | wc -w))
        do
            SEED_CIC_ID=$(echo $SEED_CIC_IDS | cut -d ' ' -f $ITER)
            ORIG_CIC_ID=$(echo $ORIG_CIC_IDS | cut -d ' ' -f $ITER)
            [ -z SEED_CIC_ID ] && break
            [ -z ORIG_CIC_ID ] && break
            echo "DROP TABLE IF EXISTS ip_$$;
        SELECT ip_addr INTO ip_$$ FROM ip_addrs
            WHERE node = $ORIG_CIC_ID
            AND network = $ORIG_MGMT_NET;
        DELETE FROM ip_addrs
            WHERE node = $SEED_CIC_ID
            AND network = $SEED_MGMT_NET;
        INSERT INTO ip_addrs VALUES(DEFAULT,
            $SEED_MGMT_NET,
            $SEED_CIC_ID,
            (SELECT ip_addr FROM ip_$$));
            " | $PSQL_CMD
        done

Obtain Public network IDs
_____________________________

Run the following command to set the ``ORIG_PUB_NET`` var to the ID of Public
network in original 5.1.1 environment:

::

    ORIG_PUB_NET=$(echo "SELECT id FROM network_groups
        WHERE group_id IN (SELECT id FROM nodegroups
                           WHERE cluster_id = $ORIG_ID)
        AND name = 'public'" | $PSQL_CMD)

Run the following command to set the ``SEED_PUB_NET`` var to the ID of Public
network in upgraded 6.0 environment:

::

    SEED_PUB_NET=$(echo "SELECT id FROM network_groups
        WHERE group_id IN (SELECT id FROM nodegroups
                           WHERE cluster_id = $SEED_ID)
        AND name = 'public'" | $PSQL_CMD)

Update Public VIP address
_________________________

Run the following command to set the ``PUB_VIP`` variable value to the VIP for
Management network in the environment:

::

    PUB_VIP=$(echo "SELECT ip_addr FROM ip_addrs
        WHERE network = $ORIG_PUB_NET
        AND node IS NULL;" | $PSQL_CMD)

The following command changes VIP address to proper value:

::

    echo "UPDATE ip_addrs SET ip_addr = '$PUB_VIP'
        WHERE network = $SEED_PUB_NET
        AND node IS NULL;" | $PSQL_CMD

Update Public addresses for controllers
_______________________________________

Run the following command to replace the IP addresses automatically assigned to 6.0
controllers with addresses of 5.1.1 controllers in Public network:

::

    for ITER in $(seq $(echo $SEED_CIC_IDS | wc -w))
        do
            SEED_CIC_ID=$(echo $SEED_CIC_IDS | cut -d ' ' -f $ITER)
            ORIG_CIC_ID=$(echo $ORIG_CIC_IDS | cut -d ' ' -f $ITER)
            [ -z SEED_CIC_ID ] && break
            [ -z ORIG_CIC_ID ] && break
            echo "DROP TABLE IF EXISTS ip_$$;
        SELECT ip_addr INTO ip_$$ FROM ip_addrs
            WHERE node = $ORIG_CIC_ID
            AND network = $ORIG_PUB_NET;
        DELETE FROM ip_addrs
            WHERE node = $SEED_CIC_ID
            AND network = $SEED_PUB_NET;
        INSERT INTO ip_addrs VALUES(DEFAULT,
            $SEED_PUB_NET,
            $SEED_CIC_ID,
            (SELECT ip_addr FROM ip_$$));
            " | $PSQL_CMD
        done

.. _upgrade-cleanup-delete-env:

Delete 5.1.1 environment
++++++++++++++++++++++++

Delete the original 5.1.1 environment to release Controller nodes and completely
switch to use 6.0 environment instead.

.. note::

    The following operation may cause data loss if your upgrade operation was
    not completed successfully. Proceed with caution.

::

    fuel env --env $ORIG_ID --delete
