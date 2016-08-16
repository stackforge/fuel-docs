.. _nic-mapping:

nic_mapping
-----------

**Description**

Specifies aliases to network interface names mapping,
for example, ``adm: eth0``. If a node is not listed in this section,
default mapping applies. You can configure custom mapping for
any node by the node name. The number of NICs depends on the
network topology and may vary. Aliases are optional and if
all nodes have the same number of NICs connected in a similar
manner, you can use NIC names instead.

**Example**

::

  nic_mapping:
   default:
        adm: eth0
        pub: eth1
        man: eth2
        stor: eth3
   node-33:
        adm: eth0
        pub: eth4
        man: eth1
        stor: eth2
