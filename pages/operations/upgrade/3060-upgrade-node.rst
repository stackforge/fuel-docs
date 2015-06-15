.. index:: Upgrade Node

.. _Upg_Node:

Upgrade Node
------------

Node upgrade is essentially a reinstallation of operating system and OpenStack
platform services. We need to delete a node from 5.1.1 environment and wait until
Fuel discovers it. Next, we add discovered node to 6.0 Seed environment, provision
it and deploy OpenStack on it.

By default, Fuel installer erases all data from disks on the node, creates new
partitions structure, installs operating system and deploys OpenStack. Depending
on the roles the node has in the 5.1.1 environment, we might need to make changes to
the behavior. For example, to upgrade Ceph OSD node, we need to make Fuel keep data
on Ceph partitions of that node. To upgrade Compute nodes, we need to use live
migration to move users' VMs from it to other hypervisor hosts. There are also
several steps in the upgrade procedure that are common to both supported roles
('compute' and 'ceph-osd'). This section describes these common steps to upgrade
a node.

Back up node settings
+++++++++++++++++++++

The first step in preparation for the upgrade is to back up the disks and interfaces
settings of the node. It is required to restore proper partitions schema and
interfaces configuration after reinstallation of the node. Fuel API allows us to
download settings to files on a local disk. These files can be used as templates
to create and upload settings for the re-added node.

Prepare Ceph OSD node to upgrade
++++++++++++++++++++++++++++++++

Preparations for the upgrade of Ceph OSD node include steps to minimize data
transfers inside the Ceph cluster during the upgrade. They also aim to ensure
that the data on OSD devices is kept intact.

From the impact standpoint, the most optimal solution is to minimize data transfers
over network during the upgrade of Ceph cluster. Ceph will normally rebalance its
data when OSD node is down. However, since the described procedure preserves Ceph
data on the node, rebalance must be turned off. We use standard Ceph flag
``noout`` to disable the rebalance on a node outage.

Fuel installer has an agent on every node under its management. This agent,
known as MCollective agent, performs lifecycle management actions on the node. When the
node is being deleted from the original 5.1.1 environment, the agent erases the first
10MB of data on all disks of the node. We need to disable the erase for Ceph OSD
devices. We developed a patch that, when applied on the node, adds the corresponding
block of logic to MCollective agent.

Prepare Compute node to upgrade
+++++++++++++++++++++++++++++++

Compute node runs virtual machines in hypervisor processes. To satisfy the
requirement to minimize the downtime of virtual resources, we must ensure that the
VMs are moved from the node in preparation to reinstall. The move must be done
by the most seamless migration method available. This move is referred to as
**'evacuation'**.

Using Ceph shared storage for Nova instance's ephemeral disk allows to use
live migration of virtual instances. The sections below describe steps required
to live migrate all VMs from hypervisor host picked for upgrade.

To minimize impact of upgrade procedure on the end user workloads, we need to
migrate all VMs off hypervisor picked for upgrade and make sure that no new VMs
provisioned to that host. Scheduling to host can be ruled out by disabling
Compute service on that host. This does not affect ability to migrate VMs from
that host.

Reassign node to Seed environment
+++++++++++++++++++++++++++++++++

Once the preparation steps are completed, we delete the node picked for the upgrade from
original 5.1.1 environment. Fuel installer discovers the deleted node when it
boots into bootstrap image. Once we identified the re-discovered node, we add it
to 6.0 Seed environment, apply the disk/network settings by the template saved on the
preparation stage and start provisioning of the node.

Applying disk settings might be tricky as their IDs might change in the process of
discovery. We use the ``extra`` attribute of disk metadata to identify proper mapping
between old and new IDs. This attribute contains model numbers and serial
numbers of disk device. It will not change when node status changes. Applying
network settings requires an update of network ID number, which is specific for the
pair of network type and environment ID. We developed a script that allows to
update these settings. See details of using that script in the section `Provision
upgraded node`_ below.

Verify node upgrade
+++++++++++++++++++

After successful installation you need to make sure that the node connected to CICs
properly, according to its roles. Ceph OSD node must be ``up`` in the OSD tree.
Compute node must be connected to Nova controller services. Below in the list of
commands you will find how to check these requirements.

Provision upgraded node
+++++++++++++++++++++++

This section contains a list of commands that provision the node picked for the upgrade.
Depending on the roles of a given node, the steps that are related to the role that is not
assigned could be skipped.

Select hypervisor host for upgrade
__________________________________

You can list nodes in the environment picked for the upgrade using the
command below. You will need to note ID of the node you want to upgrade in the first
column:

::

    fuel node --env $ORIG_ID

Set the ``NODE_ID`` variable to ID of Compute node you want to upgrade. For example,
see the command below. Make sure to assign proper ID instead of '1'.

::

    export NODE_ID=1

Back up node settings
_____________________

Before the node is removed from the original environment, save the disk and
network attributes of that node to the Fuel Master. Use Fuel CLI to download
settings from API to local file:

::

    fuel node --node $NODE_ID --disk --download --dir /tmp
    fuel node --node $NODE_ID --net --download --dir /tmp

Save a list of roles that the node has in 5.1.1 environment to the ROLES variable using
the following command. You will need this later to add the node to 6.0 environment:

::

    export ROLES=$(fuel node --node $NODE_ID \
        | awk -F\| '/^'$NODE_ID'/{gsub(" ","",$7);print $7}')

Disable Ceph rebalance
______________________

If the node had 'ceph-osd' role in the original environment, you need to disable
Ceph rebalance, i.e. the move of data replicas upon outage of a node. Use the standard
Ceph command to turn off marking the node 'out' when OSD node shuts down:

::

    ssh root@${PRIMARY_CIC} ceph osd set noout

Update Nailgun agent
____________________

If the node had 'ceph-osd' role in the original environment, we need to prevent
Nailgun agent from erasing data on Ceph partition. Use the helper script
``octane/patch/pman/update_node.sh`` that will apply a patch to the MCollective agent
on the node.

::

    pushd /root/octane/patches/pman/
    ./update_node.sh node-${NODE_ID}
    popd

Disable Compute service
_______________________

If the node has 'compute' role in the original environment, you need to disable
scheduling to that host, so no new VMs appear on it just before the upgrade. Make
sure that the selected node actually runs 'nova-compute' service and, if so, disable
the service using the following command:

::

    ssh root@${PRIMARY_CIC} ". /root/openrc; \
        nova service-list --host node-${NODE_ID} \
        | grep -q 'nova-compute.*enabled' && {
            nova service-disable node-${NODE_ID} nova-compute
        }"

Live migrate VMs from host
__________________________

If the node has 'compute' role in the original environment, you need to evacuate all
VMs from the hypervisor at the node. Use the following command to migrate all the VMs
running on the hypervisor host to other nodes in the cloud:

::

    ssh root@${PRIMARY_CIC} ". /root/openrc; nova list --host node-${NODE_ID} \
        | grep ' ACTIVE ' | cut -d\| -f3 | sed -r 's/(^[ ]+?|[ ]+?$)//g' \
        | xargs -tI% nova live-migration %"

Delete node from 5.1.1 env
__________________________

When all preparations are finished, run the commands below to delete the selected
node from 5.1.1 environment. The first command deletes the node from Nailgun inventory in
Fuel. The second command removes boot protocol information about the node. The last
command restarts the node:

::

    fuel node --node $NODE_ID --delete-from-db
    dockerctl shell cobbler cobbler system remove --name node-${NODE_ID}
    ssh root@node-${NODE_ID} shutdown -r now

The node will be removed from 5.1.1 env and will boot into bootstrap image. At that
point it will get a new ID and will be set to the ``discover`` status in Fuel DB. Set
``NODE_ID`` to the new ID of node:

::

    export NEW_NODE_ID=$(fuel node \
        | awk -F\| '$2~/discover/{print($1)}' \
        | tr -d ' ' | sort -n -r | head -1)

Add node to 6.0 env
___________________

Run the following command to add Compute node to 6.0 Seed environment:

::

    fuel --env $SEED_ID node set --node $NEW_NODE_ID --role $ROLES

Restore node disks settings
___________________________

Configuration of disks and networks on the node must not change during the upgrade.
Interfaces will not change their roles. Disk partitioning will remain the same.
To ensure that, restore the disk and network attributes for the node from the information
about the node in 5.1.1 environment, saved in the beginning of this step.

First, you need to download the settings for the new node, discovered in 6.0 Seed
environment, using Fuel CLI command:

::

    fuel node --node $NEW_NODE_ID --disk --download --dir /tmp

Run the following commands to update disks settings. The helper script will output
the updated configuration of disk settings for the upgraded node to STDOUT stream. We
send it to a temporary file and replace the original settings file by the temporary
file.

::

    pushd /root/octane/bin/
    ./copy-node-settings disks /tmp/node_${NEW_NODE_ID}/disks.yaml \
        /tmp/node_${NODE_ID}/disks.yaml by_extra > \
        /tmp/disks-${NEW_NODE_ID}.yaml
    mv /tmp/disks-${NEW_NODE_ID}.yaml /tmp/node_${NEW_NODE_ID}/disks.yaml

Upload disk settings to Nailgun via CLI and return to the working directory.

::

    fuel node --node $NEW_NODE_ID --disk --upload --dir /tmp
    popd

Configure Ceph data persistence
_______________________________

If the node picked for the upgrade had 'ceph-osd' role in the original 5.1
environment, you need to add the parameter to the disk metadata that protects Ceph data
partition from deletion. There is a helper script
'octane/bin/keep-ceph-partition' that updates the disks configuration with the required
parameter. Run the script on the node settings and upload the settings to Fuel API:

::

    pushd /root/octane/bin/
    ./keep-ceph-partition /tmp/node_${NEW_NODE_ID}/disks.yaml > \
        /tmp/disks-${NEW_NODE_ID}-ceph.yaml
    mv /tmp/disks-${NEW_NODE_ID}-ceph.yaml /tmp/node_${NEW_NODE_ID}/disks.yaml
    fuel node --node $NEW_NODE_ID --disk --upload --dir /tmp
    popd

Restore node network settings
_____________________________

Download the network settings for the upgraded node using Fuel CLI:

::

    fuel node --node $NEW_NODE_ID --net --download --dir /tmp

To restore the network settings for the node, run the helper script
``octane/bin/copy-node-settings``. Save the output to a temporary file and replace
the original file with the network settings for the upgraded node with the temporary file.
The commands below will update the network settings.

::

    pushd /root/octane/bin/
    ./copy-node-settings interfaces /tmp/node_${NEW_NODE_ID}/interfaces.yaml \
        /tmp/node_${NODE_ID}/interfaces.yaml > /tmp/interfaces-${NEW_NODE_ID}.yaml
    mv /tmp/interfaces-${NEW_NODE_ID}.yaml /tmp/node_${NEW_NODE_ID}/interfaces.yaml
    fuel node --node $NEW_NODE_ID --net --upload --dir /tmp

Provision node
++++++++++++++
Start provisioning of the node using Fuel CLI command:

::

    fuel node --env $SEED_ID --node $NEW_NODE_ID --provision

Deploy upgraded node
++++++++++++++++++++

This section describes deployment of the node picked for the upgrade. Before the deployment,
you need to prepare the deployment parameters of the 6.0 Seed environment.
The deployment is started by a standard call to Fuel API.

Download deployment settings
____________________________

Fuel provides two ways to get the deployment parameters:

* download the current version of deployment settings that include
  deployed nodes
* download the default settings for the nodes that are not deployed yet.

We need to combine both types of settings for the deployment to work properly. Use
the following Fuel CLI commands to download deployment parameters for 6.0 Seed
environment:

::

    fuel --env $SEED_ID deployment --default --dir /tmp/
    mv /tmp/deployment_${SEED_ID} /tmp/deployment_${SEED_ID}.default
    fuel --env $SEED_ID deployment --download --dir /tmp/
    mv /tmp/deployment_${SEED_ID}.default/*.yaml /tmp/deployment_${SEED_ID}/

Update Virtual IP in Management network
_______________________________________

Identify Virtual IP address for Management network in 6.0 environment. Use the
``pssh`` command to query all CIC nodes in 6.0 environment for Virtual IP
address:

::

    export VIP=$(pssh -i -h /tmp/env-6.0-cic.hosts \
        "ip netns exec haproxy ip addr show dev hapr-m" \
        | fgrep -e "inet " \
        | sed -re \
        "s%.*inet ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.*%\1%")

Now update the parameter ``'management_vip'`` in the deployment settings files with the
value of VIP variable:

::

    sed -re 's%management_vip:.*$%management_vip: '$VIP'%' \
        -i /tmp/deployment_$SEED_ID/*.yaml

Update CIC IPs in Management network
____________________________________

Identify CIC IP addresses in Management network in 6.0 environment and store
the list of addresses to the variable ``MGMT_IPS``:

::

    MGMT_IPS="$(cat /tmp/env-6.0-cic.hosts \
        | xargs -I{} bash -c 'ssh root@{} ip address show dev br-mgmt' \
        | sed -nre 's%.*inet ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.*%\1%p' \
        | sort)"

Collect the IP addresses assigned by Fuel to 6.0 CICs from the deployment settings for
the current node to discard them and replace with the actual addresses from 6.0
environment:

::

    export NODE_YAML=$(ls /tmp/deployment_${SEED_ID}/*_${NEW_NODE_ID}.yaml \
        | head -1)
    export DISCARD_IPS=$(python /root/octane/bin/extract-cic-ips \
        "${NODE_YAML}" br-mgmt | sort)

Now replace Management IPs of 6.0 CICs with actual IPs of CICs in the deployment
settings. Run the following command:

::

    for count in $(seq 3); do
        DISCARD_IP=$(echo $DISCARD_IPS | cut -d ' ' -f $count)
        MGMT_IP=$(echo $MGMT_IPS | cut -d ' ' -f $count)
        sed -e 's%'$DISCARD_IP'$%'$MGMT_IP'%' -e 's%- '$DISCARD_IP'/%- '$MGMT_IP'/%' \
            -i /tmp/deployment_${SEED_ID}/*.yaml
    done

Update Virtual IP in Public network
___________________________________

Identify Virtual IP address for Public network in 6..0 environment. Use the ``pssh``
command to query all CIC nodes in 6.0 environment for Virtual IP address:

::

    export VIP=$(pssh -i -h /tmp/env-6.0-cic.hosts \
        "ip netns exec haproxy ip addr show dev hapr-p" \
        | fgrep -e "inet " \
        | sed -re "s%.*inet ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.*%\1%")

Now update the parameter ``'public_vip'`` in the deployment settings files with the
value of ``VIP`` variable:

::

    sed -re 's%public_vip:.*$%public_vip: '$VIP'%' -i /tmp/deployment_${SEED_ID}/*.yaml

Update CIC IPs in Public network
________________________________

Identify CIC IP addresses in Public network in 5.1.1 environment and store the list of
addresses to the variable ``PUB_IPS``:

::

    PUB_IPS=$(cat /tmp/env-6.0-cic.hosts \
        | xargs -I{} bash -c 'ssh root@{} ip address show dev br-ex' \
        | sed -nre 's%.*inet ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.*%\1%p' \
        | sort)

Collect the IP addresses assigned by Fuel to 6.0 CICs from the deployment settings to
discard them and replace with the addresses from 5.1.1 environment:

::

    DISCARD_IPS=$(python /root/octane/bin/extract-cic-ips "${NODE_YAML}" br-ex \
        | sort)

Now replace Public IPs of 6.0 CICs with IPs of CICs in 5.1.1 environment in the
deployment settings for 6.0 Seed environment:

::

    for count in $(seq 3); do
        DISCARD_IP=$(echo $DISCARD_IPS | cut -d ' ' -f $count)
        PUB_IP=$(echo $PUB_IPS | cut -d ' ' -f $count)
        sed -e 's%'$DISCARD_IP'$%'$PUB_IP'%' \
            -e 's%- '$DISCARD_IP'/%- '$PUB_IP'/%' \
            -i /tmp/deployment_${SEED_ID}/*.yaml
    done

Remove predefined networks
__________________________

Use the helper script ``octane/helper/transformations.py`` to remove the list of networks
that Fuel should create upon deployment in OpenStack Networking from the deployment
settings:

::

    pushd /root/octane/helpers/
    python ./transformations.py /tmp/deployment_${SEED_ID} remove_predefined_nets
    popd

Upload deployment settings
__________________________

Use Fuel CLI command to update the deployment settings for 6.0 Seed environment:

::

    fuel --env $SEED_ID deployment --upload --dir /tmp

Start provisioning of node
__________________________

Use the following command to deploy changes to 6.0 environment:

::

    fuel node --env $SEED_ID --node $NEW_NODE_ID --deploy
