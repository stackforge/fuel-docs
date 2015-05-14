.. index:: Upgrade Controllers

.. _Upg_CICs:

Maintenance mode
----------------

To prevent the loss of data in OpenStack state database, API interaction with
the environment must be disabled. This mode of operations is also known as
:ref:`Maintenance Mode <db-backup-ops>`

In maintenance mode, all services that write to DB are disabled. All
communications to the control plane of the cluster are also disabled. VMs and other
virtual resources must be able to continue to operate as usual.

Some of OpenStack platform services are controlled by the Pacemaker/Corosync
resource, for example, Neutron L3 agent. Other services, including OpenStack
API server daemons, run as standard Upstart-controlled daemons behind the
HAProxy load balancer. All services are shut down in the maintenance mode. For
Pacemaker, use ``pcs`` and ``crm`` utils to control the state of resources. For
Upstart, run the standard system start/stop scripts. The sections below describe
how to disable and shut down services on CICs in both 5.1.1 and 6.0
environments.

.. _upgrade-maintenance-mode:

Maintenance mode commands
+++++++++++++++++++++++++

Verify success of deployment
____________________________

You need to make sure that the deployment of Controllers in 6.0 Seed environment
completed successfully and the controllers are online. Run the following command
and see if all of the Controller nodes are listed in the output:

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

Shut down services on 6.0 CICs
______________________________

Shut down services on 6.0 CICs to prevent the database corruption during the
upgrade. You need to run the following command to walk through all CIC nodes in
the Seed environment and stop Pacemaker managed services:

::

    fuel node --env $SEED_ID | grep controller | cut -d \| -f 1 \
        | tr -d ' ' | head -1 | xargs -I{} ssh root@node-{} "crm status \
        | awk '/clone/ {print \$4}' | tr -d [] | grep -vE '(mysql|haproxy)' \
        | xargs -tI@ sh -c 'crm resource stop @'"

The commands below will shut down the services managed by the standard Upstart scripts:

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

The next commands will shut down Pacemaker managed services.

Disable API endpoints on 5.1.1 CICs
___________________________________

OpenStack services must not serve user API calls that change data in the
database during the upgrade process. Configure an empty back-end for HAProxy server to
disable APIs running on 5.1.1 CICs. Add the following line to the configuration files
on every 5.1.1 CIC node by running the command that walks all of them:

::

    for node_ip in $(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print($5)}' | tr -d ' ');
        do
            ssh root@${node_ip} "echo 'backend maintenance' >> /etc/haproxy/haproxy.cfg"
        done;

Configure all services in the HAProxy config directory to use the maintenance
backend. Run the following command to apply that configuration to all 5.1.1 CIC nodes:

::

    for node_ip in $(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print($5)}' | tr -d ' ');
        do
        ssh root@${node_ip} "grep -L 'mode *tcp' /etc/haproxy/conf.d/* \
            | xargs -I{} bash -c \"echo '  use_backend maintenance if TRUE' >> {}\""
        done

Send a kill signal to HAProxy services on all CIC nodes to force Pacemaker to
restart a service. Run the following command on the Fuel Master node:

::

    fuel node --env $ORIG_ID | awk -F\| '$7~/controller/{print($1)}' | tr -d ' ' \
        | xargs -I{} ssh root@node-{} pkill haproxy

Database migration
------------------

Before databases could be upgraded, all OpenStack services on 6.0 CICs must be
stopped to avoid data corruption. The proposed solution uses standard Ubuntu startup
scripts from ``/etc/init.d`` on controllers to shut off services.

Databases dumped in text format from MySQL server on 5.1.1 CIC, copied to 6.0 CIC
and uploaded to DB. Standard OpenStack tools allow to upgrade the structure of
databases saving the data itself via sqlalchemy-powered DB migrations.

Database migration commands
+++++++++++++++++++++++++++

Dump database data
__________________

Use the ``mysqldump`` utility (it is installed with MySQL server package) on one of
5.1.1 CIC nodes to create a text file with the contents of tables in the state
database. Run the following command on the Fuel Master node:

::

    export CIC_IP=$(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print($5)}' \
        | tr -d ' ' | head -1)
    ssh root@${CIC_IP} "mysqldump --lock-all-tables --add-drop-database \
        --databases keystone nova heat neutron glance cinder | gzip" \
        > dbs.original.sql.gz

.. _upgrade_db_upload_data:

Upload data to 6.0 DB
_____________________

Use MySQL client to upload the data from the dump to 6.0 CIC database. Galera
synchronous replication will take care of distributing copies of the data
between other instances of the database server. Identify the ID of the primary CIC
using the following commands:

::

    fuel --env $SEED_ID deployment --download --dir /tmp/
    export PRIMARY_CIC=$(ls /tmp/deployment_${SEED_ID}/primary-controller_* \
        | sed -re 's/.*primary-controller_([0-9]+).yaml/\1/' \
        | awk '{print "node-" $1}')

Disable sync replication in Galera on two other controller nodes for the time of
the upgrade:

::

    fuel node --env $SEED_ID | awk -F\| '$7~/controller/{print("node-" $1)}' \
        | grep -v $PRIMARY_CIC | xargs -I{} ssh root@{} \
        'echo "SET GLOBAL wsrep_on='\''off'\''" | mysql'

Execute the following command on the Fuel Master node.

::

    cat dbs.original.sql.gz | ssh root@$PRIMARY_CIC "zcat | mysql"

Finally, restore replication in Galera cluster:

::

    fuel node --env $SEED_ID | awk -F\| '$7~/controller/{print("node-" $1)}' \
        | xargs -I{} ssh root@{} \
        'echo "SET GLOBAL wsrep_on='\''on'\''" | mysql'

Upgrade database structure
__________________________

Use the following standard OpenStack service commands to upgrade databases for
the services. $PRIMARY_CIC will be replaced by the hostname of a primary 6.0
CIC automatically.

::

    ssh root@$PRIMARY_CIC "keystone-manage db_sync;
    nova-manage db sync;
    heat-manage db_sync;
    neutron-db-manage --config-file=/etc/neutron/neutron.conf upgrade head;
    glance-manage db upgrade;
    cinder-manage db sync"

This command will upgrade the databases structure for the following services: Nova,
Keystone, Heat, Glance, Neutron, Cinder.

Upgrade Ceph cluster
--------------------

To replace Ceph Monitors on the same IP addresses, we must preserve cluster
identity and auth parameters. We copy the configuration files, keyrings and state
dirs from 5.1.1 CICs to 6.0 CICs and use Ceph management tools to restore cluster
identity.

Update Ceph configuration commands
++++++++++++++++++++++++++++++++++

Download configuration
______________________

Copy Ceph configuration directory from the old controllers to the new controllers to
preserve all parameters from the configuration file and all keyrings used in Ceph
cluster. Run the following commands on the Fuel Master node. First, create a list of CICs
in the 6.0 environment which will be used later:

::

    NODE_LIST="$(fuel node --env $SEED_ID \
        | awk -F\| '$7~/controller/{print("node-"$1)}' | sort | tr -d ' ')"

Identify a CIC host in 5.1.1 environment to copy Ceph configuration and state
files from. In fact, it can be any CIC, they have interchangeable configuration
files:

::

    SRC_CIC=$(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print("node-"$1)}' | tr -d ' ' | head -1)

Now iterate through the list of 6.0 CICs and copy all the needed files from source 5.1
CIC to every 6.0 CIC:

::

    for node in $NODE_LIST
    do
        ssh root@${node} "rm -rf /etc/ceph;
            mkdir /etc/ceph;
            test -d /var/lib/ceph/mon/ceph-${node} &&
            rm -rf /var/lib/ceph/mon/ceph-${node};  :"
        ssh root@${SRC_CIC} tar cvf - /etc/ceph /var/lib/ceph/mon \
            | ssh root@${node} "tar xvf - -C / &&
                set -e
                mv /var/lib/ceph/mon/ceph-${SRC_CIC} \
                /var/lib/ceph/mon/ceph-${node}"
    done

Update Ceph configuration
_________________________

Ceph configuration specifies the names of hosts where Monitor services run in the
parameter ``'mon_initial_members'`` in the ``/etc/ceph/ceph.conf`` file. Run the
following commands to create a list of hostnames of Ceph Monitors and replace
the original value of ``mon_initial_members`` with this list:

::

    mon_initial_members="$(echo $NODE_LIST)"
    echo "$NODE_LIST" | xargs -I{} ssh root@{} "sed -e \
    's/mon_initial_members = .*/mon_initial_members = $mon_initial_members/' \
    -i /etc/ceph/ceph.conf"

You also need to configure the hostname of Ceph Monitor node in the ``host`` parameter.
Run the following command to make sure that the proper hostname is specified as a
value of that parameter:

::

    for node in ${NODE_LIST}
    do
        ssh root@${node} "sed -e 's/^host =.*/host = '${node}'/g' \
            -i /etc/ceph/ceph.conf"
    done

Update monitor map
__________________

Monitor map defines addresses and hostnames of monitors. As hostnames of CIC
nodes change when 6.0 CICs take over 5.1.1 environment, you need to update monmap
with new hostnames of nodes.

Record the value of the ``fsid`` parameter to use later in this step. The following
command will log into host identified as Primary Controller in previous steps
(see section :ref:`Upload data to 6.0 DB <upgrade_db_upload_data>`) and store a value of the parameter
into FSID variable:

::

    FSID=$(ssh root@${PRIMARY_CIC} "cat /etc/ceph/ceph.conf" \
        | awk '/fsid/{print $3}')

Run the following commands to create temporary monitor map
(`<http://ceph.com/docs/master/man/8/monmaptool/>`_) file on
Primary Controller and download for later use:

::

    ssh root@${PRIMARY_CIC} monmaptool --fsid $FSID --clobber --create \
        --add $(echo $NODE_LIST | cut -d ' ' -f 1) \
        $(echo $NODE_LIST | cut -d ' ' -f 1 \
            | xargs -I{} bash -c "ssh root@{} ip addr show dev br-mgmt \
            | sed -rne 's%.*inet ([^/]+)/.*%\1%p'") \
        --add $(echo $NODE_LIST | cut -d ' ' -f 2) \
        $(echo $NODE_LIST | cut -d ' ' -f 2 \
            | xargs -I{} bash -c "ssh root@{} ip addr show dev br-mgmt \
            | sed -rne 's%.*inet ([^/]+)/.*%\1%p'") \
        --add $(echo $NODE_LIST | cut -d ' ' -f 3) \
        $(echo $NODE_LIST | cut -d ' ' -f 3 \
            | xargs -I{} bash -c "ssh root@{} ip addr show dev br-mgmt \
            | sed -rne 's%.*inet ([^/]+)/.*%\1%p'") /tmp/monmap;
    scp root@${PRIMARY_CIC}:/tmp/monmap /tmp/monmap;

Now run the following command to inject the new monitor map into Ceph Monitor:

::

    for node in $NODE_LIST; do
        scp /tmp/monmap root@${node}:/tmp/monmap
        ssh root@${node} ceph-mon -i ${node} --inject-monmap /tmp/monmap
    done

Restart Ceph Monitor services on all controller nodes:

::

    pssh -i -h /tmp/env-6.0-cic.hosts "/etc/init.d/ceph restart mon"

Add bootstrap auth keys
_______________________

Import OSD bootstrap keys into the new cluster's auth system. Bootstrap keys are
created during the installation of 6.0 CICs and used to add OSD nodes to Ceph
cluster. The command below logs into Primary Controller, imports original keys
into auth configuration and grants privileges to add OSD to certain keys in
boostrap keyring:

::

    ssh root@${PRIMARY_CIC} "ceph auth import \
        -i /root/ceph.bootstrap-osd.keyring;
        ceph auth caps client.bootstrap-osd \
        mon 'allow profile bootstrap-osd'"

Protect CRUSH map
_________________

Ceph stores relationships between hosts and OSDs in CRUSH map and every time it
changes, a new data placement map
(`<http://ceph.com/docs/master/rados/operations/placement-groups/>`_)
is generated resulting in data rebalancing. We want to avoid extra Ceph traffic
during the upgrade (and to speed up the upgrade), so we want to keep CRUSH map unchanged.

Every time OSD service is started it tries to register itself on the current host in
CRUSH map. This leads to changes in CRUSH map when redeployed OSD nodes are
brought online.

To prevent this, set the following option in the ``/etc/ceph/ceph.conf`` file, section
``[global]``. Run this command to add the configuration parameter on all CIC nodes in
6.0 Seed environment:

::

    pssh -i -h /tmp/env-6.0-cic.hosts \
        "sed '/\[global\]/a osd_crush_update_on_start = false' \
        -i /etc/ceph/ceph.conf"

This config is copied to every new node by the ``ceph-deploy`` utility, so this will
prevent them from changing CRUSH map.

Restart services
________________

Start the ``radosgw`` service daemon on all 6.0 CIC nodes:

::

    fuel node --env $SEED_ID | awk -F\| '$7~/controller/{print($1)}' \
        | xargs -I{} bash -c "ssh root@node-{} '/etc/init.d/radosgw start'"

Stop and start Ceph Monitor service on all 6.0 CICs nodes:

::

    fuel node --env $SEED_ID | awk -F\| '$7~/controller/{print($1)}' \
        | xargs -I{} bash -c "ssh root@node-{} 'service ceph restart mon'"

Upgrade CICs
------------

The following section provides a step-by-step procedure for replacing CICs from
5.1.1 environment with controllers from 6.0 environment.

When DB upgrade is finished, we start all OpenStack services on 6.0 CICs using
Pacemaker and Upstart. Then we disconnect 5.1.1 CICs from Management and Public
networks by removing patch ports between logical interfaces to the respective
networks and physical interfaces connected to the network media. For example, if 5.1
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

Here the highlighted port is a patch port that we delete to disconnect the host from
Management network. 

On 6.0 CICs the reverse of this operation must be performed. This will replace
5.1.1 CICs with 6.0 on the same set of IP addresses, including Virtual IP
addresses for API endpoints.

First, to identify the physical interfaces connected to Management and Public
networks you need to refer to the original deployment configuration files. File
``primary-controller_XX.yaml`` contains subsection ``'transformations``' under the
``'network_scheme'`` section.

* For Management network: the ``'action: add-patch'`` item where the ``'bridges'`` list
  includes the ``br-mgmt`` element allows to define a physical interface bridge to
  Management network (for example, ``br-eth1``).
* For Public network, the list must include ``br-ex`` and physical interface
  bridge to Public network (for example, ``br-eth2``).

The commands below create patch ports in logical network switches, for example:

::

    ovs-vsctl add-port br-ex br-ex--br-eth1 \
        -- set interface br-ex--br-eth1 type=patch options:peer=br-eth1--br-ex
    ovs-vsctl add-port br-mgmt br-mgmt--br-eth2 \
        -- set interface br-mgmt--br-eth2 type=patch options:peer=br-eth2--br-mgmt

Note the naming convention: the first part of patch port name matches the name of the
bridge it is added to. The second part of its name matches the name of the physical
interface bridge. Peers for these patch ports should be created in physical
interface bridges. The following commands are the example of how peer ports can be
configured:

::

    ovs-vsctl add-port br-eth1 br-eth1--br-ex \
        -- set interface br-eth1--br-ex type=patch options:peer=br-ex--br-eth1
    ovs-vsctl add-port br-eth2 br-eth2--br-mgmt \
        -- set interface br-eth2--br-mgmt type=patch options:peer=br-mgmt--br-eth2

See the sections below to find the commands that will allow you to perform a
replace-upgrade in your 5.1.1 environment.

Upgrade CICs commands
+++++++++++++++++++++

Disconnect 5.1.1 CICs
_____________________

Disconnect 5.1.1 CICs from Management and Public networks by deleting patch ports
that connect virtual switches to the physical network interfaces. Run the following
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

Start services on 6.0 CICs
__________________________

Revert the shutoff operation on CIC services performed per section `Maintenance
mode commands<upgrade-maintenance-mode>` of these instructions. The services will
begin to work with the upgraded version of the original state databases. Run the
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

Next, start all the services managed by Pacemaker. Run the following command to get
a list of all Pacemaker resources and to start all the 'Stopped' resources:

::

    ssh root@${PRIMARY_CIC} "pcs resource \
        | awk '/Clone Set:/ {print \$4; getline; print \$1}' \
        | sed 'N;s/\n/ /' | tr -d ':[]' \
        | grep Stopped | awk '{print \$1}' \
        | xargs -I{} crm resource start {}"

Update Neutron configuration
____________________________

Due to the updated state database, you need to update the Neutron configuration by
changing ID of the ``'admin'`` tenant in ``/etc/neutron/neutron.conf`` to its actual
value. Run the following command to identify the actual ID of the admin tenant and store
it to the ``ADMIN_TENANT_ID`` variable:

::

    export ADMIN_TENANT_ID=$(ssh root@${PRIMARY_CIC} ". openrc;
        keystone tenant-get services" | awk -F\| '$2 ~ /id/{print $3}' | tr -d \ )

Run the following command to update configuration files on all CIC nodes in 6.0
environment:

::

    for node in $NODE_LIST
    do
        ssh root@$node "sed -re \
            's/^(nova_admin_tenant_id )=.*/\1 = $ADMIN_TENANT_ID/' \
            -i /etc/neutron/neutron.conf;
        stop neutron-server; start neutron-server"
    done

Delete GRE ports from 6.0 CICs
______________________________

Disable the overlay Management/Public connections between 6.0 CICs by deleting GRE
ports from the logical bridges. Run the following command on every CIC node in 6.0
environment:

::

    for node in $NODE_LIST
    do
        ssh root@${node} "ovs-vsctl list-ports br-ex | grep br-ex--gre \
            | xargs -I@ ovs-vsctl del-port br-ex @"
        ssh root@${node} "ovs-vsctl list-ports br-mgmt | grep br-mgmt--gre \
            | xargs -I@ ovs-vsctl del-port br-mgmt @"
    done

Create patch ports on 6.0 CICs
______________________________

Connect 6.0 CICs to Management and Public network of 5.1.1 environment by creating
patch ports between the logical and physical interfaces.

Use the helper script ``octane/bin/create-patch-ports`` to get a list of commands
required to create patch ports on specific nodes. This script reads backup
deployment information for 6.0 Seed environment and determines which bridges
must be connected for the proper networking configuration on 6.0 CICs:

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

Now 6.0 CICs replaced 5.1.1 ones on the same IP addresses. Hypervisor hosts now
can access new CICs, connect to RabbitMQ server and exchange RPC messages with
6.0 control plane services.

Upgrade Compute Service
-----------------------

To ensure minimal impact on the end user resources, we leverage live migration
technique to move all virtual server instances from the node prior to upgrade.

Live migration is only possible between Compute services of similar version in
MOS 6.0. To solve this, we split control plane and data plane upgrades on the
Hypervisor node. First, upgrade OpenStack services running on all hypervisors
(i.e. nova-compute and neutron-l2-agent) using Ubuntu package manager. Update of
the configuration files is also required. This allows to use API of 6.0 CICs to live
migrate all VMs from a hypervisor node to other hosts and prepare it to data
plane upgrade.

We developed a helper script ``octane/bin/upgrade-nova-compute.sh`` that performs
all mentioned actions on a specified node. It must be executed against all the
nodes in original 5.1.1 environment. See the exact command sequence to run this
script.

Update nova-compute service and its dependencies
++++++++++++++++++++++++++++++++++++++++++++++++

The following command lists all compute nodes in the original 5.1.1 enviroment and
run helper script for every node in the list, maximum 10 nodes at a time:

::

    fuel node --env $ORIG_ID | awk -F\| '$7~/compute/{print("node-"$1)}' \
        | tr -d ' ' | xargs -I@ -P10 bash -c "./upgrade-nova-compute.sh @"
