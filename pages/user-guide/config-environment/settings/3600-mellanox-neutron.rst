
.. raw:: pdf

   PageBreak

.. _mellanox-neutron-ug:

Mellanox Neutron components
+++++++++++++++++++++++++++

This section explains how to configure Mellanox ConnectX-3 adapters
in your environment. See :ref:`mellanox-adapters` for
planning information.

Kernel parameters configuration:

*    When enabling :ref:`sr-iov-term` or :ref:`iser-term` block storage,
     the *intel_iommu=on* kernel parameter will be automatically added on all nodes.

Mellanox Neutron plugin configuration:

*    In order to work with other plugins without SR-IOV, such as OVS,
     please select "Install only Mellanox drivers".

*    In order to work with SR-IOV mode,
     select "Install Mellanox drivers and SR-IOV plugins".
     After choosing the Mellanox SR-IOV plugin, an editable text box for
     changing the number of virtual functions is enabled.

.. image:: /_images/user_screen_shots/mellanox-neutron.png
   :width: 75%

**Note:** The maximum number of supported vNICs is 16.
See `HowTo Install Mirantis Fuel 5.1 OpenStack with Mellanox Adapters Support
<http://community.mellanox.com/docs/DOC-1474/>`_
to get instructions for changing the maximum number of vNICs.

iSER configuration:

*    In order to use high performance block storage, select "ISER
     protocol for volumes (Cinder)" checkbox in the storage section.

     The requirements for enabling iSER are:

     - "Cinder LVM over iSCSI for volumes" should remain selected.
     - Either "Install only Mellanox drivers" or
       "Install Mellanox drivers and SR-IOV plugins" should be
       checked in the Mellanox Components section.

.. image:: /_images/user_screen_shots/storage-iser.png
   :width: 80%

**Note:**
`HowTo Install Mirantis Fuel 5.1 OpenStack with Mellanox Adapters Support <http://community.mellanox.com/docs/DOC-1474/>`_ includes
advanced information regarding Mirantis OpenStack installation over
Mellanox hardware.
