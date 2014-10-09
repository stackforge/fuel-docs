
Summary
-------

In general, your best bet is to choose a 2 socket server with a balance in I/O,
CPU, Memory, and Disk that meets your project requirements.
Some good options from Supermicro, HP and Lenovo for compute nodes include:

* Supermicro Superserver 5037mr-h8rtf
* HP ProLiant DL380p Gen8 E5-2609v2 1P 8GB-R P420i/ZM 460W PS Server/S-Buy
* HP Smart Array P222 Controller
* Lenovo ThinkServer RD540 Rack Server

.. note:: Servers that use some UEFI chips (such as the Lenovo W520)
          can not be used for Fuel target nodes
          because they do not emulate legacy BIOS
          in a way that is compatible with the grub settings
          used for the Fuel Master node.
          
          This issue affects servers used
          as Controller, Compute, and Storage nodes.
          They are booted from PXE ROM
          and then the chain32 loader boots from the hard drive,
          so it is possible to boot them with an operating system
          that is already installed,
          but it is not possible to install an operating system on them
          because the operating system distributions that are provided
          do not include UEFI images.
          See `LP1291128 <https://bugs.launchpad.net/fuel/+bug/1291128>`_
          and the `UEFI support blueprint
          <https://blueprints.launchpad.net/fuel/+spec/uefi-support>`_.

