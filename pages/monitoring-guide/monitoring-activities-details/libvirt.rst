.. _mg-libvirt:

LibVirt
-------

Libvirt provides a common layer on top of hypervisors or containers
like KVM and LXC. Nova uses Libvirt to manage instances. Libvirt
daemon must be started on all compute nodes, otherwise no instances
can be spawned.

.. list-table::
   :header-rows: 1
   :widths: 20 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role
     - HA mode

   * - libvirtd
     - internal RPC protocol, XML format
     - compute
     - n/a

**Collected Metrics**

Collecting statistics about instances from libvirt is not a
recommended approach since it does not allow to associate those
statistics with a tenant. A prefered method is to collect instances
statistics from Nova resource ``/os-hypervisors/detail``. Monitoring
of libvirt is further discussed in the appendix.

LibVirt logs are under the ``/var/log/libvirt/`` directory.
