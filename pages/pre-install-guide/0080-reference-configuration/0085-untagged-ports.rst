Untagged ports
--------------

**Cisco Catalyst**

::

        interface [Ten]GigabitEthernet[interface number]
          description [port description]
          switchport access [vlan ID for specific network]
          switchport mode access
        spanning-tree portfast
     

**Cisco Nexus/Arista**

::

 interface ethernet[interface number]
  description [port description]
  switchport
         switchport access vlan [vlan ID for specific network]

**Juniper**

::

 interfaces {
         [interface_name]-[interface_number] {
            unit 0 {
                family ethernet-switching {
                       port-mode access;
                 vlan {
                        members [vlan ID or name for specific network];
                         }
                }
            }
        }
 }
