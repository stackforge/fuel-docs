.. _vsphere_boot_master:

Boot the Fuel Master node
=========================

#. When the Mirantis ISO boot menu appears, press the "Tab" key
   on the keyboard and modify the last kernel parameter "showmenu"
   to "yes". Hit "Enter".
#. Wait for the Fuel Master node installation to complete:

To reach the Fuel Web UI, you must have IP connectivity to
the Fuel Master Node IP through the IP gateway that is connected
to the Port Group network used.

The default network settings for the Fuel Master node are:

* node IP:  10.20.0.2/24
* gateway and DNS:  10.20.0.1.
