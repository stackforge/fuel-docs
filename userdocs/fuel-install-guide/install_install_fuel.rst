.. _install_intro:

Install Fuel
============

This section describes how to install Fuel on virtual or
bare-metal hardware. During the installation, you deploy the Fuel Master node
on the selected hardware and boot the servers or virtual machines that are
dedicated as Fuel Slave nodes. However, you do not install an operating
system or OpenStack components on the Fuel Slave nodes just yet. After you
deploy the Fuel Master node, you create an OpenStack environment using the
Fuel web UI or Fuel CLI. The Fuel Master node provisions the dedicated Fuel
Slave nodes with the selected operating system, OpenStack or other
components and roles when you deploy an OpenStack environment.

If you install Fuel on VMware vSphere, see: :ref:`vsphere_intro`.

This section includes the following topics:

.. toctree::
   :maxdepth: 2

   install/install_before_you_install_fuel
   install/install_download_iso
   install/install_prepare_install_media
   install/install_install_fuel_master_node
   install/install_set_up_fuel
   install/install_change_network_interface
   install/install_login_fuel_master_node
   install/install_login_fuel_master_node_multiple_nics
   install/install_boot_slave_nodes
