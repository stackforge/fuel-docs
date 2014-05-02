NIC Aggregation in UI
---------------------

Use "Configure Interfaces" tab to configure interfaces bonding.

1. Select node(s) and click "Configure Interfaces".
   Select interfaces to be aggregated. All interfaces except Admin-PXE can be aggregated.

.. image:: /_images/bonding-setup-in-ui-2.*
  :width: 45%
  :align: center

3. Click "Bond interfaces". Now you can select the appropriate bonding mode from the "Mode" drop-down list.

.. image:: /_images/bonding-setup-in-ui-3.*
  :width: 45%
  :align: center

4. Reassign networks, create additional bonds, etc. You can make all required changes and
   click "Apply" after that.

.. image:: /_images/bonding-setup-in-ui-45.*
  :width: 90%
  :align: center

You can add one or more interfaces to the bond. Select a bond and the interface(s) to add,
then click "Bond Interfaces". Interface(s) can be removed from the bond when the bond has
3 or more slave interfaces. To remove interface from bond click "Remove"
at the left-bottom from interface icon. To unbond interfaces select bond and click "Unbond Interfaces".

