.. _vcenter-operate:

Running vCenter
===============
After the OpenStack environment
that is integrated with the vCenter server is deployed,
you can manage the VMware cluster using the Horizon dashboard
and/or the Nova CLI:

- Log into the Horizon dashboard.
- Open the Hypervisor tab
  and select the VMware vCenter Server.
- To boot a new VM in vCenter:

  - Open the "Manage Compute" tab
    and go to the Instances page.
  - Press the "Launch instance" button
    and specify the VM parameters in the pop-up windoe.
    This launches a new VM
    which can be seen in a vSphere web client.
- Use the Horzon UI or the Nova CLI to stop or delete booted VMs in the vCenter.
- Use the Nova CLI to see the VMware cluster resources
  or to boot a new VM in vCenter.


