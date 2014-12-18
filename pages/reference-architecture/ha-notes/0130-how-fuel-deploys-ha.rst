.. index:: How Fuel Deploys HA

How Fuel Deploys HA
-------------------

Fuel installs Corosync service, configures ``corosync.conf``,
and includes the Pacemaker service plugin into ``/etc/corosync/service.d``.
Then Corosync service starts and spawns corresponding Pacemaker processes.
Fuel configures the cluster properties of Pacemaker
and then injects resource configurations for virtual IPs, HAProxy,
MySQL and Neutron agent resources::

  primitive p_haproxy ocf:mirantis:ns_haproxy \
          params ns="haproxy" \
          meta migration-threshold="3" failure-timeout="120" \
          op stop timeout="30" interval="0" \
          op start timeout="30" interval="0" \
          op monitor timeout="10" interval="20"
  primitive p_heat-engine ocf:mirantis:heat-engine \
          meta resource-stickiness="1" \
          op stop timeout="60" interval="0" \
          op start timeout="60" interval="0" \
          op monitor timeout="30" interval="20"
  primitive p_mysql ocf:mirantis:mysql-wss \
          params test_passwd="ciz5Lfyd" test_user="wsrep_sst" socket="/var/run/mysqld/mysqld.sock" \
          op stop timeout="175" interval="0" \
          op start timeout="475" interval="0" \
          op monitor timeout="115" interval="120"
  primitive p_neutron-dhcp-agent ocf:mirantis:neutron-agent-dhcp \
          params amqp_server_port="5673" username="undef" tenant="services" os_auth_url="http://10.110.2.2:35357/v2.0" password="EeH6BucR" multiple_agents="false" \
          meta resource-stickiness="1" \
          op stop timeout="60" interval="0" \
          op start timeout="60" interval="0" \
          op monitor timeout="10" interval="20"
  primitive p_neutron-l3-agent ocf:mirantis:neutron-agent-l3 \
          params username="undef" debug="false" tenant="services" syslog="true" os_auth_url="http://10.110.2.2:35357/v2.0" password="EeH6BucR" multiple_agents="true" plugin_config="/etc/neutron/l3_agent.ini" \
          op stop timeout="60" interval="0" \
          op start timeout="60" interval="0" \
          op monitor timeout="10" interval="20"
  primitive p_neutron-metadata-agent ocf:mirantis:neutron-agent-metadata \
          op stop timeout="30" interval="0" \
          op start timeout="30" interval="0" \
          op monitor timeout="10" interval="60"
  primitive p_neutron-plugin-openvswitch-agent ocf:mirantis:neutron-agent-ovs \
          params plugin_config="/etc/neutron/plugin.ini" \
          op stop timeout="80" interval="0" \
          op start timeout="80" interval="0" \
          op monitor timeout="10" interval="20"
  primitive p_rabbitmq-server ocf:mirantis:rabbitmq-server \
          params node_port="5673" \
          meta migration-threshold="INFINITY" failure-timeout="60s" \
          op stop timeout="60" interval="0" \
          op promote timeout="120" interval="0" \
          op start timeout="120" interval="0" \
          op notify timeout="60" interval="0" \
          op demote timeout="60" interval="0" \
          op monitor timeout="60" interval="27" role="Master" \
          op monitor timeout="60" interval="30"
  primitive ping_vip__public ocf:pacemaker:ping \
          params host_list="10.110.1.1" timeout="3s" multiplier="1000" dampen="30s" \
          op monitor timeout="30" interval="20"
  primitive vip__management ocf:mirantis:ns_IPaddr2 \
          params iptables_stop_rules="iptables -t mangle -D PREROUTING -i br-mgmt-hapr -j MARK --set-mark 0x2b ; iptables -t nat -D POSTROUTING -m mark --mark 0x2b ! -o br-mgmt -j MASQUERADE" other_networks="false" iflabel="ka" cidr_netmask="24" ns_veth="hapr-m" ip="10.110.2.2" gateway="link" base_veth="br-mgmt-hapr" iptables_comment="masquerade-for-management-net" ns="haproxy" nic="br-mgmt" gateway_metric="20" iptables_start_rules="iptables -t mangle -I PREROUTING -i br-mgmt-hapr -j MARK --set-mark 0x2b ; iptables -t nat -I POSTROUTING -m mark --mark 0x2b ! -o br-mgmt -j MASQUERADE" \
          meta migration-threshold="3" failure-timeout="60" resource-stickiness="1" \
          op stop timeout="30" interval="0" \
          op start timeout="30" interval="0" \
          op monitor timeout="30" interval="3"
  primitive vip__public ocf:mirantis:ns_IPaddr2 \
          params iptables_stop_rules="iptables -t mangle -D PREROUTING -i br-ex-hapr -j MARK --set-mark 0x2a ; iptables -t nat -D POSTROUTING -m mark --mark 0x2a ! -o br-ex -j MASQUERADE" other_networks="false" iflabel="ka" cidr_netmask="24" ns_veth="hapr-p" ip="10.110.1.2" gateway="link" base_veth="br-ex-hapr" iptables_comment="masquerade-for-public-net" ns="haproxy" nic="br-ex" gateway_metric="10" iptables_start_rules="iptables -t mangle -I PREROUTING -i br-ex-hapr -j MARK --set-mark 0x2a ; iptables -t nat -I POSTROUTING -m mark --mark 0x2a ! -o br-ex -j MASQUERADE" \
          meta migration-threshold="3" failure-timeout="60" resource-stickiness="1" \
          op stop timeout="30" interval="0" \
          op start timeout="30" interval="0" \
          op monitor timeout="30" interval="3"
  ms master_p_rabbitmq-server p_rabbitmq-server \
          meta master-max="1" ordered="false" target-role="Master" interleave="true" notify="true" master-node-max="1"
  clone clone_p_haproxy p_haproxy \
          meta interleave="true"
  clone clone_p_heat-engine p_heat-engine \
          meta interleave="true"
  clone clone_p_mysql p_mysql
  clone clone_p_neutron-l3-agent p_neutron-l3-agent \
          meta interleave="true"
  clone clone_p_neutron-metadata-agent p_neutron-metadata-agent \
          meta interleave="true"
  clone clone_p_neutron-plugin-openvswitch-agent p_neutron-plugin-openvswitch-agent \
          meta interleave="true"
  clone clone_ping_vip__public ping_vip__public
  location loc_ping_vip__public vip__public \
          rule $id="loc_ping_vip__public-rule" -inf: not_defined pingd or pingd lte 0
  location p_haproxy-on-node-1.test.domain.local p_haproxy 100: node-1.test.domain.local
  location p_haproxy-on-node-2.test.domain.local p_haproxy 100: node-2.test.domain.local
  location p_haproxy-on-node-3.test.domain.local p_haproxy 100: node-3.test.domain.local
  location p_heat-engine-on-node-1.test.domain.local p_heat-engine 100: node-1.test.domain.local
  location p_heat-engine-on-node-2.test.domain.local p_heat-engine 100: node-2.test.domain.local
  location p_heat-engine-on-node-3.test.domain.local p_heat-engine 100: node-3.test.domain.local
  location p_mysql-on-node-1.test.domain.local p_mysql 100: node-1.test.domain.local
  location p_mysql-on-node-2.test.domain.local p_mysql 100: node-2.test.domain.local
  location p_mysql-on-node-3.test.domain.local p_mysql 100: node-3.test.domain.local
  location p_neutron-dhcp-agent-on-node-1.test.domain.local p_neutron-dhcp-agent 100: node-1.test.domain.local
  location p_neutron-dhcp-agent-on-node-2.test.domain.local p_neutron-dhcp-agent 100: node-2.test.domain.local
  location p_neutron-dhcp-agent-on-node-3.test.domain.local p_neutron-dhcp-agent 100: node-3.test.domain.local
  location p_neutron-l3-agent-on-node-1.test.domain.local p_neutron-l3-agent 100: node-1.test.domain.local
  location p_neutron-l3-agent-on-node-2.test.domain.local p_neutron-l3-agent 100: node-2.test.domain.local
  location p_neutron-l3-agent-on-node-3.test.domain.local p_neutron-l3-agent 100: node-3.test.domain.local
  location p_neutron-metadata-agent-on-node-1.test.domain.local p_neutron-metadata-agent 100: node-1.test.domain.local
  location p_neutron-metadata-agent-on-node-2.test.domain.local p_neutron-metadata-agent 100: node-2.test.domain.local
  location p_neutron-metadata-agent-on-node-3.test.domain.local p_neutron-metadata-agent 100: node-3.test.domain.local
  location p_neutron-plugin-openvswitch-agent-on-node-1.test.domain.local p_neutron-plugin-openvswitch-agent 100: node-1.test.domain.local
  location p_neutron-plugin-openvswitch-agent-on-node-2.test.domain.local p_neutron-plugin-openvswitch-agent 100: node-2.test.domain.local
  location p_neutron-plugin-openvswitch-agent-on-node-3.test.domain.local p_neutron-plugin-openvswitch-agent 100: node-3.test.domain.local
  location p_rabbitmq-server-on-node-1.test.domain.local p_rabbitmq-server 100: node-1.test.domain.local
  location p_rabbitmq-server-on-node-2.test.domain.local p_rabbitmq-server 100: node-2.test.domain.local
  location p_rabbitmq-server-on-node-3.test.domain.local p_rabbitmq-server 100: node-3.test.domain.local
  location ping_vip__public-on-node-1.test.domain.local ping_vip__public 100: node-1.test.domain.local
  location ping_vip__public-on-node-2.test.domain.local ping_vip__public 100: node-2.test.domain.local
  location ping_vip__public-on-node-3.test.domain.local ping_vip__public 100: node-3.test.domain.local
  location vip__management-on-node-1.test.domain.local vip__management 100: node-1.test.domain.local
  location vip__management-on-node-2.test.domain.local vip__management 100: node-2.test.domain.local
  location vip__management-on-node-3.test.domain.local vip__management 100: node-3.test.domain.local
  location vip__public-on-node-1.test.domain.local vip__public 100: node-1.test.domain.local
  location vip__public-on-node-2.test.domain.local vip__public 100: node-2.test.domain.local
  location vip__public-on-node-3.test.domain.local vip__public 100: node-3.test.domain.local
  
And ties them with Pacemaker colocation resource::
  
  colocation clone_p_neutron-l3-agent-with-clone_p_neutron-plugin-openvswitch-agent inf: clone_p_neutron-l3-agent clone_p_neutron-plugin-openvswitch-agent
  colocation p_neutron-dhcp-agent-with-clone_p_neutron-plugin-openvswitch-agent inf: p_neutron-dhcp-agent clone_p_neutron-plugin-openvswitch-agent
  colocation vip_management-with-haproxy inf: vip__management clone_p_haproxy
  colocation vip_public-with-haproxy inf: vip__public clone_p_haproxy
  order clone_p_neutron-l3-agent-after-clone_p_neutron-plugin-openvswitch-agent inf: clone_p_neutron-plugin-openvswitch-agent clone_p_neutron-l3-agent
  order p_neutron-dhcp-agent-after-clone_p_neutron-plugin-openvswitch-agent inf: clone_p_neutron-plugin-openvswitch-agent p_neutron-dhcp-agent
  property $id="cib-bootstrap-options" \
          dc-version="1.1.10-42f2063" \
          cluster-infrastructure="classic openais (with plugin)" \
          expected-quorum-votes="3" \
          no-quorum-policy="stop" \
          stonith-enabled="false" \
          start-failure-is-fatal="false" \
          symmetric-cluster="false" \
          last-lrm-refresh="1418941833"
  
  
