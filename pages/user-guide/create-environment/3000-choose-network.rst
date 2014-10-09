
.. raw:: pdf

  PageBreak

.. _choose-network-ug:

Network service
---------------

.. image:: /_images/user_screen_shots/network-services.png
   :width: 50%

Five network topologies are supported;
see :ref:`net-topology-plan`.

You can choose any of the Neutron topologies on this screen.
If you choose Legacy Networking (nova-network) here,
you can choose between the FlatDHCP and VLAN topologies
on the Network Settings page.
If you choose the Neutron with VMware NSX plugin option,
you should have an NSX environment in place
and :ref:`properly set up<nsx-plan>`.
You must also configure communication with the NSX cluster.

