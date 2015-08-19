
.. _compute_vmware_role_rn:

Nova-compute (VCDriver) service on a standalone node deployment
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

In earlier Fuel releases, nova-compute services that managed virtual machines
in vSphere clusters through the vCenter server were deployed on Controller
nodes only.

In Fuel 7.0, with the implementation of the *Compute VMware* node role,
you are able to deploy nova-compute service on a standalone host.
This change introduces more flexibility to deployment scenarios and solves
the problem of adding vSphere clusters to the deployed OpenStack environment.

See `compute-vmware-role blueprint
<https://blueprints.launchpad.net/fuel/+spec/compute-vmware-role>`_
for the details about the implementation and :ref:`assign-roles-vcenter-ug`
for the detailed instructions on how to deploy nova-compute service on a
standalone node through the Fuel web UI. 
