
.. _compute-nodes-term:

Compute nodes (OpenStack Compute)
---------------------------------

A Compute node is a :ref:`node<node-term>`
to which the Compute :ref:`role<role-term>` is assigned;
see :ref:`assign-roles-ug`.
Compute nodes are the workhorses of your installation;
they are the servers on which your users' virtual machines are created.
`nova-compute` controls the life cycle of these VMs.

The Neutron :ref:`Open Vswitch<ovs-term>` agent
also runs on Compute nodes;
other Neutron agents run only on Controller nodes.
The Ceilometer Compute Agent may also run on Compute nodes.

The Fuel UI does not allow you to assign the Compute role
to a node that runs the Controller role
in most cases.
It is possible, although not recommended,
to run both the Compute and Controller roles
on a single server by editing the *openstack.yaml* file.

    .. note:: In environments that use vCenter as the hypervisor,
       the  Nova-compute service can run **only** on Controller nodes.
       Because of this, Fuel does not allow you
       to :ref:`assign<assign-roles-vcenter-ug>`
       the "Compute" role to any node
       when vCenter is selected as the hypervisor.

Also see:

- :ref:`storage-plan`

- :ref:`Compute Node Architecture<compute-arch>`.

- `Compute web site <http://www.openstack.org/software/openstack-compute/>`_

