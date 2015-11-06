.. _vsphere_boot_master:

Boot the Fuel Master node
=========================

#. When the Mirantis ISO boot menu appears, press the **Tab** key
   on the keyboard and modify the last kernel parameter ``showmenu``
   to ``yes``. Press **Enter**.
#. Wait for the Fuel Master node installation to complete.

To access the Fuel Web UI, your network client must have an access
to the Fuel Master node through the IP gateway that is connected
to the Port Group network that you configured in :ref:<vsphere_configure_network>.

Proceed to :ref:`vsphere_verify_master`.
