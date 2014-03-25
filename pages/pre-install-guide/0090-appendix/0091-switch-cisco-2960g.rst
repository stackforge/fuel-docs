.. _cisco-2960g-config:

Switch configuration (Cisco Catalyst 2960G)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the following configuration to deploy Mirantis OpenStack using a Cisco
Catalyst 2960G network switch.::

  service timestamps debug datetime msec localtime show-timezone
  service timestamps log datetime msec localtime show-timezone
  service password-encryption
  service sequence-numbers
  !
  hostname OpenStack\_sw1
  !
  logging count
  logging buffered 64000 informational
  logging rate-limit console 100 except errors
  logging console informational
  enable secret r00tme
  !
  username root privilege 15 secret r00tme
  !
  no aaa new-model
  aaa session-id common
  ip subnet-zero
  ip domain-name domain.ltd
  ip name-server [ip of domain name server]
  !
  spanning-tree mode rapid-pvst
  spanning-tree loopguard default
  spanning-tree etherchannel guard misconfig
  spanning-tree extend system-id
  !
  ip ssh time-out 60
  ip ssh authentication-retries 2
  ip ssh version 2
  !
  vlan 100
   name Public
  vlan 101
   name Management
  vlan 102
   name Storage
  vlan 103
   name Private
  vlan 104
   name Admin
   !
  interface GigabitEthernet0/1
     description Fuel Node eth0
     switchport access vlan 104
     switchport mode access
     spanning-tree portfast
     !
  interface GigabitEthernet0/2
     description Fuel Node eth1 (optional to have direct access to Public net)
     switchport access vlan 100
     switchport mode access
     spanning-tree portfast
  interface GigabitEthernet0/3
     description Compute Node 1 eth0
     switchport trunk native vlan 104
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 101, 102, 104
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/4
     description Compute Node 1 eth1
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 100, 103
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/5
     description Compute Node 2 eth0
     switchport trunk native vlan 104
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 101, 102, 104
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/6
     description Compute Node 2 eth1
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 100, 103
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/7
     description Controller Node 1 eth0
     switchport trunk native vlan 104
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 101, 102, 104
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/8
     description Controller Node 1 eth1
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 100, 103
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/9
     description Controller Node 2 eth0
     switchport trunk native vlan 104
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 101, 102, 104
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/10
     description Controller Node 2 eth1
     switchport trunk encapsulation dot1
     switchport trunk allowed vlan 100, 103
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/11
     description Controller Node 3 eth0
     switchport trunk native vlan 104
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 101, 102, 104
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/12
    description Controller Node 3 eth1
    switchport trunk encapsulation dot1q
    switchport trunk allowed vlan 100, 103
    switchport mode trunk
    spanning-tree portfast trunk
  interface GigabitEthernet0/13
    description Cinder Node eth0
    switchport trunk native vlan 104
    switchport trunk encapsulation dot1q
    switchport trunk allowed vlan 101, 102, 104
    switchport mode trunk
    spanning-tree portfast trunk
 
  interface GigabitEthernet0/14
    description Cinder Node eth1
    switchport trunk encapsulation dot1q
    switchport trunk allowed vlan 100, 103
    switchport mode trunk
    spanning-tree portfast trunk
  interface GigabitEthernet0/24
    description Connection to default gateway
    switchport access vlan 100
    switchport mode access
  !
  interface Vlan100
   ip address 172.16.1.254 255.255.255.0
   ip address 172.16.0.254 255.255.255.0 secondary
   no shutdown
  !
  ip route 0.0.0.0 0.0.0.0 172.16.1.1
  !
  ip classless
  no ip http server
  no ip http secure-server
  !
  line con 0
   session-timeout 15
   privilege level 15
   login local
   password r00tme
  !
  line vty 0 15
   session-timeout 15
   login local
   password r00tme
  !
  ntp server [ntp_server1] prefer
  ntp server [ntp_server2]
