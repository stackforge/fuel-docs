.. _mg-libvirt:

Libvirt
-------

Libvirt provides a common layer on top of hypervisors or containers
like KVM and LXC. Nova uses libvirt to manage instances. The libvirt
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

Collecting statistics about hypervisors can be done either by
requesting them directrly from libvirt or by using the following Nova
API ``/os-hypervisors/detail`` and ``/os-hypervisors/statistics``,
which is the recommended approach. These metrics are described above
in the :ref:`Nova section <mg-nova>`.

Furthermore, libvirt provides per instance statistics like CPU,
Disk, and Network IO which are further discussed
in :ref:`appendix <mg-virtual-machine-monitoring>`. These
statistics are mainly useful if they are associated with their
respective user, tenant, and cloud resource ID. To associate them, it
is necessary to either request Nova API and perform the mapping
between libvirt instance ID and OpenStack ID (prior to Juno), or more
effectively, by using the libvirt instance metadata set by Nova and
providing all the necessary information::

  # virsh edit instance-00000002

  <name>instance-00000002</name>
  <uuid>01c2d829-e480-4568-92c2-7dc0432a2549</uuid>
  <metadata>
    <nova:instance xmlns:nova="http://openstack.org/xmlns/libvirt/nova/1.0"
      <nova:package version="2014.2.2"/>
      <nova:name>z</nova:name>
      <nova:creationTime>2015-06-05 08:52:12</nova:creationTime>
      <nova:flavor name="m1.micro">
        <nova:memory>64</nova:memory>
        <nova:disk>0</nova:disk>
        <nova:swap>0</nova:swap>
        <nova:ephemeral>0</nova:ephemeral>
        <nova:vcpus>1</nova:vcpus>
      </nova:flavor>
      <nova:owner/>
      <nova:root type="image" uuid="fff4ed5c-1ec6-4263-bc6a-0c5bfb9e9f62"/>
    </nova:instance>
  </metadata>
 ...

Libvirt logs are under the ``/var/log/libvirt/`` directory.
