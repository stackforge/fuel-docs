.. _qs_modify_params:

Modifying the Deployment Parameters
-----------------------------------
You can modify the default configuration as needed by editing the 
``config.sh`` ile.

.. warning:: If you are not familiar with scripting, do not modify 
             the scripts. Use the default configuration for testing.

**Procedure:**

1. Open the ``config.sh`` file.
2. Modify the required parameters:

**Table 1. Deployment Paramters**

+------------------------+-------------------------------------------+
|**Parameters**          |**Description**                            |
+========================+===========================================+
|vm_master_memory_mb     |Amount of RAM allocated to the Fuel Master |
|                        |node in MB. Default value is 1536.         |
+------------------------+-------------------------------------------+
|vm_master_disk_mb       |Size of the hard disk drive on the Fuel    |
|                        |Master node in MB. Default value is 65 GB. |
+------------------------+-------------------------------------------+
|vm_master_nat_network   |Network allocated to the Fuel Master node  |
|                        |through the NAT adapter. Default value is  |
|                        |192.168.200.0/24.                          |
+------------------------+-------------------------------------------+
|vm_master_nat_gateway   |Default gateway on the Fuel Master node.   |
|                        |Default value is 192.168.200.2.            |
+------------------------+-------------------------------------------+
|vm_master_ip            |The Fuel Master node IP address. Default   |
|                        |value is 10.20.0.2. You can modify the     |
|                        |default IP address either in this script or|
|                        |during the boot time.                      |
+------------------------+-------------------------------------------+
|vm_master_username      |The Fuel Master node super user. Default   |
|                        |value is root.                             |
+------------------------+-------------------------------------------+
|vm_master_password      |The password for the Fuel Master node      |
|                        |super user. Default value is ``r00tme``.   |
+------------------------+-------------------------------------------+
|cluster_size            |The number of the Fuel Slave nodes to      |
|                        |deploy.                                    |
+------------------------+-------------------------------------------+
|vm_slave_cpu            |The number of CPUs on each Fuel Slave node.|
|                        |Default value is 1.                        |
+------------------------+-------------------------------------------+
|vm_slave_memory_mb      |Amount of RAM on a slave node in MB.       |
|                        |If your host system has 8 GB, default value|
|                        |is 1536 MB.                                |
|                        |If your host system has 16 GB, default     |
|                        |value is                                   |
|                        |1024 MB.                                   |
+------------------------+-------------------------------------------+

3. Save the ``config.sh`` file.
4. Proceed to :ref:`Installing Mirantis OpenStack Using Scripts<qs_install_scripts>`.

.. seealso::

   - :ref:`qs_supported_os`
   - :ref:`qs_scripts_run_windows`

