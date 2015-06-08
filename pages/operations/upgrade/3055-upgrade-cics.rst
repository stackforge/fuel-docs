.. index:: Upgrade Controllers wo hardware

.. _Upg_CICs_wo_hard:

Maintenance mode
----------------

To prevent the loss of data in OpenStack state database, API interaction with
environment must be disabled. This mode of operations is also known as
:ref:`Maintenance Mode <db-backup-ops>`

In maintenance mode, all services that write to DB are disabled. All
communications to control plane of the cluster are also disabled. VMs and other
virtual resources must be able to continue to operate as usual.

Some of OpenStack platform services are controlled by Pacemaker/Corosync
resource, for example, Neutron L3 agent. Other services, including OpenStack
API server daemons, run as standard Upstart-controlled daemons behind the
HAProxy load balancer. All services are shut down in the maintenance mode. For
Pacemaker, use ``pcs`` and ``crm`` utils to control state of resources. For
Upstart, run standard system start/stop scripts. The sections below describe
how to disable and shutdown services on CICs in both 5.1.1 and 6.0
environments.

.. _upgrade-maintenance-mode_wo_hard:

Maintenance mode commands
+++++++++++++++++++++++++

Verify success of deployment
____________________________

You need to make sure that deployment of Controller in 6.0 Seed environment
completed successfully and controller are online. Run the following command
and see if node is listed in the output:

::

    fuel node --env $SEED_ID \
        | awk -F\| '$7~/controller/&&$2~/ready/&&$9~/True/{print($0)}'

Create 6.0 CIC hosts file
_________________________

Create file ``/tmp/env-6.0-cic.hosts`` with a list of IP addresses of all CIC
nodes in 6.0 environment:

::

    fuel node --env $SEED_ID | awk -F\| '$7 ~ /controller/ {print $5}' \
        | tr -d ' ' > /tmp/env-6.0-cic.hosts

Shut down services on 6.0 CIC
______________________________

Shut down services on 6.0 CIC to prevent the database corruption during the
upgrade. You need to run the following command to stop Pacemaker managed services:

::

    fuel node --env $SEED_ID | grep controller | cut -d \| -f 1 \
        | tr -d ' ' | head -1 | xargs -I{} ssh root@node-{} "crm status \
        | awk '/clone/ {print \$4}' | tr -d [] | grep -vE '(mysql|haproxy)' \
        | xargs -tI@ sh -c 'crm resource stop @'"

The commands below will shut down services managed by standard Upstart scripts:

::

    SHUTDOWN_COMMAND=$(cat <<EOF
    services="nova keystone heat neutron cinder glance"; \
        echo -n \$services \
        | xargs -d" " -I{} sh -c 'ls /etc/init/{}* \
        | grep -Ev override \
        | sed -E "s,.*/([^\.]+)(\.conf|override)?$,\1," \
        | sort -u | xargs -I@ sh -c "status @ \
        | grep start/running >/dev/null 2>&1 && echo @"' \
        | tee /tmp/services.tmp;
    [ -f /tmp/services ] || mv /tmp/services.tmp /tmp/services;
    for s in \$(cat /tmp/services);
        do
            stop \$s;
        done
    EOF
    )
    pssh -i -h /tmp/env-6.0-cic.hosts "$SHUTDOWN_COMMAND"

Disable API endpoints on 5.1.1 CICs
___________________________________

OpenStack services must not serve user API calls that change data in the
database during upgrade process. Configure empty back-end for HAProxy server to
disable APIs running on 5.1.1 CICs. Add the following line to configuration files
on every 5.1.1 CIC node by running command that walks all of them:

::

    for node_ip in $(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print($5)}' | tr -d ' ');
        do
            ssh root@${node_ip} "echo 'backend maintenance' >> /etc/haproxy/haproxy.cfg"
        done;

Configure all services in HAProxy config directory to use the maintenance
backend. Run following command to apply that configuration to all 5.1.1 CIC nodes:

::

    for node_ip in $(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print($5)}' | tr -d ' ');
        do
        ssh root@${node_ip} "grep -L 'mode *tcp' /etc/haproxy/conf.d/* \
            | xargs -I{} bash -c \"echo '  use_backend maintenance if TRUE' >> {}\""
        done

Send kill signal to HAProxy services on all CIC nodes to force Pacemaker to
restart a service. Run the following command on the Fuel Master node:

::

    fuel node --env $ORIG_ID | awk -F\| '$7~/controller/{print($1)}' | tr -d ' ' \
        | xargs -I{} ssh root@node-{} pkill haproxy

Database migration
------------------

Before databases could be upgraded, all OpenStack services on 6.0 CIC must be
stopped to avoid data corruption. Proposed solution uses standard Ubuntu startup
scripts from ``/etc/init.d`` on controller to shut off services.

Databases dumped in text format from MySQL server on 5.1.1 CIC, copied to 6.0 CIC
and uploaded to DB. Standard OpenStack tools allow to upgrade the structure of
databases saving the data itself via sqlalchemy-powered DB migrations.

Database migration commands
+++++++++++++++++++++++++++

Dump database data
__________________

Use ``mysqldump`` utility (it is installed with MySQL server package) on one of
5.1.1 CIC nodes to create a text file with the contents of tables in state
database. Run the following command on the Fuel Master node:

::

    export CIC_IP=$(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print($5)}' \
        | tr -d ' ' | head -1)
    ssh root@${CIC_IP} "mysqldump --lock-all-tables --add-drop-database \
        --databases keystone nova heat neutron glance cinder | gzip" \
        > dbs.original.sql.gz

.. _upgrade_db_upload_data_wo_hard:

Upload data to 6.0 DB
_____________________

Use MySQL client to upload data from dump to 6.0 CIC database.

Execute following command on the Fuel Master node.

::

    cat dbs.original.sql.gz | ssh root@node-$NEW_CIC_ID "zcat | mysql"


Upgrade database structure
__________________________

Use the following standard OpenStack service commands to upgrade databases for
services.

::

    ssh root@node-$NEW_CIC_ID "keystone-manage db_sync;
    nova-manage db sync;
    heat-manage db_sync;
    neutron-db-manage --config-file=/etc/neutron/neutron.conf upgrade head;
    glance-manage db upgrade;
    cinder-manage db sync"

This command will upgrade databases structure for the following services: Nova,
Keystone, Heat, Glance, Neutron, Cinder.

Upgrade Ceph cluster
--------------------

We must preserve cluster
identity and auth parameters. We copy configuration files, keyrings and state
dirs from 5.1.1 CICs to 6.0 CIC and use Ceph management tools to restore cluster
identity.

Update Ceph configuration commands
++++++++++++++++++++++++++++++++++

Download configuration
______________________

Copy Ceph configuration directory from old controller to new controller to
preserve all parameters from configuration file and all keyrings used in Ceph
cluster. Run the following commands on the Fuel Master node.

Identify a CIC host in 5.1.1 environment to copy Ceph configuration and state
files from. In fact, it can be any CIC, they have interchangeable configuration
files:

::

    SRC_CIC=$(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print("node-"$1)}' | tr -d ' ' | head -1)

Now copy all needed files from source 5.1
CIC to 6.0 CIC:

::

    ssh root@node-${NEW_CIC_ID} "rm -rf /etc/ceph;
        mkdir /etc/ceph;
        test -d /var/lib/ceph/mon/ceph-node-${NEW_CIC_ID} &&
        rm -rf /var/lib/ceph/mon/ceph-node-${NEW_CIC_ID};  :"
    ssh root@${SRC_CIC} tar cvf - /etc/ceph /var/lib/ceph/mon \
        | ssh root@node-${NEW_CIC_ID} "tar xvf - -C / &&
            set -e
            mv /var/lib/ceph/mon/ceph-${SRC_CIC} \
            /var/lib/ceph/mon/ceph-node-${NEW_CIC_ID}"

Update Ceph configuration
_________________________

Ceph configuration specifies names of hosts where Monitor services run in
parameter ``'mon_initial_members'`` in ``/etc/ceph/ceph.conf`` file. Run the
following commands to replace original value of ``mon_initial_members``
with 6.0 CIC's hostname

::

     ssh root@node-${NEW_CIC_ID} "sed -e \
     's/mon_initial_members = .*/mon_initial_members = node-$NEW_CIC_ID/' \
     -i /etc/ceph/ceph.conf"

You also need to configure hostname of Ceph Monitor node in ``host`` parameter.
Run the following command to make sure that proper hostname is specified as
value of that parameter:

::

    ssh root@node-${NEW_CIC_ID} "sed -e 's/^host =.*/host = 'node-${NEW_CIC_ID}'/g' \
    -i /etc/ceph/ceph.conf"

Update monitor map
__________________

Monitor map defines addresses and hostnames of monitors. As hostnames of CIC
nodes change when 6.0 CIC take over 5.1.1 environment, you need to update monmap
with new hostname of node.

Record the value of ``fsid`` parameter to use later in this step. The following
command will log into 6.0 CIC

::

    FSID=$(ssh root@node-${NEW_CIC_ID} "cat /etc/ceph/ceph.conf" \
        | awk '/fsid/{print $3}')

Run the following commands to create temporary monitor map
(`<http://ceph.com/docs/master/man/8/monmaptool/>`_) file on
6.0 CIC and download for later use:

::

    ssh root@node-${NEW_CIC_ID} monmaptool --fsid $FSID --clobber --create \
        --add $(echo node-$NEW_CIC_ID | cut -d ' ' -f 1) \
        $(echo node-$NEW_CIC_ID | cut -d ' ' -f 1 \
            | xargs -I{} bash -c "ssh root@{} ip addr show dev br-mgmt \
            | sed -rne 's%.*inet ([^/]+)/.*%\1%p'") \
        --add $(echo node-$NEW_CIC_ID | cut -d ' ' -f 2) \
        $(echo node-$NEW_CIC_ID | cut -d ' ' -f 2 \
            | xargs -I{} bash -c "ssh root@{} ip addr show dev br-mgmt \
            | sed -rne 's%.*inet ([^/]+)/.*%\1%p'") \
        --add $(echo node-$NEW_CIC_ID | cut -d ' ' -f 3) \
        $(echo node-$NEW_CIC_ID | cut -d ' ' -f 3 \
            | xargs -I{} bash -c "ssh root@{} ip addr show dev br-mgmt \
            | sed -rne 's%.*inet ([^/]+)/.*%\1%p'") /tmp/monmap;
    scp root@node-${NEW_CIC_ID}:/tmp/monmap /tmp/monmap;

Now run the following command to inject new monitor map into Ceph Monitor:

::

    scp /tmp/monmap root@node-${NEW_CIC_ID}:/tmp/monmap
    ssh root@node-${NEW_CIC_ID} ceph-mon -i node-${NEW_CIC_ID} --inject-monmap /tmp/monmap

Restart Ceph Monitor services on all controller nodes:

::

    pssh -i -h /tmp/env-6.0-cic.hosts "/etc/init.d/ceph restart mon"

Add bootstrap auth keys
_______________________

Import OSD bootstrap keys into new cluster's auth system. Bootstrap keys are
created during installation of 6.0 CICs and used to add OSD nodes to Ceph
cluster. The command below logs into 6.0 CIC, imports original keys
into auth configuration and grants privileges to add OSD to certain keys in
boostrap keyring:

::

    ssh root@node-${NEW_CIC_ID} "ceph auth import \
        -i /root/ceph.bootstrap-osd.keyring;
        ceph auth caps client.bootstrap-osd \
        mon 'allow profile bootstrap-osd'"

Protect CRUSH map
_________________

Ceph stores relationships between hosts and OSDs in CRUSH map and every time it
changes, new data placement map
(`<http://ceph.com/docs/master/rados/operations/placement-groups/>`_)
is generated resulting in data rebalancing. We want to avoid extra Ceph traffic
during upgrade (and speed up upgrade), so we want to keep CRUSH map unchanged.

Every time OSD service is started it tries to register itself on current host in
CRUSH map. This leads to changes in CRUSH map when redeployed OSD nodes are
brought online.

To prevent this, set following option in ``/etc/ceph/ceph.conf`` file, section
``[global]``. Run this command to add configuration parameter on CIC node in
6.0 Seed environment:

::

    pssh -i -h /tmp/env-6.0-cic.hosts \
        "sed '/\[global\]/a osd_crush_update_on_start = false' \
        -i /etc/ceph/ceph.conf"

This config is copied to every new node by ``ceph-deploy`` utility, so this will
prevent them from changing CRUSH map.

Restart services
________________

Start ``radosgw`` service daemon on 6.0 CIC node:

::

    ssh root@node-${NEW_CIC_ID} "/etc/init.d/radosgw start"

Stop and start Ceph Monitor service on 6.0 CIC node:

::

    ssh root@node-${NEW_CIC_ID} "service ceph restart mon"

Upgrade CICs
------------

The following section provides step-by-step procedure for replacing CICs from
5.1.1 environment with controller from 6.0 environment.

When DB upgrade is finished, we start all OpenStack services on 6.0 CIC using
Pacemaker and Upstart. Then we disconnect 5.1.1 CICs from Management and Public
networks by removing patch ports between logical interfaces to respective
networks and physical interfaces connected to network media. For example, if 5.1
CIC connected to Management network via ``eth1`` interface, configuration of the
logical bridge will be as follows:

::

    ovs-vsctl show
    ...
    Bridge br-mgmt
        Port "br-mgmt--br-eth1"
            trunks: [0]
            Interface "br-mgmt--br-eth1"
                type: patch
                options: {peer="br-eth1--br-mgmt"}
        Port br-mgmt
            Interface br-mgmt
                type: internal
    Bridge "br-eth1"
        Port "eth1"
            Interface "eth1"
        Port "br-eth1--br-mgmt"
            trunks: [0]
            Interface "br-eth1--br-mgmt"
                type: patch
                options: {peer="br-mgmt--br-eth1"}
        Port "br-eth1"
            Interface "br-eth1"
                type: internal
    ...

On 6.0 CIC the reverse of this operation must be performed. This will replace
5.1.1 CICs with 6.0 CIC

First, to identify physical interfaces connected to Management and Public
networks you need to refer to original deployment configuration files. File
``primary-controller_XX.yaml`` contains subsection ``'transformations``' under
``'network_scheme'`` section.

* For Management network: ``'action: add-patch'`` item where ``'bridges'`` list
  includes ``br-mgmt`` element allows to define a physical interface bridge to
  Management network (for example, ``br-eth1``).
* For Public network, the list must include ``br-ex`` and physical interface
  bridge to Public network (for example, ``br-eth2``).

The commands below create patch ports in logical network switches, for example:

::

    ovs-vsctl add-port br-ex br-ex--br-eth1 \
        -- set interface br-ex--br-eth1 type=patch options:peer=br-eth1--br-ex
    ovs-vsctl add-port br-mgmt br-mgmt--br-eth2 \
        -- set interface br-mgmt--br-eth2 type=patch options:peer=br-eth2--br-mgmt

Note the naming convention: the first part of patch port name matches the name of
bridge it is added to. The second part of it's name matches the name of physical
interface bridge. Peers for these patch ports should be created in physical
interface bridges. The following commands are the example of how peer ports can be
configured:

::

    ovs-vsctl add-port br-eth1 br-eth1--br-ex \
        -- set interface br-eth1--br-ex type=patch options:peer=br-ex--br-eth1
    ovs-vsctl add-port br-eth2 br-eth2--br-mgmt \
        -- set interface br-eth2--br-mgmt type=patch options:peer=br-mgmt--br-eth2

See the sections below to find commands that will allow you to perform
replace-upgrade in your 5.1.1 environment.

Upgrade CICs commands
+++++++++++++++++++++

Disconnect 5.1.1 CICs
_____________________

Disconnect 5.1.1 CICs from Management and Public networks by deleting patch ports
that connect virtual switches to physical network interfaces. Run the following
command on Fuel installer node. It will list patch ports in the given virtual
switches and delete them:

::

    for node in $(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print("node-"$1)}' | tr -d ' ')
    do
        for br_name in br-ex br-mgmt br-prv
        do
            br_phys=$(ssh root@${node} ovs-vsctl list-ports $br_name \
                | tr -d '"' | sed -nre 's/'$br_name'--(.*)/\1/p')
            ssh root@${node} "ovs-vsctl del-port $br_name ${br_name}--${br_phys};
                ovs-vsctl del-port $br_phys ${br_phys}--${br_name}"
        done
    done

Start services on 6.0 CIC
__________________________

Revert shutoff operation on CIC services performed per section `Maintenance
mode commands<upgrade-maintenance-mode>` of these instructions. Services will
begin to work with upgraded version of original state databases. Run the
following command sequence on the Fuel Master:

::

    START_COMMAND=$(cat <<EOF
    crm_services=\$(pcs resource \
        | awk '/Clone Set:/ {print \$4; getline; print \$1}' \
        | sed 'N;s/\n/ /' \
        | tr -d ':[]' | awk '{print substr(\$1,3)}');
    for s in \$(</tmp/services);
    do
        for cs in \$crm_services; do
            if [ "\$cs" == "\$s" ]; then
                continue 2;
            fi;
            done;
        start \$s;
    done;
    EOF
    )
    pssh -i -h /tmp/env-6.0-cic.hosts "$START_COMMAND"

Next, start all services managed by Pacemaker. Run the following command to get
a list of all Pacemaker resources and to start all 'Stopped' resources:

::

    ssh root@node-${NEW_CIC_ID} "pcs resource \
        | awk '/Clone Set:/ {print \$4; getline; print \$1}' \
        | sed 'N;s/\n/ /' | tr -d ':[]' \
        | grep Stopped | awk '{print \$1}' \
        | xargs -I{} crm resource start {}"

Update Neutron configuration
____________________________

Due to updated state database, you need to update Neutron configuration by
changing ID of ``'admin'`` tenant in ``/etc/neutron/neutron.conf`` to it's actual
value. Run the following command to identify actual ID of admin tenant and store
it to ``ADMIN_TENANT_ID`` variable:

::

    export ADMIN_TENANT_ID=$(ssh root@node-${NEW_CIC_ID} ". openrc;
        keystone tenant-get services" | awk -F\| '$2 ~ /id/{print $3}' | tr -d \ )

Run the next command to update configuration files on CIC node in 6.0
environment:

::

    ssh root@node-${NEW_CIC_ID} "sed -re \
        's/^(nova_admin_tenant_id )=.*/\1 = $ADMIN_TENANT_ID/' \
        -i /etc/neutron/neutron.conf;
    stop neutron-server; start neutron-server"

Create patch ports on 6.0 CIC
______________________________

Connect 6.0 CIC to Management and Public network of 5.1.1 environment by creating
patch ports between logical and physical interfaces.

Use helper script ``octane/bin/create-patch-ports`` to get a list of commands
required to create patch ports on specific nodes. This script reads backup
deployment information for 6.0 Seed environment and determines which bridges
must be connected for proper networking configuration on 6.0 CICs:

::

    for node_id in $(fuel node --env $SEED_ID \
        | awk -F\| '$7~/controller/{print($1)}')
        do
            filename=$(ls /tmp/deployment_${SEED_ID}.orig/*_$node_id.yaml | head -1)
            for br_name in br-ex br-mgmt
                do
                    ./create-patch-ports $filename $br_name \
                        | xargs -I{} ssh root@node-${node_id} {}
                done
        done

Now 6.0 CIC replaced 5.1.1 CICs with same vip addresses. Hypervisor hosts now
can access new CIC, connect to RabbitMQ server and exchange RPC messages with
6.0 control plane services.

Upgrade Compute Service
-----------------------

To ensure minimal impact on end user resources, we leverage live migration
technique to move all virtual server instances from the node prior to upgrade.

Live migration is only possible between Compute services of similar version in
MOS 6.0. To solve this, we split control plane and data plane upgrades on the
Hypervisor node. First, upgrade OpenStack services running on all hypervisors
(i.e. nova-compute and neutron-l2-agent) using Ubuntu package manager. Update of
configuration files is also required. This allows to use API of 6.0 CIC to live
migrate all VMs from a hypervisor node to other hosts and prepare it to data
plane upgrade.

We developed a helper script ``octane/bin/upgrade-nova-compute.sh`` that performs
all mentioned actions on a specified node. It must be executed against all the
nodes in original 5.1.1 environment. See the exact command sequence to run this
script.

Update nova-compute service and it's dependencies
+++++++++++++++++++++++++++++++++++++++++++++++++

The following command lists all compute nodes in the original 5.1.1 enviroment and
run helper script for every node in the list, maximum 10 nodes at a time:

::

    fuel node --env $ORIG_ID | awk -F\| '$7~/compute/{print("node-"$1)}' \
        | tr -d ' ' | xargs -I@ -P10 bash -c "./upgrade-nova-compute.sh @"

Redeploy 2 last 5.1 CICs to 6.0 environment
+++++++++++++++++++++++++++++++++++++++++++
Now, we need to redeploy 2 last CICs to 6.0 environment,
if we want to provide HA-mode for 6.0 cluster.
For this goal first of all we remove 2 CICs from 5.1,
next step we add it to 6.0 environment, configure and provision,
after that we deploy it


Remove two last controllers from 5.1 environment
________________________________________________
::

    fuel node --env $ORIG_ID \
         | awk -F\| '$7~/controller/{print($1)}' \
         | xargs -tI% bash -c "fuel node --node % --delete-from-db &&
                      dockerctl shell cobbler cobbler system remove --name node-%
                      ssh root@node-% shutdown -r now"

Wait for 2 nodes boot in discover state

Add controllers to 6.0 environment
__________________________________

::

    export IDS=$(fuel node | awk -F\| '$2~/discover/{print($1)}' | tr -d \  \
    | sort -n | head -2 | sed ':a;N;$!ba;s/\n/,/g')
    fuel --env $SEED_ID node set --node $IDS --role controller

Configure interfaces and disks on CICs
______________________________________

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
    for node_id in $(fuel node --env $SEED_ID \
        | awk -F\| '$8 ~ /controller/ {print $1}' | tr -d \ )
    do
        fuel node --node $node_id --network --upload --dir /tmp
        fuel node --node $node_id --disk --upload --dir /tmp
    done

Provision CIC nodes
___________________

::

    for node_id in $(fuel node --env $SEED_ID \
        | awk -F\| '$8 ~ /controller/ {print $1}' | tr -d \ )
    do
        fuel node --env $SEED_ID --node $node_id --provision
    done

Deploy CIC nodes
________________

::

    fuel --env $SEED_ID deployment --default --dir /tmp/
    mv /tmp/deployment_${SEED_ID} /tmp/deployment_${SEED_ID}.default
    fuel --env $SEED_ID deployment --download --dir /tmp/
    mv /tmp/deployment_${SEED_ID}.default/*.yaml /tmp/deployment_${SEED_ID}/

    export VIP=$(pssh -i -h /tmp/env-6.0-cic.hosts \
        "ip netns exec haproxy ip addr show dev hapr-m" \
        | fgrep -e "inet " \
        | sed -re \
        "s%.*inet ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.*%\1%")

    sed -re 's%management_vip:.*$%management_vip: '$VIP'%' \
        -i /tmp/deployment_$SEED_ID/*.yaml

    export VIP=$(pssh -i -h /tmp/env-6.0-cic.hosts \
        "ip netns exec haproxy ip addr show dev hapr-p" \
        | fgrep -e "inet " \
        | sed -re "s%.*inet ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.*%\1%")

    sed -re 's%public_vip:.*$%public_vip: '$VIP'%' -i /tmp/deployment_${SEED_ID}/*.yaml


    pushd /root/octane/helpers/
    python ./transformations.py /tmp/deployment_${SEED_ID} remove_predefined_nets
    popd

    fuel --env $SEED_ID deployment --upload --dir /tmp

    fuel node --env $SEED_ID --node $IDS --deploy
