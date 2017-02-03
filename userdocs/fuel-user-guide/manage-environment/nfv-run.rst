.. _nfv-run-vm:

Run an instance with workload acceleration
==========================================

If you have enabled workflow acceleration, you can create a flavor
that supports such NFV features as DPDK and SR-IOV and deploy instances
using that flavor.

You can configure the corresponding settings in the OpenStack Dashboard
(Horizon) or through the CLI. This section only describes the Horizon
configuration.

.. note::

   The SR-IOV interfaces of VMs require the ``i40evf`` module if placed on an
   Intel® XL710-based host NIC. This module is not installed by default on some
   distributions, for example, Ubuntu Cloud Image. As a result, such VMs may
   have network connectivity issues. LP1660694_

   The workaround is to install the ``linux-image-extra`` package on the
   VM::

    sudo apt-get install linux-image-extra-$(uname -r)


This section includes the following topics:

.. toctree::
   :maxdepth: 2

   nfv-run/nfv-create-flavor.rst
   nfv-run/nfv-create-sriov-port.rst
   nfv-run/nfv-launch-vm.rst
   nfv-run/nfv-associate-floating-ip.rst
   nfv-run/nfv-verify.rst

.. _LP1660694: https://bugs.launchpad.net/mos/+bug/1660694
