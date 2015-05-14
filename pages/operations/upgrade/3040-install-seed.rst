.. index:: Install Seed

.. _Upg_Seed:

Install CICs
------------

Installation of CIC nodes is performed by standard Fuel installer actions and
split into two distinct steps. 
#. Prepare nodes settings and use provisioning feature of Fuel to install
operating system and configure disks on nodes. 
#. Make modifications to deployment information of the environment
that affects all CIC nodes and deploy OpenStack platform onto them.

Isolated deployment
+++++++++++++++++++

The most important modification to the default deployment process used in Fuel
installer is deployment with predefined IP addresses in isolated mode. This
section describes what isolated deployment mode is and how we configure it on
the nodes.

The replacement approach to upgrade of CICs requires that 5.1.1 and 6.0 CICs use
the same IP addresses. This allows Compute nodes to switch transparently and
seamlessly from 5.1.1 to 6.0 CICs during upgrade of CICs. Compute nodes will
continue to talk to CICs on the same IP addresses without knowing that CICs were
upgraded.

During deployment of 6.0 CICs it is necessary that they don't interfere in work
of 5.1.1 CICs. Otherwise data loss is possible. Thus, 6.0 CICs must be isolated
from all cluster L2/L3 networks, including Management, Public and Private
networks.

The absence of patch port ensures that CIC has no physical connection to
Management (or other type) network. GRE tunnel provides connectivity between
controllers in 6.0 environment. Virtual GRE circuits connect logical bridges on
all 6.0 CICs.

To create overlay Management/Public networks, choose one node to be a hub for
connections from two other nodes:

.. image:: /_images/upgrade/gre-isolation-schema.png

In this scheme, connections between leaf nodes will go through the hub node. It
will allow Fuel installer to run cross-controller validations successfully.

Modify deployment settings
++++++++++++++++++++++++++

In order to deploy 6.0 CIC nodes properly, we need to prepare deployment
information to make Fuel configure nodes and OpenStack services with the
following modifications:

#. Disable checking access to default gateway in Public network before running
   deployment operation on 6.0 CICs.
#. Assign IP addresses to 6.0 CICs so they have the same addresses as respective
   5.1.1 CICs.
#. Avoid creating patch ports to connect logical bridges to physical interfaces of
   6.0 CICs during subsequent deployment operation on those CICs.
#. Create GRE tunnels between logical interfaces of 6.0 CICs before start
   deployment operation on those CICs.

Deployment settings can be downloaded from Fuel API as a set of files. We update
settings by changing those files and uploading modified information back via
Fuel API. Items 1 to 3 are made through changing standard parameters of
deployment settings. Management of GRE ports is not supported by Fuel installer
and handled by helper script. See below for detailed description of how to
prepare deployment settings.

Provision CIC nodes
+++++++++++++++++++

This section contains detailed descriptions and command listings to prepare and
provision nodes for CICs in 6.0 Seed environment.

Add 6.0 CIC nodes
_________________

Physical servers to use for CICs in 6.0 environment must be visible via Fuel CLI
in 'discover' status. Check discovered nodes with the following command:

::

    fuel node | grep discover

Identify nodes you want to use for 6.0 CICs by IDs and add them to Seed
environment with 'controller' role using commands listed below in this section.
If you only have nodes for Seed 6.0 CICs in 'discover' status in your Fuel, run
the following command to set this variable automatically. Otherwise, you will
need to assign that variable by hand:

::

    export IDS=$(fuel node | awk -F\| '$2~/discover/{print($1)}' | tr -d \  \
        | sort -n | head -3 | sed ':a;N;$!ba;s/\n/,/g')

Once you have IDS variable set, run the following command to add controller
nodes to 6.0 Seed environment:

::

    fuel --env $SEED_ID node set --node $IDS --role controller

Configure interfaces and disks on CICs
______________________________________

Configure network interfaces according to the nodes wiring scheme. If 6.0 CIC
nodes connections are similar to the connections of 5.1.1 nodes, download interfaces
configuration from one of those. Otherwise, properly set the interfaces
configuration in the Fuel Web UI.

Run the following command to download settings template:

::

    export NODE_ID=$(fuel node --env $ORIG_ID | grep controller | head -1 \
        | cut -d\| -f 1 | tr -d ' ')
    fuel node --node $NODE_ID --network --download --dir /tmp
    fuel node --node $NODE_ID --disk --download --dir /tmp

Download settings and run ``octane/bin/copy-node-settings`` script to update
configuration of interfaces for CICs in 6.0 Seed environment in accordance with
interfaces settings in 5.1.1 environment. Subcommand ``interfaces`` tells script to
update networking information, ``disk`` updates disks settings. Second positional
argument is a name of file with interfaces settings for 6.0 env's CIC. Third
argument is a name of file with interfaces settings for node in 5.1.1 environment:

::

    for node_id in $(fuel node --env $SEED_ID \
        | awk -F\| '$8 ~ /controller/ {print $1}' | tr -d \ )
    do
        fuel node --node $node_id --network --download --dir /tmp
        fuel node --node $node_id --disk --download --dir /tmp
        ./copy-node-settings interfaces /tmp/node_${node_id}/interfaces.yaml \
            /tmp/node_$NODE_ID/interfaces.yaml > /tmp/interfaces.yaml
        mv /tmp/interfaces.yaml /tmp/node_${node_id}/interfaces.yaml
        ./copy-node-settings disks /tmp/node_${node_id}/disks.yaml \
            /tmp/node_$NODE_ID/disks.yaml by_extra > /tmp/disks.yaml
        mv /tmp/disks.yaml /tmp/node_${node_id}/disks.yaml
    done

Upload settings for all CICs in 6.0 Seed environment to Fuel API:

::

    for node_id in $(fuel node --env $SEED_ID \
        | awk -F\| '$8 ~ /controller/ {print $1}' | tr -d \ )
    do
        fuel node --node $node_id --network --upload --dir /tmp
        fuel node --node $node_id --disk --upload --dir /tmp
    done

Provision CIC nodes
___________________

Start provisioning of CIC nodes in 6.0 Seed environment using Fuel CLI command:

::

    for node_id in $(fuel node --env $SEED_ID \
        | awk -F\| '$8 ~ /controller/ {print $1}' | tr -d \ )
    do
        fuel node --env $SEED_ID --node $node_id --provision
    done

At this point, you should have a 6.0 Seed environment with the same settings as
your original 5.1.1 environment. Nodes picked to be controllers in 6.0 Seed
environment should be added to the environment with pending 'controller' role.
You can check status of nodes in the 6.0 Seed environment using the following
command:

::

    fuel node --env $SEED_ID

Network isolation
+++++++++++++++++

As was described above, CICs in 6.0 environment have similar addresses as in
5.1.1 environment, and they are connected to the same L2 networks (Public and
Management networks). To avoid IP conflicts at 6.0 deployment and configuration
stage, you will need to configure network interfaces on 6.0 controllers so they
are not connected to physical networks, but connected to each other via GRE
tunnels between Admin network interfaces. Paragraphs below describe how to
create and configure OpenVSwitch on 6.0 CICs to ensure that they are isolated
from 5.1.1 environment.

Make sure 6.0 CICs provisioning is finished before proceeding:

::

    fuel node --env $SEED_ID | grep provisioned

Install OpenVSwitch
___________________

Run the following command to connect to every CIC node in the 6.0 Seed
environment and install 'openvswitch-switch' package:

::

    fuel node --env $SEED_ID | grep controller | cut -d\| -f1 \
        | tr -d ' ' | xargs -I{} bash -c "ssh root@node-{} apt-get -y install openvswitch-switch"

Create OVS bridges
__________________

Prepare bridges for Management and Public networks on 6.0 CICs, ``br-mgmt`` and
``br-ex`` correspondingly. Run the following command to list all CIC nodes in the
environment and run ``ovs-vsctl`` command on every node for each ``BRIDGE`` name of
``br-mgmt``, ``br-ex``:

::

    for BRIDGE in br-mgmt br-ex; do
        fuel node --env $SEED_ID | grep controller | cut -d\| -f1 \
            | xargs -I {} bash -c "ssh root@node-{} ovs-vsctl add-br $BRIDGE;
            ssh root@node-{} ip link set dev $BRIDGE mtu 1450"
    done

Create GRE ports
________________

Create GRE ports in newly created bridges to connect 6.0 CIC nodes via Admin
network. The commands below will assign Admin IP of first CIC in the list to
``HUB_IP`` variable, and Admin IPs of the remaining node to ``NODE_IPS`` variable. You
also need to assign ``KEY`` variable that will be used to create unique tunnel
configurations. Otherwise, you won't be able to create two tunnels for one pair
of nodes between different logical bridges (Public and Management):

::

    HUB_IP=$(fuel node --env $SEED_ID | awk -F\| '/controller/{print($5)}' \
        | sort | head -1 | cut -d\| -f 1 | tr -d ' ')
    NODE_IPS=$(fuel node --env $SEED_ID | awk -F\| '/controller/{print($5)}' \
        | sort | tail -n +2 | cut -d\| -f 1 | tr -d ' ')
    KEY=0

Now create GRE tunnels between logical bridges to Management network. Each
tunnel must have unique ``key`` value, and named after bridge it is created in
plus address of its remote end. Run the following command to create GRE ports:

::

    for node_ip in $NODE_IPS; do
        ssh root@${node_ip} ovs-vsctl add-port br-mgmt \
            br-mgmt--gre-${HUB_IP} -- set interface br-mgmt--gre-${HUB_IP} \
            type=gre options:remote_ip=${HUB_IP} options:key=${KEY};
        ssh root@${HUB_IP} ovs-vsctl add-port br-mgmt \
            br-mgmt--gre-${node_ip} -- set interface br-mgmt--gre-${node_ip} \
            type=gre options:remote_ip=${node_ip} options:key=${KEY};
        KEY=$(expr $KEY + 1);
    done

Create GRE tunnels between logical bridges to Public network:

::

    for node_ip in $NODE_IPS; do
        ssh root@${node_ip} ovs-vsctl add-port br-ex \
            br-ex--gre-${HUB_IP} -- set interface br-ex--gre-${HUB_IP} \
            type=gre options:remote_ip=${HUB_IP} options:key=${KEY};
        ssh root@${HUB_IP} ovs-vsctl add-port br-ex \
            br-ex--gre-${node_ip} -- set interface br-ex--gre-${node_ip} \
            type=gre options:remote_ip=${node_ip} options:key=${KEY};
        KEY=$(expr $KEY + 1);
    done

Prepare deployment settings
+++++++++++++++++++++++++++

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
"*false*" in the deployment settings for all nodes. This will allow deployment to
work while default gateway is unavailable in Public network due to network
isolation:

::

    ls /tmp/deployment_$SEED_ID/** | xargs -I{} sh -c "echo 'run_ping_checker: \"false\"' >> {}"

Create 5.1.1 CIC hosts file
___________________________

Create file ``/tmp/env-5.1-cic.hosts`` with a list of IP addresses of all CIC
nodes in 5.1.1 environment:

::

    fuel node --env $ORIG_ID | awk -F\| '$7 ~ /controller/ {print $5}' \
        | tr -d ' ' > /tmp/env-5.1-cic.hosts

Update Virtual IP in Management network
_______________________________________

For proper replacement of 5.1.1 CICs, change Management IP addresses in deployment
settings for 6.0 environment to addresses of 5.1.1 CICs. There are Virtual IP
address in Management network, where all API endpoints are listening. There are
also IP addresses of individual CIC's, used by RabbitMQ queue server.

Identify Virtual IP address for Management network in 5.1.1 environment. Use
``pssh`` command to query all CIC nodes in 5.1.1 environment for Virtual IP
address:

::

    export VIP=$(pssh -i -h /tmp/env-5.1-cic.hosts "ip netns exec haproxy ip addr show dev hapr-m" \
        | fgrep -e "inet " \
        | sed -re "s%.*inet ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.*%\1%")

Now update parameter ``'management_vip'`` in deployment settings files with the
value of VIP variable:

::

    sed -re 's%management_vip:.*$%management_vip: '$VIP'%' -i /tmp/deployment_$SEED_ID/*.yaml

Update CIC IPs in Management network
____________________________________

Identify CIC IP addresses in Management network in 5.1.1 environment and store
list of addresses to variable ``MGMT_IPS``:

::

    MGMT_IPS="$(cat /tmp/env-5.1-cic.hosts \
      | xargs -I{} bash -c 'ssh root@{} ip address show dev br-mgmt' \
      | sed -nre 's%.*inet ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.*%\1%p' \
      | sort)"

Collect IP addresses assigned by Fuel to 6.0 CICs from deployment settings to
discard them and replace with addresses from 5.1.1 environment:

::

    export CONTROLLER_YAML=$(ls /tmp/deployment_${SEED_ID} | grep primary-controller)
    export DISCARD_IPS=$(python /root/octane/bin/extract-cic-ips \
        "/tmp/deployment_${SEED_ID}/${CONTROLLER_YAML}" br-mgmt | sort)

Now replace Management IPs of 6.0 CICs with IPs of CICs in 5.1.1 environment in
the deployment settings for 6.0 Seed environment. Run the following command:

::

    for count in $(seq 3); do
        DISCARD_IP=$(echo $DISCARD_IPS | cut -d ' ' -f $count)
        MGMT_IP=$(echo $MGMT_IPS | cut -d ' ' -f $count)
        sed -e 's%'$DISCARD_IP'$%'$MGMT_IP'%' \
        -e 's%- '$DISCARD_IP'/%- '$MGMT_IP'/%' \
        -i /tmp/deployment_${SEED_ID}/*.yaml
    done

Update Virtual IP in Public network
___________________________________

For proper replacement of 5.1.1 CICs, change Public IP addresses in deployment
settings for 6.0 environment to addresses of 5.1.1 CICs. There is a Virtual IP
address in Public network, where all API servers are listening. There are also
Public IP addresses of individual CIC's.

Identify Virtual IP address for Public network in 5.1.1 environment. Use ``pssh``
command to query all CIC nodes in 5.1.1 environment for Virtual IP address:

::

    VIP=$(pssh -i -h /tmp/env-5.1-cic.hosts \
        "ip netns exec haproxy ip addr show dev hapr-p" \
        | fgrep -e "inet " \
        | sed -re "s%.*inet ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.*%\1%")

Now update parameter ``'public_vip'`` in deployment settings files with the value of
VIP variable:

::

    sed -re 's%public_vip:.*$%public_vip: '$VIP'%' -i /tmp/deployment_${SEED_ID}/*.yaml

Update CIC IPs in Public network
________________________________

Identify CIC IP addresses in Public network in 5.1.1 environment and store list of
addresses to variable ``PUB_IPS``:

::

    PUB_IPS=$(cat /tmp/env-5.1-cic.hosts \
        | xargs -I{} bash -c 'ssh root@{} ip address show dev br-ex' \
        | sed -nre 's%.*inet ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.*%\1%p' \
        | sort)

Collect IP addresses assigned by Fuel to 6.0 CICs from deployment settings to
discard them and replace with addresses from 5.1.1 environment:

::

    CONTROLLER_YAML=$(ls /tmp/deployment_$SEED_ID | grep primary-controller)
    DISCARD_IPS=$(python /root/octane/bin/extract-cic-ips \
        "/tmp/deployment_${SEED_ID}/${CONTROLLER_YAML}" br-ex | sort)

Now replace Public IPs of 6.0 CICs with IPs of CICs in 5.1.1 environment in the
deployment settings for 6.0 Seed environment:

::

    for count in $(seq 3); do
        DISCARD_IP=$(echo $DISCARD_IPS | cut -d ' ' -f $count)
        PUB_IP=$(echo $PUB_IPS | cut -d ' ' -f $count)
        sed -e 's%'$DISCARD_IP'$%'$PUB_IP'%' -e 's%- '$DISCARD_IP'/%- '$PUB_IP'/%' \
            -i /tmp/deployment_${SEED_ID}/*.yaml
    done

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

    SEED_NODES=$(fuel node --env $SEED_ID | awk -F\| '$2~/provisioned/{print($1)}' \
        | tr -d \  | sort -n | sed ':a;N;$!ba;s/\n/,/g')
    fuel --env $SEED_ID node --node $SEED_NODES --deploy
