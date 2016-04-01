
.. _ironic-configure:

Configure the Bare Metal service
--------------------------------

After you deploy an OpenStack environment as described in
:ref:`ironic-install`, you must configure the components required for the
Ironic program. Execute all actions described in this
section as an OpenStack user with administrative privileges.

**To configure the Bare Metal service:**

#. Define the memory, CPU, and disk size of physical instances that you will
   deploy by creating a nova flavor that matches the server hardware
   on which you plan to run instances. Use the following command:

   ::

     nova flavor-create <flavor_name> <flavor_id> <RAM> <disk_size> <CPU>

#. Optionally, specify additional parameters using the ``nova flavor-key``
   command.

   **Example:**

   ::

     nova flavor-key baremetal-flavor set cpu_arch=x86_64

#. View and remember the list of UUIDs for bootstrap images:

   ::

     glance image-list | grep <bootstrap kernel, ramdisk and squashfs image
     name>

#. Enroll the nodes on which you plan to boot instances into the
   OpenStack Bare Metal service.

   ::

     ironic node-create [-c <chassis>] -d <driver> [-i <key=value>] [-p
     <key=value>] [-e <key=value>] [-u <uuid>] [-n <name>]


   .. list-table:: **Fuel drivers**
      :widths: 10 25
      :header-rows: 1

      * - Driver
        - Description
      * - ``fuel_ssh``
        - Enables communication between the Fuel Master node and other nodes.
      * - ``fuel_ipmitool``
        - Enables communication through IPMI. Use with the nodes that require
          IPMI, such as nodes that you use for bare-metal deployments.
      * - ``fuel-libvirt``
        - Ensures operation of virtual ironic instances hosted on ``libvirt``.
      * - ``fake``
        - Used for testing Fuel APIs.

   Use the values from step 1 and step 2. The following text is an example for the
   ``fuel_ipmitool`` driver.

   **Example:**

   ::

     ironic node-create [-n <node name>] [-u <node uuid>] -d fuel_ipmitool
                              -p memory_mb=<node RAM> -p cpu_arch=<node cpu_arch>
                              -p local_gb=<node disk size> -p cpus=<node N of cpus>
                              -i deploy_kernel=<uuid of bootstrap kernel image>
                              -i deploy_ramdisk=<uuid of bootstrap initramfs image>
                              -i deploy_squashfs=<uuid of bootstrap squashfs image>
                              -i ipmi_address=<node IPMI address or hostname>
                              -i ipmi_username=<node IPMI user name>
                              -i ipmi_password=<node IPMI pasword>

#. Communicate the node's network interface cards to the Bare Metal service by
   creating a port with MAC addresses of each network interface:

   ::

     ironic port-create -a <MAC address of the node NIC> -n <node UUID>

#. Prepare images that you plan to use to deploy physical machines as
   described in :ref:`ironic_prepare_image`.
