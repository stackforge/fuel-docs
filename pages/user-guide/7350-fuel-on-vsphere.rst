
.. _fuel-on-vsphere-ug:


Installing Fuel Master Node on vSphere
--------------------------------------

Before you follow this procedure to install
the Fuel Master Node on vSphere,
you should follow the planning information
as described in :ref:`fuel-on-vsphere-plan`.

To set up your vSphere environment to run Fuel:

+----------------------------+-------------------------------------------+
| Step Description           | Additional Information                    |
+============================+===========================================+
| Download the Mirantis      | See :ref:`download-iso-vsphere`           |
| OpenStack ISO file         |                                           |
+----------------------------+-------------------------------------------+
| Upload the ISO file        | See :ref:`upload-iso-vsphere`             |
| to the vCenter Datastore   |                                           |
+----------------------------+-------------------------------------------+
| Create a vCenter Port Group| See :ref:`port-group-vsphere`             |
| network                    |                                           |
+----------------------------+-------------------------------------------+
| Create a Virtual Machine   | See :ref:`mount-iso-vsphere`              |
| connected to that Port     |                                           |
| Group and mount the ISO    |                                           |
| the DVD drive              |                                           |
+----------------------------+-------------------------------------------+
| Install Fuel Master node   | See :ref:`install-boot-fuel-vsphere`      |
+----------------------------+-------------------------------------------+
| Verify that Fuel booted    | See :ref:`verify-fuel-boot-vsphere`       |
| on ESXI                    |                                           |
+----------------------------+-------------------------------------------+



.. include:: /pages/user-guide/fuel-on-vsphere/2000-download-iso.rst
.. include:: /pages/user-guide/fuel-on-vsphere/3000-upload-iso.rst
.. include:: /pages/user-guide/fuel-on-vsphere/4000-port-group.rst
.. include:: /pages/user-guide/fuel-on-vsphere/5000-create-vm.rst
.. include:: /pages/user-guide/fuel-on-vsphere/6000-mount-iso.rst
.. include:: /pages/user-guide/fuel-on-vsphere/7000-boot-fuel.rst
.. include:: /pages/user-guide/fuel-on-vsphere/8000-verify-fuel.rst

