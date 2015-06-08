.. index:: Install Seed wo hardware

.. _Upg_Seed_wo_hard:

Install CICs(WITHOUT ADDITIONAL SERVERS)
----------------------------------------

This section and following it describe alternative way
what need to do if you don't have additional hardware

Isolated deployment
+++++++++++++++++++

6.0 needs to use same VIP addresses as 5.1.1, for this we need to remove physical
connections between 6.0 CIC and Management and Public networks.

Modify deployment settings
++++++++++++++++++++++++++

In order to deploy 6.0 CIC nodes properly, we need to prepare deployment
information to make Fuel configure nodes and OpenStack services with the
following modifications:

#. Disable checking access to default gateway in Public network before running
   deployment operation on 6.0 CIC.
#. Avoid creating patch ports to connect logical bridges to physical interfaces of
   6.0 CIC during subsequent deployment operation on those CIC.
#. Replace VIP addresses in 6.0 deployment info

Deployment settings can be downloaded from Fuel API as a set of files. We update
settings by changing those files and uploading modified information back via
Fuel API.

Provision CIC node
+++++++++++++++++++

This section contains detailed descriptions and command listings to
revome node from original environment, prepare and
provision it in 6.0 Seed environment.

Remove controller from 5.1 environment
______________________________________

We download network and disk settings of node
because we need it later for configuring this node in new cluster.
After that we removed node from target cluster.

::

    export CIC_ID=<controller from orig env>
    fuel node --node $CIC_ID --network --download --dir /tmp
    fuel node --node $CIC_ID --disk --download --dir /tmp
    fuel node --node $CIC_ID delete
    fuel --env $ORIG_ID deploy-changes

Add 6.0 CIC node
_________________

Need to wait for removed node will be discovered by fuel again with other ID.

::

    export NEW_CIC_ID=$(fuel node \
        | awk -F\| '$2~/discover/{print($1)}' \
        | tr -d ' ' | sort -n -r | head -1)

Run the following command to add controller
node to 6.0 Seed environment:

::

    fuel --env $SEED_ID node set --node $NEW_CIC_ID --role controller

Configure interfaces and disks on CIC
______________________________________

For configuring the node we use settings which we preserved earlier.

Run ``octane/bin/copy-node-settings`` script to update
configuration of interfaces for CIC in 6.0 Seed environment in accordance with
interfaces settings of this node in 5.1.1 environment. Subcommand ``interfaces`` tells script to
update networking information, ``disk`` updates disks settings. Second positional
argument is a name of file with interfaces settings for 6.0 env's CIC. Third
argument is a name of file with interfaces settings for node in 5.1.1 environment:

::

    fuel node --node $NEW_CIC_ID --network --download --dir /tmp
    fuel node --node $NEW_CIC_ID --disk --download --dir /tmp
    ./copy-node-settings interfaces /tmp/node_${NEW_CIC_ID}/interfaces.yaml \
        /tmp/node_${CIC_ID}/interfaces.yaml > /tmp/interfaces.yaml
    mv /tmp/interfaces.yaml /tmp/node_${NEW_CIC_ID}/interfaces.yaml
    ./copy-node-settings disks /tmp/node_${NEW_CIC_ID}/disks.yaml \
        /tmp/node_${CIC_ID}/disks.yaml by_extra > /tmp/disks.yaml
    mv /tmp/disks.yaml /tmp/node_${NEW_CIC_ID}/disks.yaml

Upload settings for CIC in 6.0 Seed environment to Fuel API:

::

    fuel node --node $NEW_CIC_ID --network --upload --dir /tmp
    fuel node --node $NEW_CIC_ID --disk --upload --dir /tmp

Provision CIC node
___________________

Start provisioning of CIC node in 6.0 Seed environment using Fuel CLI command:

::

    fuel node --env $SEED_ID --node $NEW_CIC_ID --provision

You can check status of node in the 6.0 Seed environment using the following
command:

::

    fuel node --env $SEED_ID

Network isolation
+++++++++++++++++

6.0 environment has the same vip addresses as the 5.1.1 environment,
and for avoiding IP conflicts need to configure interfaces on 6.0 CIC so they
are not connected to physical networks.
Paragraphs below describe how to
create and configure OpenVSwitch on 6.0 CIC to ensure that CIC is isolated
from 5.1.1 environment.

Make sure 6.0 CIC provisioning is finished before proceeding:

::

    fuel node --env $SEED_ID | grep provisioned

Install OpenVSwitch
___________________

Run the following command to connect to CIC node in the 6.0 Seed
environment and install 'openvswitch-switch' package:

::

    ssh root@node-${NEW_CIC_ID} apt-get -y install openvswitch-switch

Create OVS bridges
__________________

Prepare bridges for Management and Public networks on 6.0 CIC, ``br-mgmt`` and
``br-ex`` correspondingly. Run the following command to CIC node in the
environment and run ``ovs-vsctl`` command on node for each ``BRIDGE`` name of
``br-mgmt``, ``br-ex``:

::

    for BRIDGE in br-mgmt br-ex; do
        ssh root@node-${NEW_CIC_ID} ovs-vsctl add-br $BRIDGE
        ssh root@node-${NEW_CIC_ID} ip link set dev $BRIDGE mtu 1450
    done

Prepare deployment settings
+++++++++++++++++++++++++++

Change vip mgmt and pub vip addresses for seed environment
__________________________________________________________

Need to change public and management vip addresses for seed
environment in db on addresses from original environment:

::

    export PSQL_CMD="psql -At \
        postgresql://nailgun:${NAILGUN_PASS}@localhost/nailgun"
    export ORIG_MGMT_NET=$(echo "SELECT id FROM network_groups
        WHERE group_id IN (SELECT id FROM nodegroups
                           WHERE cluster_id = $ORIG_ID)
        AND name = 'management'" | $PSQL_CMD)
    export SEED_MGMT_NET=$(echo "SELECT id FROM network_groups
        WHERE group_id IN (SELECT id FROM nodegroups
                           WHERE cluster_id = $SEED_ID)
        AND name = 'management'" | $PSQL_CMD)
    export MGMT_VIP=$(echo "SELECT ip_addr FROM ip_addrs
        WHERE network = $ORIG_MGMT_NET
        AND node IS NULL;" | $PSQL_CMD)
    echo "UPDATE ip_addrs SET ip_addr = '$MGMT_VIP'
        WHERE network = $SEED_MGMT_NET
        AND node IS NULL;" | $PSQL_CMD
    export ORIG_PUB_NET=$(echo "SELECT id FROM network_groups
        WHERE group_id IN (SELECT id FROM nodegroups
                           WHERE cluster_id = $ORIG_ID)
        AND name = 'public'" | $PSQL_CMD)
    export SEED_PUB_NET=$(echo "SELECT id FROM network_groups
        WHERE group_id IN (SELECT id FROM nodegroups
                           WHERE cluster_id = $SEED_ID)
        AND name = 'public'" | $PSQL_CMD)
    export PUB_VIP=$(echo "SELECT ip_addr FROM ip_addrs
        WHERE network = $ORIG_PUB_NET
        AND node IS NULL;" | $PSQL_CMD)
    echo "UPDATE ip_addrs SET ip_addr = '$PUB_VIP'
        WHERE network = $SEED_PUB_NET
        AND node IS NULL;" | $PSQL_CMD

Download deployment settings
____________________________

Use Fuel CLI to download deployment parameters for 6.0 Seed environment:

::

    fuel --env $SEED_ID deployment --default --dir /tmp/

Disable deployment of patch ports
_________________________________

During deployment, Fuel manifests will create OpenVSwitch bridges and connect
them to each other and to physical ports. This process is managed by
``'transformation'`` section of node deployment settings. Disable creation of patch
ports between bridge pairs that include ``'br-ex'`` or ``'br-mgmt'``. To do that, first
create copy of deployment information directory:

::

    cp -R /tmp/deployment_${SEED_ID} /tmp/deployment_${SEED_ID}.orig

There are actions in a ``'transformations'`` section of deployment information
for which type is ``'add-patch'``. Every action of this type has 2 bridges
specified. You need to delete all actions of this type that have ``'br-ex'`` or
``'br-mgmt'`` among its bridges. You have to do this for every yaml file in
``/tmp/deployment_<SEED_ID>`` directory. You can use helper script
``octane/helpers/transformations.py``. Run the following command to remove
configuration of patch ports to both Public and Management networks:

::

    pushd /root/octane/helpers/;
    python ./transformations.py /tmp/deployment_${SEED_ID} remove_patch_ports;
    popd;

Run the following command to set a value of parameter ``'run_ping_checker'`` to
"*false*" in the deployment settings for node. This will allow deployment to
work while default gateway is unavailable in Public network due to network
isolation:

::

    ls /tmp/deployment_$SEED_ID/** \
        | xargs -I{} sh -c "echo 'run_ping_checker: \"false\"' >> {}"

Create 5.1.1 CIC hosts file
___________________________

Create file ``/tmp/env-5.1-cic.hosts`` with a list of IP addresses of all CIC
nodes in 5.1.1 environment:

::

    fuel node --env $ORIG_ID | awk -F\| '$7 ~ /controller/ {print $5}' \
        | tr -d ' ' > /tmp/env-5.1-cic.hosts

Remove predefined networks
__________________________

Use helper script ``octane/helper/transformations.py`` to remove list of networks
that Fuel should create upon deployment in OpenStack Networking from deployment
settings:

::

    pushd /root/octane/helpers/
    python ./transformations.py /tmp/deployment_${SEED_ID} remove_predefined_nets
    popd

Upload deployment settings
__________________________

Use Fuel CLI command to update deployment settings for 6.0 Seed environment:

::

    fuel --env $SEED_ID deployment --upload --dir /tmp

Deploy Seed environment
_______________________

Use Fuel CLI command to start deployment of the 6.0 Seed environment:

::

    fuel --env $SEED_ID node --node $NEW_CIC_ID --deploy
