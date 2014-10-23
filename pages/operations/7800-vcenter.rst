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
    and specify the VM parameters in the pop-up window.
    This launches a new VM
    which can be seen in a vSphere web client.
- Use the Horizon UI or the Nova CLI to stop or delete booted VMs in the vCenter.
- Use the Nova CLI to see the VMware cluster resources
  or to boot a new VM in vCenter.

Nova-compute and vSphere clusters mapping
------------------------------------------

In earlier Fuel releases, 1-N mapping between nova-compute service
and vSphere cluster (cluster that is formed from ESXi hosts by vCenter server) was used.
In most cases, single nova-compute service instance uses many vSphere clusters, managed by a single vCenter.
Beginning with Release 6.0, this behaviour was changed to 1-1 mapping, so that a single nova-compute service
instance now interacts with a single vSphere cluster.

.. image:: /_images/1-1-mapping.png
   :width: 50%
