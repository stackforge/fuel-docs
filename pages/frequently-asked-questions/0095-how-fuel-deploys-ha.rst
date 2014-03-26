.. index:: How Fuel Deploys HA

How Fuel Deploys HA
-------------------

Fuel installs Corosync service, configures ``corosync.conf`` and includes Pacemaker 
service plugin into ``/etc/corosync/service.d``. Then Corosync service starts and 
spawns corresponding Pacemaker processes. Fuel configures cluster properties of 
Pacemaker and then injects resources configuration for virtual IPs, HAProxy, 
MySQL and Quantum agent resources::

  primitive p_haproxy ocf:pacemaker:haproxy \
    op monitor interval="20" timeout="30" \
    op start interval="0" timeout="30" \
    op stop interval="0" timeout="30"
  primitive p_mysql ocf:mirantis:mysql \
    op monitor interval="60" timeout="30" \
    op start interval="0" timeout="450" \
    op stop interval="0" timeout="150"
  primitive p_quantum-dhcp-agent ocf:mirantis:quantum-agent-dhcp \
    op monitor interval="20" timeout="30" \
    op start interval="0" timeout="360" \
    op stop interval="0" timeout="360" \
    params tenant="services" password="quantum" username="quantum" \
    os_auth_url="http://10.107.2.254:35357/v2.0" \
    meta is-managed="true"
  primitive p_quantum-l3-agent ocf:mirantis:quantum-agent-l3 \
    op monitor interval="20" timeout="30" \
    op start interval="0" timeout="360" \
    op stop interval="0" timeout="360" \
    params tenant="services" password="quantum" syslog="true" username="quantum" \
    debug="true" os_auth_url="http://10.107.2.254:35357/v2.0" \
    meta is-managed="true" target-role="Started"
  primitive p_quantum-metadata-agent ocf:mirantis:quantum-agent-metadata \
    op monitor interval="60" timeout="30" \
    op start interval="0" timeout="30" \
    op stop interval="0" timeout="30"
  primitive p_quantum-openvswitch-agent ocf:pacemaker:quantum-agent-ovs \
    op monitor interval="20" timeout="30" \
    op start interval="0" timeout="480" \
    op stop interval="0" timeout="480"
  primitive vip__management_old ocf:heartbeat:IPaddr2 \
    op monitor interval="2" timeout="30" \
    op start interval="0" timeout="30" \
    op stop interval="0" timeout="30" \
    params nic="br-mgmt" iflabel="ka" ip="10.107.2.254"
  primitive vip__public_old ocf:heartbeat:IPaddr2 \
    op monitor interval="2" timeout="30" \
    op start interval="0" timeout="30" \
    op stop interval="0" timeout="30" \
    params nic="br-ex" iflabel="ka" ip="172.18.94.46"
  clone clone_p_haproxy p_haproxy \
    meta interleave="true"
  clone clone_p_mysql p_mysql \
    meta interleave="true" is-managed="true"
  clone clone_p_quantum-metadata-agent p_quantum-metadata-agent \
    meta interleave="true" is-managed="true"
  clone clone_p_quantum-openvswitch-agent p_quantum-openvswitch-agent \
    meta interleave="true"

And ties them with Pacemaker colocation resource::

  colocation dhcp-with-metadata inf: p_quantum-dhcp-agent \
    clone_p_quantum-metadata-agent
  colocation dhcp-with-ovs inf: p_quantum-dhcp-agent \
    clone_p_quantum-openvswitch-agent
  colocation dhcp-without-l3 -100: p_quantum-dhcp-agent p_quantum-l3-agent
  colocation l3-with-metadata inf: p_quantum-l3-agent clone_p_quantum-metadata-agent
  colocation l3-with-ovs inf: p_quantum-l3-agent clone_p_quantum-openvswitch-agent
  order dhcp-after-metadata inf: clone_p_quantum-metadata-agent p_quantum-dhcp-agent
  order dhcp-after-ovs inf: clone_p_quantum-openvswitch-agent p_quantum-dhcp-agent
  order l3-after-metadata inf: clone_p_quantum-metadata-agent p_quantum-l3-agent
  order l3-after-ovs inf: clone_p_quantum-openvswitch-agent p_quantum-l3-agent

