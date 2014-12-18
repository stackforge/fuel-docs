.. index:: How Fuel Deploys HA

How Fuel Deploys HA
-------------------

Fuel installs Corosync service, configures ``corosync.conf``,
and includes the Pacemaker service plugin into ``/etc/corosync/service.d``.
Then Corosync service starts and spawns corresponding Pacemaker processes.
Fuel configures the cluster properties of Pacemaker
and then injects resource configurations for virtual IPs, HAProxy,
MySQL and Neutron agent resources::

  primitive p_haproxy ocf:pacemaker:haproxy \
    op monitor interval="20" timeout="30" \
    op start interval="0" timeout="30" \
    op stop interval="0" timeout="30"
  primitive p_mysql ocf:mirantis:mysql \
    op monitor interval="60" timeout="30" \
    op start interval="0" timeout="450" \
    op stop interval="0" timeout="150"
  primitive clone_p_neutron-dhcp-agent ocf:mirantis:neutron-agent-dhcp \
    op monitor interval="20" timeout="30" \
    op start interval="0" timeout="360" \
    op stop interval="0" timeout="360" \
    params tenant="services" password="neutron" username="neutron" \
    os_auth_url="http://10.107.2.254:35357/v2.0" \
    meta is-managed="true"
  primitive clone_p_neutron-l3-agent ocf:mirantis:neutron-agent-l3 \
    op monitor interval="20" timeout="30" \
    op start interval="0" timeout="360" \
    op stop interval="0" timeout="360" \
    params tenant="services" password="neutron" syslog="true" username="neutron" \
    debug="true" os_auth_url="http://10.107.2.254:35357/v2.0" \
    meta is-managed="true" target-role="Started"
  primitive clone_p_neutron-metadata-agent ocf:mirantis:neutron-agent-metadata \
    op monitor interval="60" timeout="30" \
    op start interval="0" timeout="30" \
    op stop interval="0" timeout="30"
  primitive clone_p_neutron-openvswitch-agent ocf:pacemaker:neutron-agent-ovs \
    op monitor interval="20" timeout="30" \
    op start interval="0" timeout="480" \
    op stop interval="0" timeout="480"
  primitive vip__management ocf:heartbeat:IPaddr2 \
    op monitor interval="2" timeout="30" \
    op start interval="0" timeout="30" \
    op stop interval="0" timeout="30" \
    params nic="br-mgmt" iflabel="ka" ip="10.107.2.254"
  primitive vip__public ocf:heartbeat:IPaddr2 \
    op monitor interval="2" timeout="30" \
    op start interval="0" timeout="30" \
    op stop interval="0" timeout="30" \
    params nic="br-ex" iflabel="ka" ip="172.18.94.46"
  clone clone_p_haproxy p_haproxy \
    meta interleave="true"
  clone clone_p_mysql p_mysql \
    meta interleave="true" is-managed="true"
  clone clone_clone_p_neutron-metadata-agent clone_p_neutron-metadata-agent \
    meta interleave="true" is-managed="true"
  clone clone_p_neutron-openvswitch-agent clone_p_neutron-openvswitch-agent \
    meta interleave="true"

And ties them with Pacemaker colocation resource::

  colocation dhcp-with-metadata inf: clone_p_neutron-dhcp-agent \
    clone_p_neutron-metadata-agent
  colocation dhcp-with-ovs inf: clone_p_neutron-dhcp-agent \
    clone_p_neutron-openvswitch-agent
  colocation dhcp-without-l3 -100: clone_p_neutron-dhcp-agent clone_p_neutron-l3-agent
  colocation l3-with-metadata inf: clone_p_neutron-l3-agent clone_p_neutron-metadata-agent
  colocation l3-with-ovs inf: clone_p_neutron-l3-agent clone_p_neutron-openvswitch-agent
  order dhcp-after-metadata inf: clone_p_neutron-metadata-agent p_neutron-dhcp-agent
  order dhcp-after-ovs inf: clone_p_neutron-openvswitch-agent clone_p_neutron-dhcp-agent
  order l3-after-metadata inf: clone_p_neutron-metadata-agent clone_p_neutron-l3-agent
  order l3-after-ovs inf: clone_p_neutron-openvswitch-agent clone_p_neutron-l3-agent

