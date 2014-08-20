Tagged ports
------------

**Cisco Catalyst**

::

        interface [Ten]GigabitEthernet[interface number]
          description [port description]
          switchport trunk encapsulation dot1q
          switchport trunk allowed vlan [vlan IDs for specific networks]
          switchport mode trunk
          spanning-tree portfast trunk        
         switchport trunk native vlan [vlan ID] - if necessary one untagged VLAN

        

**Cisco Nexus/ Arista**

::

 interface ethernet[interface number]
   description [port description]
   switchport
   switchport mode trunk
           switchport trunk allowed vlan [vlan IDs for specific networks]
           switchport trunk native vlan [vlan ID] - if necessary one untagged VLAN



**Mellanox**

::

 interface ethernet [interface number]
   description [port description]
   switchport mode hybrid
           switchport hybrid allowed-vlan [all|none]
           switchport hybrid allowed-vlan [add|remove|except] [vlan number]
           switchport hybrid allowed-vlan [vlan number]
           switchport access vlan [vlan number]


**Juniper**

::

 interfaces {
        [interface_name]-[interface_number] {
            unit 0 {
                family ethernet-switching {
                    port-mode trunk;
                    vlan {
                        members [ vlan IDs or names of specific
 networks];
                         }
                native-vlan-id [vlan ID] if necessary one untagged VLAN
                }
            }
        }
 }


