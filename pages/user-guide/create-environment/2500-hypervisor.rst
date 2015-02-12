

.. raw:: pdf

  PageBreak

.. _hypervisor-ug:

Hypervisor
----------


.. image:: /_images/user_screen_shots/choose-hypervisor-ug.png
   :width: 50%

Choose one of the following:

- :ref:`kvm-term` -- Choose this option for bare-metal installations.

- :ref:`qemu-term` -- Choose this option for VirtualBox installations.

- :ref:`vcenter-term` -- Choose this option if you have a vCenter environment
  with ESXi servers to be used as hypervisors.
  You must also :ref:`configure communication<vcenter-config-ug>`
  with vCenter.

.. _dualhypervisor:

Beginning with Fuel 6.1 release, you can select two
hypervisors (vCenter+QEMU or vCenter+KVM) to enable
dualhypervisor support in one environment.

To do that, you should choose between KVM and QEMU and click
the corresponding radiobutton. After that, you only have to
select the vCenter checkbox.

.. image:: /_images/user_screen_shots/select-two-hypervisors.png
   :width: 50%

If you would like to have vCenter hypervisor only,
then you should select vCenter checkbox, enter the settings
and avoid adding compute nodes. For instructions, see :ref:`VMware tab<vmware-tab>` section.



