.. _templates-networking-examples:

Network Template Examples
=========================

Using the network templates feature Fuel can be configured to use
only one or two networks for all OpenStack networking.

Using Two Networks
------------------

Fuel can support the case where you have one interface for
PXE traffic and another interface (or bond) for all other traffic.

Preliminary Steps
+++++++++++++++++

Before Fuel can be configured this way a few things must be done.

* Patches must be applied to Nailgun and the Puppet manifests.

  * https://review.openstack.org/#/c/227040/
  * https://review.openstack.org/#/c/224306/
  * https://review.openstack.org/#/c/225941/ (Puppet)

* Create a new network for all non-PXE traffic:

  ::

    # fuel network-group --create --name everything --cidr <cidr>
    --gateway <gateway> --nodegroup <nodegroup>

  Fuel library needs a value named ``internal_address`` for each node.
  This value is set to the node's IP from a network group which has
  ``render_addr_mask`` set to "internal" in its metadata. For this reason
  you must update ``render_addr_mask`` for this network.

  ::

      # fuel network-group --set --network 39 --meta '{"name":
      "everything", "notation": "cidr", "render_type": null, "map_priority": 2,
      "configurable": true, "use_gateway": true, "render_addr_mask":
      "internal", "vlan_start": null, "cidr": "10.108.31.0/24"}'

* Save the following network template as ``network_template_<env id>.yaml``
  and upload it with the following command:

  ::

    # fuel network-template --upload --env <env id>

  Make sure to update the ``nic_mapping`` if your interfaces are different.

  ::

    adv_net_template:
    default:
      network_assignments:
        fuelweb_admin:
          ep: br-fw-admin
        everything:
          ep: br-all
      network_scheme:
        common:
          endpoints:
          - br-all
          - br-fw-admin
          roles:
            admin/pxe: br-fw-admin
            ceilometer/api: br-all
            ceph/public: br-all
            cinder/api: br-all
            fw-admin: br-fw-admin
            glance/api: br-all
            heat/api: br-all
            horizon: br-all
            keystone/api: br-all
            management: br-all
            mgmt/corosync: br-all
            mgmt/database: br-all
            mgmt/memcache: br-all
            mgmt/messaging: br-all
            mgmt/vip: br-all
            mongo/db: br-all
            murano/api: br-all
            neutron/api: br-all
            neutron/mesh: br-all
            nova/api: br-all
            nova/migration: br-all
            sahara/api: br-all
            swift/api: br-all
            neutron/private: br-all
            ceph/radosgw: br-all
            ex: br-all
            neutron/floating: br-floating
            public/vip: br-all
            ceph/replication: br-all
            cinder/iscsi: br-all
            storage: br-all
            swift/replication: br-all
            swift/public: br-all
          transformations:
          - action: add-br
            name: br-fw-admin
          - action: add-port
            bridge: br-fw-admin
            name: <% if1 %>
          - action: add-br
            name: br-all
          - action: add-port
            bridge: br-all
            name: <% if2 %>
          - action: add-br
            name: br-aux
          - action: add-br
            name: br-prv
            provider: ovs
          - action: add-patch
            bridges:
            - br-prv
            - br-all
            mtu: 65000
            provider: ovs
          - action: add-br
            name: br-floating
            provider: ovs
          - action: add-patch
            bridges:
            - br-floating
            - br-all
            mtu: 65000
            provider: ovs
      nic_mapping:
        default:
          if1: eth0
          if2: eth1
      templates_for_node_role:
        cinder:
        - common
        compute:
        - common
        controller:
        - common
        ceph-osd:
        - common
        mongo:
        - common
* Add nodes to the environment and deploy.

Upon completion of the deployment you will see that only one bridge is
configured.

  ::

    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    8: br-fw-admin: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    inet 10.108.5.3/24 brd 10.108.5.255 scope global br-fw-admin
       valid_lft forever preferred_lft forever
    16: vr-host-base: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    inet 240.0.0.5/30 scope global vr-host-base
       valid_lft forever preferred_lft forever
    30: hapr-host: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    inet 240.0.0.1/30 scope global hapr-host
       valid_lft forever preferred_lft forever



Using A single network
----------------------

* Apply all patches from  Preliminary Steps above. In addition you will
  need to apply this patch: https://review.openstack.org/#/c/226844/.
* Fuel does not allow the admin network to be modified via the CLI so
  it has to be done via the database.

  ::

    # dockerctl shell postgres
    # sudo -u postgres psql nailgun
    nailgun=# UPDATE network_groups SET meta='{"unmovable": true, "use_gateway":
        true, "notation": "ip_ranges", "render_addr_mask": "internal",
        "render_type": null, "map_priority": 0, "configurable": false}'
        WHERE id=1;

* Upload the following template.

  ::

   adv_net_template:
    default:
      network_assignments:
        fuelweb_admin:
          ep: br-fw-admin
      network_scheme:
        common:
          endpoints:
          - br-fw-admin
          roles:
            admin/pxe: br-fw-admin
            ceilometer/api: br-fw-admin
            ceph/public: br-fw-admin
            cinder/api: br-fw-admin
            fw-admin: br-fw-admin
            glance/api: br-fw-admin
            heat/api: br-fw-admin
            horizon: br-fw-admin
            keystone/api: br-fw-admin
            management: br-fw-admin
            mgmt/corosync: br-fw-admin
            mgmt/database: br-fw-admin
            mgmt/memcache: br-fw-admin
            mgmt/messaging: br-fw-admin
            mgmt/vip: br-fw-admin
            mongo/db: br-fw-admin
            murano/api: br-fw-admin
            neutron/api: br-fw-admin
            neutron/mesh: br-fw-admin
            nova/api: br-fw-admin
            nova/migration: br-fw-admin
            sahara/api: br-fw-admin
            swift/api: br-fw-admin
            neutron/private: br-fw-admin
            ceph/radosgw: br-fw-admin
            ex: br-fw-admin
            neutron/floating: br-floating
            public/vip: br-fw-admin
            ceph/replication: br-fw-admin
            cinder/iscsi: br-fw-admin
            storage: br-fw-admin
            swift/replication: br-fw-admin
            swift/public: br-fw-admin
          transformations:
          - action: add-br
            name: br-fw-admin
          - action: add-port
            bridge: br-fw-admin
            name: <% if1 %>
          - action: add-br
            name: br-aux
          - action: add-br
            name: br-prv
            provider: ovs
          - action: add-patch
            bridges:
            - br-prv
            - br-fw-admin
            mtu: 65000
            provider: ovs
          - action: add-br
            name: br-floating
            provider: ovs
          - action: add-patch
            bridges:
            - br-floating
            - br-fw-admin
            mtu: 65000
            provider: ovs
      nic_mapping:
        default:
          if1: eth0
      templates_for_node_role:
        cinder:
        - common
        compute:
        - common
        controller:
        - common
        ceph-osd:
        - common
        mongo:
        - common


Neutron Configuration
+++++++++++++++++++++

Due to the way Fuel creates the dedault Neutron networks and router it is
necessary to allocate the correct floating IP pool after deployment.

1. Clear gateway from router04
2. Delete subnet net04_ext__subnet
3. Create new subnet with allocation pool from the single network
4. Set gateway on router04
