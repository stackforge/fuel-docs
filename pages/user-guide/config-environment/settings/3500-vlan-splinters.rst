
.. raw:: pdf

   PageBreak

.. _vlan-splinters-ug:

VLAN splinters
++++++++++++++

VLAN splinters are provided so that CentOS deployments
can support Neutron VLANS or GRE
(with VLAN tags on the management, storage, or public networks).
The kernel used for the CentOS version used with OpenStack
is based on a pre-3.3 kernel
and so has poor support for VLAN tagged packets
moving through :ref:`ovs-term` bridges.
Without VLAN splinters,
CentOS deployments may experience poor performance issues,
intermittent connectivity problems,
situations where one VLAN is working but others are not,
or a total failure to pass traffic.
Ubuntu deployments use a kernel that includes strong VLAN support
and so are not affected by these issues.


.. image:: /_images/user_screen_shots/settings-vlan-splinters.png
   :width: 50%

You can select either the soft trunks or hard trunks mode:

*  The **soft trunks mode** configures OVS to enable splinters
   and attempts to automatically detect in-use VLANs.
   This provides the least amount of performance overhead
   but the traffic may not be passed onto the OVS bridge in some edge cases.

*  The **hard trunks mode** also configures OVS to enable splinters
   but uses an explicitly defined list of all VLANs across all interfaces.
   This should prevent the occasional failures associated with the soft mode
   but requires that corresponding tags be created on all of the interfaces.
   This introduces additional performance overhead.
   You should use fewer than 50 VLANs
   if you run the Neutron VLAN mode and use the hard trunks mode.

Fuel also provides the option
of using the experimental Fedora long-term support 3.10 kernel.
Using this kernel may allow you to use VLAN tagged packets
without using VLAN splinters,
which can provide significant performance advantages.
However, this option has had minimal testing
and may invalidate your agreements with your hardware vendor.
See :ref:`ovs-arch`
for more information about using Open VSwitch.

