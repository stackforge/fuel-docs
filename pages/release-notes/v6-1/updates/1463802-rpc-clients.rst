.. _mos61mu-1463802:

RPC clients cannot find a reply queue after the last RabbitMQ server restarts in the cluster
============================================================================================

Warning:

Launchpad: #1463802

When RabbitMQ restarts and the queues dissapear, oslo.messaging may get stuck during the reconnection process. As a result, some of the OpenStack services may become unusable when the failover procedure finishes.

Affected packages:
Centos@6.1: python-oslo-messaging=1.4.1-fuel6.1.mira31
Ubuntu@6.1: python-oslo.messaging=1.4.1-1~u14.04+mos11

Fixed packages:
Centos@6.1: python-oslo-messaging=1.4.1-fuel6.1.mira33
Ubuntu@6.1: python-oslo.messaging=1.4.1-1~u14.04+mos13

Patching scenario

CentOS:
Run command yum clean expire-cache on OpenStack compute nodes, OpenStack controller nodes, OpenStack Cinder nodes
Run command yum -y update python-oslo-messaging* on OpenStack compute nodes, OpenStack controller nodes, OpenStack Cinder nodes
Run command pcs resource disable p_heat-engine on OpenStack controller nodes
Run command pcs resource disable p_neutron-l3-agent on OpenStack controller nodes
Run command pcs resource disable p_neutron-metadata-agent on OpenStack controller nodes
Run command pcs resource disable p_neutron-dhcp-agent on OpenStack controller nodes
Run command pcs resource disable p_neutron-plugin-openvswitch-agent on OpenStack controller nodes
Run command pcs resource enable p_neutron-plugin-openvswitch-agent on OpenStack controller nodes
Run command pcs resource enable p_neutron-dhcp-agent on OpenStack controller nodes
Run command pcs resource enable p_neutron-metadata-agent on OpenStack controller nodes
Run command pcs resource enable p_neutron-l3-agent on OpenStack controller nodes
Run command pcs resource enable p_heat-engine on OpenStack controller nodes
Restart all non-HA OpenStack services on compute and controller nodes.

Ubuntu:
Run command apt-get update on OpenStack compute nodes, OpenStack controller nodes, OpenStack Cinder nodes
Run command apt-get install --only-upgrade -y python-oslo.messaging* on OpenStack compute nodes, OpenStack controller nodes, OpenStack Cinder nodes
Run command pcs resource disable p_heat-engine on OpenStack controller nodes
Run command pcs resource disable p_neutron-l3-agent on OpenStack controller nodes
Run command pcs resource disable p_neutron-metadata-agent on OpenStack controller nodes
Run command pcs resource disable p_neutron-dhcp-agent on OpenStack controller nodes
Run command pcs resource disable p_neutron-plugin-openvswitch-agent on OpenStack controller nodes
Run command pcs resource enable p_neutron-plugin-openvswitch-agent on OpenStack controller nodes
Run command pcs resource enable p_neutron-dhcp-agent on OpenStack controller nodes
Run command pcs resource enable p_neutron-metadata-agent on OpenStack controller nodes
Run command pcs resource enable p_neutron-l3-agent on OpenStack controller nodes
Run command pcs resource enable p_heat-engine on OpenStack controller nodes
Restart all non-HA OpenStack services on compute and controller nodes.


