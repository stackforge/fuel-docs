
.. _nic-bonding-ui:

Setting NIC bonding (NIC aggregation)
-------------------------------------

NIC bonding is an optional step that allows you
to aggregate multiple physical links into a single link;
this increases the speed and provide fault tolerance for the network connection.
NIC bonding should be done before or in the scope of
mapping logical networks to NICS.

Use "Configure Interfaces" tab to configure interfaces bonding.

1. Select node(s) and click "Configure Interfaces".
   Select interfaces to be aggregated. All interfaces except Admin-PXE can be aggregated.

.. image:: /_images/bonding-setup-in-ui-2.*
  :width: 75%

3. Click "Bond interfaces". Now you can select the appropriate bonding mode from the "Mode" drop-down list.

.. image:: /_images/bonding-setup-in-ui-3.*
  :width: 45%

4. Reassign networks, create additional bonds, etc. You can make all required changes and
   click "Apply" after that.

.. image:: /_images/bonding-setup-in-ui-45.*
  :width: 90%

You can add one or more interfaces to the bond.
Select a bond and the interface(s) to add, then click "Bond Interfaces".
Interface(s) can be removed from the bond
when the bond has 3 or more slave interfaces.
To remove an interface from a bond,
click "Remove" at the left-bottom from interface icon.
To unbond interfaces, select bond and click "Unbond Interfaces".

