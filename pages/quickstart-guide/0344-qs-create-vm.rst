.. _qs_create_vms:

Creating Virtual Machines
-------------------------

You must manually configure virtual machines for the Fuel installation. 
Create one virtual machine for the Fuel Master node and at least three virtual 
machines for Fuel Slave Nodes. 

**Procedure:**
 
1. In VirtualBox, configure the Fuel Master node virtual machine according to 
   the :ref:`qs_vm_requirements`.
2. In the Fuel Master node network settings, configure the following network adapters:

   - **Adapter 1:**	Host-only adapter vboxnet0
   - **Adapter 2:** Host-only adapter vboxnet1
   - **Adapter 3:**	NAT 
	 
3. Configure at least three Fuel Slave nodes virtual machines according 
   to the :ref:`qs_vm_requirements`.
4. Right-click on a Fuel Slave node VM and select **System**.
5. In **Boot Order**, select **Network**.
6. Click **OK**.
7. Right-click on the Fuel Slave node VM and select **Network**.
8. Configure the following network adapters:

   - **Adapter 1:** Host-only adapter vboxnet0
   - **Adapter 2:** Host-only adapter vboxnet1
   - **Adapter 3:** Host-only adapter vboxnet2
	 
9. Specify the following parameters to the Fuel Slave node network adapters:

   - Promiscuous mode: **Allow All**
   - Adapter Type: **Intel PRO/1000 MT Desktop**
   - Select the **Cable Connected** checkbox

11.	Repeat **Step 5** - **Step 9** for each Fuel Slave node. 
12.	Proceed to :ref:`qs_mount_iso`.
