.. _sysreq_ironic_limitations:

Bare Metal service limitations
------------------------------

When you deploy your environment using Fuel with Ironic, the OpenStack
environment has the following limitations:

.. list-table:: **Limitation for an OpenStack environment with Ironic**
   :widths: 10 25
   :header-rows: 1

   * - Category
     - Description
   * - Network
     - * Neutron with VLAN segmentation is the only supported networking
         option.
   * - Storage
     - * Ironic does not support attaching or booting from the volumes stored
         in Cinder.

       * Ironic requires a swift-compatible object storage. You can use
         Swift or RADOS Gateway.

   * - Security
     - * No tenant-level network separation is supported for physical machines
         on which you deploy instances. All physical machines are visible to
         all tenants and to each other on the physical network level.

       * Neutron security groups do not apply to instances deployed on
         physical machines.

   * - Virtualization platform
     - VMware vCenter as a hypervisor is not supported.
   * - Fuel plug-ins
     - Ironic supports all Fuel plug-ins as long as their requirements do not
       interfere with ironic limitations. For example, if a plug-in requires
       you to configure any other networking option but Neutron with VLAN
       segmentation, you cannot use this plug-in with ironic.
   * - Management
     - * Auto-discovery is not supported.

         Ironic cannot automatically discover the physical machines that you
         will use to create instances. Therefore, you must have description of
         the server hardware available including CPU, RAM, disks, MAC
         addresses, and so on to manually discover them. You must also have
         information required to configure power and BIOS settings, such as
         IPMI address or FQDN, as well as the IPMI user name and password with
         administrator privileges for IPMI.

       * Horizon is partially supported.

         Although you can launch an instance on a physical machine using
         Horizon, you must perform all other operations with physical nodes
         through APIs or CLI.
         Many operations that are typically supported for virtual
         machines, such as pausing and resuming, are not supported for
         physical machines. However, they are still present in the Horizon UI.

       * Only ``admin`` can manage operations with Ironic.

         Only an OpenStack user with the ``admin`` role can operate the
         Ironic service.
