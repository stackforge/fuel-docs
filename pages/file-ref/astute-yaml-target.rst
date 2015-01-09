
.. raw:: pdf

   PageBreak


.. _astute-yaml-target-ref:

astute.yaml -- Target nodes
---------------------------

Target Nodes:
**/etc/astute.yaml**

Fuel uses the *astute.yaml* file to pass configuration attributes
to :ref:`Puppet<puppet-term>`.

Usage
~~~~~

The */etc/astute.yaml* file is placed
on each target node when it is deployed
by **mcollective** and must not be deleted.
Facter extension reads data from this file
and uses it to create the `$::fuel_settings` data structure.
This structure contains all variables as a single hash
and supports embedding of other rich structures
such as nodes hash or arrays.


File Format
~~~~~~~~~~~

The *astute.yaml* file <detailed-description>

Basic networking configuration
++++++++++++++++++++++++++++++

::

  libvirt_type: qemu
  disable_offload: true
  network_scheme:
    roles:
      management: br-mgmt
      private: br-prv
      fw-admin: br-fw-admin
      storage: br-storage
    provider: ovs
    version: "1.0"
    interfaces:
      eth4:
        L2:
          vlan_splinters: "off"
      eth3:
        L2:
          vlan_splinters: "off"
      eth2:
        L2:
          vlan_splinters: "off"
      eth1:
        L2:
          vlan_splinters: "off"
      eth0:
        L2:
          vlan_splinters: "off"
    endpoints:
      br-prv:
        IP: none
      br-mgmt:
        other_nets: []

        IP:
        - 10.108.22.6/24
      br-storage:
        other_nets: []
  
        IP:
        - 10.108.24.5/24
      br-fw-admin:
        other_nets:
        - 10.108.20.0/24
        IP:
        - 10.108.20.7/24
        default_gateway: true
        gateway: 10.108.20.2
    transformations:
    - action: add-br
      name: br-eth0
    - bridge: br-eth0
      action: add-port
      name: eth0
    - action: add-br
      name: br-eth1
    - bridge: br-eth1
      action: add-port
      name: eth1
    - action: add-br
      name: br-eth2
    - bridge: br-eth2
      action: add-port
      name: eth2
    - action: add-br
      name: br-eth3
    - bridge: br-eth3
      action: add-port
      name: eth3
    - action: add-br
      name: br-eth4
    - bridge: br-eth4
      action: add-port
      name: eth4
    - action: add-br
      name: br-mgmt
    - action: add-br
      name: br-storage
    - action: add-br
      name: br-fw-admin
    - trunks:
      - 0
      action: add-patch
      bridges:
      - br-eth4
      - br-storage
    - trunks:
      - 0
      action: add-patch
      bridges:
      - br-eth2
      - br-mgmt
    - trunks:
      - 0
      action: add-patch
      bridges:
      - br-eth0
      - br-fw-admin
    - action: add-br
      name: br-prv
    - action: add-patch
      bridges:
      - br-eth3
      - br-prv

Nova configuration
++++++++++++++++++

::

  nova:
    db_password: Ns08DOge
    state_path: /var/lib/nova
    user_password: z8sJBhvw

Swift configuration
+++++++++++++++++++

::

  swift:
  user_password: Li9DPL0d

mp configuration
++++++++++++++++

::

  mp:
  - point: "1"
    weight: "1"
  - point: "2"
    weight: "2"

Glance configuration
++++++++++++++++++++

::

  glance:
    db_password: DgVvco7J
    image_cache_max_size: "5368709120"
    user_password: sRX4ksp6
  role: primary-mongo
  deployment_mode: ha_compact

Mellanox configuration
++++++++++++++++++++++

::

  neutron_mellanox:
    plugin: disabled
    metadata:
      label: Mellanox Neutron components
      enabled: true
      toggleable: false
      weight: 50
    vf_num: "16"
  mongo:
    enabled: false
  auth_key: ""

NTP configuration
+++++++++++++++++

::

  external_ntp:
    ntp_list: 0.pool.ntp.org, 1.pool.ntp.org
    metadata:
      label: Upstream NTP
      weight: 100

Zabbix configuration
++++++++++++++++++++

::

  zabbix:
    db_password: 7hQFiVYa
    db_root_password: xB33AjUw
    password: zabbix
    metadata:
      label: Zabbix Access
      restrictions:
      - condition: not ('experimental' in version:feature_groups)
        action: hide
      weight: 70
    username: admin

Definition of puppet tasks
++++++++++++++++++++++++++

::

  tasks:
  - type: puppet
    priority: 100
    parameters:
      puppet_modules: /etc/puppet/modules
      cwd: /
      timeout: 3600
      puppet_manifest: /etc/puppet/manifests/site.pp
    uids:
    - "12"
  auto_assign_floating_ip: false

.. _astute-ceilometer-config-ref:

Ceilometer configuration
++++++++++++++++++++++++

::

  ceilometer:
    db_password: ReBB1hdT
    metering_secret: jzHL7r76
    enabled: true
    user_password: p0JVzpHv

Public networking configuration
+++++++++++++++++++++++++++++++

::

  public_vip: 10.108.21.2
  public_network_assignment:
    assign_to_all_nodes: false
    metadata:
      label: Public network assignment
      restrictions:
      - condition: cluster:net_provider != 'neutron'
        action: hide
      weight: 50

Heat configuration
++++++++++++++++++

::

  heat:
    db_password: Vv6vslci
    enabled: true
    rabbit_password: TOYQuiwH
    auth_encryption_key: 3775079699142c1bcd7bd8b814648b01
    user_password: s54JsapR

Fuel version
++++++++++++

::

  fuel_version: "6.1"

NSX configuration
+++++++++++++++++

::

  nsx_plugin:
    nsx_password: ""
    nsx_username: admin
    packages_url: ""
    l3_gw_service_uuid: ""
    transport_zone_uuid: ""
    connector_type: stt
    metadata:
      label: VMware NSX
      enabled: false
      restrictions:
      - condition: cluster:net_provider != 'neutron' or networking_parameters:net_l23_provider != 'nsx'
        action: hide
      weight: 20
    replication_mode: true
    nsx_controllers: ""

Controller nodes configuration
++++++++++++++++++++++++++++++

::

  nodes:
  - role: primary-controller
    internal_netmask: 255.255.255.0
    storage_netmask: 255.255.255.0
    internal_address: 10.108.22.3
    uid: "9"
    swift_zone: "9"
    public_netmask: 255.255.255.0
    public_address: 10.108.21.3
    name: node-9
    storage_address: 10.108.24.2
    fqdn: node-9.test.domain.local
  - role: controller
    internal_netmask: 255.255.255.0
    storage_netmask: 255.255.255.0
    internal_address: 10.108.22.4
    uid: "10"
    swift_zone: "10"
    public_netmask: 255.255.255.0
    public_address: 10.108.21.4
    name: node-10
    storage_address: 10.108.24.3
    fqdn: node-10.test.domain.local
  - role: controller
    internal_netmask: 255.255.255.0
    storage_netmask: 255.255.255.0
    internal_address: 10.108.22.5
    uid: "11"
    swift_zone: "11"
    public_netmask: 255.255.255.0
    public_address: 10.108.21.5
    name: node-11
    storage_address: 10.108.24.4
    fqdn: node-11.test.domain.local

.. _astute-mongodb-nodes-ref:


MongoDB nodes configuration
+++++++++++++++++++++++++++

Each OpenStack environment that uses :ref:`Ceilometer<ceilometer-term>`
and :ref:`MongoDB<mongodb-term>`
must have a definition for each MongoDB node
in the *astute.yaml* file;
one node is designated the `primary-mongo` node
and all other nodes have just `mongo` specified for the role.
Ideally, you should have one MongoDB node for each
:ref:`Controller<controller-node-term>` node in the environment.

You can use the Fuel Web UI to deploy
as many MongoDB nodes as you like
when you initially create your environment.
You must edit this file and use command line tools
to add MongoDB nodes to a deployed environment;
see :ref:`add-mongodb-ops` for instructions.

The configuration for the primary MongoDB node is:

::

  - role: primary-mongo
    internal_netmask: 255.255.255.0
    storage_netmask: 255.255.255.0
    internal_address: 10.108.22.6
    uid: "12"
    swift_zone: "12"
    name: node-12
    storage_address: 10.108.24.5
    fqdn: node-12.test.domain.local

The fields are:

:internal_netmask:   Netmask used for the Internal
                     :ref:`logical network<logical-networks-arch>`.

:storage_netmask:    Netmask used for the Storage logical network.

:internal_address:

:uid:

:swift_zone:

:name:

:storage_address:

:fqdn:

The configuration for each non-primary MongoDB node:
has the same fields.
The *astute.yaml* file includes one section like this
for each configured MongoDB node:

::

  - role: mongo
    internal_netmask: 255.255.255.0
    storage_netmask: 255.255.255.0
    internal_address: 10.108.22.7
    uid: "13"
    swift_zone: "13"
    name: node-13
    storage_address: 10.108.24.6
    fqdn: node-13.test.domain.local

Sahara configuration
++++++++++++++++++++

::

  sahara:
    db_password: 0VDkceJQ
    enabled: false
    user_password: 4zs7JZaY
  deployment_id: 9

Provisioning configuration
++++++++++++++++++++++++++

::

  provision:
    method: cobbler
    metadata:
      label: Provision
      restrictions:
      - condition: not ('experimental' in version:feature_groups)
        action: hide
      weight: 80
    image_data:
      /:
        uri: http://10.108.20.2:8080/targetimages/ubuntu_1204_amd64.img.gz
        format: ext4
        container: gzip
      /boot:
        uri: http://10.108.20.2:8080/targetimages/ubuntu_1204_amd64-boot.img.gz
        format: ext2
        container: gzip
  nova_quota: false
  uid: "12"
  repo_metadata:
    2014.2-6.0: http://10.108.20.2:8080/2014.2-6.0/ubuntu/x86_64 precise main

Storage configuration
+++++++++++++++++++++

::

  storage:
    objects_ceph: false
    pg_num: 128
    vc_user: ""
    iser: false
    images_ceph: false
    ephemeral_ceph: false
    vc_datastore: ""
    vc_password: ""
    osd_pool_size: "2"
    volumes_vmdk: false
    metadata:
      label: Storage
      weight: 60
    vc_host: ""
    volumes_lvm: true
    images_vcenter: false
    vc_image_dir: /openstack_glance
    volumes_ceph: false
    vc_datacenter: ""

Keystone configuration
++++++++++++++++++++++

::

  keystone:
    db_password: rwTdR4Vd
    admin_token: YXauBQbY
  priority: 200

Cinder configuration
++++++++++++++++++++

::

  cinder:
    db_password: fv85YGzr
    user_password: cIVtXdbp

Corosync configuration
++++++++++++++++++++++

::

  corosync: 
    group: 226.94.1.1
    verified: false
    metadata:
      label: Corosync
      restrictions:
      - condition: "true"
        action: hide
      weight: 50
    port: "12000"

Miscellaneous configs to look at later
++++++++++++++++++++++++++++++++++++++

::

  management_vip: 10.108.22.2
  test_vm_image:
    img_path: /usr/share/cirros-testvm/cirros-x86_64-disk.img
    img_name: TestVM
    min_ram: 64
    public: "true"
    glance_properties: "--property murano_image_info='{\"title\": \"Murano Demo\", \"type\": \"cirros.demo\"}'"
    os_name: cirros
    disk_format: qcow2
    container_format: bare
  quantum: true
  cobbler:
    profile: ubuntu_1204_x86_64
  status: discover
  management_network_range: 10.108.22.0/24
  fail_if_error: true
  puppet_modules_source: rsync://10.108.20.2:/puppet/2014.2-6.0/modules/
  master_ip: 10.108.20.2
  puppet_manifests_source: rsync://10.108.20.2:/puppet/2014.2-6.0/manifests/
  resume_guests_state_on_host_boot: true

Syslog configuration
++++++++++++++++++++

::

  syslog:
    syslog_transport: tcp
    syslog_port: "514"
    metadata: 
      label: Syslog
      weight: 50
    syslog_server: ""
  debug: false
  online: true
  metadata:
    label: Common
    weight: 30
  access:
    email: admin@localhost
    user: admin
    password: admin
    metadata:
      label: Access
      weight: 10
    tenant: admin
  openstack_version_prev:
  use_cow_images: true
  last_controller: node-11
  kernel_params:
    kernel: console=ttyS0,9600 console=tty0 rootdelay=90 nomodeset
    metadata:
      label: Kernel parameters
      weight: 40
  mysql:
    wsrep_password: 6JoYdvoz
    root_password: ZtwW8gk8
  external_dns:
    dns_list: 8.8.8.8, 8.8.4.4
    metadata:
      label: Upstream DNS
      weight: 90
  rabbit:
    password: GGcZVT4f
  compute_scheduler_driver: nova.scheduler.filter_scheduler.FilterScheduler
  openstack_version: 2014.2-6.0

External MongoDB configuration
++++++++++++++++++++++++++++++

::

  external_mongo:
    mongo_replset: ""
    mongo_password: ceilometer
    mongo_user: ceilometer
    metadata:
      label: External MongoDB
      restrictions:
      - condition: settings:additional_components.mongo.value == false
        action: hide
      weight: 20
    hosts_ip: ""
    mongo_db_name: ceilometer

Murano configuration
++++++++++++++++++++

::

  murano:
    db_password: 0PVsOHo9
    enabled: false
    rabbit_password: FGjWVooK
    user_password: crpWYkaY

More miscellaneous configs
++++++++++++++++++++++++++

::

  quantum_settings:
    database:
      passwd: yOL94I9n
    L3:
      use_namespaces: true
    L2:
      phys_nets:
        physnet2:
          vlan_range: 1000:1030
          bridge: br-prv
      base_mac: fa:16:3e:00:00:00
      segmentation_type: vlan
    predefined_networks:
      net04_ext:
        L2:
          segment_id:
          network_type: local
          router_ext: true
          physnet:
        L3:
          floating: 10.108.21.11:10.108.21.20
          subnet: 10.108.21.0/24
          enable_dhcp: false
          gateway: 10.108.21.1
          nameservers: []
  
        tenant: admin
        shared: false
      net04:
        L2:
          segment_id: 
          network_type: vlan
          router_ext: false
          physnet: physnet2
        L3:
          floating:
          subnet: 192.168.111.0/24
          enable_dhcp: true
          gateway: 192.168.111.1
          nameservers:
          - 8.8.4.4
          - 8.8.8.8
        tenant: admin
        shared: false
    keystone:
      admin_password: gqWPu2Vg
    metadata:
      metadata_proxy_shared_secret: qoEcTup3
  fqdn: node-12.test.domain.local
  storage_network_range: 10.108.24.0/24

vCenter configuration
+++++++++++++++++++++

::

  vcenter:
    datastore_regex: ""
    host_ip: ""
    vc_user: ""
    vlan_interface: ""
    vc_password: ""
    cluster: ""
    metadata:
      label: vCenter
      restrictions:
      - condition: settings:common.libvirt_type.value != 'vcenter'
        action: hide
      weight: 20
    use_vcenter: true

Syslog configuration
++++++++++++++++++++

::

  base_syslog:
    syslog_port: "514"
    syslog_server: 10.108.20.2
