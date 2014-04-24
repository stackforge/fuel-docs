
.. _sahara-plan:

Planning a Sahara Deployment
============================

When deploying an OpenStack Environment
that includes Sahara for running Hadoop
you need to consider a few special conditions.

**Floating IPs**

In an OpenStack deployment that uses Neutron networking,
Fuel configures Sahara to use floating IPs to reach the VMs.
This means that you must provide a Floating IP pool
in each Node Group Template you define.

If you are using Nova-Network,
set the **auto_assign_floating_ip** parameter to true
by checking the appropriate box on the Fuel UI.
In this case, a floating IP is automatically assigned to each VM
and the "floating ip pool" dropdown menu
is hidden in the Sahara UI.

In either case, Sahara assigns a floating IP to each VM it spawns
so be sure to allocate enough floating IPs.

**Security Groups**
Sahara does not configure OpenStack Security Groups
so you must manually configure the default security group
in each tenant where Sahara will be used.
The table below lists the ports that must be open for inbound traffic
(marked with 'yes' in the 'Required for Savanna' column) and the ports that
are used for running Savanna post-deployment health checks.

**VM Flavor Requirements**

Hadoop requires at least 1G of memory to run.
That means you must use flavors that have
at least 1G of memory for Hadoop cluster nodes.

**Ports used by Sahara**

A number of ports must be open for inbound traffic
in order to run and test your Sahara deployment.
See :ref:`sahara-ports` for a list of these ports.

**Communication between virtual machines**

Be sure that communication between virtual machines is not blocked.
