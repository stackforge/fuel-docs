
.. _port-group-vsphere:

Create a vCenter Port Group network
+++++++++++++++++++++++++++++++++++

Choose a Port Group connection type:

.. image:: /_images/vCenter/3.5-fuel-vcenter-portgroup-net.png
   :width: 50%


Choose a switch:

.. image:: /_images/vCenter/3.6-fuel-vcenter-choose-a-switch.png
   :width: 50%


Name your network and set the VLAN number.
This is optional and depends on your underlying network infrastructure:


.. image:: /_images/vCenter/3.7-fuel-vcenter-network-name-and-vlan.png
   :width: 50%


After the network is created,
select the network on the network map by clicking on its name,
then click on the ‘Edit Settings’ icon:

.. image:: /_images/vCenter/3.8-fuel-vcenter-select-created-network.png
   :width: 50%


In the opened window,
click the ‘Security’ item in the left menu
and ensure that Promiscuous mode is set to Accept.
Then click the ‘OK’ button:

.. image:: /_images/vCenter/3.9-fuel-vcenter-accept-promiscuous.png
   :width: 50%

