.. _mos61mu1463802:

RPC clients cannot find a reply queue after the last RabbitMQ server
====================================================================
restarts in the cluster
=======================

When RabbitMQ restarts and the queues dissapear, ``oslo.messaging``
may get stuck during the reconnection process. As a result, some of
the OpenStack services may become unusable when the failover procedure
finishes. See `LP1463802 <https://bugs.launchpad.net/bugs/1463802>`_.

Affected packages
-----------------
* **Centos\@6.1:** python-oslo-messaging=1.4.1-fuel6.1.mira31
* **Ubuntu\@6.1:** python-oslo.messaging=1.4.1-1~u14.04+mos11

Fixed packages
--------------
* **Centos\@6.1:** python-oslo-messaging=1.4.1-fuel6.1.mira33
* **Ubuntu\@6.1:** python-oslo.messaging=1.4.1-1~u14.04+mos13

Patching scenario - CentOS
--------------------------

#. Run the following commands on OpenStack compute nodes, OpenStack
   controller nodes, OpenStack Cinder nodes::

       yum clean expire-cache
       yum -y update python-oslo-messaging*

#. Run the following commands on OpenStack controller nodes::

       pcs resource disable p_heat-engine
       pcs resource disable p_neutron-l3-agent
       pcs resource disable p_neutron-metadata-agent
       pcs resource disable p_neutron-dhcp-agent
       pcs resource disable p_neutron-plugin-openvswitch-agent
       pcs resource enable p_neutron-plugin-openvswitch-agent
       pcs resource enable p_neutron-dhcp-agent
       pcs resource enable p_neutron-metadata-agent
       pcs resource enable p_neutron-l3-agent
       pcs resource enable p_heat-engine

#. Restart all non-HA OpenStack services on compute and controller
   nodes.

Patching scenario - Ubuntu
--------------------------

#. Run the following commands on OpenStack compute nodes, OpenStack
   controller nodes, OpenStack Cinder nodes::

       apt-get update
       apt-get install --only-upgrade -y python-oslo.messaging*

#. Run the following commands on OpenStack controller nodes::

       pcs resource disable p_heat-engine
       pcs resource disable p_neutron-l3-agent
       pcs resource disable p_neutron-metadata-agent
       pcs resource disable p_neutron-dhcp-agent
       pcs resource disable p_neutron-plugin-openvswitch-agent
       pcs resource enable p_neutron-plugin-openvswitch-agent
       pcs resource enable p_neutron-dhcp-agent
       pcs resource enable p_neutron-metadata-agent
       pcs resource enable p_neutron-l3-agent
       pcs resource enable p_heat-engine

#. Restart all non-HA OpenStack services on compute and controller
   nodes.

