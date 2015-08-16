
.. _nic-bonding-ui:

Setting NIC bonding (NIC aggregation)
-------------------------------------

NIC :ref:`bonding<bonding-term>` is an optional step that allows you
to aggregate multiple physical links into a single link;
this increases the speed and provides fault tolerance
for the network connection.
NIC bonding should be done before or in the scope of
mapping logical networks to NICs.

Use "Configure Interfaces" tab to configure interface bonding.

1. Select node(s) and click "Configure Interfaces".
   Select interfaces to be aggregated.

   .. image:: /_images/bonding-setup-in-ui-2.*

3. Click "Bond interfaces". Now you can select the appropriate bonding
   mode from the "Mode" drop-down list.

   .. note:: When bonding an Admin interface, only the balance-rr
             (round-robin) and Active Backup modes are available. Fuel
             currently does not support Admin interface bonding in LACP
             mode.

   .. image:: /_images/bonding-setup-in-ui-3.*

4. Reassign networks, create additional bonds, etc. You can make all
   required changes and click "Apply" after that.

You can add one or more interfaces to the bond.
Select a bond and the interface(s) to add, then click "Bond Interfaces".
Interface(s) can be removed from the bond
when the bond has 3 or more slave interfaces.
To remove an interface from a bond,
click "Remove" at the left-bottom from interface icon.
To unbond interfaces, select bond and click "Unbond Interfaces".
