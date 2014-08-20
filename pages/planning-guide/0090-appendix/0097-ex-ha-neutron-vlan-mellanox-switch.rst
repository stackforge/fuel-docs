
.. _mellanox_switch:

Neutron Switch configuration (Mellanox SX1036)
----------------------------------------------

Use the following configuration to deploy Mirantis OpenStack using a Mellanox SX1036 40/56GE 36 port switch

The switch configuration is required prior to the Fuel instllation.
Prior the installation, the network connectivity between all hosts should be ready.

Here is an example of Mellanox switch VLAN configuation and flow control:

::

  switch > enable
  switch # configure terminal
  switch (config) # vlan 1-20
  switch (config vlan 1-20) # exit

  # Note that VLAN 1 is an untagged VLAN by default
  switch (config) # interface ethernet 1/1 switchport mode hybrid
  switch (config) # interface ethernet 1/1 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/2 switchport mode hybrid
  switch (config) # interface ethernet 1/2 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/3 switchport mode hybrid
  switch (config) # interface ethernet 1/3 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/4 switchport mode hybrid
  switch (config) # interface ethernet 1/4 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/5 switchport mode hybrid
  switch (config) # interface ethernet 1/5 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/6 switchport mode hybrid
  switch (config) # interface ethernet 1/6 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/7 switchport mode hybrid
  switch (config) # interface ethernet 1/7 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/8 switchport mode hybrid
  switch (config) # interface ethernet 1/8 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/9 switchport mode hybrid
  switch (config) # interface ethernet 1/9 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/10 switchport mode hybrid
  switch (config) # interface ethernet 1/10 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/11 switchport mode hybrid
  switch (config) # interface ethernet 1/11 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/12 switchport mode hybrid
  switch (config) # interface ethernet 1/12 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/13 switchport mode hybrid
  switch (config) # interface ethernet 1/13 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/14 switchport mode hybrid
  switch (config) # interface ethernet 1/14 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/15 switchport mode hybrid
  switch (config) # interface ethernet 1/15 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/16 switchport mode hybrid
  switch (config) # interface ethernet 1/16 switchport hybrid allowed-vlan 2-20
  switch (config) # interface ethernet 1/1-1/16 flowcontrol receive on force
  switch (config) # interface ethernet 1/1-1/16 flowcontrol send on force
  switch (config) # configuration write
