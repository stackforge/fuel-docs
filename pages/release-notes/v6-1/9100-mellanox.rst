
.. _mellanox-rn:

Known limitations for the Mellanox SR-IOV plug-in
-------------------------------------------------

The Mellanox SR-IOV plug-in is fully integrated
into Mirantis OpenStack 6.1
but it has some known limitations:

* Deleting multiple instances on a compute node simultaneously
  might cause the host losing network connectivity. Rebooting
  the compute node will work around this. For a persistent solution please contact
  Mellanox support for upgrading the ConnectX-3 firmware version.
  See `LP1404659 <https://bugs.launchpad.net/bugs/1404659>`_.

* When you try to terminate an instance during its creation,
  the virtual function used by that instance might not
  be reused afterwards. That causes the total amount
  of available virtual functions to decline.
  To work around this issue,
  restart the eswitchd
  service on the compute node with the following command:

  ::

    service eswitchd restart

  See `LP1404661 <https://bugs.launchpad.net/bugs/1404661>`_.

