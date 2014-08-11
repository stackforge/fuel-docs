
.. raw:: pdf

   PageBreak

.. _mellanox-neutron-ug:

Mellanox Neutron components
+++++++++++++++++++++++++++

This section explains how to accelerate cloud performance
(compute and storage traffic) over Mellanox ConnectX-3 adapters.
In order to improve the performance, one can enable SR-IOV based networking
on the compute nodes and use iSER block storage as the iSCSI transport on
the Cinder node. SR-IOV enables network traffic to bypass the software switch
layer (e.g. OVS switch), reduce CPU overhead, boost throughput and reduce
latency. Similar effect is achieved, when enabling iSCSI over iSER block
storage, instead the usage of default iSCSI over TCP.

Kernel parameters configuration:

*    In case you wish to enable SR-IOV or iSER block storage,
     you need to add "intel_iommu=on" to the kernel paramters:

.. image:: /_images/user_screen_shots/intel_iommu.png
   :width: 70%

Mellanox Neutron plugin configuration:

*    In order to work with other plugins without SR-IOV, such as OVS,
     please select "Install only Mellanox drivers".

*    In order to work with SR-IOV mode,
     select "Install Mellanox drivers and SR-IOV plugins".
     After choosing Mellanox SR-IOV plugin, an editable text box for changing
     the number of virtual functions will be enabled.

.. image:: /_images/user_screen_shots/mellanox-neutron.png
   :width: 75%

**Note:** The maximum number of supported vNICs is 16. To change the maximum
number of vNICs, please view the following `post
<http://community.mellanox.com/docs/DOC-1474/>`_.

iSER configuration:

*    In order to use high performance block storage, select "ISER
     protocol for volumes (Cinder)" checkbox in the storage section.
     Note: "Cinder LVM over iSCSI for volumes" should remain selected,
     and Mellanox drivers installation should be enabled.

.. image:: /_images/user_screen_shots/storage-iser.png
   :width: 75%

**Note:** This `link <http://community.mellanox.com/docs/DOC-1474/>`_ includes
advanced information regarding Mirantis Openstack installation over
Mellanox HW.
