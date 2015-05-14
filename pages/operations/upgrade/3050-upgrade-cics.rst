.. index:: Upgrade Controllers

.. _Upg_CICs:

Maintenance mode
----------------

To prevent the loss of data in OpenStack state database, API interaction with
environment must be disabled. This mode of operations is called Maintenance Mode
in the proposed solution. In maintenance mode, all services that write to DB are
disabled. All communications to control plane of the cluster are also disabled.
VMs and other virtual resources must be able to continue to operate as usual.

Some of OpenStack platform services are controlled by Pacemaker/Corosync
resource, for example, Neutron L3 agent. Other services, including OpenStack API
server daemons, run as standard Upstart-controlled daemons behind the haproxy
load balancer. All services are shut down in the Maintenance Mode. For
Pacemaker, use ``pcs`` and ``crm`` utils to control state of resources. For Upstart,
run standard system start/stop scripts. Following sections describe how to
disable and shutdown services on CICs in both 5.1 and 6.0 environments.

Create 6.0 CIC hosts file
+++++++++++++++++++++++++

Create file ``/tmp/env-6.0-cic.hosts`` with a list of IP addresses of all CIC
nodes in 6.0 environment.

::

    fuel node --env $SEED_ID | awk -F\| '$7 ~ /controller/ {print $5}' \
        | tr -d ' ' > /tmp/env-6.0-cic.hosts

Shutoff services on 6.0 CICs
++++++++++++++++++++++++++++

Shutdown services on 6.0 CICs to prevent the database corruption during the
upgrade. You need to run the following command to walk through all CIC nodes in
the Seed environment and stop Pacemaker managed services:

::

    fuel node --env $SEED_ID | grep controller | cut -d \| -f 1 \
        | tr -d ' ' | head -1 | xargs -I{} ssh root@node-{} "crm status \
        | awk '/clone/ {print \$4}' | tr -d [] | grep -vE '(mysql|haproxy)' \
        | xargs -tI@ sh -c 'crm resource stop @'"

The next commands will shutdown services managed by standard Upstart scripts:

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

The next commands will shutdown Pacemaker managed services.

Disable API endpoints on 5.1 CICs
+++++++++++++++++++++++++++++++++

OpenStack services must not serve user API calls that change data in the
database during upgrade process. Configure empty back-end for haproxy server to
disable APIs running on 5.1 CICs. Add the following line to configuration files
on every 5.1 CIC node by running command that walks all of them:

::

    for node_ip in $(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print($5)}' | tr -d ' '); 
        do
            ssh root@${node_ip} "echo 'backend maintenance' >> /etc/haproxy/haproxy.cfg"
        done;

Configure all services in haproxy config directory to use the maintenance
backend. Run following command to apply that configuration to all 5.1 CIC nodes:

::

    for node_ip in $(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print($5)}' | tr -d ' ');
        do
        ssh root@${node_ip} "grep -L 'mode *tcp' /etc/haproxy/conf.d/* \
            | xargs -I{} bash -c \"echo '  use_backend maintenance if TRUE' >> {}\""
        done

Send kill signal to haproxy services on all CIC nodes to force Pacemaker to
restart a service. Run following command on Fuel Master node:

::

    fuel node --env $ORIG_ID | awk -F\| '$7~/controller/{print($1)}' | tr -d ' ' \
        | xargs -I{} ssh root@node-{} pkill haproxy

Database migration
------------------

Before databases could be upgraded, all OpenStack services on 6.0 CICs must be
stopped to avoid data corruption. Proposed solution uses standard Ubuntu startup
scripts from ``/etc/init.d`` on controllers to shutoff services.

Databases dumped in text format from MySQL server on 5.1 CIC, copied to 6.0 CIC
and uploaded to DB. Standard OpenStack tools allow to upgrade the structure of
databases saving the data itself via sqlalchemy-powered DB migrations.

Dump database data
++++++++++++++++++

Use ``mysqldump`` utility (it is installed with MySQL server package) on one of
5.1 CIC nodes to create a text file with the contents of tables in state
database. Run following command on the Fuel Master node.

::

    export CIC_IP=$(fuel node --env $ORIG_ID | awk -F\| '$7~/controller/{print($5)}' \
        | tr -d ' ' | head -1)
    ssh root@${CIC_IP} "mysqldump --lock-all-tables --add-drop-database --databases
        keystone nova heat neutron glance cinder | gzip" > dbs.original.sql.gz

Upload data to 6.0 DB
+++++++++++++++++++++

Use MySQL client to upload data from dump to 6.0 CIC database. Galera
synchronous replication will take care of distributing copies of the data
between other instances of database server. Identify the ID of primary CIC using
the following commands.

::

    fuel --env $SEED_ID deployment --download --dir /tmp/
    export PRIMARY_CIC=$(ls /tmp/deployment_${SEED_ID}/primary-controller_* \
        | sed -re 's/.*primary-controller_([0-9]+).yaml/\1/' | awk '{print "node-" $1}')

Execute following command on the Fuel Master node.

::

    cat dbs.original.sql.gz | ssh root@$PRIMARY_CIC "zcat | mysql"

Upgrade database structure
++++++++++++++++++++++++++

Use standard OpenStack service commands to upgrade databases for services. Run
following command. $PRIMARY_CIC will be replaced by hostname of a primary 6.0
CIC automatically.

::

    ssh root@$PRIMARY_CIC "keystone-manage db_sync;
    nova-manage db sync;
    heat-manage db_sync;
    neutron-db-manage --config-file=/etc/neutron/neutron.conf upgrade head;
    glance-manage db upgrade;
    cinder-manage db sync"

This command will upgrade databases structure for following services: Nova,
Keystone, Heat, Glance, Neutron, Cinder.

Upgrade Ceph cluster
--------------------

To replace Ceph Monitors on the same IP addresses, we must preserve cluster
identity and auth parameters. We copy configuration files, keyrings and state
dirs from 5.1 CICs to 6.0 CICs and uses Ceph management tools to restore cluster
identity.

Download configuration
++++++++++++++++++++++

Copy Ceph configuration directory from old controllers to new controllers to
preserve all parameters from configuration file and all keyrings used in Ceph
cluster. Run the following commands on Fuel master. First, create list of CICs
in 6.0 environment which will be used later.

::

    NODE_LIST="$(fuel node --env $SEED_ID \
        | awk -F\| '$7~/controller/{print("node-"$1)}' | sort | tr -d ' ')"

Identify a CIC host in 5.1 environment to copy Ceph configuration and state
files from. In fact, it can be any CIC, they have interchangeable configuration
files.

::

    SRC_CIC=$(fuel node --env $ORIG_ID \
        | awk -F\| '$7~/controller/{print("node-"$1)}' | tr -d ' ' | head -1)

Now iterate through list of 6.0 CICs and copy all needed files from source 5.1
CIC to every 6.0 CIC.

::

    for node in $NODE_LIST
    do
        ssh root@${node} "rm -rf /etc/ceph; mkdir /etc/ceph; test -d
            /var/lib/ceph/mon/ceph-${node} && rm -rf /var/lib/ceph/mon/ceph-${node};  :"
        ssh root@${SRC_CIC} tar cvf - /etc/ceph /var/lib/ceph/mon \
            | ssh root@${node} "tar xvf - -C / && 
                set -e
                mv /var/lib/ceph/mon/ceph-${SRC_CIC} /var/lib/ceph/mon/ceph-${node}"
    done

Update Ceph configuration
+++++++++++++++++++++++++

Ceph configuration specifies names of hosts where Monitor services run in
parameter ``'mon_initial_members'`` in ``/etc/ceph/ceph.conf` file. Run following
commands to create a list of hostnames of Ceph Monitors and replace original
value of ``mon_initial_members`` with this list.

::

    mon_initial_members="$(echo $NODE_LIST)"
    echo "$NODE_LIST" | xargs -I{} ssh root@{} "sed -e \
        's/mon_initial_members = .*/mon_initial_members = $mon_initial_members/' -i /etc/ceph/ceph.conf"

You also need to configure hostname of Ceph Monitor node in 'host' parameter.
Run the following command to make sure that proper hostname is specified as
value of that parameter.

::

    for node in ${NODE_LIST}
    do
        ssh root@${node} "sed -e 's/^host =.*/host = '${node}'/g' -i /etc/ceph/ceph.conf"
    done

Update monitor map
++++++++++++++++++

Monitor map defines addresses and hostnames of monitors. As hostnames of CIC
nodes change when 6.0 CICs take over 5.1 environment, you need to update monmap
with new hostnames of nodes.

Record the value of 'fsid' parameter to use later in this step. The following
command will log into host identified as Primary Controller in previous steps
(see section 4.2.2) and store a value of the parameter into FSID variable.

::

    FSID=$(ssh root@${PRIMARY_CIC} "cat /etc/ceph/ceph.conf" | awk '/fsid/{print $3}')

Run the following commands to create temporary monmap file on Primary Controller
and download for later use.

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

Now run the following command to inject new monitor map into Ceph Monitor.

::

    for node in $NODE_LIST; do
        scp /tmp/monmap root@${node}:/tmp/monmap
        ssh root@${node} ceph-mon -i ${node} --inject-monmap /tmp/monmap
    done

Finally, restart Monitor servers on every CIC node:

::

    pssh -i -h /tmp/env-6.0-cic.hosts "/etc/init.d/ceph restart mon"

Add bootstrap auth keys
+++++++++++++++++++++++

Import OSD bootstrap keys into new cluster's auth system. Bootstrap keys are
created during installation of 6.0 CICs and used to add OSD nodes to Ceph
cluster. Following command logs into Primary Controller, imports original keys
into auth configuration and grants privileges to add OSD to certain keys in
boostrap keyring.

::

    ssh root@${PRIMARY_CIC} "ceph auth import -i /root/ceph.bootstrap-osd.keyring;
    ceph auth caps client.bootstrap-osd mon 'allow profile bootstrap-osd'"

Protect CRUSH map
+++++++++++++++++

Ceph stores relationships between hosts and OSDs in CRUSH map and every time it
changes, new pgmap is generated resulting in data rebalancing. We want to avoid
extra Ceph traffic during upgrade (and speed up upgrade), so we want to keep
CRUSH map unchanged.

Every time OSD service is started it tries to register itself on current host in
CRUSH map. This leads to changes in CRUSH map when redeployed OSD nodes are
brought online.

To prevent this, set following option in ``/etc/ceph/ceph.conf`` file, section
``[global]``. Run this command to add configuration parameter on all CIC nodes in
6.0 Seed environment.

::

    pssh -i -h /tmp/env-6.0-cic.hosts "sed '/\[global\]/a osd_crush_update_on_start = false' -i /etc/ceph/ceph.conf"

This config is copied to every new node by ``ceph-deploy`` utility, so this will
prevent them from changing CRUSH map.

Restart services
++++++++++++++++

Start ``radosgw`` service daemon on all 6.0 CIC nodes:

::

    fuel node --env $SEED_ID | awk -F\| '$7~/controller/{print($1)}' \
        | xargs -I{} bash -c "ssh root@node-{} '/etc/init.d/radosgw start'"

Stop and start Ceph Monitor service on all 6.0 CICs nodes:

::

    fuel node --env $SEED_ID | awk -F\| '$7~/controller/{print($1)}' \
        | xargs -I{} bash -c "ssh root@node-{} 'service ceph stop mon; 
            service ceph start mon'"

Upgrade CICs
------------

The following section explain detailed procedure for replace-upgrade CICs from
5.1 to 6.0.

When DB upgrade is finished, we start all OpenStack services on 6.0 CICs using
Pacemaker and Upstart. Then we disconnect 5.1 CICs from Management and Public
networks by removing patch ports between logical interfaces to respective
networks and physical interfaces connected to network media. For example, if 5.1
CIC connected to Management network via 'eth1' interface, configuration of the
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

Here highlighted port is a patch port that we delete to disconnect the host from
Management network. Next, we create GRE tunnel instead to connect to other 5.1
CIC hosts, for example:

::

    ovs-vsctl show
    ...
    Bridge br-mgmt
        Port "br-mgmt--br-eth1"
            Interface "br-mgmt--node-13"
                type: gre
                options: {remote="10.0.0.13", key="0"}
        Port br-mgmt
            Interface br-mgmt
                type: internal
    ...

Here highlighted port is GRE tunnel port connected to node 'node-13' with IP
address '10.0.0.13' in Admin network. Key value must be unique for every tunnel
and must be the same on both ends of the tunnel.

On 6.0 CICs the reverse of this operation must be performed. This will replace
5.1 CICs with 6.0 on the same set of IP addresses, including Virtual IP
addresses for API endpoints.

First, to identify physical interfaces connected to Management and Public
networks you need to refer to original deployment configuration files. File
``primary-controller_XX.yaml`` contains subsection ``'transformations``' under
``'network_scheme'`` section. For Management network, ``'action: add-patch'`` item where
``'bridges'`` list includes ``br-mgmt`` element allows to define a physical interface
bridge to Management network (for example, ``br-eth1``). For public network, the
list must include ``br-ex`` and physical interface bridge to Public network (for
example, ``br-eth2``).

Following commands allow to create patch ports in logical network switches, for
example:

::

    ovs-vsctl add-port br-ex br-ex--br-eth1 \
        -- set interface br-ex--br-eth1 type=patch options:peer=br-eth1--br-ex
    ovs-vsctl add-port br-mgmt br-mgmt--br-eth2 \
        -- set interface br-mgmt--br-eth2 type=patch options:peer=br-eth2--br-mgmt

Note the naming convention: first part of patch port name matches the name of
bridge it is added to. Second part of it's name matches the name of physical
interface bridge. Peers for these patch ports should be created in physical
interface bridges. Following commands are the example of how peer ports can be
configured.

::

    ovs-vsctl add-port br-eth1 br-eth1--br-ex \
        -- set interface br-eth1--br-ex type=patch options:peer=br-ex--br-eth1
    ovs-vsctl add-port br-eth2 br-eth2--br-mgmt \
        -- set interface br-eth2--br-mgmt type=patch options:peer=br-mgmt--br-eth2
    
See sections below to find commands that will allow you to perform
replace-upgrade in your 5.1 environment.

Disconnect 5.1 CICs
+++++++++++++++++++

Disconnect 5.1 CICs from Management and Public networks by deleting patch ports
that connect virtual switches to physical network interfaces. Run the following
command on Fuel installer node. It will list patch ports in the given virtual
switches and delete them.

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
++++++++++++++++++++++++++

Revert shut-off operation on CIC services performed per section `Maintenance
Mode`_ of this runbook. Services will begin to work with upgraded version of
original state databases. Run the following command sequence on Fuel Master:

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

    ssh root@${PRIMARY_CIC} "pcs resource \
        | awk '/Clone Set:/ {print \$4; getline; print \$1}' \
        | sed 'N;s/\n/ /' | tr -d ':[]' \
        | grep Stopped | awk '{print \$1}' \
        | xargs -I{} crm resource start {}"

Update Neutron configuration
++++++++++++++++++++++++++++

Due to updated state database, you need to update Neutron configuration by
changing ID of ``'admin'`` tenant in ``/etc/neutron/neutron.conf`` to it's actual
value. Run following command to identify actual ID of admin tenant and store it
to ADMIN_TENANT_ID variable.

::

    export ADMIN_TENANT_ID=$(ssh root@${PRIMARY_CIC} ". openrc; 
        keystone tenant-get services" | awk -F\| '$2 ~ /id/{print $3}' | tr -d \ )

Run next command to update configuration files on all CIC nodes in 6.0
environment.

::

    for node in $NODE_LIST
    do
        ssh root@$node "sed -re 's/^(nova_admin_tenant_id )=.*/\1 = $ADMIN_TENANT_ID/' \
            -i /etc/neutron/neutron.conf;
        stop neutron-server; start neutron-server"
    done

Delete GRE ports from 6.0 CICs
++++++++++++++++++++++++++++++

Disable overlay Management/Public connections between 6.0 CICs by deleting GRE
ports from logical bridges. Run the following command on every CIC node in 6.0
environment. 

::

    for node in $NODE_LIST
    do
        ssh root@${node} "ovs-vsctl list-ports br-ex | grep br-ex--gre \
            | xargs -I@ ovs-vsctl del-port br-ex @"
        ssh root@${node} "ovs-vsctl list-ports br-mgmt | grep br-mgmt--gre \
            | xargs -I@ ovs-vsctl del-port br-mgmt @"
    done

Create patch ports on 6.0 CICs
++++++++++++++++++++++++++++++

Connect 6.0 CICs to Management and Public network of 5.1 environment by creating
patch ports between logical and physical interfaces.

Use helper script ``octane/bin/create-patch-ports`` to get a list of commands
required to create patch ports on specific nodes. This script reads backup
deployment information for 6.0 Seed environment and determines which bridges
must be connected for proper networking configuration on 6.0 CICs.

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

Now 6.0 CICs replaced 5.1 ones on the same IP addresses. Hypervisor hosts now
can access new CICs, connect to RabbitMQ server and exchange RPC messages with
6.0 control plane services.

Upgrade Compute Service
-----------------------

To ensure minimal impact on end user resources, we leverage live migration
technique to move all virtual server instances from the node prior to upgrade. 

Live migration is only possible between Compute services of similar version in
MOS 6.0. To solve this, we split control plane and data plane upgrades on the
Hypervisor node. First, upgrade OpenStack services running on all hypervisors
(i.e. nova-compute and neutron-l2-agent) using Ubuntu package manager. Update of
configuration files is also required. This allows to use API of 6.0 CICs to live
migrate all VMs from a hypervisor node to other hosts and prepare it to data
plane upgrade.

We developed a helper script ``octane/bin/upgrade-nova-compute.sh`` that performs
all mentioned actions on a specified node. It must be executed against all of
the nodes in original 5.1 environment. See the exact command sequence to run
this script.

Update nova-compute service and it's dependencies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following command lists all compute nodes in the original 5.1 enviroment and
run helper script for every node in the list, maximum 10 nodes at a time.

::

    fuel node --env $ORIG_ID | awk -F\| '$7~/compute/{print("node-"$1)}' \
        | tr -d ' ' | xargs -I@ -P10 bash -c "./upgrade-nova-compute.sh @"
